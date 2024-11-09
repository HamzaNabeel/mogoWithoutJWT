// const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect('your-mongodb-url');

// // Define schemas
// const AdminSchema = new mongoose.Schema({
//     // Schema definition here
// });

// const UserSchema = new mongoose.Schema({
//     // Schema definition here
// });

// const CourseSchema = new mongoose.Schema({
//     // Schema definition here
// });

// const Admin = mongoose.model('Admin', AdminSchema);
// const User = mongoose.model('User', UserSchema);
// const Course = mongoose.model('Course', CourseSchema);

// module.exports = {
//     Admin,
//     User,
//     Course
// }


const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");


app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const port = 3000;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})