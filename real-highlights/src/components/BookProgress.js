import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'



export default function BookProgress(props) {


   let wantToRmb = 0;
   let numberQuote = 0;
    if(props.book) {
        wantToRmb = props.book?.length == [] ? 0 : 
                    props.book.map((quote)=> 
                        quote.wantToRmb === true ? 1: 0).reduce((acc,c)=>acc + c)
                
    
        numberQuote = 
                    props.book?.length === 0 ? 0 :
                    props.book.length
    }



  

    return(
        <div>

            <div className='book-progress-container flex justify-center m1-6 mt-4'> 
                
                
                <div className='flex align-middle items-center ml-3'>
                    <p className='text-2xl text-zinc-300'>{wantToRmb}</p>
                    <div className='flex flex-col  ml-2 text-xs'>
                        <FontAwesomeIcon icon="fa-solid fa-heart" style={{color: "#e0e0e0",}} />
                        <p className='text-zinc-300 '>Fav</p>
                    </div>
                </div>

                <div className='flex align-middle items-center ml-5'>
                    <p className='text-2xl text-zinc-300'>{numberQuote}</p>
                    <div className='flex flex-col  text-xs ml-2'>
                            <FontAwesomeIcon icon="fa-solid fa-list" style={{color: "#e0e0e0",}} />
                        <p className='text-zinc-300 '>Total</p>
                    </div>
                </div>

                <div className='flex align-middle items-center ml-4'>
                    <div className='flex flex-col '
                         onClick={props.randomizer}
                        
                    >
                        <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" style={{color: "#dedede",}} />
                        <p className='text-zinc-300 ml-2 text-xs'>Randomizer</p>
                    </div>
                </div>
                
                
                
            </div>
        </div>
    )
}