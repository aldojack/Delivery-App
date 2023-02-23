import { BsFillPersonFill } from "react-icons/bs";

export default function Order({address, customerName, delivered, location, orderNumber, onDelivered}) {

  function confirmDelivery(){
    onDelivered(orderNumber)
  }

  return (
    <div className="rounded-xl shadow-lg bg-slate-200 flex md:flex-col max-w-[500px] mx-auto justify-between items-center p-4">
    <BsFillPersonFill />
    <div>
      <p className="font-bold">{customerName}</p>
      <p>{address}</p>
      <p>0 mins away</p>
    </div>
    <div>
    {/* 
      When user clicks this button it will trigger to take a picture and save the data url to the object  
    */}
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={confirmDelivery}
      >
        Accept
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Decline
      </button>
    </div>
  </div>
  )
}
