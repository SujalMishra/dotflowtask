import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Landing from './Landing';
import RedditData from './RedditData';

const API_KEY = "147288a8becf4488a4a05fe63341b2d6"

function Searchbar({initialData}) {
  
    const [searchQuery, setSearchQuery] = useState('');
    const [newsApiData, setNewsApiData] = useState(initialData || []);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filterByDateRange = async () => {
        setLoading(true);
        try {
           const res = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=${startDate}&pageSize=10&to=${endDate}&sortBy=popularity&apiKey=${API_KEY}`)
           console.log(res.data.articles);
           setNewsApiData(res.data.articles);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    
    const sortByPublishedDate = async (e) =>{
        setLoading(true);
        let criteria = "publishedAt";

        if(e === 1){
            criteria = "publishedAt";
        }else if(e === 2){
            criteria = "relevancy";
        }else if(e === 3){
            criteria = "popularity";
        }

        try {
            const res = await axios.get(
                `https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=${criteria}&pageSize=10&apiKey=${API_KEY}`
              )
              console.log(res.data.articles);
              setNewsApiData(res.data.articles);
          } catch (error) {
            console.log(error);
          }
        setLoading(false);
    }

    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      console.log('Searched word:', searchQuery);
      try {
        const res = await axios.get(
            `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&apiKey=${API_KEY}`
          )
          console.log(res);
          setNewsApiData(res.data.articles);
      } catch (error) {
        console.log(error);
      }
    setLoading(false);
    // setSearchQuery('');
    };
  return (
    <>
    <div>
    <h1 className='text-3xl mr-96 ml-12 text-white font-bold'>Discover, Explore, and Access a World of Data</h1>
        <form onSubmit={handleSubmit} className="flex items-center mt-12  w-1/2">
        <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="border border-gray-400  bg-white text-white backdrop-blur-md bg-opacity-25 px-4 py-2 ml-12 mr-2 w-full rounded-md focus:outline-none focus:border-blue-500"
        />
      <button
        type="submit"
        className="bg-black text-white border-2 border-green-500 px-4 py-2 ml-1 m-2 rounded-md bg-opacity-80 hover:bg-gray-600 focus:outline-none"
      >
        Search
      </button>
    </form>
    
    </div>
    
    <div>
    
  {newsApiData.length === 0 || loading ? (
    <Landing/>
  ) : (
    <>
    <div>
    <div className='text-center mt-5 mb-5'>
    <button onClick={() =>{sortByPublishedDate(1)}} className="bg-black border-2 border-green-500 text-white px-4 py-2 ml-1 m-2 rounded-md hover:bg-gray-600 focus:outline-none">Sort by Published Date</button>
    <button onClick={() =>{sortByPublishedDate(2)}} className="bg-black border-2 border-green-500 text-white px-4 py-2 ml-1 m-2 rounded-md hover:bg-gray-600 focus:outline-none">Sort by relevancy</button>
    <button onClick={() =>{sortByPublishedDate(3)}} className="bg-black border-2 border-green-500 text-white px-4 py-2 ml-1 m-2 rounded-md hover:bg-gray-600 focus:outline-none">Sort by popularity</button>
    </div>
    
    
    <div className="ml-10 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
        />
        <span className="mx-2 text-white">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
        />
        <button onClick={filterByDateRange} className="bg-black border-2 border-green-500 text-white px-4 py-2 ml-2 m-2 rounded-md hover:bg-gray-600 focus:outline-none">
          Filter between Dates
        </button>
      </div>
    

    <div className="bg-black bg-opacity-80 rounded text-white p-4 mr-5 ml-5">
      {newsApiData.map((e, index) => {
        return (
          <div key={index} className="mb-8 border-b border-gray-700 pb-4 bg-opacity-70">
            <h1 className="text-2xl font-bold mb-2">{e.title}</h1>
            <p className="text-gray-400">{e.description}</p>
            <a href={e.url} className="text-blue-500 hover:underline block mb-2">URL</a>
          </div>
        );
      })}
    </div>
    </div>
  <div>
  {
    loading===true ? <></> :
     <RedditData keyword={searchQuery}/>
  }
  </div>
  </>
  )
  
  }
</div>
</>
  )
}

export async function getServerSideProps() {
  try {
    // Fetch initial data from the NewsAPI during server-side rendering
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=weather&pageSize=10&apiKey=${API_KEY}`
    );
    const initialData = res.data.articles || []; // Extract articles or initialize with an empty array

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      props: {
        initialData: [], // Set an empty array as initialData in case of an error
      },
    };
  }
}


export default Searchbar
