# challenge_atom_lista_tareas_gustavo_alvarado
Challenge de Atom de aplicación de lista de tareas Gustavo Alvarado


Mi repositorio en github de manera publica, aquí se encuentra el código fuente,

https://github.com/fofito05/challenge_atom_lista_tareas_gustavo_alvarado

backend 
api_challenge_atom_lista_tareas_gustavo_alvarado

frontend
frontend_challenge_atom_lista_tareas_gustavo_alvarado

Aplicación publicada en firebase hosting
https://atom-challenge-lista-tareas.web.app

Api Backend Hosteado en cloudfunctions 
https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net

con los métodos

GET /tasks: Obtener la lista de todas las tareas.

Lo trabaje a nivel de tareas en general
https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/tasks


y tambien lo trabaje por usuario, este fue el que integre al frontend
https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/tasks/graa33016@gmail.com


POST /tasks: Agregar una nueva tarea.
https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/tasks

request
{
    "usuario_tarea": "graa33016@gmail.com",
    "titulo_tarea": "Cargas de Archivo",
    "descripcion_tarea": "Cargas de archivo.",
    "estado_completado_tarea": false

}

response
{
    "status": "Correcto",
    "message": "Tarea creado satisfactoriamente.",
    "data": {
        "id": "FbZNGbPzbXR1K2OiGpxT",
        "titulo_tarea": "Cargas de Archivo",
        "descripcion_tarea": "Cargas de archivo.",
        "fecha_creacion_tarea": {
            "_seconds": 1728590302,
            "_nanoseconds": 319000000
        },
        "estado_completado_tarea": false,
        "usuario_tarea": "graa33016@gmail.com"
    }
}


PUT /tasks/{taskId}: Actualizar los datos de una tarea existente.

https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/tasks/tpQn3EgXmYFjvQlT2QWj

Al actualizasr tareas, se tiene 2 formas desde el frontend, es para solo actualizar el estado de completado o el titulo/descripcion, 
para ello en cada proceso lo que se debe hacer es enviar vacío los campos que no se requieran actualizar, proque a nivel de lógica en 
el método toma los valores de la base de datos de firestore de la tarea, estos los coloca en el body al request para consumir conector
de firestore.

request
{
    "titulo_tarea": "Pruebas API BackEnd Produccion",
    "descripcion_tarea": "Pruebas de API BackEnd Produccion para proceso de datos.",
    "estado_completado_tarea": true,
    "fecha_creacion_tarea":"",
    "usuario_tarea":""

}

response
{
    "status": "Correcto",
    "message": "Tarea actualizada satisfactoriamente.",
    "data": {
        "titulo_tarea": "Pruebas API BackEnd Produccion",
        "descripcion_tarea": "Pruebas de API BackEnd Produccion para proceso de datos.",
        "estado_completado_tarea": true,
        "fecha_creacion_tarea": {
            "_seconds": 1728601859,
            "_nanoseconds": 720000000
        },
        "usuario_tarea": "graa33016@gmail.com"
    }
}

DELETE /tasks/{taskId}: Eliminar una tarea existente.

https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/tasks/hDan4rr2Nw1wE6ny38Aj

response
{
    "status": "Correcto",
    "message": "Tarea elminada satisfactoriamente."
}
GET /users/{email}: Busca el usuario si ha sido creado

https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/users/graa33016@gmail.com

Aqui valida si existe el usuario, sino existe se envía en el campo id dentro del response el valor 0, esto porque la consulta
esta funcionando y no hay error en el sistema pero no encuentra el usuario, al encontrar el usuario se envá en el id el 1.
response
{
    "status": "Correcto",
    "message": "Se encontró el usuario.",
    "id": "1"
}

POST /users : Agrega un nuevo usuario

https://us-central1-atom-challenge-lista-tareas.cloudfunctions.net/app/users

{
    "correo_usuario": "hola@hola.com"
}


Para el Frontend utilice la version 16 de Angular 

El portal se maneja de 2 vistas login y dashboard,

Para el login si no existe el usuario (correo electronico) en la base de datos,
se abre un dialog para la confirmación del registro, con el registro se accede al dashboard,
de igual manera si existe el usuario accede al mismo.

En el dashboard encontrará una vista con una tabla, en el cual se carga las tareas creadas por el usuario,
con esto puede agregar tareas, eliminar tareas, actualizar título o descripción, además cambiar el estado
a completado de la tarea, pero esto es una actualización de este campo en la base de datos.

Los datos mostrados son de la base de datos, se trabajo en validar la fecha, convertirla en formato que lo 
entendiera el usuario, esto a que en firestore maneja las fechas como Timestamp, esto igual para el registro
de tareas, en el backend se convierte la fecha en Timestamp.

Agregué en el dashboard un filtro para obtener las tareas de manera rápida, de igual manera con un botónd e cerrar sesión,
este cierra la sesión y enruta a la vista del login, funciona igual con actualizar el portal, esto para un manejo de seguridad.




