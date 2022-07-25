const fs = require('fs');

const path = './db/data.json';

const saveDB = ( data ) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

const readDB = () => {

    if( !fs.existsSync(path) ){
        return {};
    }

    const info = fs.readFileSync(path, 'utf-8');
    const data = JSON.parse( info );

    return data;
    
}


module.exports = {
    saveDB,
    readDB
}