// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({children})=>{
//     const [user,setUser] = useState();
//     const [token ,setToken]= useState(localStorage.getItem.token || null);
//     const [loading,setLoading]=useState(true);


//     useEffect(()=>{
//         const savedUser =  localStorage.getItem("user");
//         const savedToken = localStorage.getItem("token");


//         if(savedUser && savedToken !== "undefined" && savedToken){
//             setUser(JSON.parse(savedUser));
//             setToken(savedToken);

//         }
//         setLoading(false)
//     },[]);
//     const login = (userData, userToken)=>{
//         localStorage.setItem("token",userData);
//         localStorage.setItem("user", JSON.stringify(userData))
//         setUser(userData);
//         setToken(userToken);
//     }

//     const logout = ()=>{
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         setUser(null);
//         setToken(null);
//         window.location.href = "/login"
//     };

//     return <AuthContext.Provider value={{user,setUser,token,setToken,login,logout,loading}}>{!loading && children}</AuthContext.Provider>

// }

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );


  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };


  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider value={{ user,setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};