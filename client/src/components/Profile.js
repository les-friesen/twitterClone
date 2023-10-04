import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Tweet from "./Tweet";
import styled from "styled-components"; 
import * as FIcons from "react-icons/fi"; 
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "../constants";
import { format } from 'date-fns';
import { NavLink } from "react-router-dom";
import LoadingState from "./LoadingState";

const Profile = () => {

    const { currentUser } = useContext(CurrentUserContext); 
    const { profileId } = useParams(); 
    const [currentProfile, setCurrentProfile] = useState();
    const [feedData, setFeedData] = useState(); 

    useEffect(() => {
      fetch(`/api/${profileId}/profile`)
        .then(res => res.json())
        .then(data => setCurrentProfile(data));   
    }, [profileId]);

    useEffect(() => {
      fetch(`/api/${profileId}/feed`)
        .then(res => res.json())
        .then(data => setFeedData(data)); 
    }, [profileId]);

    return ( 
      <>
        {
        (!feedData || !currentProfile || !currentUser)
        ? <LoadingState /> 
        : <div>
            <ProfileWrapper>
              <img className="banner" src={currentProfile.profile.bannerSrc} alt="banner-image" /> 
              <img className="avatar" src={currentProfile.profile.avatarSrc} alt="avatar-image" /> 
              {profileId !== currentUser.profile.handle && <button className={currentProfile.profile.isBeingFollwedByYou? "following" : ""}> {currentProfile.profile.isBeingFollowedByYou ? "Following" : "Follow" }</button> }
              <p className="name"> {currentProfile.profile.displayName}</p>
              <p className="handle"> @{currentProfile.profile.handle} {currentProfile.profile.isFollowingYou && <span>Follows you</span>}</p>
              <p>{currentProfile.profile.bio} </p>
              <div>{currentProfile.profile.location && 
                  <p><FIcons.FiMapPin /> {currentProfile.profile.location} </p>}
                  <p><FIcons.FiCalendar /> Joined: {format (new Date(currentProfile.profile.joined), 'MMMM y')}</p>
              </div> 
              <p><strong>{currentProfile.profile.numFollowing}</strong> Following <strong>{currentProfile.profile.numFollowers}</strong> Followers </p>
            </ProfileWrapper>
            <NavBar>
                <NavigationLink>Tweets</NavigationLink>
                <NavigationLink to="/">Media</NavigationLink>
                <NavigationLink to="/">Likes</NavigationLink>
            </NavBar>
            <FeedWrapper>
              {feedData.tweetIds?.map((tweet) => {
                  return ( <Tweet feedData={feedData}
                                  tweetData={feedData.tweetsById[tweet]}
                                  setFeedData={setFeedData}
                                  key={feedData.tweetsById[tweet]["id"]}
                            /> )
              })}
            </FeedWrapper>
          </div>
        }
      </>
    )
  };

  const NavBar = styled.div`
  display: flex; 
  border: solid lightgrey; 
  border-bottom: none;
  border-top: none;  
  flex-direction: row; 
  justify-content: space-around;
  align-items: center; 
  height: 60px;  
  
  `; 

  const NavigationLink = styled(NavLink)`
  text-decoration: none; 
  width: 33%; 
  line-height: 60px; 
  color: black;
  
  text-align: center;  
  &.active {
    color: ${COLORS.primary};
    border-bottom: solid 3px ${COLORS.primary}; 
  }
`;

  const ProfileWrapper = styled.div`
  border: solid lightgrey; 
  border-top: none;
  border-bottom: none; 
  display: flex; 
  flex-direction: column; 
  max-width: 700px; 
  .banner {
    width: 699x;
    height: 200px; 
    object-fit: cover; 
  }
  .avatar {
    height: 100px; 
    width: 100px; 
    border-radius: 50px; 
    z-index: 1; 
    position: relative;
    top: -50px;  
    left: 50px; 
    border: solid 5px white; 
    margin-bottom: -40px; 
  }
  p {
    margin-bottom: 10px; 
    margin-left: 10px; 
  }
  .name {
    font-size: 1.25em; 
    font-weight: bold; 
  }
  .handle {
    font-size: 0.9em; 
  }
  div {
    display: flex;
    flex-direction: row; 
  }
  button {
    width: 100px; 
    margin-left: auto;
    margin-right: 10px; 
    background-color: ${COLORS.primary};
    color: white; 
    width: 100px; 
    height: 28px; 
    border-radius: 20px; 
    border: none;  
    &.following { 
    } 
  }

  span {
    background-color: lightgrey; 
    padding: 5px; 
    
  }
  `; 

  const FeedWrapper = styled.div`
  
  width: 700px; 
  `; 

export default Profile; 