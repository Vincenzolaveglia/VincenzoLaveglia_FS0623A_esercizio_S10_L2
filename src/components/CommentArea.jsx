import { useEffect, useState } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);

  const aggiornaCommenti = () => {
    getComments();
  };



  useEffect(() => {
    if (props.bookId !== undefined) {
      getComments();
    }
  }, [props.bookId]);



  const getComments = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/comments/${props.bookId}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlkNGM1MGU2Mjg4NjAwMTg4M2YzZjYiLCJpYXQiOjE3MDQ4MDc1MDQsImV4cCI6MTcwNjAxNzEwNH0.HqZWOaZLRQpzEkeA2xLQtlEzDeLdgCDoPPEJPnm11H4',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('errore nel recupero dei commenti');
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments);
        setComments(arrayOfComments);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };


  return (
    <div>
      <div>
        <CommentList reviews={comments} />
      </div>
      <div>
        <AddComment bookId={props.bookId} aggiornaCommenti={aggiornaCommenti} />
      </div>
    </div>
  )
}


export default CommentArea