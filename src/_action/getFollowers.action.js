
import { getFollowersServices } from '../_services';
import assignAll from 'lodash/fp/assignAll';
export const getFollowersActions = {
    getFollowers
};

function getFollowers(url) {
    return dispatch => {
        console.log('getFollowers' + url)
        dispatch(request(url));             
        return getFollowersServices.getFollowers(url)
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

    function request(url) { return { type: 'FOLLOWERS_REQUEST', url} }
    function success(data) {  
        let payload = assignAll([{
                entities: data.entities,
                result: data.result,
                url,
                }]);
          
        return { type: 'FOLLOWERS_SUCCESS', payload } 
    }
    function failure(error) { 
        let payload = error;
        return { type: 'FOLLOWERS_FAILURE', payload } 
    }
}

