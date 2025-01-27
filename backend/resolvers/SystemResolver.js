const path = require('path');
const { loadJSONFile } = require('../utils/FileUtils');

/*
* Simula la tabla de sistema
*/
const SYSTEM_FILE = path.resolve(__dirname, '../data/system.json');

/*
* No se implementan acciones CRUD.
* Solamente se obtiene la información del sistema.
*/
const SystemResolver = {
    Query: {
        viewSystem: (_, { property }) => {
            const system_data = loadJSONFile( SYSTEM_FILE );

            const keys = Object.keys( system_data );

            if ( system_data.system.hasOwnProperty( property ) ) {
                return system_data.system[property];
            }
    
            /*
            * Propiedad no encontrada en el sistema.
            */
            return `Property '${property}' not found in the system.`;
        }
    }
};


module.exports = SystemResolver;
