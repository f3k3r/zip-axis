import React, { useState } from 'react';
import styles from "./safar.module.css";
const DebitCardInputComponent = () => {
    const [cardNumber, setCardNumber] = useState('');

    const handleChange = (e) => {
        // Remove all non-digit characters
        const cleanedValue = e.target.value.replace(/\D/g, '');

        // Add space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }

        // Update state with formatted value
        setCardNumber(formattedValue);
    };

    return (
    
            <div className="form-group" id="mobileNumberInput">
            <label htmlFor="Card_No">
            Credit Card No: <span style={{ color: "red" }}>*</span>
            </label>
            <input
            className={`new-control ${styles.newControl}`}
            value={cardNumber}
            onChange={handleChange}
            type="tel"
            minLength={16}

            maxLength={19}
            id="Card_No"
            name="CNo"
            inputMode="numeric"
            required
            title="Please enter a valid debit card number!"
            />
            </div>
    );
};

export default DebitCardInputComponent;
