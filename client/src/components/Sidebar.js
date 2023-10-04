import * as FIcons from "react-icons/fi"; 
import styled from "styled-components"; 
import { ReactComponent as CritterLogo } from '../assets/logo.svg';
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = () => {

const {currentUser} = useContext(CurrentUserContext); 

    return <>    
             <Wrapper>
                <CritterLogo style={{ height: 53, width: 36 }}/>
                <SubWrapper><FIcons.FiHome /> <NavigationLink to="/">Home</NavigationLink></SubWrapper>
                <SubWrapper><FIcons.FiUser /> <NavigationLink to={ currentUser ? `/${currentUser.profile.handle}` : "/"}>Profile</NavigationLink></SubWrapper>
                <SubWrapper><FIcons.FiBell /> <NavigationLink to="/notifications">Notifications</NavigationLink></SubWrapper>
                <SubWrapper><FIcons.FiBookmark /> <NavigationLink to="/bookmarks">Bookmarks</NavigationLink></SubWrapper>
                <SubWrapper><button>Meow</button></SubWrapper>

            </Wrapper> 
          </> 
  };

const Wrapper = styled.div`
padding-left: 40px; 
padding-top: 40px; 
width: 250px;
height: 100vh; 
display: flex; 
flex-direction: column;
margin-right: 10px; 
button {
  background-color: ${COLORS.primary};
  color: white; 
  width: 100px; 
  height: 28px; 
  border-radius: 20px; 
  border: none; 
}
`; 

const SubWrapper = styled.div`
margin-top: 15px;  
`

const NavigationLink = styled(NavLink)`
  text-decoration: none; 

  color: black; 

  &.active {
    color: ${COLORS.primary};
  }
`;

export default Sidebar; 