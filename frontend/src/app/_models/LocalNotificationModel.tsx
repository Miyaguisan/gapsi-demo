/*
* Tipos válidos de notificaciones
*/
export const NotificationTypes = {
	success: 'success',
	error: 'error',
	warning: 'warning',
	info: 'info'
};


/*
* Modelo que representa una notificación local
*
* @param id Identificador único de la notificación
* @param title Título de la notificación
* @param body Cuerpo de la notificación
*/
class LocalNotificationModel {
	id: string;
	body: string;
	title: string;
	type: string = NotificationTypes.info;

	constructor( {id, title, body, type=NotificationTypes.info}: {id: string, title: string, body: string, type: string} ) {
		if (!id) {
			throw new Error( 'ID requerido' );
		}

		/*
		* Comprobamos que el título y el cuerpo no estén vacíos
		*/
		let tested_title = `${title}`.trim();
		let tested_body = `${body}`.trim();

		if (tested_title.length === 0 || tested_body.length === 0) {
			throw new Error( 'Contenido de notificación faltante' );
		}

		/*
		* Comprobamos que el tipo de notificación sea válido
		*/
		if (type !== NotificationTypes.success && type !== NotificationTypes.error && type !== NotificationTypes.warning && type !== NotificationTypes.info) {
			throw new Error( 'Tipo inválido de notificación' );
		}

		this.id = id;
		this.body = body;
		this.title = title;
		this.type = type;
	}
}


export default LocalNotificationModel;