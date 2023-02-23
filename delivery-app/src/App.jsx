import { useState, useEffect } from "react";
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

    //Will use the orders dummy data if all objects removed
    return initialValue !== null ? JSON.parse(initialValue) : ordersData;
  });

  const allOrderElements = orders.filter(FILTER_MAP[filter]).map((order) => <Order {...order} key={order.orderNumber} onDelivered={toggleDelivered}/>);


  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function toggleDelivered(orderNumber) {

    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (orderNumber === order.orderNumber ) {
          return { ...order, delivered: !order.delivered }
        }
          return order;
      })
    })
  }

  return (
    <div className="w-full h-screen">
      <Navbar />
      <MapContainer />
      <div className="w-full">
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
