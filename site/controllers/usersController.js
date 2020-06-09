const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require('multer');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    root: (req, res) => {
        res.render('usuario', {title: 'Usuario'});
    },
    login: (req, res) => {
        res.render('login', {title: 'Login'});
    },
    register: (req, res) => {
        res.render('register', {title: 'Registrar Usuario'});
    },
    card: (req, res) => {
        res.render('tarjeta', {title: 'Registrar Tarjeta'});
    },
    crearCuenta: (req, res) => {
        res.render('crearcuenta', {title: 'Crear Cuenta'});
    },
    registrarCuenta: (req, res) => {
        const body = req.body;
        const cantidadUsuarios = users.length;
        const nuevoID = cantidadUsuarios + 1;
        //comparacion de contraseñas
        if(body.password != body.repeat_password){
            return res.render('contrasenaNoCoincide');
        };
        //datos que llegan en la peticion
        const usuarioAGuardar = {
            id: nuevoID,
            nombre: body.nombre_usuario,
            email: body.email,
            telefono: body.telefono,
            password: bcrypt.hashSync(body.password, 10),
            avatar: req.file.filename
        };
        users.push(usuarioAGuardar);
        fs.writeFileSync('data/users.json', JSON.stringify(usuarioAGuardar) + '\n');
        return res.render('usuarioExitoso');
    }
};

module.exports =  usersController;
