import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const RegisterDatePicker = (props) => {
    return (
      <DatePicker
        selected={props.startDate}
        onChange={date => props.setStartDate(date.toISOString())}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    );
  };


export default RegisterDatePicker;
