import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


export default function Heart(props) {


    return(
        <div
            onClick={props.handleClick}
           
        >
            {props.fav && 
            <
                FontAwesomeIcon 
                    className="my-1 text-xl" 
                    icon={`fa-solid fa-heart`} 
                    style={{color: "#FDE68A",}}
            />}


            {props.fav === false && 
            <
                FontAwesomeIcon 
                    className="my-1 text-xl" 
                    icon={`fa-solid fa-heart`} 
                    style={{color: "#f0f0f0",}}
            />}
        </div>
        
    )
}