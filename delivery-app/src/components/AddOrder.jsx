import { useState } from "react";
import {TbCurrentLocation} from  'react-icons/tb'

export default function AddOrder({handleAdd, handleDelete}) {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({
    orderNumber: "",
    customerName: "",
    status: "Awaiting Acceptance",
    delivered: false,
    address: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  }

  function handleLocationChange(event) {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      location: {
        ...prevOrder.location,
        [name]: value,
      },
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(!order.location.latitude || !order.location.longitude)
    {
      console.log(order.location.latitude)
      console.log(location.longitude)
      console.log("No location")
      setError("No location")
    }
    else{
      setError(null);
      handleAdd(order)
    }
    // Do something with the order object
  }

  function currentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setOrder((prevOrder) => ({
          ...prevOrder,
          location: {
            ...prevOrder.location,
            latitude: latitude,
            longitude: longitude
          },
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div className="max-w-[1240px] w-full h-full mx-auto p-4 space-y-4">
      <div className="max-w-[350px] mx-auto text">
        <div className={isOpen ? "bg-slate-100 rounded-lg shadow-md" : "bg-slate-100 hover:bg-[#FF6161] ease-in duration-300 rounded-lg shadow-md"}>
      <button
        className="flex justify-between items-center w-full p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">Add Order</span>
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
        <form
          className="w-full flex flex-col flex-nowrap items-stretch bg-slate-200 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 "
          onSubmit={handleSubmit}
        >
          <label>
            Order Number:
            <input
              type="text"
              name="orderNumber"
              className="w-full"
              required={true}
              value={order.orderNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              className="w-full"
              required={true}
              value={order.customerName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              className="w-full"
              required={true}
              value={order.address}
              onChange={handleInputChange}
            />
          </label>
          <label className=" inline-flex">
            Get Current Location:
          <button className="ml-2"><TbCurrentLocation onClick={currentLocation}/></button>
          </label>
          {error && (
            <div>
              <p className="text-red-500 font-bold text-xs">Please click to generate current location</p>
            </div>
            )}
          <label>
            Location Latitude:
            <input
              type="number"
              disabled={true}
              name="latitude"
              className="w-full"
              required={true}
              value={order.location.latitude}
              onChange={handleLocationChange}
            />
          </label>
          <label>
            Location Longitude:
            <input
              type="number"
              disabled={true}
              name="longitude"
              className="w-full"
              required={true}
              value={order.location.longitude}
              onChange={handleLocationChange}
            />
          </label>

          <button type="submit" className="text-white bg-[#FF6161] hover:bg-[#880303] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center my-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Order</button>
        </form>
        </div>
      )}
    </div>

      </div>
    </div>
  );
}
