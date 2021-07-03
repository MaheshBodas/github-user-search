
import { searchUsersServices } from '../_services';
import assignAll from 'lodash/fp/assignAll';
import qs from 'query-string';
export const searchUsersActions = {
    searchUsers   
};

function searchUsers(search) {
    return dispatch => {
        let parsedSearch = qs.parse(search);
        console.log('searchUsers' + search)
        dispatch(request(search));             
        return searchUsersServices.searchUsers(parsedSearch)
            .then(
                normalizedResponse => {
                    console.log(normalizedResponse);
                    dispatch(success(normalizedResponse, search));                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                }
            )

    };

    function request(search) { return { type: 'SEARCH_REQUEST', search} }
    function success(normalizedResponse, search) { 
        let payload = assignAll([normalizedResponse, {search}])
        return { type: 'SEARCH_SUCCESS', payload } 
    }
    function failure(error) { 
        let payload = error;
        return { type: 'SEARCH_FAILURE', payload } 
    }
}

