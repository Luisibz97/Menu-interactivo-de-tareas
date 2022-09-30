const Tarea = require("./tarea");


class Tareas {
    // Listado vacio donde se almacenan las tareas
    _listado= {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key  => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }
    
    
    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {

        if(this._listado[id]) {
            delete this._listado[id];
        }


    }
    
    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    } 


    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc)

        //Esto inserta la tarea en el listado
        this._listado[tarea.id] = tarea
        // console.log(this._listado);
    }


    listadoCompleto() {
        
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) 
                                ? 'Completada'.green
                                : 'Pendiente'.red

            console.log(`${idx}${'.'.green} ${desc} :: ${estado}`);
        })
    }


    listarPendientesCompletadas(completadas = true) {
        
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
        
            if (completadas) {
            
                if (completadoEn) {

                    console.log(`${ idx }${'.'.green} ${ desc } :: ${ completadoEn }`);
                }
            }
        
            if (!completadas) {
                
                if (!completadoEn) {
    
                    console.log(`${ idx }${'.'.green} ${ desc } :: ${ completadoEn }`);
                }
            }
        })
    }

    toggleCompletadas = ( ids = [] ) => {

         ids.forEach(id => {

            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }

         });

         this.listadoArr.forEach(tarea => {

            if ( !ids.includes(tarea.id) ) {

                this._listado[tarea.id].completadoEn = null
                // const tarea = this._listado[id]
                // tarea.completadoEn = null

            }

         })


    }



}


module.exports = Tareas