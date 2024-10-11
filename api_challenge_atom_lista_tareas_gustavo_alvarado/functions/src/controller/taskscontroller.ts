import { Response } from 'express';
import { db } from '../config/firebase';
import { Timestamp } from 'firebase-admin/firestore';



type TaskType = {
    usuario_tarea: string,
    titulo_tarea: string,
    descripcion_tarea: string,
    estado_completado_tarea: boolean,
    fecha_creacion_tarea: Timestamp,
    id: string
}

type TaskTypeT = {
    usuario_tarea: string,
    titulo_tarea: string,
    descripcion_tarea: string,
    estado_completado_tarea: boolean,
    fecha_creacion_tarea: string,
    id: string
}


type Request = {
    body: TaskType,
    params: { taskId: string }
}

type Request_2 = {
    body: TaskType,
    params: { usuario_tarea: string }
}

const addTask = async (req: Request, res: Response) => {
    const { titulo_tarea, descripcion_tarea, estado_completado_tarea, usuario_tarea } = req.body;
    try {

        const fecha = new Date();

        const fecha_creacion_tarea = Timestamp.fromDate(new Date(fecha));

        console.log(fecha_creacion_tarea);

        const task = db.collection('tareas').doc();

        const taskObject = {
            id: task.id,
            titulo_tarea,
            descripcion_tarea,
            fecha_creacion_tarea,
            estado_completado_tarea,
            usuario_tarea
        };

        console.log(taskObject);

        await task.set(taskObject);

        res.status(200).send({
            status: 'Correcto',
            message: "Tarea creado satisfactoriamente.",
            data: taskObject
        });


    } catch (error) {
        res.status(500).json("Error al crear tarea");

    }
};

const deleteTask = async (req: Request, res: Response) => {
    const { taskId } = req.params;

    try {
        const task = db.collection('tareas').doc(taskId);

        await task.delete();

        res.status(200).send({
            status: "Correcto",
            message: "Tarea elminada satisfactoriamente."
        });

    } catch (error) {
        res.status(500).json(error);
    }

}

const updateTask = async (req: Request, res: Response) => {
    const { body: { id, titulo_tarea, descripcion_tarea, estado_completado_tarea, fecha_creacion_tarea, usuario_tarea }, params: { taskId } } = req;

    try {
        console.log(taskId);

        console.log("este es el estado " + estado_completado_tarea);

        const task = db.collection("tareas").doc(taskId);
        const currentData = (await task.get()).data() || {};

        console.log(currentData);


        const taskObject = {

            titulo_tarea: titulo_tarea || currentData.titulo_tarea,
            descripcion_tarea: descripcion_tarea || currentData.descripcion_tarea,
            estado_completado_tarea: estado_completado_tarea,
            fecha_creacion_tarea: fecha_creacion_tarea || currentData.fecha_creacion_tarea,
            usuario_tarea: usuario_tarea || currentData.usuario_tarea,
            id: id || currentData.id
        };

        console.log(taskObject);

        await task.set(taskObject);

        res.status(200).send({
            status: "Correcto",
            message: "Tarea actualizada satisfactoriamente.",
            data: taskObject,
        });

    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllTasks = async (req: Request, res: Response) => {
    try {
        const allTasks: TaskType[] = [];
        const tasksT: TaskTypeT[] = [];

        const querySnapshot = await db.collection("tareas").get();
        querySnapshot.forEach((doc: any) =>
            allTasks.push(doc.data())
        );


        allTasks.forEach((task: TaskType) => {

            const fireBaseTime = new Date(
                task.fecha_creacion_tarea.seconds * 1000 + task.fecha_creacion_tarea.nanoseconds / 1000000,
            );

            const date = fireBaseTime.toISOString();

            console.log(date);

            const titulo_tarea_temp = task.titulo_tarea;
            const descripcion_tarea_temp = task.descripcion_tarea;
            const estado_completado_tarea_temp = task.estado_completado_tarea;
            const usuario_tarea_temp = task.usuario_tarea;
            const id_temp = task.id;

            const newTask: TaskTypeT = {
                titulo_tarea: titulo_tarea_temp,
                descripcion_tarea: descripcion_tarea_temp,
                estado_completado_tarea: estado_completado_tarea_temp,
                fecha_creacion_tarea: date,
                usuario_tarea: usuario_tarea_temp,
                id: id_temp
            }
            tasksT.push(newTask);

        });


        res.status(200).send(tasksT);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllTasksUser = async (req: Request_2, res: Response) => {
    const { usuario_tarea } = req.params;
    try {
        const allTasks: TaskType[] = [];
        const tasksT: TaskTypeT[] = [];

        const querySnapshot = db.collection("tareas");
        const currentData = await querySnapshot.where('usuario_tarea', '==', usuario_tarea).orderBy("fecha_creacion_tarea", "desc").get();

        if (!currentData.empty) {
            currentData.forEach((doc: any) =>
                allTasks.push(doc.data())
            );


            //allTasks.sort()
            allTasks.forEach((task: TaskType) => {

                const fireBaseTime = new Date(
                    task.fecha_creacion_tarea.seconds * 1000 + task.fecha_creacion_tarea.nanoseconds / 1000000,
                );

                //const date = fireBaseTime.toISOString();

                const date = fireBaseTime.toISOString();


                //console.log(date);

                const titulo_tarea_temp = task.titulo_tarea;
                const descripcion_tarea_temp = task.descripcion_tarea;
                const estado_completado_tarea_temp = task.estado_completado_tarea;
                const usuario_tarea_temp = task.usuario_tarea;
                const id_temp = task.id;

                const newTask: TaskTypeT = {
                    titulo_tarea: titulo_tarea_temp,
                    descripcion_tarea: descripcion_tarea_temp,
                    estado_completado_tarea: estado_completado_tarea_temp,
                    fecha_creacion_tarea: date,
                    usuario_tarea: usuario_tarea_temp,
                    id: id_temp
                }
                tasksT.push(newTask);

            });


            res.status(200).send({
                status: "Correcto",
                message: "Se encontraron tareas para el usuario.",
                id: "1",
                data: tasksT
            });
        } else {
            res.status(200).send({
                status: "Error",
                message: "No se encontraron tareas para el usuario.",
                id: "2"
            })
        }


    } catch (error) {
        res.status(500).json(error);
    }
};



export { getAllTasks, addTask, deleteTask, updateTask, getAllTasksUser }

