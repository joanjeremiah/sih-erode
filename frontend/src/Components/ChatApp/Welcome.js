import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
import fetchUserData from "../../utils/fetchUserData";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function fetchData() {
        const res = await fetchUserData()
        setUserName(res.data.username)
    }
    fetchData();
  }, []);
 
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;