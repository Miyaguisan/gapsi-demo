'use client';

import React from 'react';
import Image from 'next/image';
import { CREATE_PROVIDER, DELETE_PROVIDER, LIST_PROVIDERS, UPDATE_PROVIDER } from '../_utils/GraphQLQueries';
import { PROVIDERS_PER_PAGE } from '../_utils/Constants';
import { useWebContext } from '../_hooks/WebContext';
import APIManager from '../_utils/APIManager';
import LocalNotificationModel, { NotificationTypes } from '../_models/LocalNotificationModel';
import PaginationControl from '../_components/pagination/PaginationControl';
import ProviderItem from '../_components/provider/ProviderItem';
import ProviderModel from '../_models/ProviderModel';
import ViewProviderModal from '../_modals/ViewProviderModal';

import '../_css/table.css';

/*
* Esta página muestra la lista de proveedores
*/
const ProvidersPage = () => {
    const [ data, setData ] = React.useState<ProviderModel[]>([]);
    const [ loading, setLoading ] = React.useState(false);
    const [ page, setPage ] = React.useState(1);
    const [ totalPages, setTotalPages ] = React.useState(0);

    const  web_context = useWebContext();

    React.useEffect(() => {
        fetchData();

        return () => {};
    }, [page]);

    const fetchData = React.useCallback(async ( forceLoad=false, forceLastPage=false ) => {
        /*
        * Al utilizar forceLoad indicamos que queremos forzar la carga de los datos, sin importar si ya se están cargando.
        * Esto es útil cuando recién se elimina un proveedor, para que se actualice la lista de proveedores.
        * Lo hacemos de esta forma para conservar
        */
        if ( !forceLoad && loading ) return;

        setLoading( true );

		try {
            let target_page = (page - 1) * PROVIDERS_PER_PAGE;

            /*
            * Por cómo esta construido nuestro Resolver de GraphQL,
            * con esta simple estractegia podemos forzar a que se muestre la última página.
            * 
            * Al desbordar el número de páginas, el Resolver de GraphQL nos devolverá la última página,
            * la cúal contendrá el último proveedor.
            */
            if ( forceLastPage ) {
                target_page += 1;
            }
            
            /*
            * Se genera la query de GraphQL para obtener los proveedores
            */
			let candidate_gq = LIST_PROVIDERS(PROVIDERS_PER_PAGE, (page - 1) * PROVIDERS_PER_PAGE);

			let response = await APIManager.request({
				method: 'POST',
				body: candidate_gq,
			});

			if ( response.data?.listProviders ) {
                let response_data = response.data.listProviders;
                let provider_models = response_data.providers.map((provider: any) => {
                    return new ProviderModel( provider );
                });

                setTotalPages( parseInt( response_data.pages ) );
                setData( provider_models );
			}
		}
		catch ( error ) {
			console.error( error );
		}
        finally {
            setLoading( false );
        }
    }, [loading, page]);

    /*
    * Esta función se encarga de crear un proveedor
    */
    const handleProviderCreated = React.useCallback(async ( provider_data: any ) => {
        if ( loading ) {
            /*
            * Mostrar un mensaje de alerta, porque no debería poder crearse un proveedor en este momento.
            */
            let new_notification = new LocalNotificationModel({
                id: `provider-create-error-${Date.now()}`,
                title: 'Error',
                body: 'No se pudo crear el proveedor en este momento',
                type: NotificationTypes.error,
            });

            web_context.addNotification( new_notification );

            return;
        }

        setLoading( true );

        try {
            let create_gq = CREATE_PROVIDER( provider_data );

            let response = await APIManager.request({
                method: 'POST',
                body: create_gq,
            });

            /*
            * Si la respuesta es exitosa, actualizamos la lista de proveedores y mostramos una notificación
            */
            if ( response.data?.createProvider ) {
                /*
                * Solicitamos una nueva carga de datos para actualizar la lista de proveedores
                * forzando la carga de datos y la última página
                * 
                * TO DO: Ajustar el índice de paginación para que muestre la última página
                */
                fetchData( true, true );

                let new_notification = new LocalNotificationModel({
                    id: `provider-create-success-${Date.now()}`,
                    title: 'Éxito',
                    body: 'Proveedor creado',
                    type: NotificationTypes.success,
                });

                web_context.addNotification( new_notification );
            }
        }
        catch ( error ) {
            console.error( error );
        }
        finally {
            setLoading( false );
        }
    }, [loading]);

    /*
    * Esta función se encarga de actualizar un proveedor
    */
    const handleProviderUpdated = React.useCallback(async ( provider_data: any ) => {
        if ( loading ) {
            /*
            * Mostrar un mensaje de alerta, porque no debería poder editarse un proveedor en este momento.
            */
            let new_notification = new LocalNotificationModel({
                id: `provider-update-error-${Date.now()}`,
                title: 'Error',
                body: 'No se pudo editar el proveedor en este momento',
                type: NotificationTypes.error,
            });

            web_context.addNotification( new_notification );

            return;
        }

        setLoading( true );

        try {
            let update_gq = UPDATE_PROVIDER( provider_data );

            let response = await APIManager.request({
                method: 'POST',
                body: update_gq,
            });

            /*
            * Si la respuesta es exitosa, actualizamos la lista de proveedores y mostramos una notificación
            */
            if ( response.data?.updateProvider ) {
                /*
                * Reemplazamos el proveedor actualizado en la lista de proveedores para no tener que hacer una nueva petición
                */
                let updated_provider = new ProviderModel( response.data.updateProvider );
                setData( (current) => {
                    return current.map((provider) => {
                        if ( provider.id === updated_provider.id ) {
                            return updated_provider;
                        }

                        return provider;
                    });
                });

                let new_notification = new LocalNotificationModel({
                    id: `provider-update-success-${Date.now()}`,
                    title: 'Éxito',
                    body: 'Proveedor actualizado',
                    type: NotificationTypes.success,
                });

                web_context.addNotification( new_notification );
            }
        }
        catch ( error ) {
            console.error( error );
        }
        finally {
            setLoading( false );
        }
    }, [loading]);

    /*
    * Esta función se encarga de eliminar un proveedor
    */
    const handleProviderRemoved = React.useCallback(async ( provider: ProviderModel ) => {
        if ( loading ) {
            /*
            * Mostrar un mensaje de alerta, porque no debería poder eliminarse un proveedor en este momento.
            */
            let new_notification = new LocalNotificationModel({
                id: `provider-delete-error-${Date.now()}`,
                title: 'Error',
                body: 'No se pudo eliminar el proveedor en este momento',
                type: NotificationTypes.error,
            });

            web_context.addNotification( new_notification );

            return;
        }

        setLoading( true );

        try {
            if ( typeof provider.id !== 'string' ) {
                throw new Error( 'Error, ID del Proveedor no esta presente' );
            }

            let delete_gq = DELETE_PROVIDER(provider.id);

            let response = await APIManager.request({
                method: 'POST',
                body: delete_gq,
            });

            /*
            * Si la respuesta es exitosa, actualizamos la lista de proveedores y mostramos una notificación
            */
            if ( response.data?.deleteProvider ) {
                fetchData( true );

                let new_notification = new LocalNotificationModel({
                    id: `provider-delete-success-${Date.now()}`,
                    title: 'Éxito',
                    body: 'Proveedor eliminado',
                    type: NotificationTypes.success,
                });

                web_context.addNotification( new_notification );
            }
        }
        catch ( error ) {
            console.error( error );
        }
        finally {
            setLoading( false );
        }
    }, [loading]);

    const showCreateModal = () => {
        let modal_key = `create-provider-${Date.now()}`;

        web_context.addModal(<ViewProviderModal
            id={modal_key}
            key={modal_key}
            onCreate={handleProviderCreated}
        />);
    };

    const renderRow = ( item: any, index: number ) => {
        return <ProviderItem key={index} provider={item} onUpdate={handleProviderUpdated} onDelete={handleProviderRemoved}/>;
    };

    return <div className="d-flex align-items-center justify-content-center vh-100 p-3">
        <div className="d-flex flex-column col-md-10 shadow-sm bg-white rounded overflow-hidden p-3 gap-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-secondary" onClick={() => window.history.back()}>Volver</button>
                </div>
                <Image src="/assets/table_header_image.jpg" alt="Header" width={254} height={54} />
                <button className="btn btn-secondary" onClick={showCreateModal}>Agregar Proveedor</button>
            </div>
            <table className="table table-bordered rounded">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Nombre</th>
                        <th>Razón Social</th>
                        <th>Dirección</th>
                        <th>Información</th>
                        <th>Saldo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderRow)}
                </tbody>
            </table>
            <PaginationControl page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    </div>
};


export default ProvidersPage;