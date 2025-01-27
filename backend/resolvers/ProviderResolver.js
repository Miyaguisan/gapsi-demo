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
        listProviders: (_, { limit=10, offset=0 }) => {
            const data = loadJSONFile( PROVIDERS_FILE );
            
            const total_providers = data.providers.length;
            const total_pages = limit ? Math.ceil( total_providers / limit ) : 1;

            limit = Math.min( limit, total_providers );

            let start = offset;
            let end = start + limit;

            /*
            * Validación:
            *
            * Si el offset es mayor o igual al total de proveedores, se ajusta el offset.
            * Esto evitará paginaciones vacías.
            */
            if ( start >= total_providers ) {
                start = Math.max( total_providers - limit, 0 );
                end = total_providers;
            }
            
            const trimmed_providers = data.providers.slice( start, end );

            return {
                providers: trimmed_providers,
                pages: total_pages,
                items: total_providers,
            };
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
            const provider_index = data.providers.findIndex( provider => `${provider.id}` === `${id}` );
    
            if ( provider_index !== -1 ) {
                let deleted_provider = data.providers[provider_index];

                data.providers.splice( provider_index, 1 );

                fs.writeFileSync( PROVIDERS_FILE, JSON.stringify(data, null, 4) );

                return deleted_provider;
            }
    
            return null;
        },
    }
};


module.exports = ProviderResolver;
