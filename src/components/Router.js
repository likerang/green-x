import { Routes, Route } from "react-router";
import Home from "../routes/Home"
import Auth from "../routes/Auth";
import Menu from "./Nav";
import Profile from "../routes/Profile";

const Router = ({isLoggedIn, userObj})=>{
  return(
    //주소 표시줄에 따라 어떤 컴포넌트를 실행할지
    <>
    { isLoggedIn && <Menu />}
    <Routes>
      {isLoggedIn? 
        <>
          <Route path="/" element={<Home userObj={userObj}/>} /> 
          <Route path="/profile" element={<Profile />} /> 
        </>
        : 
        <Route path="/" element={<Auth />} />
      }
    </Routes>
    </>
  )
}

export default Router;