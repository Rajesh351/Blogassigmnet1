const express = require('express');
const cookieParser =require("cookie-parser")
const cors =require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/connectDb');
const postRoutes = require('./routes/postRoutes');


dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:`${process.env.host}`,
    credentials:true
}

app.use(cors(corsOptions));
// Database Connection


// Routes
//http://localhost:5000/api/posts
app.use('/api/posts', postRoutes);


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})