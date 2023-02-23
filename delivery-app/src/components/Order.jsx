import { useState, useRef } from "react";
import Camera from "./Camera";
import { BsFillPersonFill } from "react-icons/bs";

export default function Order({
  address,
  customerName,
  delivered,
  location,
  orderNumber,
  onDelivered,
}) {
  const [pictureUrl, setPictureUrl] = useState(null);
  const cameraRef = useRef(null);

  function confirmDelivery() {
    if (pictureUrl) {
      onDelivered(orderNumber, pictureUrl);
    } else {
      console.log("Please take a picture first!");
    }
  }

  function handleCapture(dataUrl) {
    setPictureUrl(dataUrl);
  }

  function handleStartCamera() {
    if (cameraRef.current) {
      cameraRef.current.startCamera();
    }
  }

  return (
    <div className="rounded-xl shadow-lg bg-slate-200 max-w-[500px] mx-auto p-4">
  <div className="grid grid-cols-2 items-center justify-items-center gap-4">
    <BsFillPersonFill />
    <div>
      <p className="font-bold">{customerName}</p>
      <p>{address}</p>
    </div>
  </div>
  <div className="grid justify-items-center">
    {pictureUrl ? (
      <img src={pictureUrl} alt="Delivery confirmation" />
    ) : (
      <Camera ref={cameraRef} onCapture={handleCapture} />
    )}
  </div>
  {/* <div className="grid grid-cols-2 justify-items-center">
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={pictureUrl ? confirmDelivery : handleStartCamera}
    >
      Accept
    </button>
    {!pictureUrl && (
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Decline
      </button>
    )}
  </div> */}
</div>


  );
}
