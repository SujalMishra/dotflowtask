import React from 'react'

function Landing() {
  return (
    <div className="flex justify-center items-center  ">
  <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
    
    <div className="bg-black bg-opacity-70 mt-10 rounded-lg overflow-hidden shadow-lg mr-10">
      <img src="https://www.cio.com/wp-content/uploads/2023/05/data_analytics_risk_assessment_tracking_trends_graphs_by_ipopba_gettyimages-1150397416_2400x1600-100828857-orig-7.jpg?quality=50&strip=all/400" alt="Placeholder Image" className="w-full h-72 object-cover" />
      <div className="p-4">
        <h2 className="text-xl text-white font-bold mb-2">Search and Filter</h2>
        <p className="text-white bg-opacity-50">Effortlessly search, filter, and access relevant information based on your specific criteria.</p>
      </div>
    </div>

   
    <div className="bg-black bg-opacity-70 mt-10 rounded-lg overflow-hidden shadow-lg ml-10">
      <img src="https://www.cio.com/wp-content/uploads/2023/05/statistics-stats-big-data-analytics-100613892-orig-4.jpg?quality=50&strip=all/400" alt="Placeholder Image" className="w-full h-72 object-cover" />
      <div className="p-4">
        <h2 className="text-xl text-white font-bold mb-2">Sort and Customize</h2>
        <p className="text-white"> Sort results, filter by relevance, date, source, and more to refine your data.</p>
      </div>
    </div>
  </div>
</div>

  )
}

export default Landing
