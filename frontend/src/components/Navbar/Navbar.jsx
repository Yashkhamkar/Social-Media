import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import logo from "../../assets/logo.png";
import gallery from "../Create_post/icons/gallery.svg";
import home from "../../assets/41-home.svg";
import { MdOutlineExplore, MdLibraryAdd } from "react-icons/md";
import "../Create_post/style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleClickGallery = () => {
    document.getElementById("imageInput").click();
  };
  const createPost = (e) => {
    setOpenDialog(false);
    e.preventDefault();
    let avtar;
    if (!selectedFile) {
      return alert("Please select a file");
    }
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "Food-Delivery");
    data.append("cloud_name", "xash");

    fetch("https://api.cloudinary.com/v1_1/xash/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        avtar = data.secure_url;

        return fetch(`/post/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: avtar,
            caption: caption,
          }),
        });
      })
      .then((res) => {
        if (res.status === 201) {
          setCaption("");
          setSelectedFile(null);
          Swal.fire({
            icon: "success",
            text: "Post created successfully",
          });
        }
      });
  };
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const logOut = (e) => {};

  return (
    <Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        // fullWidth
      >
        <div className="post-body">
          <div className="container">
            <div className="wrapper">
              <section className="post">
                <header className="heads">Create Post</header>
                <form action="#">
                  <div className="content">
                    <img
                      src={userInfo.avtar}
                      alt="logo"
                      style={{ borderRadius: "50%" }}
                    />
                    <div className="details">
                      <p>{userInfo.name}</p>
                    </div>
                  </div>
                  <textarea
                    placeholder={`Write a caption ${userInfo.name} !!!`}
                    spellCheck="false"
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                    required
                  ></textarea>
                  <div className="options">
                    <p>
                      {selectedFile ? selectedFile.name : "Add to Your Post"}
                    </p>
                    <ul className="list">
                      <li>
                        <label htmlFor="imageInput">
                          <img
                            src={gallery}
                            alt="gallery"
                            onClick={handleClickGallery}
                          />
                        </label>
                        <input
                          type="file"
                          id="imageInput"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </li>
                    </ul>
                  </div>
                  <button onClick={createPost}>Post</button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </Dialog>
      <Logo>
        <Link to="/home">
          <img src={logo} alt="" height={45} />
        </Link>
      </Logo>
      <SearchBar>
        <input
          type="text"
          placeholder="Search ..."
          style={{
            marginTop: "15px",
            // textAlign: "center",
          }}
        />
      </SearchBar>
      <Icons>
        <Icon>
          <Link to="/home">
            <img src={home} alt="" />
          </Link>
        </Icon>
        <Icon>
          {/* <img
            src="./40-add-card.svg"
            alt=""
            onClick={() => setOpenDialog(true)}
          /> */}
          <MdLibraryAdd
            style={{ fontSize: "24px" }}
            onClick={() => setOpenDialog(true)}
          />
        </Icon>
        <Icon>
          <MdOutlineExplore style={{ fontSize: "24px" }} />
        </Icon>
        <Icon>
          <img
            src={userInfo.avtar}
            alt=""
            onClick={() => setOpenMenu(!openMenu)}
          />
          <Menu openMenu={openMenu}>
            <MenuElement onClick={() => navigate("/profile")}>
              Profile
            </MenuElement>
            <MenuElement onClick={logOut}>Logout</MenuElement>
          </Menu>
        </Icon>
      </Icons>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  border-bottom: 1px solid lightgray;
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  @media only screen and (max-width: 768px) {
    justify-content: space-around;
  }
`;

const Logo = styled.div`
  cursor: pointer;
`;

const SearchBar = styled.div`
  height: 30px;
  width: 268px;
  padding: 3px 16px 3px 16px;
  min-height: auto;
  min-width: auto;
  background-color: #efefef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 18px;
    font-size: 14px;
    width: 90%;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  justify-content: space-evenly;
  height: 40px;
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
  }

  &:nth-child(4) {
    img {
      border-radius: 50%;
    }
    position: relative;
  }
`;

const Menu = styled.div`
  position: relative;
  bottom: -8px;
  display: ${(props) => (props.openMenu ? "block" : "none")};
  background: #fff;
  width: 100px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const MenuElement = styled.div`
  height: 40px;
  color: gray;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  &:hover {
    background-color: #e4e4e4;
  }
`;

const CreatePostForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  height: 300px;
`;

const InputContainer = styled.div`
  width: 90%;
  height: 33px;
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 100%;
    border: 1px solid lightgrey;
    padding: 5px;
    outline: none;
  }

  textarea {
    width: 100%;
    height: 200px;
    resize: none;
    border: 1px solid lightgrey;
    padding: 5px;
    outline: none;
  }
`;

const PostCTAButtons = styled.div`
  button {
    width: 100px;
    height: 33px;
    margin-right: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
  }

  .cancel-button {
    background-color: red;
  }

  .post-button {
    background-color: #026aab;
  }
`;
export default Navbar;
