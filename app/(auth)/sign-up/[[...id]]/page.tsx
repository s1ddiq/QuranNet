import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <section className='flex justify-center items-center h-screen'>
      <SignUp />
    </section>
  )
}

export default SignUpPage
