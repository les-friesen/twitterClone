import { CircularProgress } from "@mui/material";
import styled from "styled-components"; 

const LoadingState = () => {

return (
        <ProgressDiv>
            <CircularProgress /> 
        </ProgressDiv>
)
}

const ProgressDiv = styled.div`
width: 100vw; 
display: flex; 
justify-content: center;
align-items: center; 
`; 


export default LoadingState; 