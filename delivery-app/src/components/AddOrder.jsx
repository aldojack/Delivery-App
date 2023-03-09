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
      <div className="max-w-[350px] mx-auto flex justify-center flex-1 basis-3/6 space-x-2">
        <form
          className="w-full flex flex-col flex-nowrap justify-center items-start mx-auto bg-slate-200 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 "
          onSubmit={handleSubmit}
        >
        <h2 className=" self-center font-bold">Add Order</h2>
          <label>
            Order Number:
            <input
              type="text"
              name="orderNumber"
              value={order.orderNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={order.customerName}
              onChange={handleInputChange}
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
          <label>
            Address:
            <input
              type="text"
              name="address"
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
              value={order.location.longitude}
              onChange={handleLocationChange}
            />
          </label>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center my-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Order</button>
        </form>
      </div>
    </div>
  );
}
