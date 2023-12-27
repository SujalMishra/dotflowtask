import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

function RedditData({keyword}) {
    const [posts, setPosts] = useState([]);
    const [showData, setShowData] = useState(false);
    const fetchData = async () => {
        console.log(keyword);
        try {
          const res = await axios.get(`https://www.reddit.com/r/all/search.json?q=${keyword}`,
           {
            params: {
            include_over_18: "false",
            limit: 15,
           }
           }
          );
        
        console.log(res.data.data.children);
        //   const data = await response.json();
          setPosts(res.data.data.children);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        setShowData(true);
    };
    
    return (
      <>
      {
        showData==false ? <button className="bg-black text-white px-4 py-2 ml-12 m-3 border-2 border-blue-500 rounded-md hover:bg-gray-600 focus:outline-none" onClick={fetchData}>Show Reddit Data ... </button> : 
      <div className='min-h-screen'>
        <button className="bg-black text-white px-4 py-2 ml-12 m-2 border-2 border-blue-500 rounded-md hover:bg-gray-600 focus:outline-none" onClick={()=>setShowData(false)}>Hide Reddit Data </button>
      <div className="flex  flex-wrap text-white justify-center">
        
        {posts.map((post, index) => (
          <div key={index} className="w-64 h-auto mx-4 bg-opacity-85 my-6 bg-black p-2 rounded-lg overflow-hidden shadow-md">
            <h2 className="text-xl  font-semibold">{post.data.title}</h2>
            <p className="text-white mt-2">Subreddit : r/{post.data.subreddit}</p>
            <a
              href={`https://www.reddit.com${post.data.permalink}`}
              className="text-blue-500 block mt-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>

        ))}
        </div>
        </div>
       }
</>
    );
}

export default RedditData
