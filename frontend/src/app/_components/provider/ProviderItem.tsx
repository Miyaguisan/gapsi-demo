import React from 'react';
import { useWebContext } from '@/app/_hooks/WebContext';
import { DEFAULT_MONEY_FORMATTER, PROVIDERS_STATUS_COLORS  } from '@/app/_utils/Constants';
import ConfirmationModal from '@/app/_modals/ConfirmationModal';
import ProviderModel from '@/app/_models/ProviderModel';
import ViewProviderModal from '@/app/_modals/ViewProviderModal';

/*
* Genera un indicador de estado aleatorio
*/
const StatusIndicator = () => {
	const colors = Object.values(PROVIDERS_STATUS_COLORS);

	const random_color = colors[Math.floor(Math.random() * colors.length)];

	return <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: random_color }}></div>;
};

StatusIndicator.displayName = 'Status Indicator';


interface ProviderItemProps {
	provider: ProviderModel;
	onUpdate: Function;
	onDelete: Function;
};

/*
* Este componente reprensenta un item de la tabla de proveedores
*/
const ProviderItem = ( props: ProviderItemProps ) => {
	const [ random_money_debt, setRandomMoneyDebt ] = React.useState(0);

	React.useEffect(() => {
		setRandomMoneyDebt( Math.floor(Math.random() * 1000000) );

		return () => {};
	}, []);

	const web_context = useWebContext();

	const handleDelete = async () => {
		props.onDelete?.( props.provider );
	};

	const handleDeleteRequest = () => {
		let modal_key = `delete-provider-${props.provider.id ?? props.provider.tempId}`;
		
		/*
		* Se pasas 2 veces la llave porque una es para el listado de React y otra para el componente de DOM
		*/
		web_context?.addModal(<ConfirmationModal
			id={modal_key}
			key={modal_key}
			text={`¿Estás seguro de eliminar a ${props.provider.name}?`}
			title='Eliminar proveedor'
			onAccept={handleDelete}
		/>);
	};

	const handleViewRequest = () => {
		let mododal_key = `view-provider-${props.provider.id ?? props.provider.tempId}`;

		web_context?.addModal(<ViewProviderModal
			id={mododal_key}
			key={mododal_key}
			provider={props.provider}
			onUpdate={props.onUpdate}
			onDelete={props.onDelete}
		/>);
	};

	return <tr>
		<td>
			<div className="container">
				<StatusIndicator />
			</div>
		</td>
		<td>
			<div className="container">
				{props.provider.name}
			</div>
		</td>
		<td>
			<div className="container">
				{props.provider.businessName}
			</div>
		</td>
		<td>
			<div className="container">
				{props.provider.address}
			</div>
		</td>
		<td>
			<div className="container">
				Texto random ---
			</div>
		</td>
        <td>
			<div className="container">
				{`${DEFAULT_MONEY_FORMATTER.format( random_money_debt )}`}
			</div>
		</td>
		<td>
			<div className="container gap-2">
				<button className="btn" onClick={handleDeleteRequest}>
					<i className="fas fa-trash" style={{color: '#E63A39'}}></i>
				</button>
				<button className="btn" onClick={handleViewRequest}>
					<i className="fas fa-eye"></i>
				</button>
			</div>
		</td>
	</tr>
};


export default ProviderItem;