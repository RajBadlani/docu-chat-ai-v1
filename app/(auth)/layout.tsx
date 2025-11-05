
const AuthLayout = ({ children} : {children : React.ReactNode}) => {
  return (
    <div className="bg-pattern h-screen max-w-screen" >{children}</div>
  )
}

export default AuthLayout