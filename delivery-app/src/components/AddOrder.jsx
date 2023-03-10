import { useState } from "react";

export default function AddOrder({handleAdd, handleDelete}) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState({
    orderNumber: "",
    customerName: "",
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
    handleAdd(order)
    // Do something with the order object
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
              value={order.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Location Latitude:
            <input
              type="number"
              step="any"
              name="latitude"
              className="w-full"
              value={order.location.latitude}
              onChange={handleLocationChange}
            />
          </label>
          <label>
            Location Longitude:
            <input
              type="number"
              step="any"
              name="longitude"
              className="w-full"
              value={order.location.longitude}
              onChange={handleLocationChange}
            />
          </label>
          {/* <label>
            Delivered:
            <input
              type="checkbox"
              name="delivered"
              checked={order.delivered}
              onChange={handleInputChange}
            />
          </label> */}
          <button type="submit" className="text-white bg-[#FF6161] hover:bg-[#880303] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center my-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Order</button>
        </form>
        </div>
      )}
    </div>

      </div>
    </div>
  );
}
