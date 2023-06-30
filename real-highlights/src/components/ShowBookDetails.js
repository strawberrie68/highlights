import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import QuoteCard from './QuoteCard';
import BookProgress from './BookProgress';
import CreateQuoteCard from './CreateQuoteCard';
import CreateQuoteSideMenu from './CreateQuoteSideMenu';
import Tags from './Tags'
// import AnkiCard from './AnkiCard'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ShowBookDetails(props) {
  const [book, setBook] = useState({});
  const [quotes,setQuotes] = useState({})

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:6010/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setQuotes(res.data.quote)
      })
      .catch((err) => {
        console.log('Error from ShowBookDetails');
      });
  }, [id]);


  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:6010/books/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowBookDetails_deleteClick');
      });
  };


  const quoteList =
  quotes?.length === undefined
    ? 'there are no quotes'
    : quotes.map((quote,k) => 

        <QuoteCard 
              quote={quote} 
              key={quote._id} 
              toggle={()=>toggleHeart(quote._id)}
              selected={()=>toggleSelected(quote._id)}
              
        />)



function toggleHeart(id){
 
  const newQuote = quotes.filter((el)=> el._id === id).pop()
  const toggleRmb = ({...newQuote, wantToRmb: !newQuote.wantToRmb})
  updateQuote(id,toggleRmb)

};

function updateQuote(id, toggleRmb){
    axios
    .put(`http://localhost:6010/quotes/update/${id}`,toggleRmb)
    .then((res) => {
      console.log('updated Quote');
    })
    .catch((err) => {
      console.log('Error in UpdateQuoteInfo!');
    });
    setQuotes( prevQuotes => {
      return prevQuotes.map((quote) =>{
        return quote._id === id ? {...quote, wantToRmb: !quote.wantToRmb} : quote
      })
    })

}


function toggleProgress(){
  console.log(book.isFinishedReading)
  setBook(prevBookInfo =>({
    ...prevBookInfo, 
    isFinishedReading: !prevBookInfo.isFinishedReading

  }))
  UpdateBook(book)

}

function UpdateBook(updatedBookInfo){

  axios
  .put(`http://localhost:6010/books/update/${updatedBookInfo._id}`,updatedBookInfo)
  .then((res) => {
    console.log('updated Book successfully');
  })
  .catch((err) => {
    console.log('Error in UpdateBookInfo!');
  });

}
const [selectedQuote, setSelectedQuote] = useState(null)


function toggleSelected(id){
  setSelectedQuote(quotes.filter((quote)=>{
    return quote._id === id
}))


}






const [menu, setMenu] = useState(false)


function randomizer (){
  let usedIndex =[]

  let randomNumber = Math.floor(Math.random()*quotes.length)
  if(usedIndex.includes(randomNumber)){
    randomizer()
  }else{
    usedIndex = []
    usedIndex.push(randomNumber)
    toggleSelected(quotes[randomNumber]._id)
  }
}



  

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        
      
          <br />
          <div className='container-top flex  '>
                <div className='book-info-container-left rounded-xl'>
                    <img className="rounded-t-xl" src={book.bookImg} />
                    <div className='flex justify-between m-3 items-center'>
                            <div>
                                <p className=''>{book.title}</p>
                                <p className='text-zinc-300 text-left text-sm my-1'>{book.author}</p>
                            </div>
                            <div className='text-3xl'
                                  onClick={toggleProgress}
                            >
                               { book.isFinishedReading === false && <FontAwesomeIcon icon="fa-solid fa-inbox" style={{color: "#ababab",}} />}
                               { book.isFinishedReading && <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#f4d434",}} />}
                            </div>
                            
                    </div>
                
                </div>


                <div className='book-info-container-right flex justify-center '>
                      <div className='selected-quote flex justify-center align-middle items-center flex-col'>
                            {selectedQuote == null &&  <p cl>Click a quote for more info</p>}

                              {   selectedQuote !== null &&  
                                    <div className='flex flex-col p-5 text-center'>
                                          <p className='text-zinc-500 text-sm'>
                                                                        {selectedQuote[0].quote}</p>
                                          <p className='text-xs text-zinc-300 mt-3'>
                                                                        {selectedQuote[0].note}</p>
                                          <div className='text-xs flex mt-3 justify-center'>{selectedQuote[0].tag.split(',').map((tag, key) => <Tags tag={tag} key={key}/>)}</div>
                                      
                                    </div>
                              }
                      </div>
                      <BookProgress book={book.quote} randomizer={randomizer} />

                </div>
                

          </div>

          <div className='detail-container  px-4 py-3 rounded-xl'>
            <p className='text-xl text-zinc-500 my-1'>Details</p>
            <div className='flex my-1 text-sm'>
                 <p className='text-zinc-400'>Genre: </p>
                 <p className='text-zinc-300 mx-1'>{book.genre}</p>
            </div>
            <div className='flex flex-col text-sm'>
                  <p className='text-zinc-400'>Description: </p>
                  <p className='text-zinc-300'>{book.description}</p>
            </div>
            
            

          </div>
 
      </div>
      <div className='mx-5 my-4 '>
        <p className='text-2xl ml-4 font-italiana'>Quotes</p>
        <p className='text-sm ml-4 text-zinc-400'>All your book quotes</p>

        <div className='quotes-container grid grid-cols-3 my-2'>
            {quoteList}
            <div onClick={()=>setMenu(!menu)}>
               <CreateQuoteCard />
            </div>
             
            
            {menu && <CreateQuoteSideMenu handleClick={()=>setMenu(!menu)}/>}

        </div>
        
        
      </div>
    </div>
  );
}

export default ShowBookDetails;