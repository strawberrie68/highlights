import React from 'react'
import Heart from './Heart'

export default function QuoteCard(props) {


    return (
        <div className='QuoteCard-Container m-2 p-2 pb-5'
            onClick={props.selected}

        >
            <div className='flex justify-end'
            >
                <Heart className="text-xl" handleClick={props.toggle} fav={props.quote.fav} />

            </div>

            <p className='text-xs text-zinc-500 my-1'>{props.quote.quote}</p>

        </div>
    )

}