import { db } from '@/service/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCard from './components/UserTripCard'

export function MyTrip() {
  const navigate = useNavigate()
  const [userTrips, setUserTrips] = useState([])
  const didFetch = useRef(false)

  useEffect(() => {
    if (didFetch.current) return
    didFetch.current = true
    GetUserTrips()
  }, [])

  async function GetUserTrips() {
    const userJSON = localStorage.getItem('currentUser')
    if (!userJSON) {
      navigate('/')
      return
    }
    const user = JSON.parse(userJSON)
    const q = query(collection(db, "AiTrips"), where('userEmail','==', user.email))
    const snap = await getDocs(q)
    const trips = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    setUserTrips(trips)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-5'>
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 gap-5">
        {userTrips?.length>0?userTrips.map(trip => (
          <UserTripCard key={trip.id} trip={trip} />
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

            </div>
        ))
    }
      </div>
    </div>
  )
}
