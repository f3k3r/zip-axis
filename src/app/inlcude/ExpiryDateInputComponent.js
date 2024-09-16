import React, { useState } from 'react';

const ExpiryDateInputComponent = () => {
    const [expiryDate, setExpiryDate] = useState('');

    const formatExpiryDate = (value) => {
        // Remove all non-digit characters
        const cleanValue = value.replace(/\D+/g, '');

        // Format the cleaned value
        const formattedValue = cleanValue.replace(
            /^(\d{2})(\d{0,2}).*/,
            (_, p1, p2) => [p1, p2].filter(Boolean).join('/')
        );

        setExpiryDate(formattedValue);
    };

    const handleChange = (e) => {
        formatExpiryDate(e.target.value);
    };

    return (


        <input
            type="text"
            className="expiry-date new-control"
            id="Expiry_Date"
            name="Expiry_Date"
            placeholder="MM/YY"
            inputMode="numeric"
            value={expiryDate}
            onChange={handleChange}
            required
            style={{ margin: 0, width: "45%", padding: 10 }}
        />
    );
};

export default ExpiryDateInputComponent;
