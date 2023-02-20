import React, { useState, useEffect } from "react";

const MapContainer = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div className="w-full mt-28">
      <div className="max-w-[1240px] w-full mx-auto">
        {location ? (
          <iframe
            width="100%"
            height="300"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&output=embed`}
          />
        ) : (
          <img src="../../public/images/placeholder-bg.jpg" alt="Placeholder" />
        )}
      </div>
    </div>
  );
};

export default MapContainer;
