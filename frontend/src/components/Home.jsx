import React from "react";
import styled from "styled-components";
import Posts from "./Posts/Posts";
import Navbar from "./Navbar/Navbar";
const Home = () => {
  const allPost = [
    {
      id: 1,
      name: "Vincent van Gogh",
      username: "vincey1853",
      location: "Zundert, Netherlands",
      avatar: "https://bit.ly/3shJrDh",
      post: "https://bit.ly/3TubxHq",
      comment: "just took a few mushrooms lol",
      likes: 21,
    },
    {
      id: 2,
      name: "Gustave Courbet",
      username: "gus1819",
      location: "Ornans, France",
      avatar: "https://bit.ly/3VKv4VH",
      post: "https://bit.ly/3DkW1rB",
      comment: "i'm feelin a bit stressed tbh",
      likes: 4,
    },
    {
      id: 3,
      name: "Joseph Ducreux",
      username: "jd1735",
      location: "Paris, France",
      avatar: "https://bit.ly/3CYdGUB",
      post: "https://bit.ly/3W2pTk6",
      comment:
        "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
      likes: 152,
    },
  ];
  return (
    <Container>
      {/* <Sidebar /> */}
      <Inner>
        <Main>
          <PostContainer>
            {allPost.map((post) => (
              <Posts
                userName={post.username}
                photoURL={post.avatar}
                caption={post.comment}
                imageURL={post.post}
                postID={post.id}
              />
            ))}
          </PostContainer>
        </Main>
      </Inner>
    </Container>
  );
};
const Container = styled.div``;

const Inner = styled.div`
  width: 100%;

  margin-top: 60px;
`;

const Main = styled.main`
  max-width: 935px;
  margin: 20px auto;
  height: 680px;
  display: flex;
  justify-content: space-evenly;
`;

const PostContainer = styled.div`
  max-width: 620px;
  width: 100%;
`;

export default Home;
