import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from 'react';


const Comment = ({commentObj, isOwner})=>{
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(commentObj.comment);

  console.log(commentObj);
  const deleteComment = async ()=>{
    const deleteConfirm = window.confirm('정말 삭제할까요?');
    if(deleteConfirm){
      await deleteDoc(doc(db, "comments", commentObj.id));
    }
  }

  const toggleEditMode = ()=>{
    setEdit(prev=>!prev);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    const commentRef = doc(db, "comments", commentObj.id);

    await updateDoc(commentRef, {
      comment: comment
    });

    setEdit(false);
  }

  const onChange = (e)=>{
    //입력한 내용을 comment에 반영한다.
    setComment(e.target.value);
  }

  return(
    <ListGroup.Item>
      <div className='d-flex justify-content-between align-items-center'>
        {
          edit?
          <Form className='w-100' onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="Comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" value={comment} onChange={onChange} rows={3} />
            </Form.Group>
            <div className='d-flex gap-1'>
            <Button type="submit" variant="outline-primary"  size="sm">OK</Button>
            <Button variant="outline-danger" size="sm" onClick={toggleEditMode}>Cancle</Button>
            </div>
          </Form>
          :
          <>
          {commentObj.comment}
          {
            isOwner && <div className='d-flex gap-1'>
              <Button variant="outline-secondary" size="sm" onClick={toggleEditMode}>Edit</Button>
              <Button variant="outline-danger" size="sm" onClick={deleteComment}>Delete</Button>
          </div>
          }
          </>
        }

      </div>
    </ListGroup.Item>
  )
}

export default Comment;