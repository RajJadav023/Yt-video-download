import React, { useState } from 'react'

const Box = () => {

    // for Yt douwnload nnpm.. npm install ytdl-core
//  used in backend node js library..

    const [Link, setLink] = useState("");
    const [title, settitle] = useState("");
    const [channel, setchannel] = useState("")
    const [loading, setLoading] = useState(false);
    const [thumbnail, setthumbnail] = useState("");
    const [duration, setduration] = useState("")

    function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

   async function displayContent(e){
        e.preventDefault();
            setLoading(true);
            settitle("");
            setchannel("");
         if(!Link){
            setLoading(false)
            return alert("Enter Yt link..")
        }

        try{
        // console.log("your link is : " + Link);
        const res=await fetch("https://yt-video-download-p63n.onrender.com/info" ,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({url : Link})
        });
        const data=await res.json();

        if(!res.ok){
            setLoading(false);
            setLink("");
            return alert(data.message || "Invalid Youtube link")
        }
                // console.log("title is:"+data.title + data.channel + data.duration);
         settitle(data.title);
         setchannel(data.channel);
         setduration(data.duration);
         setthumbnail(data.thumbnail);
         setLoading(false);


    } catch(e){
         setLoading(false);
        alert("Server error. Try again.");
    }
    //     window.location.href =
    // `http://localhost:3000/download?url=${encodeURIComponent(Link)}`;

    }


  return (
 <div className='flex justify-center'>

     <div className='min-h-14 py-4 w-170 mt-10 border-2 border-gray-300 bg-white flex justify-center flex-col rounded shadow-2xl shadow-gray-400'>
      <div>
        <h1 className='text-4xl text-gray-600 text-center'>Yt- Youtube Downloader</h1>
        <input className='outline-0 h-13 text-lg mt-5  w-100 border-4 ml-20 border-red-400' type="text" value={Link} onChange={((e)=>{
            setLink(e.target.value);
        })} placeholder='Search or paste link here...'/>
        <button onClick={displayContent} className='bg-red-400 text-white font-bold h-13 w-19 border-2 border-red-400'> 
            {loading ? "Fetching..." : "Get Info"}</button>
            <h3 className='ml-25 mt-2'>By using our service you are accepting our <span className='text-red-500'>Terms of Use.</span></h3>
      </div>

       {/* RESULT */}
        {title && (
  <div className="text-center mt-6 space-y-3">

    {/* Thumbnail */}
            <img
            src={thumbnail}
            alt="Video thumbnail"
            className="mx-auto rounded-lg w-80"
            />

            <p className="text-green-600 font-semibold">🎬 Title</p>
            <p className="text-black break-words">{title}</p>

            <p className="text-blue-600 font-semibold">📺 Channel</p>
            <p className="text-black">{channel}</p>

            <p className="text-purple-600 font-semibold">⏱ Duration</p>
            <p className="text-black">{formatTime(duration)}</p>

            <button
                    onClick={() => {
                        window.location.href =
                        `https://yt-video-download-p63n.onrender.com/download?url=${encodeURIComponent(Link)}`;
                    }}
                    className="hover:opacity-40 cursor-pointer mt-4 bg-green-500 text-white font-bold px-6 py-2 rounded"
                    >
                    Download Video+Audio
                 </button> <br />
                
                <button
                    onClick={() => {
                        window.location.href =
                        `https://yt-video-download-p63n.onrender.com/downloadVideo?url=${encodeURIComponent(Link)}`;
                    }}
                    className="hover:opacity-40 cursor-pointer mt-4 bg-green-500 text-white font-bold px-6 py-2 rounded"
                    >
                    Download Video only
                 </button> <br />

                 <button
                    onClick={() => {
                        window.location.href =
                        `https://yt-video-download-p63n.onrender.com/downloadSong?url=${encodeURIComponent(Link)}`;
                    }}
                    className="hover:opacity-40 cursor-pointer mt-4 bg-green-500 text-white font-bold px-6 py-2 rounded"
                    >
                    Download Audio only
                 </button>
          </div>
        )}
    </div>

    </div>
    
  )
}

export default Box
