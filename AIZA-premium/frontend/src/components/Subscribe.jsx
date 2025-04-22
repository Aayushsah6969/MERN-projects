import { useState } from "react";

const Subscribe = () => {
    const [email, setEmail] = useState("");

  return (
   
    <>
    <section className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-xl mb-8">Sign up now and get 10% off your first order!</p>
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-r-md font-semibold hover:bg-gray-200 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Subscribe