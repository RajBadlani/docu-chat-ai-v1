import Navbar from "@/components/Navbar"

const HomeLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="bg-pattern">
        <Navbar/>
        {children}
    </div>
  )
}

export default HomeLayout