import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, onSnapshot, query, orderBy, limit } from "firebase/firestore"; 
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem } from 'react-bootstrap';
import Comment from '../components/Comment';

const Home = ({userObj})=>{
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  
  const getComments = async ()=>{
  const q = query(collection(db, "comments"), orderBy('date', "desc"), limit(10));
  onSnapshot(q, (querySnapshot) => {      
    const  commentsArray = querySnapshot.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id
    }));
    setComments(commentsArray);
  });

  /*
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
  */
  }

  useEffect(()=>{
    getComments();
    console.log(comment);
  },[]);

  const onChange = (e)=>{
    //입력한 내용을 comment에 반영한다.
    setComment(e.target.value);
  }

  const onSubmit = async (e)=>{ //비동기적으로 작동하려면 async & await가 있어야함
    //기본기능을 막고, comment 콘솔에서 확인
    e.preventDefault();

    
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "comments"), {
      comment: comment,
      date: serverTimestamp(),
      uid: userObj
    });
    setComment('');
    console.log("새 글의 아이디: ", docRef.id);
  }
  return(
    <>
    <h2>Home</h2>

    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="Comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" value={comment} onChange={onChange} rows={3} />
      </Form.Group>
      <Button type="submit" variant="primary">OK</Button>
    </Form>
    <hr/>
    <ListGroup>
      {
        comments.map(c=>
          <Comment key={c.id} commentObj={c} isOwner={c.uid === userObj}></Comment>
        )
      }
    </ListGroup>
    </>
  )
}

export default Home;