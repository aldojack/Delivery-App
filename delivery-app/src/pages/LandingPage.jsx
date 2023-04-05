import { useState } from "react";
import LocationButton from "../components/LocationButton";
import BigLogo from  "/images/pin-logo-trans.png"

export default function LandingPage({ onAccept }) {

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
      </div>
        <div className="bg-white p-4 rounded shadow-md">
        <img
          src={BigLogo}
          alt="My App Logo"
          className="w-64 mx-auto"
        />
          <h2 className="text-2xl font-semibold mb-4">
            We need your location to continue
          </h2>
          <p className="mb-4">
            By clicking "Allow", you will get the most optimal performance
            Policy.
          </p>
          <div className="flex justify-center">
          <LocationButton onAccept={onAccept}/>
          </div>
        </div>
    </div>
  );
}
