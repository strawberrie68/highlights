import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from "react"
import axios from 'axios';

export default function AnkiCard(props) {

    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:6010/quotes/')
            .then((res) => {
                setQuotes(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowBookList quotes');
            });

    }, [quotes]);


    // get quote to array and only show the first
    //might need to filter for want to rmb and when to show
    //how would i cycle the code if i dont use this
    const [index, setIndex] = useState(0)
    function nextQuote() {
        index >= quotes.length ? setIndex(0) : setIndex(prevIndex => prevIndex + 1)
    }


    let currentQuote =
        quotes.length === undefined ? 'no quotes' :
            quotes.sort((a, b) => a.updatedAt - b.updatedAt)[index]



    function checkPracticed(e) {

        console.log(e.currentTarget.id)
        if (currentQuote.daysPracticed < 10 && currentQuote.graduated === false) {
            setQuotes(prevQuote => {
                return prevQuote.map((quote) => {
                    return quote._id === currentQuote._id ?
                        { ...quote, daysPracticed: quote.daysPracticed + 1 } : quote
                })

            })
            matchQuote()
            nextQuote()


        } else if (currentQuote.graduated === false) {
            setQuotes(prevQuote => {
                return prevQuote.map((quote) => {
                    return quote._id === currentQuote._id ?
                        { ...quote, graduated: true } : quote
                })

            })
            matchQuote()
            nextQuote()
        } else {
            graduatedQuote(e.currentTarget.id)
        }

    }


    function graduatedQuote(id) {

        switch (id) {
            case "hard-btn": hardAnki(); break;
            case "again-btn": againAnki(); break;
            case "good-btn": goodAnki(); break;
            case "easy-btn": easyAnki(); break;

        }
    }
    let someDate = new Date();

    function hardAnki() {
        setQuotes(prevQuote => {
            return prevQuote.map((quote) => {
                return quote._id === currentQuote._id ?
                    {
                        ...quote,
                        currentInterval: quote.currentInterval * 1.2,
                        whenToShow: someDate.setDate(someDate.getDate() + (quote.currentInterval * 1.2)),
                        ease: quote.ease > 0 ? quote.ease - .15 : 0
                    } :
                    quote

            })
        })
        matchQuote()
        nextQuote()

    }

    function againAnki() {
        setQuotes(prevQuote => {
            return prevQuote.map((quote) => {
                return quote._id === currentQuote._id ?
                    {
                        ...quote,
                        currentInterval: quote.currentInterval > 0 ? quote.currentInterval * 0.5 : 0,
                        whenToShow: new Date(),
                        ease: quote.ease > 0 ? quote.ease - 0.2 : 0
                    } :
                    quote
                //make it pop back to array, but appear the end of list

            })
        })
        matchQuote()
        nextQuote()

    }

    function goodAnki() {
        setQuotes(prevQuote => {
            return prevQuote.map((quote) => {
                return quote._id === currentQuote._id ?
                    {
                        ...quote,
                        currentInterval: quote.currentInterval > 0 ? quote.currentInterval * quote.ease : 0,
                        whenToShow: someDate.setDate(someDate.getDate() + (quote.currentInterval * quote.ease)),
                    } :
                    quote

            })
        })
        matchQuote()
        nextQuote()

    }
    function easyAnki() {
        setQuotes(prevQuote => {
            return prevQuote.map((quote) => {
                return quote._id === currentQuote._id ?
                    {
                        ...quote,
                        currentInterval: quote.currentInterval > 0 ? quote.currentInterval * quote.ease * 1.3 : 0,
                        whenToShow: someDate.setDate(someDate.getDate() + quote.currentInterval * quote.ease * 1.3),
                        ease: quote.ease > 0 ? quote.ease + .15 : 0
                    } :
                    quote

            })
        })
        matchQuote()
        nextQuote()

    }
    function matchQuote() {
        const updatedInfo = quotes.filter((quote) => quote._id === currentQuote._id).pop()
        updateQuote(currentQuote._id, updatedInfo)

    }


    function updateQuote(id, updatedQuote) {
        console.log(id, updatedQuote)
        axios
            .put(`http://localhost:6010/quotes/update/${id}`, updatedQuote)
            .then((res) => {
                console.log('updated Quote');
            })
            .catch((err) => {
                console.log('Error in UpdateQuoteInfo!');
            });

    }



    return (
        <div>
            <div className='anki-container flex justify-center flex-col'>
                <div className='anki-current flex justify-center flex-col '>
                    <FontAwesomeIcon
                        icon="fa-solid fa-quote-left"
                        style={{ color: "#F2F2F2", }}
                        className='text-7xl'
                        id="quotationMark-left"
                    />
                    <p className='flex justify-center flex-col items-center text-zinc-300 p-4 text-center'>
                        {currentQuote === undefined && "no quotes"}
                        {currentQuote && currentQuote.quote}

                    </p>
                    <p className='flex justify-center items-center text-zinc-200 text-center px-12'>
                        {currentQuote && '- '}
                        {currentQuote && currentQuote.note}
                    </p>

                    <FontAwesomeIcon
                        icon="fa-solid fa-quote-left"
                        style={{ color: "#F2F2F2", }}
                        flip="horizontal"
                        className='text-4xl'
                        id="quotationMark-right"
                    />

                </div>

                <div className='anki-button-container flex align-middle items-center justify-between my-4 pb-4'>
                    <div
                        id="hard-btn"
                        className='anki-button text-sm'
                        onClick={(e) => checkPracticed(e)}
                    >
                        <p>Hard</p>
                    </div>

                    <div
                        id="again-btn"
                        className='anki-button text-sm'
                        onClick={(e) => checkPracticed(e)}
                    >
                        <p>Again</p>
                    </div>

                    <div
                        id="good-btn"
                        className='anki-button text-sm'
                        onClick={(e) => checkPracticed(e)}
                    >
                        <p>Good</p>
                    </div>

                    <div
                        id="easy-btn"
                        className='anki-button text-sm'
                        onClick={(e) => checkPracticed(e)}
                    >
                        <p>Easy</p>
                    </div>

                </div>

            </div>
        </div>
    )
}