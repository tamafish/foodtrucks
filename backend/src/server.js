const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8080;

const rawData = [];

fs.createReadStream(path.join(__dirname, 'Mobile_Food_Facility_Permit.csv'))
  .pipe(csv())
  .on("data", (row) => {
    rawData.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");
  });

app.use(cors({origin: true, credentials: true}));

app.get("/", (req, res) => {
  res.json(rawData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
