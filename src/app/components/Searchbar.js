import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Landing from './Landing';
import RedditData from './RedditData';

const API_KEY = "147288a8becf4488a4a05fe63341b2d6"

function Searchbar() {
  
    const [searchQuery, setSearchQuery] = useState('');
    const [newsApiData, setNewsApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filterByDateRange = async () => {
        setLoading(true);
        try {
          const res = await axios.post("https://newsapi-vmbg.onrender.com/newsdate",
          {
           searchQuery:searchQuery,
            startDate:startDate,
            endDate:endDate
          }
         )
          // console.log(res.data);
           setNewsApiData(res.data);
          
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
          const res = await axios.post("https://newsapi-vmbg.onrender.com/newscriteria",
          {
           searchQuery:searchQuery,
           criteria:criteria
          }
         )
              // console.log(res.data);
              setNewsApiData(res.data);
              
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
        const res = await axios.post("https://newsapi-vmbg.onrender.com/news",
         {
          searchQuery:searchQuery,
        }
        )
          // console.log(res);
          setNewsApiData(res.data);

      } catch (error) {
        console.log(error);
      }
    setLoading(false);
    setSearchQuery('');
    };
    useEffect(() => {
      if (newsApiData.length > 0) {
        window.scrollBy(0, window.innerHeight);
        console.log("sf");
      }
    }, [newsApiData]);
  return (
    <>
    <div className="flex flex-col items-center font-serif justify-center minh text-white">
  <h1 className="text-4xl text-center mb-8 mr-24 font-bold">
    Discover, Explore, and Access a World of Data
  </h1>
  <form
    onSubmit={handleSubmit}
    className="flex items-center border w-3/5 border-white bg-white  backdrop-blur-md px-4 py-2"
  >
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleInputChange}
      className="border-none bg-transparent text-black flex-1 focus:outline-none"
    />
    <button
      type="submit"
      className="bg-black text-white border-2 rounded border-blue-500 px-4 py-2 ml-4  hover:bg-gray-600 focus:outline-none"
    >
      Search
    </button>
  </form>
  <div className="mt-5 text-2xl font-bold">
  <h3 className='mr-64'>Get latest news and information about everything here .</h3>
  </div>  
</div>


    <div>
    
  {newsApiData.length === 0 || loading ? (
    // <Landing />
    ""
  ) : (
    <>
    <div className='min-h-screen p-2 font-serif'>
    <div className='text-center mt-5 mb-5'>
    <button onClick={() =>{sortByPublishedDate(1)}} className="bg-black border-2 border-blue-500 text-white px-4 py-2 ml-1 m-2 rounded-md hover:bg-gray-600 focus:outline-none">Sort by Published Date</button>
    <button onClick={() =>{sortByPublishedDate(2)}} className="bg-black border-2 border-blue-500 text-white px-4 py-2 ml-1 m-2 rounded-md hover:bg-gray-600 focus:outline-none">Sort by relevancy</button>
    <button onClick={() =>{sortByPublishedDate(3)}} className="bg-black border-2 border-blue-500 text-white px-4 py-2 ml-1 m-2 rounded-md hover:bg-gray-600 focus:outline-none">Sort by popularity</button>
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
        <button onClick={filterByDateRange} className="bg-black border-2 border-blue-500 text-white px-4 py-2 ml-2 m-2 rounded-md hover:bg-gray-600 focus:outline-none">
          Filter between Dates
        </button>
      </div>
    

    <div className="bg-black bg-opacity-85 rounded text-white p-4 mr-5 ml-5">
      {newsApiData.map((e, index) => {
        return (
          <div key={index} className="mb-8 border-b border-gray-700 pb-4 hover:-translate-y-1 transition duration-300 ease-in-out bg-opacity-70">
            <h1 className="text-2xl font-bold mb-2">{e.title}</h1>
            <p className="text-gray-400">{e.description}</p>
            <a href={e.url} className="text-blue-500 hover:underline block mb-2" target="_blank"
              rel="noopener noreferrer">URL</a>
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



export default Searchbar
