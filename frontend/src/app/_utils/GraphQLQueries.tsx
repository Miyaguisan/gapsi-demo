const LIST_CANDIDATES = `query {
	listCandidates {
		id
		name
		lastName
		maidenName
		email
	}
}`;

const VIEW_CANDIDATE = ( id: number ) => {
	return `query {
		viewCandidate(id: ${id}) {
			id
			name
			lastName
			maidenName
			email
		}
	}`
};

const LIST_PROVIDERS = ( limit: number, offset: number ) => {
	limit = Math.max(0, limit);
	offset = Math.max(0, offset);

	return `query {
		listProviders(limit: ${limit}, offset: ${offset}) {
			providers {
				id
				name
				businessName
				address
			}
			pages
			items
		}
	}
`;
};

const VIEW_PROVIDER = ( id: number ) => {
	return `query {
		viewProvider(id: ${id}) {
			id
			name
			businessName
			address
		}
	}`;
};

const CREATE_PROVIDER = ( {name, businessName, address}: {name: string, businessName: string, address: string} ) => {
	name = `${name}`.trim();
	businessName = `${businessName}`.trim();
	address = `${address}`.trim();

	return `mutation {
		createProvider(input: { name: "${name}", businessName: "${businessName}", address: "${address}" }) {
			id
			name
			businessName
			address
		}
	}`
};

const UPDATE_PROVIDER = ( {id, name, businessName, address}: {id: number, name: string, businessName: string, address: string} ) => {
	name = `${name}`.trim();
	businessName = `${businessName}`.trim();
	address = `${address}`.trim();

	return `mutation {
		updateProvider(id: ${id}, input: {name: "${name}", businessName: "${businessName}", address: "${address}"}) {
            id
            name
            businessName
            address
        }
	}`;
};

const DELETE_PROVIDER = ( id: number ) => {
	return `mutation {
		deleteProvider(id: ${id}) {
            id
            name
            businessName
            address
        }
	}`
};


const VIEW_SYSTEM_PROPERTY = ( name: string ) => {
	name = `${name}`.trim();

	return `query {
		viewSystem(property: "${name}")
	}`;
}


export {
	LIST_CANDIDATES,
	VIEW_CANDIDATE,
	LIST_PROVIDERS,
	VIEW_PROVIDER,
	CREATE_PROVIDER,
	UPDATE_PROVIDER,
	DELETE_PROVIDER,
	VIEW_SYSTEM_PROPERTY
};