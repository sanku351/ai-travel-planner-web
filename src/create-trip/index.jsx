import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelecttravelesList, STRICT_AI_PROMPT } from '@/constants/options'
import { main } from '@/service/AIModal'
import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/FirebaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from 'react-router-dom'

function CreateTrip() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [formData, setFormData] = useState({
        destination: '',
        days: '',
        budget: '',
        traveler: ''
    })
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const value = e.target.value
        setQuery(value)

        if (value.length > 2) {
            const res = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: value,
                    format: 'json',
                    addressdetails: 1,
                    limit: 5,
                },
            })
            setSuggestions(res.data)
        } else {
            setSuggestions([])
        }
    }

    const handleClear = () => {
        setQuery('')
        setSuggestions([])
    }

    const handleSelect = (place) => {
        setQuery(place.display_name)
        setSuggestions([])
        handleFormDataChange('destination', place.display_name)
    }

    const handleFormDataChange = (field, value) => {
        const updatedData = { ...formData, [field]: value }
        setFormData(updatedData)
        console.log("Updated Form Data:", updatedData)

    }

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const handleGenerateTrip = async () => {

        const user = JSON.parse(localStorage.getItem('currentUser'))
        if (!user) {
            setOpenDialog(true)
            return;
        }
        const { destination, days, budget, traveler } = formData
        if (!destination || !days || !budget || !traveler) {
            toast.error('Please fill out all fields before generating the trip 🚫')
            return
        }
        const numDays = parseInt(days)
        if (isNaN(numDays) || numDays > 10) {
            toast.error('Number of days should be less than or equal to 10 ❌')
            return
        }
        setLoading(true);
        const FINAL_PROMPT = STRICT_AI_PROMPT
            .replace('{location}', formData?.destination)
            .replace('{totalDays}', formData?.days)
            // .replace('{totalDays}', formData?.days)
            // .replace('{totalNights}', formData?.days)
            .replace('{totalNights}', formData?.days)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
        console.log(FINAL_PROMPT)
        toast.info('Generating your travel plan…⏳');
        try {
            const result = await main(FINAL_PROMPT)
            console.log('Travel Plan:', result)
            toast.success('Trip generated successfully 🎉')
            setLoading(false)
            SaveAiTrip(result)
        } catch (error) {
            console.error('Error generating trip:', error)
            toast.error('Something went wrong generating the trip ❌')
        }
    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('currentUser'))
        const docId = Date.now().toString()
        await setDoc(doc(db, "AiTrips", docId), {
            userSelection: formData,
            tripData: TripData,
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId)
    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('currentUser', JSON.stringify(resp.data))
            setOpenDialog(false)
            handleGenerateTrip()
        })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <ToastContainer />
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className='mt-10 flex flex-col gap-2'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <div className='relative'>
                        <input
                            type="text"
                            value={query}
                            onChange={handleChange}
                            className='w-full p-2 border rounded'
                            placeholder="Enter a location"
                        />
                        {query && (
                            <button
                                onClick={handleClear}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                            >
                                ❌
                            </button>
                        )}
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="border rounded mt-2 bg-white shadow">
                            {suggestions.map((place) => (
                                <li
                                    key={place.place_id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelect(place)}
                                >
                                    {place.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input
                        placeholder={'Ex. 3 days'}
                        type='number'
                        onChange={(e) => handleFormDataChange('days', e.target.value)}
                    />
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title ? 'shadow-lg border-black' : ''}`}
                            onClick={() => handleFormDataChange('budget', item.title)}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with for your next adventure?</h2>
                <div className='grid grid-cols-4 gap-5 mt-5'>
                    {SelecttravelesList.map((item, index) => (
                        <div
                            key={index}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.traveler === item.title ? 'shadow-lg border-black' : ''}`}
                            onClick={() => handleFormDataChange('traveler', item.title)}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='my-10 justify-end flex'>
                <Button disabled={loading} onClick={handleGenerateTrip}>
                    {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}</Button>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-[50%] max-w-sm">
                    <div className="flex flex-col items-center justify-center text-center min-h-[200px]">
                        <img src="/logo.svg" className="w-20 h-20 mb-4" alt="logo" />
                        <h2 className="font-bold text-lg mt-2">Sign In with Google</h2>
                        <Button
                            onClick={login}
                            className="w-full mt-5 flex justify-center gap-3 items-center"
                        >
                            <FcGoogle className="w-6 h-6" />
                            Sign In with Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateTrip
