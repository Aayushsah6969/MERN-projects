import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
   <>
    <footer className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About AIZA</h3>
            <ul className="space-y-2">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Sustainability</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>&copy; 2023 AIZA Collection. All rights reserved.</p>
        </div>
      </footer>
   </>
  )
}

export default Footer