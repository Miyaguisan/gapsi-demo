import DBModel from "./DBModel";

/*
* Modelo que representa un candidato
*
* @param name Nombre del candidato
* @param lastName Apellido paterno del candidato
* @param maidenName Apellido materno del candidato
* @param email Correo electrónico del candidato
* @param dateCreated Fecha de creación del candidato
* @param dateUpdated Fecha de actualización del candidato
*/
class CandidateModel extends DBModel {
	name: string;
	lastName: string;
	maidenName: string;
	email: string;

	constructor( json: any ) {
		super( json );

		this.name = json.name;
		this.lastName = json.lastName;
		this.maidenName = json.maidenName;
		this.email = json.email;
	}

	fullName() {
		return `${this.name} ${this.lastName} ${this.maidenName}`.trim();
	}
}


export default CandidateModel;