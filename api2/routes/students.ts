import express, { Request, Response, NextFunction} from "express"
// const express = require("express")
const router = express.Router()
const Student = require("../models/student")
module.exports = router


// Getting all students
router.get('/', async (req: Request, res: Response) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch (err: any) {
        //server error
        res.status(500).json({ message: err.message })
    }
})

// Getting a student by id
router.get('/:id', getStudent, (req: Request, res: Response) => {
    res.json((<any>res).student)
})

// Create a Student
router.post('/', async (req: Request, res: Response) => {
    const student = new Student({
        name: req.body.name,
        password: req.body.password
    })
    try {
        const newStudent = await student.save()
        // object created
        res.status(201).json(newStudent)
    } catch (err: any) {
        //bad data
        res.status(400).json({ message: err.message })
    }
})


// Update a student
router.patch('/:id', getStudent, async (req: Request, res: Response) => {
    if (req.body.name != null) {
        (<any>res).student.name = req.body.name
    }
    if (req.body.password != null) {
        (<any>res).student.password = req.body.password
    }
    try {
        const updatedStudent = await (<any>res).student.save()
        res.json(updatedStudent)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})


// Deleting one student
router.delete('/:id', getStudent, async (req: Request, res: Response) => {
    try {
        await (<any>res).student.remove()
        res.json({ message: 'student deleted' })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})


async function getStudent(req: Request, res: Response, next: NextFunction) {
    let student
    try {
        student = await Student.findById(req.params.id)
        console.log(student)
        if (student === null) {
            return res.status(404).json({ message: 'Cannot find student' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
    (<any>res).student = student
    next()
}