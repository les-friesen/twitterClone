import styled from "styled-components"; 
import { format } from 'date-fns'; 
import * as FIcons from "react-icons/fi"; 
import TweetActions from "./TweetActions";
import { useNavigate } from "react-router-dom";

const Tweet = ({tweetData, setFeedData, feedData }) => {

    const navigate = useNavigate(); 

    const { id, timestamp, status, media, retweetFrom, author, isLiked, isRetweeted, numLikes, numRetweets} = tweetData; 

    const handleWrapperClick = (ev) => {
        ev.preventDefault(); 
        if (ev.target.nodeName !== "BUTTON") {
        navigate(`/tweet/${id}`)
        }
    }

    const handleProfileClick = () => {
        navigate(`/${author.handle}`)
    }

    return <Wrapper onClick={(ev) => handleWrapperClick(ev)} >
                <Column1>
                    {retweetFrom && <FIcons.FiRepeat className="icon" />}
                    <img src={author.avatarSrc} />
                </Column1>
                <Column2>
                    {retweetFrom && <p className="retweet"><span>{retweetFrom.displayName} Remeowed</span></p>}
                    <p><button onClick={handleProfileClick}>{author.displayName}</button> <span> @{author.handle} · {format (new Date(timestamp), 'MMM co')}</span> </p>
                    <p>{status}</p>
                    { media.length == 1 && <img src={media[0]["url"]} /> }
                    <TweetActions numLikes={numLikes} numRetweets={numRetweets} feedData={feedData} setFeedData={setFeedData} tweetData={tweetData} isLiked={isLiked} isRetweeted={isRetweeted} id={id}/>
                </Column2>
        </Wrapper>;
};

const Wrapper = styled.div`
width: 700px; 
border: solid;
border-color: lightgrey; 
display: flex;
flex-direction: row; 
margin-right: 20px; 
padding: 8px;

border-radius: 5px; 
`;

const Column1 = styled.div`

display: flex; 
flex-direction: column; 

.icon {
    margin: 5px 0 10px 25px; 
    height: 12px;
}

img {
    height: 40px; 
    border-radius: 50px; 
}
`; 

const Column2 = styled.div`
width: 100%; 
margin-left: 5px; 

span {
    font-size: 0.75em; 
}

button {
    all: unset; 
    font-weight: bold; 
    &:hover {
        cursor: pointer; 
    }
}

p { 
    margin-bottom: 10px; 
}

img {
    max-width: 600px;
    max-height: 400px; 
    border-radius: 10px; 
}
`; 

export default Tweet; 