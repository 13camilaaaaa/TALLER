import { solicitud } from "./module.js";

const cargar1 = async () => {
    const ciudades = await solicitud('ciudades');
    const responce = await Promise.all(
        ciudades.map(async (ciudad) => {
            //usuarios
            const usuarios = await solicitud(`usuarios?cityId=${ciudad.id}`);
            return { nombre: ciudad.name, Usuarios: usuarios };
        })
    )
    console.log(responce);
}

const cargar2 = async () => {
    const users = await solicitud('usuarios');
    const responce = await Promise.all(
        users.map(async (user) => {
            //materias
            const materias = await solicitud(`materia_usuario?userId=${user.id}`);
            const materia_usuario = await Promise.all(
                materias.map(async (materia) => {
                    //materias y promedios
                    const matename = await solicitud(`materias?id=${materia.subjectId}`);
                    const nombreMate = matename[0]?.name || "nombre desconocido";
                    const notas = await solicitud(`notas?subjectUserId=${materia.subjectId}`);

                    const valoresNotas = Array.isArray(notas)
                        ? notas.map(nota => nota.note).filter(nota => typeof nota === 'number' && !isNaN(nota)): [];

                    const promedio = valoresNotas.length > 0 ? [(valoresNotas.reduce((acc, nota) => acc + nota, 0) / valoresNotas.length).toFixed(2)] : [0];

                    return { nombre: nombreMate, promedio: promedio };
                })
            );
            return { nombre: user.name, Materias: materia_usuario };
        })
    )
    console.log(responce);
}

cargar1();
cargar2()