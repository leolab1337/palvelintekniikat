"use strict";
const mongoose_ = require("mongoose");
const studentSchema = new mongoose_.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});
module.exports = mongoose_.model("Student", studentSchema);
