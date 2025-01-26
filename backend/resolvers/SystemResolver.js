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
        viewSystem: ({ property }) => {
            const system_data = loadJSONFile();

            if ( system_data.hasOwnProperty( property ) ) {
                return system_data[property];
            }
    
            // Si la propiedad no se encuentra, puedes devolver un valor específico.
            // Puedes lanzar un error o devolver un mensaje indicando que no existe.
            return `Property '${property}' not found in the system.`;
        }
    }
};


module.exports = SystemResolver;
