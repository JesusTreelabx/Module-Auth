

import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken"
import users from "./data/users.json" with {type: 'json'}
import fs from "fs"

const app = express();
app.use(bodyParser.json())

const port = 3000;

// root
app.get('/', (req, res) => {
    res.send('Welcome to my beta server broh!');
});



const dataPath = "./data/users.json"
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
    //buscar el email dentro de los usuarios.
    // 1.- que el email no este duplicado
    // 2.- que el email exista

    //si todo ok, colocar al usuario esa prop, isEmailVerified = true   
    
    //const email = req.body.email;
    //const isEmailConfirmed = req.body.isEmailConfirmed;

    const {email, isEmailConfirmed} = req.body
    console.log(email)
    console.log(isEmailConfirmed)
    
    

    //1.-Parte para detectar duplicados
    const uniqueEmails = new Set()
    const duplicados = []

    users.forEach(user => {
        if(uniqueEmails.has(user.email)){
            duplicados.push(user.email)
        } else {
            uniqueEmails.add(user.email)
        }
    })

    if(duplicados.includes(email)){
        res
            .status(409)
            .send({
                message: "Al parecer el email esta duplicado, contacta a soporte"
            })
    }

    //2.- Verificar que el email exista

    //actualiza el json con esa prop: isEmailVerified: true

    const updatedUser = {
        email: existsEmail.email,
        password: existsEmail.password,
        isEmailConfirmed: true
    }

    console.log(updatedUser)
    
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
        
        const dataAActualizar = existingData.filter(user => user.email !== email)
        dataAActualizar.push(updatedUser)

        const jsonString = JSON.stringify(dataAActualizar, null, 2)

        fs.writeFile(dataPath, jsonString, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing data to file:', writeErr)
                return res.status(500).send('Error saving data')
            }
            res.status(200).send('Data saved successfully!')
        })
    })



    res
        .status(200)
        .send({
            message: "Email verificado correctamente"
        })
})



// login
app.post("/auth/login", (req, res) => {
    const {email, password} = req.body || {}

    // Validar que los campos no esten vacios
    if (!email || !password)
        return res.status(400).send({mensaje: "Email y contrasenia son requeridos"})

    const user = users.find(u => u.email === email)

    if(!user){
        return res.status(404).send({mensaje: "El usuario no existe!"})
    }
    if(user.password !== password){
        return res.status(400).send({mensaje: "La password es incorrecta!"})
    }
    if(!user.isEmailConfirmed){
        return res.status(400).send({mensaje: "EL email no ha sido verificado!"})
    }


    // Creando el token
    const clavePrivada = fs.readFileSync("private.key", "utf8")
    const payload = {
        id: user.id,
        nombre: user.email
    }
    const token = jwt.sign(payload, clavePrivada, { 
        algorithm: "HS256", 
        expiresIn: "1h" 
    })

    console.log(token)

    // Buscar usuario en users.json
    res.send({token})
})



// logout
app.post("/auth/logout", (req, res) => {
    //TODO!
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
    const {email} = req.body || {}

    if(!email){
        return res.status(400).send({mensaje: "Debe incluir un correo electronico"})
    }

    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000

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

        const existsEmail = existingData.find(user => user.email === email)
        if (!existsEmail) {
            return res.status(200).send({mensaje: "Si el email existe, le enviaremos instrucciones"})
        }

        const updatedUser = {
            email: existsEmail.email,
            password: existsEmail.password,
            passwordCode: code
        }
        console.log(updatedUser)


        const dataAActualizar = existingData.filter(user => user.email !== email)
        dataAActualizar.push(updatedUser)

        const jsonString = JSON.stringify(dataAActualizar, null, 2)

        fs.writeFile(dataPath, jsonString, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing data to file:', writeErr)
                return res.status(500).send('Error saving data')
            }

        })
    })

    res.status(200).send({
        mensaje: 'Hemos enviado un codigo a tu correo de de 4 digitos, verifica tu correo!'
    })
})




// reset-password
app.post("/auth/reset-password", (req, res) => {
    const {email, newPassword, passCode} = req.body || {}

    if(!newPassword || !email || !passCode){
        return res.status(400).send({mensaje: "Tus datos son incorrectos, verifica nuevamente"})
    }


    const user = users.find(u => u.email === email)
    console.log(user)

    if(!user){
        return res.status(404).send({mensaje: "EL usuario no fue encontrado"})
    }
    if(email !== user.email){
        return res.status(400).send({mensaje: "Porrfavor ingrese un correo valido!"})
    }
    if(passCode !== user.passCode){
        return res.status(401).send({mensaje: "El codigo de restablecimiento es incorrecto!"})
    }

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

        const existsEmail = existingData.find(user => user.email === email)
        if (!existsEmail) {
            return res.status(200).send({mensaje: "Si el email existe, le enviaremos instrucciones"})
        }

        const updatedUser = {
            email: email,
            password: newPassword
        }
        console.log(updatedUser)


        const dataAActualizar = existingData.filter(user => user.email !== email)
        dataAActualizar.push(updatedUser)

        const jsonString = JSON.stringify(dataAActualizar, null, 2)

        fs.writeFile(dataPath, jsonString, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing data to file:', writeErr)
                return res.status(500).send('Error saving data')
            }

        })
    })


    res.status(200).send({
        mensaje: 'Tu nueva contrasena se ha restablecido con exito!'
    })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

