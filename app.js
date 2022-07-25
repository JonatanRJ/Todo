require('colors');

const { inquirerMenu, pause, readDescription, inquirerDeleteToDo, confirm, inquirerCheckList } = require('./helpers/inquire');
const { saveDB, readDB } = require('./helpers/managmentDB');
const Todos = require('./models/todos');

console.clear();

const main = async() => {
    
    let opt = '';
    const todos = new Todos();
    const infoDB = readDB();
    
    if( infoDB ){
        todos.loadArray( infoDB );
    }
    
    do {
        opt = await inquirerMenu();
        
        switch( opt ){
            case '1':
                const description = await readDescription(`${'Descripción: '.blue}`)
                console.log(description);
                todos.createTodo( description );
                break;

            case '2':
                todos.completeList()
                break;

            case '3':
                todos.pendingList(true);
                break;

            case '4':
                todos.pendingList(false);
                break;

            case '5':
                const ids = await inquirerCheckList(todos.listArray);
                todos.toggleFinished( ids );
                break;

            case '6':
                const id = await inquirerDeleteToDo(todos.listArray);
                if( id !== '0'){
                    const ok = await confirm('¿Está seguro?');
                    if( ok ){
                        todos.deleteTodo( id );
                    }
                }
                break;

            case '0':
                break;
            
        }

        saveDB(todos.listArray);
        await pause();

    } while( opt !== '0' );
}

main();