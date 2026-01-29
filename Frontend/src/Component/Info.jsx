import React from 'react'
import { Link } from 'react-router-dom'


const Info = () => {
  return (
    <div className='w-full'>
        <div className='flex flex-col text-center w-[50%] ml-[25%] mt-10'>
              <h2><b>Download Video and Audio from YouTube</b></h2>
              <h2 className='text-gray-600'><Link to="/" className='text-blue-600'>Y2-Mate</Link> is a Popular free YouTube video Downloader that allows users to easily convert and download videos from YouTube, Facebook, TikTok, Instagram, Dailymotion, Youku, etc in High quality easily and safely. Y2mate offers various video and audio formats such as MP4, MP3, M4V FLV, AVI, 3GP, WEBM, WMV, etc. Also you can freely and easily save videos from YouTube videos in 360p, 720p, 1080p, and even 4K quality without installing software or applications. No registration required. Y2meta works seamlessly on all browsers and devices such your computer, mobile, Tablet, and other Device. It's a simple and Easy YouTube Downloader.</h2>
              <h2 className='text-gray-600 mt-4'>
                How to Download YouTube Video using Y2mate <br />
                1.Enter a keyword in the search box or paste the video link that you want to convert and download <br />
            2.Press the "Get Info" button and converting process start <br />
                3.Choose the Audio and Video would you like to download then click on the Download button.
              </h2>
        </div>

    </div>
  )
}

export default Info
