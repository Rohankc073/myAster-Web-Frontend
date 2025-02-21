import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCalendarTimes } from "react-icons/fa"; // Icon for cancellation
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const ManageAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5003/appointments/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to load appointments.");
        console.error("❌ Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // ✅ Cancel an appointment
  const cancelAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:5003/appointments/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Update UI after cancellation
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: "Canceled" } : appointment
        )
      );

      alert("Appointment canceled successfully!");
    } catch (err) {
      console.error("❌ Error canceling appointment:", err);
      alert("Error canceling appointment.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <div className="w-64">
        <AdminSidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <div className="p-8 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Appointments</h1>

          {loading ? (
            <p className="text-gray-600">Loading appointments...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-3 text-left">Patient</th> {/* ✅ Show User Name */}
                    <th className="p-3 text-left">Email</th> {/* ✅ Show User Email */}
                    <th className="p-3 text-left">Doctor</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="border-b">
                      <td className="p-3 font-semibold">
                        {appointment.userId?.name || "Unknown Patient"} {/* ✅ Show User Name */}
                      </td>
                      <td className="p-3">{appointment.userId?.email || "No Email"}</td> {/* ✅ Show User Email */}
                      <td className="p-3">{appointment.doctorName}</td>
                      <td className="p-3">{appointment.date}</td>
                      <td className="p-3">{appointment.time}</td>
                      <td
                        className={`p-3 font-semibold ${
                          appointment.status === "Canceled" ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {appointment.status || "Scheduled"}
                      </td>
                      <td className="p-3">
                        {appointment.status !== "Canceled" && (
                          <button
                            onClick={() => cancelAppointment(appointment._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
                          >
                            <FaCalendarTimes /> Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAppointmentsPage;
