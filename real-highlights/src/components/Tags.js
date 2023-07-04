import React from 'react'

export default function Tags(props) {
    return (
        <div >
            <div className='tag-style bg-slate-100 rounded-lg text-xs p-1 text-zinc-300 m-0.5'>{`#${props.tag.trim().toLowerCase()}`}</div>
        </div>
    )
}