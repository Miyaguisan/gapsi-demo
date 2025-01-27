'use client';

import React from 'react';
import CandidatePresentation from './_components/candidate/CandidatePresentation';

const HomePage = () => {
	return <div className="d-flex align-items-center justify-content-center vh-100 w-100 p-3">
		<div className="d-flex flex-column col-md-3 shadow-sm bg-white rounded overflow-hidden">
			<div className="d-flex justify-content-between align-items-center p-2" style={{
				backgroundColor: '#F2F2F2',
			}}>
				<span>e-Commerce - GAPSI</span>
				<div className="d-flex align-items-center justify-content-center rounded-circle" style={{
					backgroundColor: '#D6D6D6',
					width: 40,
					height: 40,
				}}>
					<i className="fas fa-ellipsis-v"></i>
				</div>
			</div>
			<CandidatePresentation/>
		</div>
	</div>
};


export default HomePage;