"use server"
import SignUpForm from "@/components/SignUpForm"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const SignUp = async() => {
    const session = await auth.api.getSession({
    headers : await headers()
  })
  if(session){
    redirect('/upload')
  }
  return (
    <SignUpForm/>
  )
}

export default SignUp