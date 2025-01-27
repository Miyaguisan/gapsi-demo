import React from 'react';
import {
	NOTIFICATION_PRESENTATION_TIME,
	NOTIFICATION_TIMEOUT
} from '../../_utils/Constants';
import LocalNotificationModel from '../../_models/LocalNotificationModel';


import '../../_css/notification.css';


/*
* Una simple franja de color que indica el tipo de notificación
*/
const NotificationColorStripe = ( {type}: {type: string} ) => {
	return <div className={`notification-color-stripe ${type}`}></div>;
};

NotificationColorStripe.displayName = 'Notification Color Stripe';

/*
* Componente que representa una notificación
*
* @param notification: LocalNotificationModel - Modelo de notificación
* @param onDismiss?: Function - Función que se ejecuta al cerrar la notificación
*/
const NotificationComponent = ( {notification, onDismiss}: {notification: LocalNotificationModel, onDismiss?: Function} ) => {
	const [ visible, setVisible ] = React.useState<Boolean>( false );

	const auto_dismiss_timer = React.useRef<any>( null );

	React.useEffect(() => {
		setTimeout(() => {
			setVisible(true);
		}, NOTIFICATION_PRESENTATION_TIME);

		return () => {
			clearTimeout(auto_dismiss_timer.current);
		};
	}, []);

	React.useEffect(() => {
		if ( visible && auto_dismiss_timer.current === null ) {
			auto_dismiss_timer.current = setTimeout(() => {
				handleDismiss();
			}, NOTIFICATION_TIMEOUT);
		}

		return () => {};
	}, [visible]);

	const handleDismiss = () => {
		clearTimeout(auto_dismiss_timer.current);
		auto_dismiss_timer.current = null;

		setVisible(false);

		setTimeout(() => {
			onDismiss?.(notification.id);
		}, NOTIFICATION_PRESENTATION_TIME);
	};

	return <div id={notification.id} className={`custom-notification ${notification.type}${!visible ? ' hidden' : ''} rounded shadow-sm`} onClick={handleDismiss}>
		<NotificationColorStripe type={notification.type}/>
		<div className='d-flex flex-column'>
			<div className='notification-header'>
				<span className='notification-title'>{notification.title}</span>
			</div>
			<p>{notification.body}</p>
		</div>
	</div>
};


NotificationComponent.displayName = 'Notification Component';


export default React.memo( NotificationComponent );