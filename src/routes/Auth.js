import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";



const Auth = ()=>{
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const {email, password} = input;
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');//문자열로 할거니 공백!
  const auth = getAuth(); //초기화

  /* ⭐ 컴퓨티드 속성으로 적용 */
  const onChange = (e)=>{
    const {name, value} = e.target;

      setInput((prev)=>({
        ...prev,
        [name]: value
      }));
    }

  /*
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onChange = (e)=>{
    let {name, value} = e.target;
    name === 'email'? setEmail(value) : setPassword(value);
  }
  */

  const toggleAccount = ()=>{
    // 기존값의 반대!
    setNewAccount(prev=>!prev)
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    if(newAccount){
      //회원가입 (중복도 체크해줌)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
    }else{
      //로그인
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      })
    }
  }

  const onGoogleSignIn = ()=>{
    const provider = new GoogleAuthProvider(); //객체 생성

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(token, user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
  });
  }

  return(
    <>
      <h2>{newAccount? "Create Account" : "Login"}</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={input.email} 
            name="email" 
            placeholder="name@example.com" 
            onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={input.password} 
            onChange={onChange}/>
        </Form.Group>
        <Button type="submit" variant="primary">
          {newAccount? "Create Account" : "Login"}
        </Button>
      </Form>
      <div>{error}</div>
      <hr/>
      <Button variant="info" onClick={onGoogleSignIn}>
        {newAccount? "Create Account to Goolge" : "Login to Goolge"}
      </Button>
      <hr/>
      <Button type="submit" variant="secondary" onClick={toggleAccount}>
        {newAccount? "Go to Login" : "Go to Create Account"}
      </Button>
    </>
  )
}

export default Auth;