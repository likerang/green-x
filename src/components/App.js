import Router from './Router';
import { useState } from "react";
import { authService } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";


console.log(authService);

function App() {

  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); //회원정보, 로그인정보 확인 여부를 확인하기 위한 변수
  const [userObj, setUserObj] = useState(null); //회원정보

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //유저 정보가 있으면
      //const uid = user.uid;
      setIsLoggedIn(true);
      setUserObj(user.uid);
    } else {
      //유저 정보가 없으면
      setIsLoggedIn(false);
    }
    setInit(true);
  });
  

  return (
    <div className="container">
      <h1>Green - X</h1>
      {
        init? 
        <Router isLoggedIn={isLoggedIn} userObj={userObj}/>
        :
        "초기화중 . . ." 
      }
      <hr/>
      <p>copyright likerang All rights reserved.</p>
    </div>
  );
}

export default App;
