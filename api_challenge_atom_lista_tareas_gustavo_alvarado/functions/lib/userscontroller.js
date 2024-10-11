"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.addUser = void 0;
const firebase_1 = require("./config/firebase");
const addUser = async (req, res) => {
    const { correo_usuario } = req.body;
    try {
        const user = firebase_1.db.collection('users').doc();
        const userObject = {
            id: user.id,
            correo_usuario
        };
        await user.set(userObject);
        res.status(200).send({
            status: 'Correcto',
            message: "Usuario creado satisfactoriamente.",
            data: userObject
        });
    }
    catch (error) {
        res.status(500).json("Error al crear usuario");
    }
};
exports.addUser = addUser;
const findUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = firebase_1.db.collection("users");
        const currentData = await user.where('correo_usuario', '==', userId).get();
        /*
        await user.get().catch((error) => {
            res.status(202).send({
                status: "Error",
                message: "No se encontró el usuario."
            })
        });
        */
        if (!currentData.empty) {
            res.status(200).send({
                status: "Correcto",
                message: "Se encontró el usuario."
            });
        }
        else {
            res.status(204).send({
                status: "Error",
                message: "No se encontró el usuario."
            });
        }
    }
    catch (error) {
        res.status(500).json("Error al crear usuario.");
    }
};
exports.findUser = findUser;
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = firebase_1.db.collection('users').doc(userId);
        await user.delete();
        res.status(200).send({
            status: "Correcto",
            message: "Usuario elminado satisfactoriamente."
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.deleteUser = deleteUser;
const getAllUsers = async (req, res) => {
    try {
        const allUsers = [];
        const querySnapshot = await firebase_1.db.collection("users").get();
        querySnapshot.forEach((doc) => allUsers.push(doc.data()));
        res.status(200).send(allUsers);
    }
    catch (error) {
        res.status(500).json("Error al mostrar usuarios.");
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res) => {
    const { body: { correo_usuario }, params: { userId } } = req;
    try {
        const user = firebase_1.db.collection("users").doc(userId);
        const currentData = (await user.get()).data() || {};
        const userObject = {
            correo_usuario: correo_usuario || currentData.correo_usuario,
        };
        await user.set(userObject);
        res.status(200).send({
            status: "Correcto",
            message: "Usuario actualizado satisfactoriamente.",
            data: userObject,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=userscontroller.js.map