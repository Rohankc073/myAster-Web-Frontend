import React from "react";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-blue-50 py-20 relative">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-snug">
                Get Expert <span className="text-blue-600">Medical</span> Consultation!
              </h1>
              <p className="text-gray-600 mb-6">
                Our doctors provide expert medical advice and find consultations. Get in touch with our team to discuss.
              </p>
              <div className="flex items-center bg-white p-3 rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Search Doctors in your location"
                  className="flex-grow px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center relative mt-10 lg:mt-0">
              {/* White circular background */}
              <div className="absolute bg-white w-[400px] h-[400px] rounded-full -top-25"></div>
              {/* Doctor image */}
              <img
                src="/images/doc2.png"
                alt="Doctor"
                className="relative z-10 w-3/4 lg:w-full object-contain -mt-10"
              />
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-10 "> {/* Added negative margin-top */}
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
              {[
                { title: "Consulting", icon: "/icons/consulting.svg" },
                { title: "Heart Lungs", icon: "/icons/heart-lungs.svg" },
                { title: "Supplement", icon: "/icons/supplement.svg" },
                { title: "Mental Health", icon: "/icons/mental-health.svg" },
              ].map((specialist, index) => (
                <div
                  key={index}
                  className={`p-6 border rounded-lg shadow-lg ${index === 1 ? "bg-blue-50 border-blue-600" : "bg-white"
                    }`}
                >
                  <div className="flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4">
                    <img
                      src={specialist.icon}
                      alt={specialist.title}
                      className="w-8 h-8"
                    />
                  </div>
                  <h3
                    className={`text-lg font-bold mb-2 text-center ${index === 1 ? "text-blue-600" : "text-gray-800"
                      }`}
                  >
                    {specialist.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit
                    viverra amet faucibus.
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
                src="/images/dash1.png"
                alt="Choose Us"
                className="w-3/4 lg:w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>


        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:gap-x-10 items-center">
            {/* Image Section */}
            <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
              <img
                src="/images/dash2.png"
                alt="Future Health"
                className="w-3/4 lg:w-full rounded-lg shadow-lg"
              />
            </div>
            {/* Text Section */}
            <div className="lg:w-1/2 lg:ml-12">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                The Future of Quality Health
              </h2>
              <p className="text-gray-600 mb-6">
                Providing cutting-edge healthcare solutions for a brighter future.
              </p>
            </div>
          </div> 12
        </section>


      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
