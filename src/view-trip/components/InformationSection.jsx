import { Button } from '@/components/ui/button'
import { GetPlacePhoto } from '@/service/GlobalApi'

import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'

function InformationSection({ trip }) {
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
        <div>
            <img src={photo} className='h-[340px] w-full object-cover rounded-xl' />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📆 {trip?.userSelection?.days} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>✨ {trip?.userSelection?.traveler} Traveler</h2>

                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    )
}

export default InformationSection