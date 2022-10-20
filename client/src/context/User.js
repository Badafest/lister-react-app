import React, { useState, createContext, useEffect } from "react";

const UserContext = createContext({});

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    userData: { username: null, _id: null, token: null },
    setUserData: (newUserData) => {
      setUser({ ...user, userData: newUserData });
    },
  });

  useEffect(() => {
    localStorage &&
      localStorage.user &&
      user.setUserData(JSON.parse(localStorage.user));
  }, [user.userData.token]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };
