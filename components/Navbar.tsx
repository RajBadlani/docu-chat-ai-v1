import Link from "next/link";

const Navbar = () => {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "How it works", link: "#how-it-works" },
    { name: "Pricing", link: "#pricing" },
    { name: "Testimonials", link: "#testimonials" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4 bg-white border-b border-gray-100 shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        DocuChat
      </Link>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-5">
        <Link
          href="/sign-in"
          className="text-gray-600 hover:text-blue-600 font-semibold cursor-pointer transition"
        >
          Sign In
        </Link>
        <Link href="/sign-up">
          <button className="px-5 py-2 rounded-md bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
