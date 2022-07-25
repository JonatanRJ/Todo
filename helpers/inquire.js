require('colors');

const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'option',
        message:'¿Qué desea hacer?',
        choices: [
            {
                value:'1',
                name:`${'1.-'.green} Crear Tarea`,
            },
            {
                value:'2',
                name:`${'2.-'.green} Listar Tareas`,
            },
            {
                value:'3',
                name:`${'3.-'.green} Tareas Completadas`,
            },
            {
                value:'4',
                name:`${'4.-'.green} Listas Pendientes`,
            },
            {
                value:'5',
                name:`${'5.-'.green} Completar Tarea(s)`,
            },
            {
                value:'6',
                name:`${'6.-'.green} Borrar Tarea`,
            },
            {
                value:'0',
                name:`${'0.-'.green} Salir`,
            },
        ]
    }
];

const inquirerMenu = async () =>{
    console.clear();
    console.log('========================='.cyan);
    console.log(`${'='.cyan} ${'Seleccione una opción'.blue} ${'='.cyan}`);
    console.log('=========================\n'.cyan);

    const {option} = await inquirer.prompt(questions);
    return option;
}

const pause = async () =>{
    console.log('\n');
    return await inquirer.prompt(
        [{
            type: 'input',
            name: 'continue',
            message: `Presione ${'ENTER'.yellow} para avanzar...\n`,
        }]
    );
}

const readDescription = async ( message ) =>{
    const {description} = await inquirer.prompt(
        [{
            type: 'input',
            name: 'description',
            message,
            validate( value ){
                if( value.length === 0 ) {
                    return 'Ingresar una descripción';
                }
                return true;
            }
        }]
    );
    return description;
}

const inquirerDeleteToDo = async ( todos = []) => {

    const choices = todos.map( (to,i) => {
        i += 1;
        return {
            value: to.id,
            name: `${i+'.-'.green} ${to.description.yellow}`
        }
    });

    choices.unshift(
        {
            value:'0',
            name: `${'0.-'.green} cancelar`
        }
    )

    const { id } = await inquirer.prompt(
        [{
            type:'list',
            name: 'id',
            choices
        }]
    );

    return id;
}

const confirm = async (message) => {
    const {ok} = await inquirer.prompt(
        [{
            type:'confirm',
            name: 'ok',
            message
        }]
    )
    return ok;
}

const inquirerCheckList = async ( todos = []) => {

    const choices = todos.map( (to,i) => {
        i += 1;
        return {
            value: to.id,
            name: `${i+'.-'.green} ${to.description.yellow}`,
            checked: (to.finished !== null ) ? true : false,
        }
    });


    

    const { ids } = await inquirer.prompt(
        [{
            type:'checkbox',
            name: 'ids',
            choices
        }]
    );

    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readDescription,
    inquirerDeleteToDo,
    confirm,
    inquirerCheckList
}