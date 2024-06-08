import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";

const Admin = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tutorName, setTutorName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [subject, setSubject] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      // Mock data
      const mockData = [
        {
          id: 1,
          tutorName: "John Doe",
          student_name: "Jane Smith",
          subject: "Mathematics",
          detail: "Algebra",
          date: "2023-06-01",
          startTime: "10:00",
          endTime: "11:00",
          hours: 1,
          status: "Present",
        },
        {
          id: 2,
          tutorName: "Alice Johnson",
          student_name: "Bob Brown",
          subject: "Physics",
          detail: "Mechanics",
          date: "2023-06-02",
          startTime: "09:00",
          endTime: "10:30",
          hours: 1.5,
          status: "Absent",
        },
      ];

      setAttendanceData(mockData);
      setFilteredData(mockData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleFilter = () => {
    let filtered = attendanceData;
    if (tutorName) {
      filtered = filtered.filter((record) =>
        record.tutorName.toLowerCase().includes(tutorName.toLowerCase())
      );
    }
    if (studentName) {
      filtered = filtered.filter((record) =>
        record.student_name.toLowerCase().includes(studentName.toLowerCase())
      );
    }

    if (subject) {
      filtered = filtered.filter((record) =>
        record.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }
    if (startDate && endDate) {
      filtered = filtered.filter((record) => {
        const recordDate = moment(record.date);
        return recordDate.isBetween(startDate, endDate, "days", "[]");
      });
    }
    setFilteredData(filtered);
  };

  const columns = [
    { title: "Tutor Name", key: "tutorName" },
    { title: "Student Name", key: "student_name" },
    { title: "Subject", key: "subject" },
    { title: "Detail", key: "detail" },
    { title: "Date", key: "date" },
    { title: "Time", key: "time" },
    { title: "Hours", key: "hours" },
    { title: "Status", key: "status" },
  ];

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Tutor Attendance History
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap mb-6 items-center gap-4">
          <input
            type="text"
            placeholder="Tutor Name"
            value={tutorName}
            onChange={(e) => setTutorName(e.target.value)}
            className="input input-bordered px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none rounded-lg"
          />
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="input input-bordered px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none rounded-lg"
          />

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="input input-bordered flex-1 px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none rounded-lg"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            className="input input-bordered flex-1 px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none rounded-lg"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input input-bordered px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none rounded-lg"
          />
          <motion.button
            onClick={handleFilter}
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Filter
          </motion.button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="py-3 px-4"
                    style={{ maxWidth: "200px" }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Array.isArray(filteredData) &&
                filteredData.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{record.tutorName}</td>
                    <td className="py-3 px-4">{record.student_name}</td>
                    <td className="py-3 px-4">{record.subject}</td>
                    <td className="py-3 px-4">{record.detail}</td>
                    <td className="py-3 px-4">{record.date}</td>
                    <td className="py-3 px-4">
                      {record.startTime} - {record.endTime}
                    </td>
                    <td className="py-3 px-4">{record.hours}</td>
                    <td
                      className={`py-3 px-4 ${
                        record.status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <motion.button
          className="btn btn-secondary mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <CSVLink
            data={filteredData}
            filename={"attendance-data.csv"}
            className="no-underline text-white"
          >
            Export Data
          </CSVLink>
        </motion.button>
      </div>
    </section>
  );
};

export default Admin;
