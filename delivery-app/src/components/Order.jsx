import { useState, useRef, useEffect } from "react";
import Camera from "./Camera";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import {TbClock} from "react-icons/tb"
import {FaRegCheckSquare} from  "react-icons/fa"
import MapAccordion from "./MapAccordion";

export default function Order({
  address,
  customerName,
  status,
  delivered,
  location,
  orderNumber,
  onDelivered,
  deliveryUrl,
  handleDelete,
  handleAccept,
}) {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [deliveredLocation, setDeliveredLocation] = useState("");
  const cameraRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pictureUrl && !deliveredLocation) {
      handleLocation();
    }
    if (pictureUrl && deliveredLocation) {
      confirmDelivery();
    }
  }, [pictureUrl, deliveredLocation]);

  function confirmDelivery() {
    //Send back picture URL and new location
    let deliveredInfo = {
      status: "Completed",
      deliveryUrl: pictureUrl,
      deliveryCoords: deliveredLocation,
    };
    onDelivered(orderNumber, deliveredInfo);
  }

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDeliveredLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function handleCapture(dataUrl) {
    setPictureUrl(dataUrl);
  }

  function removePhoto() {
    let deliveredInfo = {
      status: "Awaiting Acceptance",
      deliveryUrl: null,
      deliveryCoords: deliveredLocation,
    };
    onDelivered(orderNumber, deliveredInfo);
    setPictureUrl(null);
  }

  function deleteOrder() {
    handleDelete(orderNumber);
  }

  function acceptOrder() {
    handleAccept(orderNumber);
  }

  let actionButton;
  let statusIcon;
  if (status === "Awaiting Acceptance") {
    actionButton = (
      <button
        type="button"
        onClick={acceptOrder}
        className="text-white bg-[#FF6161] hover:bg-[#f63a3a] focus:outline-none focus:ring-4 focus:ring-orange-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-[#FF6161] dark:hover:bg-[#f63a3a]"
      >
        Accept
      </button>
    );
    statusIcon = <TbClock size={28}/>;
  } else if (status === "Active") {
    actionButton = (
      <Camera ref={cameraRef} onCapture={handleCapture} disabled={delivered} />
    );
    statusIcon = <AiFillCar size={28}/>
  }
  else{
    statusIcon = <FaRegCheckSquare size={28}/>
  }

  return (
    <div className="rounded-xl shadow-lg bg-slate-200 max-w-[500px] mx-auto p-4">
      <div className="flex justify-center gap-2 md:justify-between">
        {statusIcon}
        <span className="font-bold">{status}</span>
      </div>
      <div className="grid grid-cols-2 items-center justify-items-center gap-4">
        <BsFillPersonFill size={50} />
        <div>
          <p className="font-bold">{customerName}</p>
          <p>{address}</p>
        </div>
        <div className="w-full mx-auto col-span-2">
          {location ? (
            <MapAccordion location={location} />
          ) : (
            <img src={PlaceholderImg} height="300" alt="Placeholder" />
          )}
        </div>
        <div></div>
      </div>
      <div className="grid justify-items-center">{actionButton}</div>
      {status === "Completed" && (
        <div>
          <div className="bg-white rounded-lg shadow-md">
            <button
              className="flex justify-between items-center w-full p-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-lg font-medium">View Photo</span>
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
                <img src={deliveryUrl} alt="Delivery confirmation" />
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:red:ring-blue-800"
                  onClick={removePhoto}
                >
                  Remove Photo and revert back to undelivered
                </button>
              </div>
            )}
          </div>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:red:ring-blue-800"
            onClick={deleteOrder}
          >
            Remove Order
          </button>
        </div>
      )}
    </div>
  );
}
