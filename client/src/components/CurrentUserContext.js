import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [status, setStatus] = useState("loading");
    
    useEffect(() => {
        fetch('/api/me/profile')
          .then(res => res.json())
          .then(data => setCurrentUser(data))
          .catch(() => {
            setStatus("error"); 
        });
          setStatus("idle"); 
      }, []);
  
    return (
      <CurrentUserContext.Provider value={{ currentUser, status, setStatus }}>
        {children}
      </CurrentUserContext.Provider>
    );
  };