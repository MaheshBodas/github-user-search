import api from '../store/api';
import {normalize} from 'normalizr';
import {
    userSchema,
} from '../store/schema';


export const getFollowersServices = {
    getFollowers
};

function getFollowers(url) {
    return new Promise((resolve, reject) => {        
        api.get(url, {
            params: {
              // per_page: 8,
              sort: 'pushed',
            },
        })
        .then(response => {
          console.log('getFollowers' + response);
          console.log('userSchema' + userSchema);
          const data = normalize(response.data, userSchema);
          if(data !== null) {
            resolve(data)
          }
          else {
            const strError  = 'No data found for Followers'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in getFollowers')
          reject(error)
        })
      })
}