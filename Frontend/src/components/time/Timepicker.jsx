import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Timepicker = ({ className, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <DatePicker
        className={`form__input ${className}`}
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeFormat="hh:mm aa"
        dateFormat="hh:mm aa"
        timeCaption="Time"
      />
    </div>
  );
};

export default Timepicker;
