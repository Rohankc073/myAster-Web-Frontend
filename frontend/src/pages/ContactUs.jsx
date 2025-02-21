import axios from "axios";
import React, { useState } from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Contact Form (Review API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5003/review/add", {
        userId: "guest-user", // ✅ Use a default user ID or get from localStorage
        rating: 5, // ✅ Default rating for a contact form
        review: formData.message, // ✅ Message acts as a review
      });

      if (response.status === 201) {
        setSuccessMessage("Your message has been submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // ✅ Clear form
      }
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      alert("Error submitting the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            {/* Left Side */}
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1696488602.png"
                    alt="ContactUs section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-blue-700 object-cover"
                  />
                  <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block">
                      <a href="tel:+9779827904325" className="flex items-center mb-6">
                        📞 <h5 className="text-black text-base font-normal leading-6 ml-5">+977 9827904325</h5>
                      </a>
                      <a href="mailto:rohanck073@gmail.com" className="flex items-center mb-6">
                        ✉️ <h5 className="text-black text-base font-normal leading-6 ml-5">rohanck073@gmail.com</h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <h2 className="text-blue-600 font-manrope text-4xl font-semibold leading-10 mb-11">
                Send Us A Message
              </h2>

              {successMessage && (
                <p className="text-green-600 font-semibold text-lg mb-4">{successMessage}</p>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg font-normal rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg font-normal rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg font-normal rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                  placeholder="Phone"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-32 text-gray-600 placeholder-gray-400 bg-transparent text-lg font-normal rounded-lg border border-gray-200 focus:outline-none pl-4 mb-6"
                  placeholder="Message"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-white text-base font-semibold rounded-full transition-all duration-700 hover:bg-blue-800 bg-blue-600"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
