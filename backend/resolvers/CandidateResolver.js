const path = require('path');
const { loadJSONFile } = require('../utils/FileUtils');

/*
* Simula la tabla de candidatos
*/
const CANDIDATES_FILE = path.resolve(__dirname, '../data/candidates.json');

/*
* CRUD candidato, no se implementa ya que no ha sido solicitado en el ejercicio.
* 
* Aún así, se considera que Candidates es una lista
*/
const CandidateResolver = {
    Query: {
        listCandidates: () => {
            const data = loadJSONFile( CANDIDATES_FILE );

            return data.candidates || [];
        },
        viewCandidate: (_, args) => {
            const { id } = args;
            const data = loadJSONFile( CANDIDATES_FILE );
            
            const candidate = data.candidates.find(candidate => `${candidate.id}` === `${id}`);
            
            if ( !candidate ) {
                return null;
            }

            return candidate;
        }
    },
};


module.exports = CandidateResolver;
