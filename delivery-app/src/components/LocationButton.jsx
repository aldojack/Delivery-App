import React, { useEffect, useState } from "react";

export default function LocationButton({onAccept}) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Geolocation is not supported"));
      }
    });
  };

  useEffect(() => {
    if (location) {
      console.log(location.coords.latitude, location.coords.longitude);
    } else if (error) {
      console.error(error.message);
    }
  }, [location, error]);

  const handleClick = () => {
    getLocation()
      .then((position) => {
        setLocation(position);
        onAccept(true)
      })
      .catch((error) => {
        setError(error);
      });
  };

  return <button onClick={handleClick} className="text-white bg-[#FF6161] hover:bg-[#f63a3a] focus:outline-none focus:ring-4 focus:ring-orange-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-[#FF6161] dark:hover:bg-[#f63a3a]">Get Location</button>;
}
