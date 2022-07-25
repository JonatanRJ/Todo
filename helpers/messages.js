require('colors');

const showMenu = () => {

    return new Promise( resolve =>{
        console.clear();
        console.log('========================='.cyan);
        console.log(`${'='.cyan} ${'Seleccione una opción'.blue} ${'='.cyan}`);
        console.log('=========================\n'.cyan);
    
        console.log(`${'1.-'.green} Crear Tarea`);
        console.log(`${'2.-'.green} Listar Tareas`);
        console.log(`${'3.-'.green} Tareas Completadas`);
        console.log(`${'4.-'.green} Listas Pendientes`);
        console.log(`${'5.-'.green} Completar Tarea(s)`);
        console.log(`${'6.-'.green} Borrar Tarea`);
        console.log(`${'0.-'.green} Salir \n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Seleccione una opcion: ', (option) =>{
            readLine.close();
            resolve(option);
        });
    });


}

const pause = () =>{

    return new Promise( resolve =>{
        const pauseLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        pauseLine.question(`\nPresionar ${'ENTER'.yellow} para continuar...\n`, () =>{
            pauseLine.close();
            resolve();
        })
    })
}

module.exports = {
    showMenu,
    pause
}