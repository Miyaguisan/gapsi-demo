/*
* Tuve que agregar un segundo chevron a mano porque FontAwesome free no tiene la clase fa-chevron-double-left
*/
const PaginationButton = ({ icon, onClick, disabled }: { icon: string, onClick: Function, disabled: boolean }) => {
    return <button className="btn" onClick={() => onClick()} disabled={disabled}>
		<i className={`fas fa-chevron-${icon.replace( 'double-', '')}`}></i>
		{icon.includes('double') && <i className={`fas fa-chevron-${icon.replace( 'double-', '')}`}></i>}
	</button>
};

/*
* Este componente se encarga de manejar los botones de paginación
* depende de la página actual y el total de páginas
*/
const PaginationControl = ({ page, setPage, totalPages }: { page: number, setPage: Function, totalPages: number }) => {
	const handlePreviousPage = () => {
		if ( page > 1 ) {
			setPage( page - 1 );
		}
	};

	const handleFirstPage = () => {
		setPage( 1 );
	};

	const handleLastPage = () => {
		setPage( totalPages );
	};

	const handleNextPage = () => {
		if ( page < totalPages ) {
			setPage( page + 1 );
		}
	};

	const handleSetPage = ( p: number ) => {
		setPage( p );
	};

    return <div className="d-flex justify-content-end align-items-center gap-2">
		<PaginationButton icon="left" onClick={handlePreviousPage} disabled={page === 1} />
		<PaginationButton icon="double-left" onClick={handleFirstPage} disabled={page === 1} />
		
		{[page - 1, page, page + 1].filter( p => p > 0 && p <= totalPages ).map( p => {
			/*
			* Generamos botones para las páginas anterior, actúal y siguiente
			*/
			return <button className="btn primary" onClick={() => handleSetPage( p )} key={p}>{p}</button>
		})}

		<PaginationButton icon="double-right" onClick={handleLastPage} disabled={page === totalPages} />
		<PaginationButton icon="right" onClick={handleNextPage} disabled={page === totalPages} />
	</div>
};


export default PaginationControl;
