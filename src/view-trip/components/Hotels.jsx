import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='text-xl mt-5 font-bold'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
            {trip?.tripData?.tripData?.hotel_options_cheap_budget?.map((hotel,index)=>(
                <HotelCardItem hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels