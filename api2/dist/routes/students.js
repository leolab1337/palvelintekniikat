"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require("express")
const router = express_1.default.Router();
const Student = require("../models/student");
module.exports = router;
// Getting all students
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student.find();
        res.json(students);
    }
    catch (err) {
        //server error
        res.status(500).json({ message: err.message });
    }
}));
// Getting a student by id
router.get('/:id', getStudent, (req, res) => {
    res.json(res.student);
});
// Create a Student
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = new Student({
        name: req.body.name,
        password: req.body.password
    });
    try {
        const newStudent = yield student.save();
        // object created
        res.status(201).json(newStudent);
    }
    catch (err) {
        //bad data
        res.status(400).json({ message: err.message });
    }
}));
// Update a student
router.patch('/:id', getStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name != null) {
        res.student.name = req.body.name;
    }
    if (req.body.password != null) {
        res.student.password = req.body.password;
    }
    try {
        const updatedStudent = yield res.student.save();
        res.json(updatedStudent);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Deleting one student
router.delete('/:id', getStudent, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.student.remove();
        res.json({ message: 'student deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
function getStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let student;
        try {
            student = yield Student.findById(req.params.id);
            console.log(student);
            if (student === null) {
                return res.status(404).json({ message: 'Cannot find student' });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.student = student;
        next();
    });
}
