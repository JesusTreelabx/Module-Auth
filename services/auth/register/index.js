
function registerUser(email, password){

    if(email === ""){
        return "Email no puede estar vacio"
    }
    if(typeof email !== "string"){
        return "Email invalido"
    }
    if(!password || password.length < 8){
        return "Password debe contener al menos 8 caracteres"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)){    // Se usa el regex para verificar si el email tiene un formato válido
        return "Formato de email invalido"
    }

    const emailExiste = false // Simula la verificación en la base de datos para saber si el email ya está registrado
    if(emailExiste){
        return "Hemos recibido tu solicitud, recibirás un email"
    }

    return {"message": "Si el email existe, te enviamos un enlace, de verificacion"}
}

console.log(registerUser("viniciusjr@gmail.com", "12345678"))