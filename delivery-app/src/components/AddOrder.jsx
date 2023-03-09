import { useState } from "react";

export default function AddOrder({handleAdd, handleDelete}) {
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
        <h2 className=" self-center font-bold text-center">Add Order</h2>
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
          <label>
            Delivered:
            <input
              type="checkbox"
              name="delivered"
              checked={order.delivered}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center my-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Order</button>
        </form>
      </div>
    </div>
  );
}
