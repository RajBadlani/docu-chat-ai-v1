"use client"

import { MessageCircleHeart } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { SignInWithEmail } from "@/app/actions/AuthEmailAction"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SignInForm = () => {
  const router = useRouter()
  const [pending , setPending] = useState(false)

  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const { success , message} = await SignInWithEmail(formData)
    if( !success){
      toast.error(message)
      setPending(false)
    }else{
      toast.success(message)
      router.push("/dashboard")
    }
  }
  return (
        <main className=" flex flex-col items-center justify-center min-h-screen min-w-screen">
      <section className=" flex flex-col items-center justify-center bg-white rounded-xl shadow-lg px-10 py-8 space-y-8">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-4">
            <MessageCircleHeart
              className="text-blue-600"
              width={28}
              height={28}
            />
            <p className="font-bold text-2xl text-gray-900">DocuChat AI</p>
          </div>
          <p className=" text-gray-700 text-md">
            {" "}
            Welcome back! Please sign in to your account
          </p>
        </div>

         <form className="flex flex-col gap-5 w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <Input id="email" name="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
               name="password"
            />
          </div>
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            { pending && <Spinner/>}
            Sign In
          </Button>
        </form>
        <div className="flex items-center justify-center   gap-2">
          <div className="border border-gray-300 w-15 sm:w-20"></div>
          <span className="text-gray-500 ">Or continue with</span>
          <div className="border border-gray-300 w-15 sm:w-20"></div>
        </div>
        <div className="flex flex-col gap-5 w-full max-w-sm">
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              
              className="w-full bg-white text-gray-800 border border-gray-300 font-medium py-4 rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
            <Image
              src={"/google.png"}
              alt="Google-icon"
              height={20}
              width={20}
            />
              Continue with Google
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              className="w-full bg-white text-gray-800 border border-gray-300 font-medium py-4 rounded-md hover:bg-gray-200 transition cursor-pointer"
              
            >
            <Image
              src={"/github.png"}
              alt="Google-icon"
              height={20}
              width={20}
            />
              Continue with Github
            </Button>
          </div>

        </div>

        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-600">Don&apos;t have an account ?</p>
          <Link href={"/sign-up"} className="text-blue-700 font-medium">
            {" "}
            Sign Up
          </Link>
        </div>
      </section>
    </main>
  )
}

export default SignInForm