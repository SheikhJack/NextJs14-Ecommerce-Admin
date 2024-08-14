import React from 'react'
import { SignIn } from '@clerk/nextjs'



function page() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <SignIn/>
    </div>
  )
}

export default page