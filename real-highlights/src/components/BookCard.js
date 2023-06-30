import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = (props) => {
  const book = props.book;

  return (
    <div className='card-container'>
     
      
       
          <Link to={`/show-book/${book._id}`}>
            <img
                src={book.bookImg}
                alt='Books'
                height={200}
            />

            <div className='desc'>
                <h2 className='text-zinc-400'>  {book.title}</h2>
                <p className='text-zinc-300 mt-1 text-sm'>{book.author}</p>
            
            </div>
          </Link>
      
      
    </div>
  );
};

export default BookCard;