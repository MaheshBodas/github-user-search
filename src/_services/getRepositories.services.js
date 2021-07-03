import api from '../store/api';
import {normalize} from 'normalizr';
import {
  repoSchema,
} from 'store/schema';


export const getRepositoriesServices = {
    getRepositories
};

function getRepositories(url) {
    return new Promise((resolve, reject) => {        
        api.get(url, {
            params: {
              // per_page: 8,
              sort: 'pushed',
            },
        })
        .then(response => {
          console.log('getRepositories' + response);
          console.log('repoSchema' + repoSchema);
          const data = normalize(response.data, repoSchema);
          if(data !== null) {
            resolve(data)
          }
          else {
            const strError  = 'No data found for Repositories'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in getRepositories')
          reject(error)
        })
      })
}
