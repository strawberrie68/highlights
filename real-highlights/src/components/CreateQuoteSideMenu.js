import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateQuoteSideMenu(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quote, setQuote] = useState({
        quote: '',
        note: '',
        tag: '',
        fav: false
    });

    const onChange = (event) => {
        const { name, value, type, checked } = event.target
        setQuote(prevQuote => {
            return {
                ...prevQuote,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    const onSubmit = (event) => {
        event.preventDefault();


        axios
            .post(`${REACT_APP_SERVER_URL}/books/${id}`, quote)
            .then((res) => {
                setQuote({
                    quote: '',
                    note: '',
                    tag: '',
                    fav: false
                });

                navigate(`/show-book/${id}`);

            })
            .catch((err) => {
                console.log('Error in Create Quote!');
            });
    };




    const [showCreateQuoteMenu, setShowQuoteMenu] = useState(true)
    let menu


    if (showCreateQuoteMenu) {
        menu =
            <div className='createQuote-sideMenu fixed bg-white top-0 right-0 w-2/5 h-full z-50 shadow flex flex-col justify-center '>
                <div onClick={props.handleClick}>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" style={{ color: "#bababa", }} />
                </div>

                <p className='text-2xl text-zinc-300 font-italiana text-center '>Add Quote</p>
                <form noValidate onSubmit={onSubmit}>
                    <div>
                        <div className='flex text-xs ml-3  my-10 text-zinc-400'>
                            <p className='sideMenu-accent-text bg-slate-200 rounded-lg py-0.5 px-2'>Quote</p>
                            <p className='px-3'>Write a Quote to Remeber </p>
                        </div>
                        <textarea
                            name="quote"
                            value={quote.quote}
                            onChange={onChange}

                        />
                    </div>
                    <div>
                        <div className='flex text-xs my-4 ml-3 text-zinc-400'>
                            <p className='sideMenu-accent-text bg-slate-200 rounded-lg py-0.5 px-2'>Note</p>
                            <p className='px-3'>Write your thoughts or notes </p>
                        </div>
                        <textarea
                            name="note"
                            value={quote.note}
                            onChange={onChange}

                        />
                    </div>
                    <div className=''>
                        <p className='text-sm my-3 ml-3 text-zinc-400'>Tags</p>
                        <input
                            className="createQuote-sideMenu-input"
                            type="text"
                            name="tag"
                            value={quote.tag}
                            onChange={onChange}
                        />
                    </div>
                    <div className='isFav flex text-sm my-3 ml-3 text-zinc-400 my-4 align-middle items-center'>
                        <input
                            id="isFav"
                            type="checkbox"
                            name="fav"
                            checked={quote.fav}
                            onChange={onChange}

                        />
                        <label htmlFor="isFav" className='mx-3 ' >Do you want to remeber?</label>
                    </div>
                    <div className='flex justify-center '>
                        <input className="submit-button btn rounded-lg border-amber-300 my-3" type="submit" />
                    </div>
                </form>
            </div>


    }


    return (
        <div>

            {menu}

        </div>
    )
}