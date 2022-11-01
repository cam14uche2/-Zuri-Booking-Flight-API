const express = require("express");
const { json } = require("express");
//const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(express.json());
const flights =[
  {
    id: 1,
    title: "Flight to Canada",
    time: "1pm",
    price: "26000",
    date: "26-06-2022",
  },
];


const getFlights =(req, res) => {
  res.send(flights);
};

const getFlight = (req, res) => {
  const flight = flights.find((flight) => flight.id === parseInt(req.params.id));
    if(!flight) return res.status(404).send("Page not found");
    res.send(flight);
};

const addFlight = (req,res) => {
  const title = req.body.title

  const flight = {
    id:flights.length + 1,
    title,
  };

  flights.push(flight);
  res.send(flight);
};

const updateFlight = (req, res) => {
  const flight = flights.find((flight) => flight.id === parseInt(req.params.id));
  if(!flight) return res.status(404).send("Page not found");
  flight.title = req.body.title;
  res.send(flight);
};

app.delete('/api/flights/:id', (req, res) => {
  const flight = flights.find((fight) => flight.id === parseInt(req.params.id));
  if(!flight) return res.status(404).send("Page not found");

  const index = flights.indexOf(flight);
  flights.splice(index, 1);

  res.send(flight);
});






app.use("/", routes);

app.get("/api/flights/", getFlights);

app.get("api/flights/:id", getFlight);

app.post('/api/flights', addFlight);

app.put('/api/flights/:id', updateFlight);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
