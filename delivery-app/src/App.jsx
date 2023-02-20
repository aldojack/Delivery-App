import { useState } from "react";
import MapContainer from "./components/MapContainer";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import orders from "./data/orders";

function App() {
  const [initialOrders, setInitalOrders] = useState(orders);
  const  allOrderElements = initialOrders.map((order) => {
    return <Order {...order} key={order.orderNumber}/>
  })

  return (
    <div className="wrapper">
      <Navbar />
      <MapContainer />
      <div className="w-full">
        <div className="max-w-[1240px] w-full h-full mx-auto p-4 space-y-4">
        {allOrderElements}
        </div>
      </div>
    </div>
  );
}

export default App;
