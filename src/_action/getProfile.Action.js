
import { getProfileServices } from '../_services';
import { getRepositoriesActions, getFollowersActions } from '../_action'
export const getProfileActions = {
    getProfile
};

function getProfile(username) {
    return dispatch => {
        console.log('getProfile' + username)
        dispatch(request(username));             
        return getProfileServices.getProfile(username)
            .then(
                profile => {                    
                    dispatch(success(profile)); 
                    dispatch(getRepositoriesActions.getRepositories(profile.repos_url))
                    dispatch(getFollowersActions.getFollowers(profile.followers_url))
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                }
            )

    };

    function request(username) { return { type: 'PROFILE_REQUEST', username} }
    function success(profile) {  
        let payload = profile
        console.log('success=' + username);
        
        return { type: 'PROFILE_SUCCESS', payload } 
    }
    function failure(error) { 
        let payload = error;
        return { type: 'PROFILE_FAILURE', payload } 
    }
}

