import { GetPlacePhoto } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photo, setPhoto] = useState('/placeholder.jpg')
    useEffect(() => {
        hotel && fetchPlacePhoto();
    }, [hotel])
    const fetchPlacePhoto = async () => {
        try {
            const result = await GetPlacePhoto(hotel?.hotel_name)
            const imgUrl = result.data.results?.[0]?.urls?.regular
            if (imgUrl) setPhoto(imgUrl)
        } catch (error) {
            console.error("Unsplash API error:", error)
        }
    }
    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=` + hotel.hotel_name + "," + hotel?.address} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer'>
                <img src={photo} className='rounded-xl w-full h-[200px] object-cover' />
                <div className='my-2 flex flex-col'>
                    <h2 className='font-medium'>{hotel.hotel_name}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel.address}</h2>
                    <h2 className='text-sm'>💵 {hotel.price_per_night_approx}</h2>
                    <h2 className='text-sm'>⭐ {hotel.rating_approx}</h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem