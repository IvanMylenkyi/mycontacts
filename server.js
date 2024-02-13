const express =require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnections.js");
const dotenv = require("dotenv").config();
const app = express();
connectDb();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static('public'));
app.use("/api/contacts",require("./routes/contactRoutes.js"));
app.use("/api/users",require("./routes/userRoutes.js"));
app.use(errorHandler);

app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/public/api.html');
  });

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});



