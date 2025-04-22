import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '../ui/dialog'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'



function Header() {
  const [openDialog, setOpenDialog] = useState(false)

  const user = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {
    console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

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
      window.location.reload();
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-2.5'>
      <a href="/"><img src='/logo.svg' /></a>
      <div>
        {user ?
          <div className='flex items-center gap-5'>
            <a href='/create-trip'><Button variant="outline" className="rounded-full">+ Create Trip</Button></a>
            <a href='/my-trips'><Button variant="outline" className="rounded-full">My Trips</Button></a>
            <Popover>
              <PopoverTrigger><img src={user?.picture} className='rounded-full h-[35px] w-[35px]' /></PopoverTrigger>
              <PopoverContent>
                <h2 className='font-semibold'>Email: <span className='font-thin'>{user?.email}</span></h2>
                <h2 className='font-semibold'>Name: <span className='font-thin'>{user?.name}</span></h2>
                <div onClick={() => { googleLogout(); localStorage.clear(); window.location.reload(); }} className='font-medium flex items-center gap-2 cursor-pointer'>
                  <span>Log Out </span><img src="/logout.png" className='h-5 w-5' />
                </div>
              </PopoverContent>

            </Popover>

          </div>
          :
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        }
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

export default Header