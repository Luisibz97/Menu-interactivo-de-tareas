const { rejects } = require('assert');
const { read } = require('fs');
const { resolve } = require('path');

require('colors');


const mostrarMenus = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('==========================='.green)
        console.log('   Seleccione una opcion  '.blue)
        console.log('===========================\n'.green)

        console.log(`${'1'.green}. Crear una tarea`);
        console.log(`${'2'.green}. Listar tareas`);
        console.log(`${'3'.green}. Listar tareas completa`);
        console.log(`${'4'.green}. Listar tareas pendientes`);
        console.log(`${'5'.green}. Cpmpletar tarea(s)`);
        console.log(`${'6'.green}. Borrar tareas`);
        console.log(`${'7'.green}. Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })
        
    })
}
const pausa = () => {
    
    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresione ${'Enter'.green} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    })


}

module.exports = {
    mostrarMenus,
    pausa,
}