import { solicitud } from "./module.js";

const cargar1 = async () => {
    const ciudades = await solicitud('ciudades');
    const responce = await Promise.all(
        ciudades.map(async (ciudad) => {
            //usuarios
            const usuarios = await solicitud(`usuarios?cityId=${ciudad.id}`);
            return { ...ciudad, usuarios };
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
                    const matename = await solicitud(`materias?id=${materia.subjectId}`);
                    return {...matename} ;
                })
            );
            return { ...user, Materias: materia_usuario };
        })  
    )
    console.log(responce);
    
    
}
//materia_usuario?userId=${user.id}

cargar1();
cargar2()