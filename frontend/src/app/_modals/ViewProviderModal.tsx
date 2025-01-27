import React from 'react'
import { useWebContext } from '../_hooks/WebContext';
import Modal from '../_components/navigation/Modal';
import ConfirmationModal from './ConfirmationModal';
import ProviderModel from '../_models/ProviderModel';

interface ViewProviderModalProps {
    id: string;
    provider?: ProviderModel;
    onCreate?: Function;
    onUpdate?: Function;
    onDelete?: Function;
};

/*
* Este componente representa un modal para ver y editar un proveedor
*
* Si no recibe un proveedor, significa que se está creando uno nuevo
*/
const ViewProviderModal = ( props: ViewProviderModalProps ) => {
    const [ editedProvider, setEditedProvider ] = React.useState({
        name: props.provider?.name ?? '',
        businessName: props.provider?.businessName ?? '',
        address: props.provider?.address ?? ''
    });

    const [ errors, setErrors ] = React.useState({
        name: '',
        businessName: '',
        address: ''
    });

    const modal_ref = React.useRef<any>( null );

    const web_context = useWebContext();

    /*
    * Asigna el valor de un campo al estado de edición
    * Utiliza el nombre del campo como llave del estado
    */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setEditedProvider(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /*
    * Guarda los cambios realizados en el formulario
    */
    const validateFields = () => {
        let valid = true;
        let newErrors: any = {};

        if ( !editedProvider.name ) {
            valid = false;
            newErrors.name = 'El nombre no puede estar vacío';
        }

        if ( !editedProvider.businessName ) {
            valid = false;
            newErrors.businessName = 'El nombre comercial no puede estar vacío';
        }

        if ( !editedProvider.address ) {
            valid = false;
            newErrors.address = 'La dirección no puede estar vacía';
        }

        setErrors(newErrors);

        return valid;
    };

    /*
    * Guarda los cambios realizados en el formulario
    */
    const handleSaveChanges = async () => {
        if ( !validateFields() ) {
            return;
        }

        modal_ref?.current?.dismiss();

        /*
        * Si no recibimos un proveedor, significa que estamos creando uno nuevo
        */
        props.provider ? props.onUpdate?.( editedProvider ) : props.onCreate?.( editedProvider );
    };

    const handleDelete = () => {
        modal_ref?.current?.dismiss();

        props.onDelete?.( props.provider );
    };

    const handleDeleteRequest = () => {
        let modal_key = `delete-provider-${props.provider?.id ?? props.provider?.tempId}`;
                
        /*
        * Se pasas 2 veces la llave porque una es para el listado de React y otra para el componente de DOM
        */
        web_context?.addModal(<ConfirmationModal
            id={modal_key}
            key={modal_key}
            text={`¿Estás seguro de eliminar a ${props.provider?.name}?`}
            title='Eliminar proveedor'
            onAccept={handleDelete}
        />);
    };

    return <Modal
        id={props.id}
        ref={modal_ref}
        title={`Proveedor: ${props.provider?.name ?? 'Nuevo'}`}>
        <div className='modal-body'>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>ID:</strong> {props.provider?.id}
                    </li>
                    <li className="list-group-item">
                        <strong>Nombre:</strong>
                        <input
                            type="text"
                            name="name"
                            value={editedProvider.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                    </li>
                    <li className="list-group-item">
                        <strong>Razón Social:</strong>
                        <input
                            type="text"
                            name="businessName"
                            value={editedProvider.businessName}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.businessName && <small className="text-danger">{errors.businessName}</small>}
                    </li>
                    <li className="list-group-item">
                        <strong>Dirección:</strong>
                        <input
                            type="text"
                            name="address"
                            value={editedProvider.address}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.address && <small className="text-danger">{errors.address}</small>}
                    </li>
                </ul>
            </div>
            <div className="card-footer w-100 mt-3 d-flex flex-row justify-content-between gap-3">
                <button className="btn btn-primary w-100" onClick={handleSaveChanges}>Guardar</button>
                {props.provider && <button className="btn btn-danger w-100" onClick={handleDeleteRequest}>Eliminar</button>}
            </div>
        </div>
    </Modal>
};


ViewProviderModal.displayName = 'Confirmation Modal';


export default ViewProviderModal;