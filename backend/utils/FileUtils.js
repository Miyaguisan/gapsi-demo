const fs = require('fs');


const loadJSONFile = ( file_path ) => {
    try {
        if ( !fs.existsSync( file_path ) ) {
            let last_path_component = file_path.split('/').pop();
            
            throw new Error( `Archivo "${last_path_component}" no encontrado` );
        }

        const data = fs.readFileSync( file_path, 'utf8' );

        return JSON.parse( data );
    }
    catch( error ) {
        console.error( 'Error al cargar el archivo:', error.message );

        throw new Error( 'CandidateResolver error' );
    }
};


module.exports = {
    loadJSONFile
};