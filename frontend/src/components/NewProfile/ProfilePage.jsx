import React from "react";
import gallery1 from "./images/gallery-1.jpg";
import gallery2 from "./images/gallery-2.jpg";
import gallery3 from "./images/gallery-3.jpg";
import gallery4 from "./images/gallery-4.jpg";
import gallery5 from "./images/gallery-5.jpg";
import gallery6 from "./images/gallery-6.jpg";
import { Like, CommentOne } from "@icon-park/react";
import "./style.css";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const posts = [
    { image: gallery1 },
    { image: gallery2 },
    { image: gallery3 },
    { image: gallery4 },
    { image: gallery5 },
    { image: gallery6 },
  ];

  return (
    <main style={{ marginTop: "80px" }}>
      <header>
        <div className="header-wrap">
          <div className="profile-pic">
            <img src={userInfo.avtar} alt="profile-logo" />
          </div>
          <div className="profile-info">
            <div className="title row">
              <h2>{userInfo.name}</h2>
              <span className="verfied-icon spanx"></span>
              <button className="primary buttons" style={{ cursor: "pointer" }}>
                Edit Profile
              </button>
            </div>
            <div className="desktop-only">
              <div className="details row">
                <ul>
                  <li>
                    <span className="spanx">722</span> posts
                  </li>
                  <li>
                    <span className="spanx">25.1m</span> followers
                  </li>
                  <li>
                    <span className="spanx">6</span> following
                  </li>
                </ul>
              </div>
              <div
                className="descriptions row last"
                style={{ fontSize: "15px", marginTop: "40px" }}
              >
                BEST PHONES IN THE WORLD
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info mobile-only">
          <div className="descriptions row">
            <h1>apple</h1>
            <span className="spanx">
              Everyone has a story to tell.
              <br />
              Tag <a>#ShotoniPhone</a> to take part.
            </span>
          </div>
        </div>
      </header>
      <div className="desktop-only">
        <div className="tabs">
          <div className="tab-item active" style={{ marginRight: "60px" }}>
            <svg
              aria-label="Posts"
              className="_8-yf5"
              fill="#262626"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                clip-rule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span className="spanx">POSTS</span>
          </div>
          <div className="tab-item" style={{ marginRight: "60px" }}>
            <svg
              aria-label="Posts"
              className="_8-yf5"
              fill="#8e8e8e"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
            </svg>
            <span className="spanx">VIDEOS</span>
          </div>
        </div>
      </div>
      <div className="mobile-tabs mobile-only">
        <ul>
          <li>
            <div>722</div>
            posts
          </li>
          <li>
            <div>25.1m</div>
            followers
          </li>
          <li>
            <div>6</div>
            following
          </li>
        </ul>
        <div className="actions">
          <svg
            aria-label="Posts"
            className="_8-yf5"
            fill="rgb(0, 149, 246)"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path
              clip-rule="evenodd"
              d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
              fill-rule="evenodd"
            ></path>
          </svg>
          <svg
            aria-label="Posts"
            className="_8-yf5"
            fill="#8e8e8e"
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
          </svg>
        </div>
      </div>
      <div className="gallery">
        {posts.map((post, index) => (
          <div className="gallery-item" key={index}>
            <img alt="gallery-post" src={post.image} />
            <div className="overlay">
              <div className="iconss">
                <Like
                  theme="filled"
                  size="24"
                  fill="#fff"
                  style={{ marginRight: "10px" }}
                />
                500
                <CommentOne
                  theme="filled"
                  size="24"
                  fill="#fff"
                  style={{ marginLeft: "10px" }}
                />
                500
              </div>
            </div>
            <span className="media-icon"></span>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProfilePage;
