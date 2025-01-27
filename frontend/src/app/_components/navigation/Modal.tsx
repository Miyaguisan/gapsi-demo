import React from 'react';
import { MODAL_PRESENTATION_TIME } from '../../_utils/Constants';
import { useWebContext } from '@/app/_hooks/WebContext';


import '../../_css/modal.css';


interface ModalProps {
	children: any;
	className?: string;
	empty?: boolean;
	id: string;
	onDismiss?: Function;
	title?: string;
	transparent?: boolean;
}


const ModalHeader = React.memo(( props: any ) => {
	return <div className='modal-header'>
		<span className='title'>{props.title}</span>
		<button className='btn' onClick={props.onDismiss}>
			<i className='fas fa-times'></i>
		</button>
	</div>
});


ModalHeader.displayName = 'Modal Header';


const Modal = React.forwardRef (( props: ModalProps, ref: any ) => {
	const [ visible, setVisible ] = React.useState<Boolean>( false );

	const app_context: any = useWebContext();

	React.useImperativeHandle( ref, () => ({
		dismiss
	}));

	React.useEffect(() => {
		setTimeout(() => {
			setVisible( true );
		}, MODAL_PRESENTATION_TIME);

		return () => {};
	}, []);

	const dismiss = ( callback?: Function ) => {
		setVisible( false );

		setTimeout(() => {
			app_context.removeModal( props.id );
			props.onDismiss?.();
			callback?.();
		}, MODAL_PRESENTATION_TIME * 2);
	};

	const handleUserDimiss = () => {
		dismiss();
	};

	const stopPropagation = ( event: any ) => {
		event.stopPropagation();
	};

	let class_name = 'custom-modal';

	if ( !visible ) {
		class_name += ' hidden';
	}

	if ( props.transparent ) {
		class_name += ' transparent';
	}

	return <div className={class_name} id={props.id} onClick={handleUserDimiss}>
		{!props.empty && <div className={`modal-content ${props.className ?? ''} d-flex flex-column rounded shadow-sm bg-white`.trim()} onClick={stopPropagation}>
			<ModalHeader title={props.title} onDismiss={handleUserDimiss}/>
			{props.children}
		</div>}
		{props.empty && props.children}
	</div>
});


Modal.displayName = 'Modal';


export default React.memo( Modal );