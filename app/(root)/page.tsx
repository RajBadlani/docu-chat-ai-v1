import { Button } from "@/components/ui/button";
import { CircleAlert, Rocket } from "lucide-react";
import Image from "next/image";
const HomePage = () => {
  return (
    <main className="w-full min-h-screen">
      <section className="flex flex-col gap-2 py-10 px-20 bg-red-200">
        <div className="bg-blue-50 w-60 py-2 px-2 flex items-center justify-center rounded-lg text-lg font-semibold">AI-Powered PDF Chatbot</div>
        <div className="flex justify-between items-center py-4 rounded-lg bg-pink-0">
          <div className="max-w-[50%]">
            <h1 className="font-bold text-5xl mb-2">
              Chat with your <br /> <span className="text-blue-400">PDFs</span>{" "}
              in seconds
            </h1>
            <p className="text-gray-600">
              Upload any PDF document and get instant answers through AI-powered
              conversations. No more scrolling through pages - just ask and get
              precise answers with source references.
            </p>
            <Button className="bg-blue-400 py-6 mt-5 text-lg text-white cursor-pointer"><span className="text-white"> <Rocket/> </span> Sign Up Free</Button>
          </div>
          <div className="max-w-[50%] p-4 border-2 border-red-900 rounded-lg">
            <Image alt="image.png" src='/image.png' width={400} height={35}/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
