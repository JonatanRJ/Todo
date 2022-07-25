const Todo = require("./todo");

class Todos {

    _list = {};

    constructor() {
        this._list = {};
    }

    loadArray( data=[] ){
        data.forEach( to => {
            this._list[to.id] = new Todo(to.description, to.id, to.finished);
        })
    }

    get listArray(){

        const list = [];

        Object.keys(this._list).forEach( key => list.push(this._list[key]) );

        return list;
    }

    completeList(){
        this.listArray.forEach( (to, cont ) => {
            cont += 1;
            console.log(`${cont.toString().green}${'.-'.green} ${to.description.yellow} :: ${to.finished !== null ? 'Completada'.green: 'Pendiente'.red}`)
        })
    }

    pendingList(finish = true ){
        let cont = 0
        this.listArray.forEach( to => {
            if( finish ){
                if(to.finished){
                    cont += 1;
                    console.log(`${cont+'.-'.green} ${to.description.yellow} :: ${to.finished.gray}`)
                }
            }
            else{
                if(!to.finished){
                    cont += 1;
                    console.log(`${cont+'.-'.green} ${to.description.yellow} :: ${'Pendiente'.red}`)
                }
            }
        })
    }

    createTodo( description = '') {
        const todo = new Todo(description);
        this._list[todo.id] = todo;
    }

    deleteTodo( id = '') {
        console.log(this._list[id])
        if( this._list[id] ){
            console.log(this._list[id])
            delete this._list[id];
        }
    }

    toggleFinished( ids = [] ){
        
        ids.forEach( id => {
            
            if( !this._list[id].finished ) {
                this._list[id].finished = new Date().toISOString();
            }

        });

        this.listArray.forEach( to => {
            if( !ids.includes(to.id) ){
                this._list[to.id].finished = null;
            }
        })

    }
}

module.exports = Todos;