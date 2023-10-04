import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TweetActions from "./TweetActions";
import { format } from 'date-fns'; 
import * as FIcons from "react-icons/fi"; 
import styled from "styled-components"; 
import { CurrentUserContext } from "./CurrentUserContext";
import ErrorGet from "./ErrorGet";
import LoadingState from "./LoadingState";


const TweetDetails = () => {

  const { tweetId } = useParams();
  const navigate = useNavigate(); 

  const [feedData, setFeedData] = useState(); 
  const {status, setStatus} = useContext(CurrentUserContext); 

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then(res => res.json())
      .then(data => setFeedData(data))
      .catch(() => {
        setStatus("error") })
  }, []);

const handleProfileClick = () => {
  navigate(`/${feedData.tweetsById[tweetId].author.handle}`)
}

return (
  <>
      {
      status == "error"
      ? <ErrorGet /> 
      : !feedData 
      ? <LoadingState /> 
      : <Wrapper >
            <div className="topBar">
              <StyledLink to="/"><FIcons.FiArrowLeft className="icon"/> <strong>Meow</strong></StyledLink>
            </div>
            {feedData.tweetsById[tweetId].retweetFrom && 
            <div className="retweetDiv">
              <FIcons.FiRepeat className="icon" />
              <p className="retweet"><span>{feedData.tweetsById[tweetId].retweetFrom.displayName} Remeowed</span></p>
            </div> }
          <AvatarRow>
            <img src={feedData.tweetsById[tweetId].author.avatarSrc} />
            <div className="tweeter"><button onClick={handleProfileClick}>{feedData.tweetsById[tweetId].author.displayName}</button> <span> @{feedData.tweetsById[tweetId].author.handle} </span></div>
          </AvatarRow>
          <Body>
              <p>{feedData.tweetsById[tweetId].status}</p>
              { feedData.tweetsById[tweetId].media.length == 1 && <img src={feedData.tweetsById[tweetId].media[0]["url"]} /> }
              <p className="time">{format (new Date(feedData.tweetsById[tweetId].timestamp), 'H:mm aa · MMM d y')} · Critter web app</p>
              <div className="actionsContainer">
                <TweetActions numLikes={feedData.tweetsById[tweetId].numLikes} numRetweets={feedData.tweetsById[tweetId].numRetweets} feedData={feedData} setFeedData={setFeedData} isLiked={feedData.tweetsById[tweetId].isLiked} isRetweeted={feedData.tweetsById[tweetId].isRetweeted} id={feedData.tweetsById[tweetId].id}/>
              </div>
          </Body>
        </Wrapper>
        }
  </>
)
};

const StyledLink = styled(Link)`
text-decoration: none; 
color: black; 
margin-bottom: 10px; 

.icon {
  height: 14px; 
}

strong {
  margin-left: 10px; 
}
`; 

const Wrapper = styled.div`
height: fit-content; 
min-width: 700px; 
max-width: 740px;  
border: solid;
border-color: lightgrey; 
display: flex;
flex-direction: column; 
margin-right: 20px; 
padding: 8px;
margin-top: 20px; 
margin-bottom: 20px; 
border-radius: 5px; 

.topBar {
  display: flex; 
  flex-direction: row; 
  border-bottom: solid; 
  border-color: lightgrey; 
}

.retweetDiv {
  margin-top: 10px; 
  margin-bottom: 10px; 
  display: flex;
  flex-direction: row; 
  align-items: center; 
  span {
    font-size: 0.75em; 

    }
  .icon {
    
    margin-right: 15px;  
    height: 10px;
    }
}
`;

const AvatarRow = styled.div`

display: flex; 
flex-direction: row; 
margin-bottom: 10px;
margin-top: 10px;  

.tweeter {
  margin-left: 20px; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  font-size: 0.85em; 
}

button {
  all: unset; 
  font-weight: bold; 
  &:hover {
      cursor: pointer; 
  }
  }

img {
height: 40px;
width: 40px; 
border-radius: 50px; 
}
`; 

const Body = styled.div`
margin-left: 5px; 

p { 
margin-bottom: 10px; 
font-size: 1.2em; 
}

.time {
  margin-top: 10px; 
  font-size: 0.9em; 
  padding-bottom: 10px; 
  border-bottom: solid;
  border-color: lightgrey; 
}

img {
max-width: 700px;
max-height: 400px; 
border-radius: 10px; 
}

.actionsContainer {
  margin-left: 15%;  
}

`; 


export default TweetDetails; 