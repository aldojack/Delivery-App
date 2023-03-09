import { useState, useRef, useEffect } from "react";
import Camera from "./Camera";
import { BsFillPersonFill } from "react-icons/bs";
import MapAccordion from "./MapAccordion";

export default function Order({
  address,
  customerName,
  delivered,
  location,
  orderNumber,
  onDelivered,
  deliveryUrl,
}) {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [deliveredLocation, setDeliveredLocation] = useState("");
  const cameraRef = useRef(null);

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
      deliveryUrl: null,
      deliveryCoords: deliveredLocation,
    };
    onDelivered(orderNumber, deliveredInfo);
    setPictureUrl(null);
  }

  return (
    <div className="rounded-xl shadow-lg bg-slate-200 max-w-[500px] mx-auto p-4">
      <div className="grid grid-cols-2 items-center justify-items-center gap-4">
        <BsFillPersonFill />
        <div>
          <p className="font-bold">{customerName}</p>
          <p>{address}</p>
        </div>
        <div className="w-full mx-auto col-span-2">
        {location ? (
          <MapAccordion location={location}/>
        ) : (
          <img src={PlaceholderImg} height="300" alt="Placeholder" />
        )}
      </div>
        <div>

        </div>
      </div>
      <div className="grid justify-items-center">
        {pictureUrl ? (
          <img src={pictureUrl} alt="Delivery confirmation" />
        ) : (
          <Camera
            ref={cameraRef}
            onCapture={handleCapture}
            disabled={delivered}
          />
        )}
      </div>
      {delivered && (
        <div>
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
  );
}
