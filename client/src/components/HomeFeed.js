import { COLORS } from "../constants";
import styled from "styled-components"; 
import { useEffect, useState, useContext } from "react";
import { CircularProgress } from '@mui/material';
import Tweet from "./Tweet";
import { CurrentUserContext } from "./CurrentUserContext";
import LoadingState from "./LoadingState";
import ErrorGet from "./ErrorGet";
import ErrorPost from "./ErrorPost";

const HomeFeed = () => {

const [feedData, setFeedData] = useState(); 
const {currentUser, status, setStatus} = useContext(CurrentUserContext);  
const [reload, setReload] = useState(); 
const [meowData, setMeowData] = useState(""); 

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then(res => res.json())
      .then(data => setFeedData(data))
      .catch(() => {
        setStatus("error"); 
    })   
  }, [currentUser, reload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReload("loading"); 

    fetch("/api/tweet", {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
          },
      body: JSON.stringify({"status": meowData})
      })
          .then(res => res.json())
          .then((data) => {
              setMeowData(""); 
              setReload(data);
          })
          .catch((error) => {
              setStatus("postError")
              console.log(error); 
          })
  }

  const handleChange = (value) => {
    setMeowData(value); 
  
  }

    return ( 
      <>
        {
        status == "error"  
        ? <ErrorGet /> 
        : status == "postError"
        ? <ErrorPost /> 
        : (!feedData || !currentUser)
        ? <LoadingState /> 
        :  <div>
            <HomeDiv>
              <p className="home">Home</p>
              <div className="subWrapper">
                <img src={currentUser.profile.avatarSrc} /> 
                <form onSubmit={handleSubmit}>
                  <textarea placeholder="What's happening?" value={meowData} name="meow" rows="5" cols="70" onChange={e => handleChange(e.target.value)}></textarea>
                  <div className="charAndSubmit">
                    <p className={meowData.length > 280 ? "red" : meowData.length >= 225 ? "yellow" : ""}>{280 - meowData.length}</p>
                    <button disabled={meowData.length > 280} type="submit">{reload == "loading" ? <CircularProgress size="1em" /> : "Meow"}</button>
                  </div>
                </form>
              </div>
            </HomeDiv>
            <Wrapper>
            {feedData.tweetIds.map((tweet) => {
              return ( <Tweet feedData={feedData}
                              tweetData={feedData.tweetsById[tweet]}
                              setFeedData={setFeedData}
                              key={feedData.tweetsById[tweet]["id"]}
                      /> )
              })}
              </Wrapper>
          </div>
        }
      </>
    )
  };

const HomeDiv = styled.div`
border: solid lightgrey; 
border-top: none;
border-bottom: solid 10px lightgrey; 
display: flex; 
flex-direction: column; 

.home {
  font-size: 1.5em; 
  font-weight: bold; 
  margin: 20px 0 20px 10px; 
  padding-bottom: 10px; 
  border-bottom: solid lightgrey; 
}
.subWrapper {
  margin-left: 10px; 
  display: flex; 
  flex-direction: row; 
}

form {
  display: flex; 
  flex-direction: column; 
}

.yellow {
  color: #CCCC00; 
}

.red {
  color: red; 
}

.charAndSubmit {
  display: flex; 
  flex-direction: row; 
  margin-left: auto;
  align-items: center; 
  margin-bottom: 20px;  
  margin-top: 10px; 

  & button {
      background-color: ${COLORS.primary};
      color: white; 
      width: 100px; 
      height: 28px; 
      border-radius: 20px; 
      border: none; 
      margin-left: 20px; 
  }
  & button:disabled {
    opacity: 0.5; 
  }
}

width: 700px; 

img {
  height: 40px;
  width: 40px; 
  border-radius: 50px; 
}

textarea {
font-size: 1em; 
margin-left: 20px; 
resize: none; 
border: none; 
outline: none; 
}
`; 

const Wrapper = styled.div`
`; 


export default HomeFeed; 