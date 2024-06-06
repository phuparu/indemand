import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ className, onDateChange }) => {
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
        dateFormat="MM/dd/yyyy hh:mm aa"
        showTimeSelect
        timeIntervals={30}
        timeFormat="hh:mm aa"
      />
    </div>
  );
};

export default Datepicker;
