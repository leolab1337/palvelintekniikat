"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request = require("request");
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const url = "http://localhost:3000/students";
const app = (0, express_1.default)();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
let students = [];
app.use(express_1.default.json());
app.use(require("body-parser").json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine);
//Render web page
app.get("/", (req, res) => {
    request({
        method: "GET",
        url: url,
        json: true,
        headers: { "content-type": "application/json" }
    }, (error, response, body) => {
        !error && response.statusCode == 200 ? (students = body) : null;
        res.render('index', { students });
    });
});
//Send a request to get All students
app.get("/students", (req, res) => {
    request({
        method: "GET",
        url: url,
        json: true,
        headers: { "content-type": "application/json" }
    }, (error, response, body) => {
        !error && response.statusCode == 200 ? (students = body) : null;
        res.json(body);
    });
});
//Request to get a student by Id
app.get("/students/:id", (req, res) => {
    request({
        method: "GET",
        url: url + '/' + req.params.id,
        json: true,
        headers: {
            "content-type": "application/json",
        }
    }, (error, response, body) => {
        !error && response.statusCode == 200 ? (students = body) : null;
        console.log(response.statusMessage, response.statusCode);
        res.json(body);
    });
});
//Request to create a new student 
app.post("/students", (req, res) => {
    request({
        method: "POST",
        url: url,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            name: req.body.name,
            password: req.body.password
        }
    }, (error, response, body) => {
        !error && response.statusCode == 201 ? (students = body) : null;
        console.log(response.statusMessage, response.statusCode);
        res.json(body);
    });
});
//Request to update a student by Id
app.patch("/students/:id", (req, res) => {
    let bodyProperties = {};
    if (req.body.name && req.body.password) {
        bodyProperties = {
            name: req.body.name,
            password: req.body.password
        };
    }
    else if (!req.body.name && req.body.password) {
        bodyProperties = {
            password: req.body.password
        };
    }
    else if (req.body.name && !req.body.password) {
        bodyProperties = {
            name: req.body.name
        };
    }
    request({
        method: "PATCH",
        url: url + '/' + req.params.id,
        json: true,
        headers: { "content-type": "application/json" },
        body: bodyProperties
    }, (error, response, body) => {
        !error && response.statusCode == 200 ? (students = body) : null;
        console.log(response.statusMessage, response.statusCode);
        res.json(body);
    });
});
//Request to delete a student by Id
app.delete("/students/:id", (req, res) => {
    request({
        method: "DELETE",
        url: url + '/' + req.params.id,
        json: true,
        headers: { "content-type": "application/json" }
    }, (error, response, body) => {
        !error && response.statusCode == 200 ? (students = body) : null;
        console.log(body);
        res.json(body);
    });
});
app.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`));
