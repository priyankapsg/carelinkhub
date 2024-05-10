const express = require("express");
const cors = require("cors");
const app = express();
const dbconfig = require('./db');
const userRoute = require('./routes/userRoute');

app.use(express.json());
app.use(cors());
app.use('/api/user', userRoute);

const port = 5000;
app.listen(port, () => console.log(`Node server started on port ${port}`));