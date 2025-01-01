import React from "react";
import Navbar from "../components/Navbar/navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-snug">
                Get Expert <span className="text-blue-600">Medical</span> Consultation!
              </h1>
              <p className="text-gray-600 mb-6">
                Our doctors provide expert medical advice and find consultations. Get in touch with our team to discuss.
              </p>
              <div className="flex items-center bg-white p-3 rounded-lg shadow-lg outline-none" > 
                <input
                  type="text"
                  placeholder="Search Doctors in your location"
                  className="flex-grow px-4 py-2 text-black focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center mt-0 lg:mt-0">
              <img src="/images/doc2.png" alt="Doctor" className="w-3/4 lg:w-full object-contain" />
            </div>
          </div>
        </section>

        {/* Statistics Section */}
{/* Statistics Section */}
<section className="bg-blue-600 text-white py-10 -mt-12"> {/* Added negative margin-top */}
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 text-center gap-6">
    <div>
      <h2 className="text-4xl font-bold">24/7</h2>
      <p>Online Support</p>
    </div>
    <div>
      <h2 className="text-4xl font-bold">100+</h2>
      <p>Doctors</p>
    </div>
    <div>
      <h2 className="text-4xl font-bold">1M+</h2>
      <p>Active Patients</p>
    </div>
  </div>
</section>



        {/* Consulting Specialists */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
              Our Consulting Specialists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Consulting", "Heart Lungs", "Supplement", "Mental Health"].map((specialist, index) => (
                <div
                  key={index}
                  className={`p-6 border rounded-lg shadow-lg ${
                    index === 1 ? "bg-blue-50 border-blue-600" : "bg-white"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-4">{specialist}</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why You Choose Us */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Why You Choose Us?</h2>
              <ul className="text-gray-600 space-y-3 mb-6">
                {[
                  "Expert medical advice",
                  "Round-the-clock support",
                  "Trusted by millions",
                ].map((reason, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-600 mr-2">✔</span>
                    {reason}
                  </li>
                ))}
              </ul>
              <a href="#" className="text-blue-600 hover:underline">
                Learn More
              </a>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
              <img
                src="/images/choose-us.jpg"
                alt="Choose Us"
                className="w-3/4 lg:w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
              What Our Members Are Saying
            </h2>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-gray-600 mb-4">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Providing exceptional service and care."
              </p>
              <div className="flex items-center">
                <img
                  src="/images/user-avatar.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Jane Cooper</h4>
                  <p className="text-sm text-gray-600">Patient</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future of Quality Health */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                The Future of Quality Health
              </h2>
              <p className="text-gray-600 mb-6">
                Providing cutting-edge healthcare solutions for a brighter future.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/images/future-health.jpg"
                alt="Future Health"
                className="w-3/4 lg:w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
