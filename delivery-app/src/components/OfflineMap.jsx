import React, { useState, useEffect } from 'react';
import PlaceholderImg from '../assets/placeholder-bg.jpg';

const OfflineMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const isOnline = window.navigator.onLine;

    if (isOnline) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Use the device's GPS location
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  return (
    <div className="w-full mt-28">
      <div>
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
          <img src={PlaceholderImg} height="300" alt="Placeholder" />
        )}
      </div>
    </div>
  );
};

export default OfflineMap;
