import Link from "next/link";

const Navbar = () => {
  const navConstant = ["Features", "How it works", "Pricing", "Contact"];
  return (
    <nav className="flex items-center justify-between px-6 sm:px-12 py-4 bg-white shadow-md">
      <h1 className="text-xl font-semibold">DocuChat</h1>
      <ul className="sm:flex items-center justify-center sm:gap-3 lg:gap-6 hidden ">
        {navConstant.map((item, index) => (
          <li
            key={index}
            className="text-gray-600 hover:text-gray-900 cursor-pointer transition"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className=" flex items-center justify-center  space-x-5 text-gray-600">
        <Link href={"/sign-in"}>
          <p className="text-gray-600 hover:text-black transition font-semibold cursor-pointer">
            Signin
          </p>
        </Link>
        <Link href={"/sign-up"}>
          <button className="px-5 py-2 rounded-md bg-indigo-500 texccct-white font-semibold hover:bg-indigo-600 text-white transition cursor-pointer">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
