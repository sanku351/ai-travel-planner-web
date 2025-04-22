import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import InformationSection from '../components/InformationSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {
    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    // Used to get information from firebase

    const GetTripData = async() => {
        const docRef = doc(db,"AiTrips",tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document:',docSnap.data())
            setTrip(docSnap.data())
            
        }else{
            console.log('No such document')
            toast.error('No trip found 😥')
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information section */}
        <InformationSection trip={trip}/>
        {/* Recommended Hotel */}
        <Hotels trip={trip}/>
        {/* Daily Plan */}
        <PlacesToVisit trip={trip}/>
        {/* Footer */}
        <Footer trip={trip} />
    </div>
  )
}

export default ViewTrip