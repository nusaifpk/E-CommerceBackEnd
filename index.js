const express = require('express')
const port = 8004;
const app = express()
const bodyParser = require("body-parser")
const userRoute = require("./Route/UserRoute")
const adminRoute = require("./Route/AdminRoute")

app.use(bodyParser.json());

app.use("/api/users",userRoute)
app.use("/api/admin",adminRoute)

app.listen(port, (err) => {
    if(err){
        console.log("Error Occured...!!");
    }
    else{
        console.log("Server is running on http://localhost:"+port);
    }
})