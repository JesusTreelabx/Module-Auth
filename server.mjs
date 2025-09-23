

import bodyParser from "body-parser";
import express from "express";
import users from "./data/users.json" with {type: 'json'}
import fs from "fs"

const app = express();
app.use(bodyParser.json())

const port = 3000;

// root
app.get('/', (req, res) => {
    res.send('Welcome to my beta server broh!');
});

const dataPath = "./users.json"

// save data
app.post('/save-data', (req, res) => {
    const newData = req.body


    fs.readFile(dataPath, 'utf8', (err, data) => {
        let existingData = []
        if (!err) {
            try {
                existingData = JSON.parse(data)
            } catch (parseErr) {
                console.error('Error parsing existing JSON data:', parseErr)
                return res.status(500).send('Error processing data')
            }
        }

        existingData.push(newData)

        const jsonString = JSON.stringify(existingData, null, 2)

        fs.writeFile(dataPath, jsonString, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing data to file:', writeErr)
                return res.status(500).send('Error saving data')
            }
            res.status(200).send('Data saved successfully!')
        })
    })
})


// register
app.post("/auth/register", (req, res) => { 
    const email = req.body.email
    const password = req.body.password
    const fs = require('fs')

    if(email === ""){
        res.send({"mensaje": "Email no puede estar vacio"})
    }
    // console.log("despues de la primera validacion")


    if(typeof email !== "string"){
        res.send({"mensaje": "Email invalido"})
    }
    // console.log("despues de la segunda validacion")S


    if(!password || password.length < 8){
        res.send({"mensaje": "Password debe contener al menos 8 caracteres"})
    }
    // console.log("despues de la tercera validacion")


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)){    // Se usa el regex para verificar si el email tiene un formato válido
        res.send({"mensaje": "Formato de email invalido"})
    }
    // console.log("despues de la cuarta validacion")


    console.log(users)
    
    const emailExiste = false
    if(emailExiste){
        res.send ({"mensaje": "Hemos recibido tu solicitud, recibirás un email"}) 
    }
    // console.log("despues de la quinta validacion")


    res.send ({"message": "Si el email existe, te enviamos un enlace, de verificacion"})
    
    // res.send('testing register');
});


// verify-email
app.post("/auth/verify-email", (req, res) => {
    console.log(req.body)
    res.send('testing verify-email')
})

// login
app.post("/auth/login", (req, res) => {
    console.log(req.body)
    res.send('testing login')
})

// logout
app.post("/auth/logout", (req, res) => {
    console.log(req.body)
    res.send('testing logout')
})

// me
app.get("/me", (req, res) => {
    res.send('testing me')
})

// sessions
app.get("/sessions/", (req, res) => {
    res.send('testing sesions')
})

// sesssions :id
app.get("/sessions/:id", (req, res) => {
    res.send('testing sessions :id')
})

// forgot--password
app.post("/auth/forgot-password", (req, res) => {
    console.log(req.body)
    res.send('testing forgot-password')
})

// reset-password
app.post("/auth/reset-password", (req, res) => {
    console.log(req.body)
    res.send('testing reset-password')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})