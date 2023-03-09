import { useState, useEffect } from "react";
import AddOrder from "./components/AddOrder";
import FilterButton from "./components/FilterButton";
import MapContainer from "./components/MapContainer";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import ordersData from "./data/orders";

const FILTER_MAP = {
  All: () => true,
  Active: (order) => !order.delivered,
  Completed: (order) => order.delivered,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [filter, setFilter] = useState("All");
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const [orders, setOrders] = useState(() => {
    const initialValue = localStorage.getItem("orders");
    return initialValue !== null ? JSON.parse(initialValue) : ordersData;
  });

  const allOrderElements = orders
    .filter(FILTER_MAP[filter])
    .map((order) => (
      <Order
        {...order}
        key={order.orderNumber}
        onDelivered={toggleDelivered}
        handleDelete={deleteOrder}
      />
    ));

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function toggleDelivered(orderNumber, deliverInfo) {
    console.log(deliverInfo);
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (orderNumber === order.orderNumber) {
          return { ...order, delivered: !order.delivered, ...deliverInfo };
        }
        return order;
      });
    });
  }

  function addOrder(newOrder) {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  }

  function deleteOrder(id) {}

  return (
    <div className="w-full h-screen">
      <Navbar />
      <MapContainer />
      <div className="w-full">
        <AddOrder handleAdd={addOrder} />
        <div className="max-w-[1240px] w-full h-full mx-auto p-4 space-y-4">
          <div className="max-w-[350px] mx-auto flex justify-center flex-1 basis-3/6 space-x-2">
            {filterList}
          </div>
          {allOrderElements}
        </div>
      </div>
    </div>
  );
}

export default App;
