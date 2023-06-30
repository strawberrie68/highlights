import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPenToSquare, faBoxArchive } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


export default function NavBar(){
    return(
        <div className='navBar-container'>
            <div className='mb-3- mx-5 pt-5 text-3xl flex justify-between  pb-4'>
                <Link to='/'>
                    <div className='font-italiana'>Notes</div>
                </Link> 
                <div><FontAwesomeIcon className="text-xl text-zinc-500" icon={faBars} /></div>
            </div>

            <div className='flex m-1 justify-center '>
                <div className='flex text-sm text-zinc-500 bg-gray-100 py-2 px-4 rounded-lg mx-5'> 
                    <div className='text-zinc-500'><FontAwesomeIcon icon={faPenToSquare} /></div>
                    <p className='px-2 text-slate-400'>My Notes</p>
                </div>
                <div className='flex text-sm text-zinc-500 bg-gray-100 py-2 px-4 rounded-lg mx-5' >
                    <div><FontAwesomeIcon icon={faBoxArchive} /></div>
                    <p className='px-2 text-zinc-400'>Mind Map</p>
                </div>
            </div>
        </div>
    )
}