import { Button } from '@/components/ui/button'
import { GetPlacePhoto } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function PlaceCardItem({ place }) {
    const [photo, setPhoto] = useState('/placeholder.jpg')
    useEffect(() => {
        place && fetchPlacePhoto();
    }, [place])
    const fetchPlacePhoto = async () => {
        try {
            const result = await GetPlacePhoto(place?.activity)
            const imgUrl = result.data.results?.[0]?.urls?.regular
            if (imgUrl) setPhoto(imgUrl)
        } catch (error) {
            console.error("Unsplash API error:", error)
        }
    }
    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=` + place.activity} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-2 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <img src={photo} className='h-[130px] w-[130px] rounded-xl object-cover' />
                <div className='mt-2'>
                    <h2 className='font-bold text-lg'>{place.activity}</h2>
                    <p className='text-sm text-gray-500'>{place.details}</p>
                    <h2 className='text-[12px]'>🕖 {place.estimated_duration}</h2>
                    <p className='text-[12px]'>{place.transport_tip}</p>
                    <div className='flex justify-end'>
                        <Button size="sm"><FaMapLocationDot /></Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem