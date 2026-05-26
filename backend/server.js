const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_URL")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const FormSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Form = mongoose.model("Form", FormSchema);

app.post("/submit", async (req, res) => {

    const newForm = new Form({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    await newForm.save();

    res.json({
        message: "Form Submitted Successfully!"
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
