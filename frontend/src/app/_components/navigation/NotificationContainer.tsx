import React from 'react';
import LocalNotificationModel from '@/app/_models/LocalNotificationModel';
import NotificationComponent from './NotificationComponent';


const _keyExtractor = ( item: LocalNotificationModel, index: number ) => `${item.id}-${index}`;


const NotificationsContainer = React.forwardRef((_, ref) => {
    const [ notifications, setNotifications ] = React.useState<LocalNotificationModel[]>( [] );

    React.useImperativeHandle(ref, () => ({
        addNotification
    }));

    const addNotification = ( notification: LocalNotificationModel ) => {
        setNotifications([...notifications, notification]);
    };

    const handleNotificationDismiss = ( notification_id: string ) => {
        setNotifications(notifications.filter( notification => notification.id !== notification_id ));
    };

    const renderNotification = ( notification: LocalNotificationModel, index: number ) => {
        let notification_key = _keyExtractor( notification, index );

        return <NotificationComponent key={notification_key} notification={notification} onDismiss={handleNotificationDismiss}/>;
    };

    return <div id='notification-container' className='bottom-right'>
        {notifications.map( renderNotification )}
    </div>
});


export default NotificationsContainer;