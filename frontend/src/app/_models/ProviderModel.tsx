import DBModel from "./DBModel";


/*
* Modelo que representa un proveedor
*
* @param name Nombre del proveedor
* @param businessName Nombre de la empresa
* @param address Dirección del proveedor
* 
*/
class ProviderModel extends DBModel {
    name: string;
    businessName: string;
    address: string;

    constructor( json: any ) {
        super( json.id );

        this.name = `${json.name ?? ''}`.trim();
        this.businessName = `${json.businessName ?? ''}`.trim();
        this.address = `${json.address ?? ''}`.trim();
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            businessName: this.businessName,
            address: this.address,
        };
    }
}


export default ProviderModel;