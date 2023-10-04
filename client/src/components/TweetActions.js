import * as FIcons from "react-icons/fi"; 
import styled from "styled-components";

const TweetActions = ({numLikes, numRetweets, setFeedData, isLiked, feedData, id, isRetweeted}) => {

    const Obj = {...feedData, "tweetsById" : {...feedData.tweetsById, [id] : {...feedData.tweetsById[id], "isLiked" : !isLiked, "numLikes" : isLiked ? numLikes - 1 : numLikes + 1}} }
    const Obj2 = {...feedData, "tweetsById" : {...feedData.tweetsById, [id] : {...feedData.tweetsById[id], "isRetweeted" : !isRetweeted, "numRetweets" : isRetweeted ? numRetweets - 1 : numRetweets + 1}}}

    const handleLike = () => {
        setFeedData(Obj); 

        fetch( `/api/tweet/${id}/like`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                },
            body: JSON.stringify({"like" : !isLiked})
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.log(error); 
                })
        } 

    const handleRetweet = () => {
        setFeedData(Obj2); 


    }
    
    
    return (
        <Wrapper>
            <div className="iconWrapper">
                <FIcons.FiMessageSquare />
            </div>
            <div className="iconWrapper" >
                <button onClick={handleRetweet} className={isRetweeted ? "isRetweeted" : ""} >
                <FIcons.FiRepeat pointerEvents="none"/> 
                </button>
                {numRetweets > 0 && <p>{numRetweets}</p>}
            </div>
            <div className="iconWrapper" >
                <button onClick={handleLike} >
                <FIcons.FiHeart pointerEvents="none" fill={isLiked ? "currentColor" : "none"} className={isLiked ? "isLiked" : ""} />
                </button>
                {numLikes > 0 && <p>{numLikes}</p>}
            </div>
            <div className="iconWrapper">
                
                <FIcons.FiDownload /> 
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.div`
margin-top: 20px; 
margin-bottom: 20px; 
display: flex; 
flex-direction: row; 

.iconWrapper {
    display: flex;
    flex-direction: row; 
    width: 25%; 

    p{
        margin-left: 10px; 
        margin-bottom: 0px; 
        font-size: 0.9em; 
    }

    .isLiked {
        color: red; 
    }

    .isRetweeted {
        color: blue; 
    }

    button {
        all: unset; 
        height: 16px; 
    }
}
`; 


export default TweetActions; 