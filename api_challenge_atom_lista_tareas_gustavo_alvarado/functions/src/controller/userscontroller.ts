import { Response } from 'express';
import { db } from '../config/firebase';

type UserType = {
    correo_usuario: string

}

type Request = {
    body: UserType,
    params: { userId: string }
}


const addUser = async (req: Request, res: Response) => {
    const { correo_usuario } = req.body;
    try {

        const user = db.collection('users').doc();
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


    } catch (error) {
        res.status(500).json("Error al crear usuario");

    }
}

const findUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = db.collection("users");
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
                message: "Se encontró el usuario.",
                id:"1"
            });
        } else {
            res.status(200).send({
                status: "Error",
                message: "No se encontró el usuario.",
                id:"2"
            })
        }



    } catch (error) {
        res.status(500).json("Error al crear usuario.");
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = db.collection('users').doc(userId);

        await user.delete();

        res.status(200).send({
            status: "Correcto",
            message: "Usuario elminado satisfactoriamente."
        });

    } catch (error) {
        res.status(500).json(error);
    }

}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers: UserType[] = [];
        const querySnapshot = await db.collection("users").get();
        querySnapshot.forEach((doc: any) => allUsers.push(doc.data()));
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).json("Error al mostrar usuarios.");
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { body: { correo_usuario }, params: { userId } } = req;

    try {
        const user = db.collection("users").doc(userId);
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

    } catch (error) {
        res.status(500).json(error);
    }
}

export { addUser, updateUser, deleteUser, getAllUsers, findUser }