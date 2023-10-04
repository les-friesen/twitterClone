import styled from "styled-components";
import { Icon } from 'react-icons-kit'
import {u1F4A3} from 'react-icons-kit/noto_emoji_regular/u1F4A3'


const ErrorGet = () => {
    return (
            <Error>
              <Icon icon={u1F4A3} size={30} />
              <strong>An unknown error has occured.</strong>
              <p>Please try refreshing the page, or contact <a href="#">customer support</a> if the problem persists</p>
            </Error>
    )
}; 

const Error = styled.div`
display: flex;
flex-direction: column; 
justify-content: center; 
align-items: center; 
strong {
  font-size: 1.5em; 
  margin-top: 20px; 
  margin-bottom: 20px; 
}
p {
  font-size: 1em; 
}
`; 

export default ErrorGet; 