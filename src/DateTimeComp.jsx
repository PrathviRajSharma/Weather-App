import React, { useState, useEffect } from 'react';

function CurrentDateTime() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getFormattedDate = () => {
        const dateObj = new Date();
        const dayOfMonth = dateObj.getDate();
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of week in English (Sunday)
        return `${dayOfMonth} ${month} ${year}, ${dayOfWeek}`;
    };

    return (

        <div class="date-time">
            <p>{getFormattedDate()}</p>
            <p className='time'>{dateTime.toLocaleTimeString()}</p>
        </div>
    );
}

export default CurrentDateTime;