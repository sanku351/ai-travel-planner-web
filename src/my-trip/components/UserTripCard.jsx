import { GetPlacePhoto } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
    const [photo, setPhoto] = useState('/placeholder.jpg')
    useEffect(() => {
        trip && fetchPlacePhoto();
    }, [trip])
    const fetchPlacePhoto = async () => {
        try {
            const result = await GetPlacePhoto(trip?.userSelection?.destination)
            const imgUrl = result.data.results?.[0]?.urls?.regular
            if (imgUrl) setPhoto(imgUrl)
        } catch (error) {
            console.error("Unsplash API error:", error)
        }
    }
    return (
        <Link to={'/view-trip/'+trip?.id}>
            <div className='hover:scale-105 transition-all'>
                <img src={photo} className='object-cover rounded-xl h-[220px]' />
                <div>
                    <h2 className='font-bold text-lg'>
                        {trip?.userSelection?.destination}
                    </h2>
                    <h2 className='text-sm text-gray-500'>
                        {trip?.userSelection?.days} Days with {trip?.userSelection?.budget} Budget
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCard