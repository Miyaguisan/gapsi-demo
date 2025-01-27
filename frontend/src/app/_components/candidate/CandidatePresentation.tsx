import React from 'react';
import Link from 'next/link';
import { LIST_CANDIDATES, VIEW_SYSTEM_PROPERTY } from '@/app/_utils/GraphQLQueries';
import CandidateAvatar from './CandidateAvatar';
import CandidateModel from '../../_models/CandidateModel';
import APIManager from '../../_utils/APIManager';


const CandidatePresentation = () => {
	const [ candidate, setCandidate ] = React.useState<CandidateModel | undefined>(undefined);
	const [ systemVersion, setSystemVersion ] = React.useState<string>('0.0.0');
	const [ loading, setLoading ] = React.useState<boolean>(false);

	React.useEffect(() => {
		updateCandidateProperties();

		return () => {};
	}, []);

	const updateCandidateProperties = async () => {
		await  updateCandidate();
		await updateSystemVersion();
	};

	const updateCandidate = async () => {
		setLoading(true);

		try {
			let candidate_gq = LIST_CANDIDATES;

			let response = await APIManager.request({
				method: 'POST',
				body: candidate_gq,
			});

			if ( response.data ) {
				let candidate_data = response.data.listCandidates[0];
				let candidate = new CandidateModel( candidate_data );
				
				setCandidate( candidate );
			}
		}
		catch ( error ) {
			console.error(error);
		}
	};

	const updateSystemVersion = async () => {
		try {
			let system_version_gq = VIEW_SYSTEM_PROPERTY( 'version' );

			let response = await APIManager.request({
				method: 'POST',
				body: system_version_gq,
			});

			if ( response.data?.viewSystem ) {
				setSystemVersion( response.data.viewSystem );
			}
		}
		catch ( error ) {
			console.error(error);
		}
		finally {
			setLoading(false);
		}
	};

	const handleContinue = () => {
		console.log('Continue');
	};
	
	return <div className="d-flex flex-column justify-content-center align-items-center gap-5 p-3">
		<CandidateAvatar candidate={candidate}/>
		<span>Bienvenido Candidato {candidate?.fullName?.()}</span>
		<Link href="/providers">
			<button className="btn btn-primary">Continuar</button>
		</Link>
		<span className="shadow-sm rounded w-100 text-end p-1" style={{fontSize: '10pt'}}>Versión del sistema: {systemVersion}</span>
	</div>
}


export default CandidatePresentation;