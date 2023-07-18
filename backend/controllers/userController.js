const User = require("../models/userModel");
const generateOtp = require("../config/Otp");
const { SendOtp } = require("../config/sendOtp");
const Post = require("../models/postModel");

const register = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(409).send({ message: "User already exists" });
  }
  try {
    const otp = await generateOtp();
    await SendOtp(req.body.email, otp, 1);
    const newUser = await User.create({
      ...req.body,
      otp: otp,
    });
    newUser.save();
    const id = newUser._id;
    return res
      .status(200)
      .json({ message: "Otp sent please verify to register", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const email = req.body.email;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res
        .status(401)
        .json({ message: "User with this email does'nt exist" });
    }
    if (!userExists.isVerified) {
      return res
        .status(402)
        .json({ message: "User is not verified please verify" });
    } else {
      const check = await userExists.matchPassword(req.body.password);
      if (check) {
        if (userExists.twoFa) {
          const otp = await generateOtp();
          await SendOtp(email, otp, 0);
          userExists.otp = otp;
          await userExists.save();
          const other = userExists._doc;
          return res
            .status(200)
            .json({ message: "Otp send please verify to login", other });
        }
        const other = userExists._doc;
        const token = await userExists.generateToken();
        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({ other });
      } else {
        return res.status(401).json({ message: "Password is wrong" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token", null, { options })
      .json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const check = await user.matchPassword(req.body.oldpassword);
    if (!check) {
      return res.status(401).json({ message: "Old password is wrong" });
    }
    user.password = req.body.newpassword;
    await user.save();
    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { email, name } = req.body;
    if (email) {
      user.email = email;
    }
    if (name) {
      user.name = name;
    }
    user.save();
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token", token, options)
      .json({ message: "Profile updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getallUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getOtherProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      post.deleteOne();
    }
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      follower.following.pull(req.user._id);
      await follower.save();
    }
    for (let i = 0; i < following.length; i++) {
      const follow = await User.findById(following[i]);
      follow.followers.pull(req.user._id);
      await follow.save();
    }
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const verifyUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.otp === req.body.otp) {
      user.isVerified = true;
      user.otp = "";
      await user.save();
      const other = user._doc;
      const token = await user.generateToken();
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({ other });
    } else {
      return res.status(400).send("Invalid OTP.");
    }
  } else {
    return res.status(400).send("User not found.");
  }
};
const followunfollowUser = async (req, res) => {
  try {
    const usertoFollow = await User.findById(req.params.id);
    const logginUser = await User.findById(req.user._id);
    if (!usertoFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const followed = logginUser.following.some((follow) =>
      follow.equals(usertoFollow._id)
    );

    if (followed) {
      logginUser.following.pull(usertoFollow._id);
      usertoFollow.followers.pull(logginUser._id);
      await logginUser.save();
      await usertoFollow.save();
      return res.status(200).json({ message: "User unfollowed" });
    }

    logginUser.following.push(usertoFollow._id);
    usertoFollow.followers.push(logginUser._id);
    await logginUser.save();
    await usertoFollow.save();
    return res.status(200).json({ message: "User followed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = await generateOtp();
    user.otp = otp;
    const id = user._id;
    await user.save();
    await SendOtp(req.body.email, otp, 2);
    return res
      .status(200)
      .json({ id, message: "OTP sent for reseting password" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const resetpassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.otp === req.body.otp) {
        user.otp = "";
        user.password = req.body.password;
        await user.save();
        const other = user._doc;
        const token = await user.generateToken();
        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res
          .status(200)
          .cookie("token", token, options)
          .json({ message: "password reset success" });
      } else {
        return res.status(400).send("Invalid OTP.");
      }
    } else {
      return res.status(404).send("User not found.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const enable2fa = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.twoFa) {
      return res.status(400).json({ message: "2fa already enabled" });
    }
    user.twoFa = true;
    await user.save();
    return res.status(200).json({ message: "2fa enabled" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  register,
  login,
  verifyUser,
  followunfollowUser,
  logout,
  updatePassword,
  updateProfile,
  getallUsers,
  getProfile,
  getOtherProfile,
  deleteProfile,
  forgotPassword,
  resetpassword,
  enable2fa,
};
