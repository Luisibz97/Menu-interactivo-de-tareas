require('colors');

const { inquirerMenu, 
        pausa,
        leerInput,
        listadoBorrarTareas,
        confirm,
        mostrarListadoTareasCheck,
} = require('./helpers/inquirer');

const {saveDB, readDB} = require('./helpers/save-data');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');




console.clear()

const main = async () => {

    let opt = '';
    const tareas = new Tareas

    const tareaDB = readDB()

    if (tareaDB) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareaDB)
    }

    
    do {
        // Imprime el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            // Crea una opcion
            case '1':
                const desc = await leerInput('Descripción:')
                tareas.crearTarea( desc );
            break;

            // Listar tareas
            case '2':
                console.log();
                tareas.listadoCompleto()
            break;
            
            // Listar completadas
            case '3':
                tareas.listarPendientesCompletadas()
            break;

            // Listar Pendientes
            case '4':
                tareas.listarPendientesCompletadas(false)
            break

            // Completar tareas
            case '5':
                const ids = await mostrarListadoTareasCheck( tareas.listadoArr )
                tareas.toggleCompletadas( ids )
            break

            // Borrar tareas
            case '6':
                const id = await listadoBorrarTareas( tareas.listadoArr )
                if ( id !== '0' ) {
                    const ok = await confirm( '¿Está seguro de esto?' )
                    if(ok) {
                        tareas.borrarTarea( id )
                        console.log('Tarea borrada');
                    
                } 
                }

            break
        }
        
        saveDB(tareas.listadoArr)

        if (opt !== '0' ) await pausa();
        
    } while (opt !== '0');


}

main()