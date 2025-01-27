import { v4 } from 'uuid';

/*
* Modelo base para los objetos de la base de datos
*
* @param id: number - Identificador del objeto en la base de datos
* @param tempId: string - Identificador temporal del objeto
*/
class DBModel {
    id?: number;
    tempId?: string;

    constructor(id?: number) {
        this.id = id;
        
        /*
        * En caso de no tener id, se genera un identificador temporal.
        * Esto es útil para objetos que aún no han sido guardados en la base
        * de datos, por ejemplo aquellos que se están creando en la interfaz
        */
        if (!id) {
            this.tempId = v4();
        }
    }

    toJSON() {
        return {
            id: this.id,
            tempId: this.tempId
        };
    }
    
    toString() {
        return JSON.stringify(this.toJSON());
    }
}


export default DBModel;