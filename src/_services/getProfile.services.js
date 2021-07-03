import pick from 'lodash/fp/pick';
import get from 'lodash/fp/get';
import flow from 'lodash/fp/flow';
import api from 'store/api';

export const getProfileServices = {
    getProfile
};


const pickProfileData = flow(
    get('data'),
    pick([
      'avatar_url',
      'bio',
      'blog',
      'company',
      'followers',
      'followers_url',
      'following',      
      'html_url',
      'location',
      'login',
      'id',
      'name',
      'public_gists',
      'public_repos',
      'repos_url',
    ])
  );


  function getProfile(username) {
    let profile;
    return new Promise((resolve, reject) => {        
        api.getProfile(username).then(response => {          
          profile = pickProfileData(response);    
          if(profile !== null) {
            console.log('getProfile' + profile.login);     
            resolve(profile)
          }
          else {
            const strError  = 'No data found for Users'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in getProfile')
          reject(error)
        })
      })
}
