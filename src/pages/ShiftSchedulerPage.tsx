import React, { useEffect } from 'react'

const ShiftSchedulerPage = () => {

   

    const fetchShifts = async () => {
        try {
            const response = await fetch('/api/shifts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched shifts:', data);
        } catch (error) {
            console.error('Error fetching shifts:', error);
        }
    };
    useEffect(() => {
        fetchShifts();
    }, []);


  return (
    <div>
      Scheduling page
    </div>
  )
}

export default ShiftSchedulerPage
