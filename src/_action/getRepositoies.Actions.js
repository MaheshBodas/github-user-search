
import { getRepositoriesServices } from '../_services';
import assignAll from 'lodash/fp/assignAll';
export const getRepositoriesActions = {
    getRepositories
};

function getRepositories(url) {
    return dispatch => {
        console.log('getRepositories' + url)
        dispatch(request(url));             
        return getRepositoriesServices.getRepositories(url)
            .then(
                profile => {                    
                    dispatch(success(profile));                    
                },  
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                }
            )

    };

    function request(url) { return { type: 'REPOS_REQUEST', url} }
    function success(data) {  
        let payload = assignAll([{
                entities: data.entities,
                result: data.result,
                url,
                }]);
          
        return { type: 'REPOS_SUCCESS', payload } 
    }
    function failure(error) { 
        let payload = error;
        return { type: 'REPOS_FAILURE', payload } 
    }
}

