import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places to visit</h2>
      <div>
        {trip?.tripData?.tripData?.daily_plan?.map((item, index) => (
          <div>
            <h2 className='font-medium text-lg mt-2'>Day {item.day}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
              {item.plan.map((place, index) => (
                <div className=''>
                  <h2 className='font-medium text-sm text-orange-500'>{place.time_of_day}</h2>
                  <PlaceCardItem place={place} />

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit