import axios from 'axios';
import { API_URL } from '../_utils/Constants';


const APIManager = {
    request: async ( options: any ) => {
        /*
        * Definir las opciones por defecto
        */
        let headers = options.headers || {};

        /*
        * Verificar si el header de Content-Type está presente
        */
        if ( !headers['Content-Type'] ) {
            headers['Content-Type'] = 'application/json';
        }

        /*
        * Aquí mismo podríamos verificar un token de autenticación
        * pero este proyecto no lo requiere.
        * 
        * if ( !headers['Authorization'] ) {
        *    headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        * }
        */
        
        const res = await axios({
            url: API_URL,
            method: options.method,
            data: {
                query: options.body
            },
            headers: headers
        });

        if ( !res.data ) {
            /*
            * Podríamos revisar el status de la respuesta y lanzar un error personalizado.
            * Lo más común es atender los códigos de error 4xx y 5xx para errores del cliente y del servidor respectivamente.
            * 
            * Este proyecto no requiere manejo de errores de autenticación, por lo que no se incluye.
            */

            throw new Error('No data received');
        }

        return res.data;
    }
};


export default APIManager;