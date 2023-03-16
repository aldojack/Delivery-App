import { useState, useEffect } from "react";
import AddOrder from "./components/AddOrder";
import FilterButton from "./components/FilterButton";
import MapContainer from "./components/MapContainer";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import ordersData from "./data/orders";
import LandingPage from "./pages/LandingPage";

const FILTER_MAP = {
  All: () => true,
  AwaitingAcceptance: (order) => order.status === "Awaiting Acceptance",
  Active: (order) => order.status === "Active",
  Completed: (order) => order.status === "Completed",
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [isLocationAllowed, setIsLocationAllowed] = useState(false);
  const [filter, setFilter] = useState("AwaitingAcceptance");
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
        onDelivered={confirmDelivery}
        handleDelete={deleteOrder}
        handleAccept={acceptOrder}
      />
    ));

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function toggleDelivered(orderNumber, deliverInfo) {
 
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

  function deleteOrder(orderNum) {
    // Create a copy of the orders array
    const updatedOrders = [...orders];
  
    // Find the index of the object with the given id in the array
    const indexToDelete = updatedOrders.findIndex(order => order.orderNumber === orderNum);
  
    // If the object was found, remove it from the array
    if (indexToDelete !== -1) {
      updatedOrders.splice(indexToDelete, 1);
    }
  
    // Update the state with the updated orders array
    setOrders(updatedOrders);
  }

  function allowLocation(){
    setIsLocationAllowed(true)
  }

  function acceptOrder(orderNumber){
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (orderNumber === order.orderNumber) {
          return { ...order, status: "Active"};
        }
        return order;
      });
    });
  }

  function confirmDelivery(orderNumber, deliverInfo){
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (orderNumber === order.orderNumber) {
          return { ...order, ...deliverInfo };
        }
        return order;
      });
    });
  }
  

  return (
    <div className="w-full h-screen">
    {isLocationAllowed &&  (
      <>
      <Navbar />
      <MapContainer />
      <div className="w-full">
        <AddOrder handleAdd={addOrder} />
        <div className="max-w-[1240px] md:grid md:grid-cols-3 md:gap-2 w-full h-full mx-auto p-4 space-y-4">
          <div className="max-w-[350px] mx-auto flex justify-center flex-1 basis-3/6 space-x-2 md:col-span-3">
            {filterList}
          </div>
          {allOrderElements}
          
        </div>
      </div>
      </>
    )}
    {!isLocationAllowed && <LandingPage onAccept={allowLocation}/>}

    </div>
  );
}

export default App;
