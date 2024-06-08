import React, { useState } from "react";
import { course } from "../../assets/data/course";
import Datepicker from "../../components/time/Datepicker";
import Timepicker from "../../components/time/Timepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const Booking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [availability, setAvailability] = useState(true);

  const handleBookClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const duration = (endTime - startTime) / (1000 * 60 * 60); //to hours
      return duration;
    }
    return 0;
  };

  const checkAvailability = () => {
    // Dummy function to simulate checking availability
    // Replace with actual availability check logic
    const isAvailable = Math.random() > 0.5;
    setAvailability(isAvailable);
  };

  const sendBookingData = async (bookingData) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Booking successful:", data);
        toast.success("Booking confirmed successfully!");
      } else {
        throw new Error("Failed to confirm booking");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to confirm booking. Please try again later.");
    }
  };

  const handleConfirmBooking = () => {
    checkAvailability();
    if (availability) {
      const duration = calculateDuration();
      const bookingData = {
        course: selectedCourse,
        date: selectedDate.toLocaleDateString(),
        startTime: startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: endTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        duration: duration.toFixed(2),
      };
      console.log("Booking Data:", bookingData);
      sendBookingData(bookingData);
      setIsModalOpen(false);
    } else {
      alert("Selected time is not available. Please choose a different time.");
    }
  };

  return (
    <div>
      <section className="bg-[#fff9ea] py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Booking Course</h2>
      </section>
      <section className="flex flex-wrap justify-center gap-6 p-10">
        {course.map((courseItem) => (
          <div
            key={courseItem.id}
            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden w-72"
          >
            <img
              src={courseItem.photo}
              alt={courseItem.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{courseItem.name}</h3>
              <p className="text-gray-700 mb-1">
                Subject: {courseItem.subject}
              </p>
              <p className="text-gray-700 mb-1">Hours: {courseItem.hours}</p>
              <p className="text-gray-700 mb-3">
                Education Level: {courseItem.edulevel}
              </p>
              <button
                onClick={() => handleBookClick(courseItem)}
                className="btn block w-full py-2 px-4 text-white font-semibold rounded hover:bg-orangeColor"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              Book {selectedCourse.name}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700">Select Date:</label>
              <Datepicker
                className="mt-2"
                onDateChange={handleDateChange}
                minDate={new Date()} // Set minimum date
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Start Time:</label>
              <Timepicker
                className="mt-2"
                onDateChange={handleStartTimeChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select End Time:</label>
              <Timepicker className="mt-2" onDateChange={handleEndTimeChange} />
            </div>
            {!availability && (
              <p className="text-red-500 mb-4">
                Selected time is not available. Please choose a different time.
              </p>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700 mr-2"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmBooking}
                className="py-2 px-4 bg-primaryColor text-white font-semibold rounded hover:bg-orangeColor"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;