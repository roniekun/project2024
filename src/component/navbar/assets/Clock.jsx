import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

   const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  };


  return (
    <main className='mx-[5vw]'>
        <h1 className='text-zinc-200 text-md uppercase font-normal text-balance'>
        {currentTime.toLocaleTimeString([], timeOptions)}
        </h1>
    </main>
  );
}

export default Clock;
