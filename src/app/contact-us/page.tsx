import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
   return (
      <div className="bg-gray-50 text-gray-800 min-h-screen p-6">
         <div className="max-w-5xl mx-auto space-y-12">
            {/* Header */}
            <section className="text-center py-10">
               <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
               <p className="text-lg text-gray-600">Have questions or need help? Reach out to us anytime.</p>
            </section>

            {/* Info + Form Grid */}
            <section className="grid md:grid-cols-2 gap-8">
               {/* Contact Info */}
               <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                     <Mail className="w-6 h-6 text-blue-500 mt-1" />
                     <div>
                        <h3 className="font-semibold">Email</h3>
                        <p>support@hospitalcare.com</p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-4">
                     <Phone className="w-6 h-6 text-green-500 mt-1" />
                     <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p>+880 1234-567890</p>
                     </div>
                  </div>
                  <div className="flex items-start space-x-4">
                     <MapPin className="w-6 h-6 text-red-500 mt-1" />
                     <div>
                        <h3 className="font-semibold">Address</h3>
                        <p>123 Health Ave, Dhaka, Bangladesh</p>
                     </div>
                  </div>
               </div>

               {/* Contact Form */}
               <form className="bg-white p-6 rounded-2xl shadow space-y-4">
                  <div>
                     <label htmlFor="name" className="block font-medium mb-1">
                        Full Name
                     </label>
                     <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                     />
                  </div>

                  <div>
                     <label htmlFor="email" className="block font-medium mb-1">
                        Email Address
                     </label>
                     <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                     />
                  </div>

                  <div>
                     <label htmlFor="message" className="block font-medium mb-1">
                        Message
                     </label>
                     <textarea
                        id="message"
                        placeholder="Your message..."
                        rows={4}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                     />
                  </div>

                  <button
                     type="submit"
                     className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-300"
                  >
                     Send Message
                  </button>
               </form>
            </section>
         </div>
      </div>
   );
};

export default ContactPage;
