import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className ="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black ">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="text-lg py-6">{overview}</p>
        <div className="flex gap-4">
            <button className=" bg-white text-black p-4 px-12 text-xl rounded-lg font-bold cursor-pointer hover:bg-opacity-80"> ▶️ Play</button>
            <button className="mx-2 bg-gray-500 text-black p-4 px-12 text-xl rounded-lg font-bold bg-opacity-50 cursor-pointer hover:bg-opacity-80">More Info</button>
        </div> 
    </div>
  )
}

export default VideoTitle;