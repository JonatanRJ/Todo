const {v4} = require('uuid');

class Todo {
    id = '';
    description = '';
    finished = null

    constructor(description, id = v4(), finished = null ) {
        this.id = id;
        this.description = description;
        this.finished = finished;
    }
}

module.exports = Todo;