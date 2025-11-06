import { Button } from "@/components/ui/button";
import {
  BookOpen,
  MessageCircle,
  Rocket,
  Upload,
  Database,
  MessageSquare,
  CheckCircle,
  Lock,
  Star,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const featuresData = [
    {
      id: 1,
      icon: <Upload className="w-8 h-8 text-blue-500" />,
      title: "Upload PDFs",
      content:
        "Simply drag and drop your PDF files or click to upload. Support for multiple documents with automatic text extraction and indexing for instant searchability.",
    },
    {
      id: 2,
      icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
      title: "Get Instant Answers",
      content:
        "Ask questions in natural language and receive accurate, contextual answers powered by advanced AI. No more manual searching through lengthy documents.",
    },
    {
      id: 3,
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "See Sources & Pages",
      content:
        "Every answer comes with precise source references including page numbers and sections, so you can verify information and dive deeper when needed.",
    },
  ];

  const worksData = [
    {
      id: 1,
      icon: <Upload className="w-8 h-8 text-blue-500" />,
      title: "Upload",
      content:
        "Easily upload your PDF files through our secure, drag-and-drop interface. We support multiple formats and process them instantly.",
    },
    {
      id: 2,
      icon: <Database className="w-8 h-8 text-blue-500" />,
      title: "Index",
      content:
        "Our AI automatically extracts text, analyzes content, and indexes your documents for fast, intelligent search and retrieval.",
    },
    {
      id: 3,
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      title: "Chat",
      content:
        "Engage with your documents using natural language. Ask questions and receive accurate answers, complete with source references.",
    },
  ];

  const pricingData = [
    {
      id: 1,
      name: "Free",
      price: "$0",
      period: "Forever Free",
      description:
        "Perfect for individuals and small projects. Enjoy all core features at no cost.",
      features: [
        "Upload up to 3 PDFs",
        "Max file size: 25 MB",
        "AI chat responses with sources",
        "Real-time document analysis",
        "Secure file handling",
      ],
      buttonText: "Get Started",
      isComingSoon: false,
    },
    {
      id: 2,
      name: "Pro",
      price: "$5",
      period: "per month",
      description:
        "Designed for professionals and teams who need unlimited access and advanced tools.",
      features: [
        "Unlimited PDF uploads",
        "Larger file support (coming soon)",
        "Priority AI response speed",
        "Document insights dashboard",
        "Team collaboration tools",
      ],
      buttonText: "Coming Soon",
      isComingSoon: true,
    },
  ];

  const testimonialsData = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      rating: 5,
      stars: Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
        />
      )),
      review:
        "Incredible — the AI finds exactly what I need inside long PDFs. Source references are a lifesaver for my research.",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Researcher",
      rating: 4,
      stars: Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
        />
      )),
      review:
        "Fast and accurate. I love that the answers include page numbers makes verification super easy.",
    },
    {
      id: 3,
      name: "Michael Lee",
      role: "Developer",
      rating: 5,
      stars: Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
        />
      )),
      review:
        "Great tool for onboarding documentation. The chat helps new team members find info without asking around.",
    },
  ];
  return (
    <main className="w-full min-h-screen">
      {/* hero section */}
      <section className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 py-16 px-6 md:px-20 ">
        <div className="flex flex-col items-start text-center md:text-left md:w-1/2">
          <div className="bg-blue-200 text-blue-800 py-2 px-4 rounded-full text-sm font-semibold mb-4">
            AI-Powered PDF Chatbot
          </div>
          <h1 className="font-extrabold text-4xl md:text-5xl mb-4 leading-tight text-gray-900">
            Chat with your <br />
            <span className="text-blue-500">PDFs</span> in seconds
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Upload any PDF document and get instant answers through AI powered
            conversations. No more scrolling through pages just ask and get
            precise, contextual answers with source references.
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 transition-all cursor-pointer duration-300 py-6 px-6 text-lg text-white flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Sign Up Free
          </Button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:w-1/2">
          <div className="rounded-xl shadow-md bg-white p-4">
            <Image
              alt="Hero Illustration"
              src="/image.png"
              width={400}
              height={300}
              className="rounded-md object-contain"
            />
          </div>
        </div>
      </section>

      {/* features section  */}
      <section
        className="flex flex-col items-center py-16 px-6 md:px-20 "
        id="features"
      >
        <h2 className="font-extrabold text-4xl text-gray-900 text-center">
          Powerful Features
        </h2>
        <p className="text-lg text-gray-700 mt-3 max-w-2xl text-center">
          Everything you need to unlock the full potential of your PDF
          documents.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
          {featuresData.map((ele) => (
            <div
              key={ele.id}
              className="flex flex-col items-start bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border border-gray-100 hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-blue-100">
                {ele.icon}
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-3">
                {ele.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{ele.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section
        className="flex flex-col items-center py-16 px-6 md:px-20 "
        id="how-it-works"
      >
        <h2 className="font-extrabold text-4xl text-gray-900 text-center">
          How It Works
        </h2>
        <p className="text-lg text-gray-700 mt-3 max-w-2xl text-center">
          Get started in three simple steps and unlock the power of AI-driven
          document analysis
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
          {worksData.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-5">
                {step.icon}
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600  leading-relaxed">{step.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pricing */}
      <section
        className="flex flex-col items-center py-20 px-6 md:px-20 "
        id="pricing"
      >
        <h2 className="font-extrabold text-4xl text-gray-900 text-center">
          Pricing
        </h2>
        <p className="text-lg text-gray-700 mt-3 max-w-2xl text-center">
          Start free and scale when you’re ready.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-5xl">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col items-center text-center rounded-xl border p-8 transition-all duration-200 bg-white hover:shadow-lg ${
                plan.isComingSoon ? "border-gray-200" : "border-blue-200"
              }`}
            >
              <h3 className="text-2xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-gray-600 mt-2">{plan.description}</p>

              <div className="mt-6 text-4xl font-bold text-blue-500">
                {plan.price}
              </div>
              <p className="text-gray-500 text-sm">{plan.period}</p>

              <ul className="mt-8 text-gray-700 text-sm space-y-3 text-left w-full max-w-xs">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {plan.isComingSoon ? (
                      <Lock className="w-4 h-4 text-gray-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.isComingSoon}
                className={`mt-10 w-full md:w-3/4 py-3 rounded-md cursor-pointer font-medium ${
                  plan.isComingSoon
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* testimonials */}
      <section
        className="flex flex-col items-center py-16 px-6 md:px-20"
        id="testimonials"
      >
        <h2 className="font-extrabold text-4xl text-gray-900 text-center">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-700 mt-3 max-w-2xl text-center">
          Trusted by professionals, researchers, and teams who rely on accurate,
          AI-powered document insights
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex mb-4">{testimonial.stars}</div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                “{testimonial.review}”
              </p>
              <h3 className="font-semibold text-lg text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">DocuChat AI</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Chat with your documents effortlessly. Upload PDFs, ask questions,
              and get instant answers powered by advanced AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-blue-400 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-blue-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-blue-400 transition-colors"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <p className="hover:text-blue-400 cursor-pointer transition-colors">
                  Documentation
                </p>
              </li>
              <li>
                <p className="hover:text-blue-400 cursor-pointer transition-colors">
                  API Reference
                </p>
              </li>
              <li>
                <p className="hover:text-blue-400 cursor-pointer transition-colors">
                  Privacy Policy
                </p>
              </li>
              <li>
                <p className="hover:text-blue-400 cursor-pointer transition-colors">
                  Terms of Service
                </p>
              </li>
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter
                 className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@docuchat.ai"
                className="hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500">support@docuchat.ai</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DocuChat AI. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
