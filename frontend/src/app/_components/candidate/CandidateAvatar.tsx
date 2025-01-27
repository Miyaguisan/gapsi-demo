import React from 'react';
import Image from 'next/image';
import CandidateModel from '../../_models/CandidateModel';

import '../../_css/candidate.css';

const CandidateAvatar = ({ candidate }: { candidate?: CandidateModel }) => {
	let asset = typeof candidate != typeof undefined ? '/assets/candidate_avatar.jpg' : '/assets/avatar_placeholder.png';
	let object_fit: React.CSSProperties['objectFit'] = typeof candidate != typeof undefined ? 'cover' : 'contain';

	return <Image
		style={{
			objectFit: object_fit,
		}}
		src={asset}
		alt='avatar'
		width={150}
		height={150}
		className="rounded-circle w-150 h-150 candidate-avatar"
	/>
};

export default React.memo(CandidateAvatar);
