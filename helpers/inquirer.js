const inquirer = require('inquirer')
require('colors')

// Elementos del menú interactivo de node
const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tareas`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar tareas`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            },
        ]
    },
    {
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.green} para continuar`,
    }
]


const inquirerMenu = async() => {

    console.clear();
    console.log('==========================='.green)
    console.log('   Seleccione una opcion  '.white)
    console.log('===========================\n'.green)  

    const {opcion} = await inquirer.prompt(questions[0])

    return opcion;
    
}

const pausa = async() => {
    console.log('\n');
    const pausa = await inquirer.prompt(questions[1])
    
    return pausa

}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }

        }
    ];

    const { desc } = await inquirer.prompt(question)
    return desc;

}

const listadoBorrarTareas = async ( tareas = []) => {
    
    const choices = tareas.map( (tarea, i) => {
    const idx = `${ i + 1 }.`.green

        return {    
            value: tarea.id, 
            name: `${ idx } ${tarea.desc}`
        }
    });

    choices.push({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            pageSize: 10,
            loop: false,
            message: 'Borrar',
            choices
        }
    ]
        
    const { id } = await inquirer.prompt(preguntas)
    return id
}

const confirm = async ( message ) => {


    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
                
        }
    ]

    const { ok } = await inquirer.prompt(preguntas)
    return ok

}


const mostrarListadoTareasCheck = async ( tareas = []) => {
    
    const choices = tareas.map( (tarea, i) => {
    const idx = `${ i + 1 }.`.green

        return {    
            value: tarea.id, 
            name: `${ idx } ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });


    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
        
    const { ids } = await inquirer.prompt(preguntas)
    return ids
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrarTareas,
    confirm,
    mostrarListadoTareasCheck,
}