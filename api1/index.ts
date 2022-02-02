import express, { Application, Request, Response } from "express";

const request = require("request")
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
const url = "http://localhost:3000/students"

const app: Application = express()

require("dotenv").config()
const PORT = process.env.PORT || 5000

let students: string[] = []

app.use(express.json())
app.use(require("body-parser").json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine)


//Render web page
app.get("/", (req:Request, res:Response) => {
  request({
      method: "GET",
      url: url,
      json: true,
      headers: { "content-type": "application/json" }
    },
    (error:string, response:Response, body:string[]) => {
      !error && response.statusCode == 200 ? (students = body) : null
      res.render('index', { students })
  })
})

//Send a request to get All students
app.get("/students", (req:Request, res:Response) => {
  request({
      method: "GET",
      url: url,
      json: true,
      headers: { "content-type": "application/json" }
    },
    (error:string, response:Response, body:string[]) => {
      !error && response.statusCode == 200 ? (students = body) : null
      res.json(body)
    }
  )
})

//Request to get a student by Id
app.get("/students/:id", (req:Request, res:Response) => {
  request({
      method: "GET",
      url: url + '/'+ req.params.id as string,
      json: true,
      headers: {
        "content-type": "application/json",
      }
    },
    (error:string, response:Response, body:string[]) => {
      !error && response.statusCode == 200 ? (students = body) : null
      console.log(response.statusMessage, response.statusCode)
      console.log(body)
      res.json(body)
    }
  )
})

//Request to create a new student 
app.post("/students", (req:Request, res:Response) => {
  request({
      method: "POST",
      url: url,
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: {
        name: req.body.name as string,
        password: req.body.password as string
      }
    },
    (error:string, response:Response, body:string[]) => {
      !error && response.statusCode == 201 ? (students = body) : null
      console.log(body)
      console.log(response.statusMessage, response.statusCode)
      res.json(body)
    }
  )
})

//Request to update a student by Id
app.patch("/students/:id", (req:Request, res:Response) => {
  let bodyProperties = {}

  if (req.body.name && req.body.password) {
    bodyProperties = {
      name: req.body.name as string,
      password: req.body.password as string
    }
  }
  else if (!req.body.name && req.body.password) {
    bodyProperties = {
      password: req.body.password as string
    }
  }
  else if (req.body.name && !req.body.password) {
    bodyProperties = {
      name: req.body.name as string
    }
  }
  
  request({
      method: "PATCH",
      url: url + '/'+ req.params.id as string,
      json: true,
      headers: { "content-type": "application/json" },
      body: bodyProperties
    },
    (error:string, response:Response, body:string[]) => {
      !error && response.statusCode == 200 ? (students = body) : null
      console.log(response.statusMessage, response.statusCode)
      console.log(body)
      res.json(body)
    }
  )
})

//Request to delete a student by Id
app.delete("/students/:id", (req:Request, res:Response) => {
  request({
      method: "DELETE",
      url: url + '/'+ req.params.id as string,
      json: true,
      headers: { "content-type": "application/json" }
    },
    (error:string, response:Response, body:string[]) => {
      !error && response.statusCode == 200 ? (students = body) : null
      console.log(body)
      res.json(body)
    }
  )
})

app.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`))
