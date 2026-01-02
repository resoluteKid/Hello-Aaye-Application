const express = require('express');
const app = express();

const connectToDB = require('.config/db');
connectToDB();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) =>{
    app.send("Hello from backend");
})

const userRouter = require('./routes/user.routes');
app.use('/api', userRouter);

const port = 5000;

app.listen(port, () => {
    console.log("Backend is running on port 5000");
})