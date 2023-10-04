import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Notifications from "./Notifications"; 
import Profile from "./Profile"; 
import TweetDetails from "./TweetDetails"; 
import Bookmarks from "./Bookmarks"; 
import HomeFeed from "./HomeFeed"; 
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";
import styled from "styled-components"; 
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";
import { CircularProgress } from "@mui/material";


const App = () => {

  const { status } = useContext(CurrentUserContext); 

  return (
    <BrowserRouter>
      <GlobalStyles /> 
        <Wrapper>
          <Sidebar />
            { status == "loading" 
              ? <CircularProgress />
              :
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/tweet/:tweetId" element={<TweetDetails />} />
              <Route path="/:profileId" element={<Profile />} />
            </Routes>
              }
        </Wrapper>
    </BrowserRouter>
  )
};

const Wrapper = styled.div`
display: flex; 
flex-direction: row; 


`; 

export default App;
