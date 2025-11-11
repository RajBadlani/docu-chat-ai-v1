"use server"
import SignInForm from '@/components/SignInForm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const SignIn = async() => {
    const session = await auth.api.getSession({
    headers : await headers()
  })

  if(session){
    redirect('/dashboard')
  }
  return (
    <SignInForm/>
  )
}

export default SignIn