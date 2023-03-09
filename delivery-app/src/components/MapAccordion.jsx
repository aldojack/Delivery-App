import {useEffect, useState} from "react";

export default function MapAccordion({location: {longitude, latitude}}) {
    const [isOpen, setIsOpen] = useState(false)

    console.log(longitude)
    console.log(latitude)

    useEffect(() => {
      console.log("use effect")
      console.log(longitude)
      console.log(latitude)
    },[])

  return (
    <div className="bg-white rounded-lg shadow-md">
      <button
        className="flex justify-between items-center w-full p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">View Map</span>
        <svg
          className={`${
            isOpen ? "transform rotate-180" : ""
          } w-5 h-5 text-gray-500`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.707 14.707a1 1 0 01-1.414 0L5.586 10.86a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4">
          <iframe
            width="100%"
            height="200"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`}
          />
        </div>
      )}
    </div>
  );
}
