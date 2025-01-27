import React from 'react'
import Modal from '../_components/navigation/Modal';


interface ConfirmationModalProps {
	acceptText?: string;
	cancelText?: string;
	id: string;
	onAccept?: Function;
	onCancel?: Function;
	text: string;
	title: string;
};


const ConfirmationModal = ( props: ConfirmationModalProps ) => {
	const modal_ref = React.useRef<any>( null );

	const handleAccept = () => {
		props.onAccept?.();
		modal_ref?.current?.dismiss?.();
	};

	const handleCancel = () => {
		props.onCancel?.();
		modal_ref?.current?.dismiss?.();
	};

	return <Modal
		id={props.id}
		ref={modal_ref}
		title='Eliminar proveedor'>
		<div className='modal-body'>
			<p style={{color: 'black', wordWrap: "break-word"}}>{props.text}</p>
			<div style={{display: 'flex', flexDirection: 'row', gap: '8pt', marginTop: '24pt'}}>
				<button className='btn btn-danger' onClick={handleAccept}>
					<span>Si, continuar</span>
				</button>
				<button className='btn btn-light' onClick={handleCancel}>
					<span>No, cancelar</span>
				</button>
			</div>
		</div>
	</Modal>
};


ConfirmationModal.displayName = 'Confirmation Modal';


export default ConfirmationModal;