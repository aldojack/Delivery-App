const orders = [
    {
      orderNumber: 1234,
      customerName: "John Doe",
      delivered: false,
      address: "123 Main St, Anytown, USA",
      location: {
        latitude: getRandomLatitude(),
        longitude: getRandomLongitude()
      }
    },
    {
      orderNumber: 5678,
      customerName: "Jane Smith",
      delivered: true,
      address: "456 Maple Ave, Anytown, USA",
      location: {
        latitude: getRandomLatitude(),
        longitude: getRandomLongitude()
      }
    },
    {
      orderNumber: 9012,
      customerName: "Bob Johnson",
      delivered: false,
      address: "789 Oak St, Anytown, USA",
      location: {
        latitude: getRandomLatitude(),
        longitude: getRandomLongitude()
      }
    }
  ];
  
  function getRandomLatitude() {
    return Math.random() * (90 - (-90)) + (-90); // generates a random number between -90 and 90
  }
  
  function getRandomLongitude() {
    return Math.random() * (180 - (-180)) + (-180); // generates a random number between -180 and 180
  }
  
  export default orders;
  