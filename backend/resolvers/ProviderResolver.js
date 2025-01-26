const fs = require('fs');
const path = require('path');
const { loadJSONFile } = require('../utils/FileUtils');

/*
* Simula la tabla de proveedores
*/
const PROVIDERS_FILE = path.resolve(__dirname, '../data/providers.json');

/*
* ID de lógica simple:
*
* Se obtiene el último ID, considerando que el último es el mayor.
* Como opción, se podría usar otra lógica en el ID como UUID o Fecha ISO para
* evitar problemas con la generación de IDs.
*/
const getLastID = ( data ) => {
    let last_id = 0;

    /*
    * Verificamos que existan proveedores en el archivo JSON.
    */
    if ( ( data?.providers?.length ?? 0 ) > 0 ) {
        data.providers.forEach(provider => {
            /*
            * Convertimos el ID a entero para evitar problemas con la comparación.
            */
            let target_id = parseInt( provider.id, 10 );
    
            if ( target_id > last_id ) {
                last_id = target_id;
            }
        });
    }

    return last_id;
}


/*
* Acciones de proveedores
* CRUD
*/
const ProviderResolver = {
    Query: {
        listProviders: (_, { limit, offset }) => {
            const data = loadJSONFile( PROVIDERS_FILE );

            const start = offset || 0;
            const end = limit ? start + limit : data.length;

            return data.slice( start, end );
        },
        viewProvider: ( _, args ) => {
            const { id } = args;
            const data = loadJSONFile( PROVIDERS_FILE );
            
            const provider = data.providers.find( provider => `${provider.id}` === `${id}` );
            
            if ( !provider ) {
                return null;
            }
            
            return provider;
        },
    },
    Mutation: {
        createProvider: ( _, args ) => {
            const { input } = args;
            const data = loadJSONFile( PROVIDERS_FILE );
    
            /*
            * Validación:
            *
            * Si el proveedor ya existe, no se puede crear otro con el mismo nombre.
            * Verificamos el nombre de forma simple, sin importar mayúsculas o minúsculas.
            * Sin embargo no existe una validación compleja, por ejemplo acentos, caracteres especiales, etc.
            */
            const existing_provider = data.providers.find( provider => provider.name.toLowerCase() === input.name.toLowerCase() );
    
            if ( existing_provider ) {
                return null;
            }
            
            const new_provider = {
                id: String(  getLastID(data) + 1 ),
                name: input.name,
                businessName: input.businessName,
                address: input.address
            };
    
            data.providers.push(new_provider);
            fs.writeFileSync( PROVIDERS_FILE, JSON.stringify(data, null, 4) );
    
            return new_provider;
        },
        updateProvider: ( _, { id, input } ) => {
            const data = loadJSONFile( PROVIDERS_FILE );
    
            /*
            * Validación:
            *
            * Si el proveedor no existe, no se puede actualizar.
            * Verificamos el ID para saber si el proveedor existe.
            */
            const provider_index = data.providers.findIndex( provider => provider.id === id );
    
            if ( provider_index !== -1 ) {
                data.providers[provider_index] = {
                    id,
                    name: input.name,
                    businessName: input.businessName,
                    address: input.address
                };
    
                fs.writeFileSync( PROVIDERS_FILE, JSON.stringify(data, null, 4) );
    
                return data.providers[provider_index];
            }
    
            return false;
        },
        deleteProvider: ( _, { id } ) => {
            const data = loadJSONFile( PROVIDERS_FILE );
    
            /*
            * Validación:
            *
            * Si el proveedor no existe, no se puede eliminar.
            * Verificamos el ID para saber si el proveedor existe.
            */
            const provider_index = data.providers.findIndex( provider => provider.id === id );
    
            if ( provider_index !== -1 ) {
                data.providers.splice( provider_index, 1 );
    
                fs.writeFileSync( PROVIDERS_FILE, JSON.stringify(data, null, 4) );
    
                return true;
            }
    
            return false;
        },
    }
};


module.exports = ProviderResolver;
