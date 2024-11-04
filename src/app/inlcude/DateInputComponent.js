'use client'
import React, { useState } from 'react';
import styles from "./safar.module.css";
const DateInputComponent = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');

  const formatDate = (inputValue) => {
    // Remove all non-digit characters
    const cleanedValue = inputValue.replace(/\D/g, '');

    // Check if the value is empty or exceeds 8 digits
    if (!cleanedValue || cleanedValue.length > 8) {
      setDateOfBirth(cleanedValue);
      return;
    }

    // Split the cleaned value into day, month, and year parts
    let day = cleanedValue.slice(0, 2);
    let month = cleanedValue.slice(2, 4);
    let year = cleanedValue.slice(4, 8);

    // Construct the formatted date string
    let formattedDate = '';
    if (day) formattedDate += day;
    if (month) formattedDate += '/' + month;
    if (year) formattedDate += '/' + year;

    setDateOfBirth(formattedDate);
  };

  const handleChange = (e) => {
    formatDate(e.target.value);
  };

  return (


    <div className={`form-group ${styles.formGroup}`}>
      <label
        htmlFor="Date_Of_Birth"
        style={{ fontSize: 13, fontFamily: '"Work Sans", sans-serif' }}
      >
        Date Of Birth (dd/mm/yyyy){" "}
        <span style={{ fontSize: 13, color: "red" }}>*</span>
      </label>
      <input
        className={`new-control ${styles.newControl}`}
        type="tel"
        id="dob"
        name="Dob"
        value={dateOfBirth}
        onChange={handleChange}
        minLength={10}
        maxLength={10}
        placeholder="DD/MM/YYYY"
        inputMode='numeric'
        required
      />
    </div>

  );
};

export default DateInputComponent;
