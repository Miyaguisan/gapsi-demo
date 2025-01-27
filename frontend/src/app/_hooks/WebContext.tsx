'use client';

import React from 'react';
import NotificationsContainer from '@/app/_components/navigation/NotificationContainer';
import LocalNotificationModel from '../_models/LocalNotificationModel';

//import '../_css/notification.css';

const WebContext = React.createContext<any>( null );

export const useWebContext = () => React.useContext( WebContext );

/*
* Contexto global para la aplicación web.

* Este contexto provee funciones para mostrar modales y notificaciones de una forma más organizada.
* Dando prioridad a las notificaciones, ya que estas se muestran en la parte superior de la pantalla.
* Modales en la parte central de la pantalla.
* Interfaz de navegación en la parte más interna de la pantalla.
* 
* También, Esta estructura permite que los modales y notificaciones se muestren por encima
* de cualquier otro componente sin importar los cambios de rutas o de estado de la aplicación.
*/
export const WebContextProvider = ( props: any ) => {
	const [modals, setModals] = React.useState<React.ReactElement[]>( [] );

	const notification_container_ref = React.useRef<any>( null );

	/*
	* Agrega un nuevo modal si no existe uno con la misma llave.
	*/
	const addModal = ( modal: React.ReactElement ) => {
        if (modals.find(( item: any ) => item.key === modal.key)) {
            return;
        }

        setModals([...modals, modal]);
    };

	/*
	* Remueve un modal por su llave.
	*/
	const removeModal = ( modal_key: string ) => {
		setModals(modals.filter(( modal: any ) => modal.key !== modal_key));
	};

	/*
	* Agrega una nueva notificación.
	* No es necesario verificar si ya existe una notificación con la misma
	* llave, ya que las notificaciones se muestran una encima de la otra.
	*/
    const addNotification = ( notification: LocalNotificationModel ) => {
		notification_container_ref?.current?.addNotification?.(notification);
	};

	const context_object = {
		addModal,
		addNotification,
		removeModal
	};

	return <WebContext.Provider value={context_object}>
		{props.children}
		{modals.length > 0 && <div id="custom-modal-container">{modals}</div>}
		<NotificationsContainer ref={notification_container_ref} />
	</WebContext.Provider>
};
