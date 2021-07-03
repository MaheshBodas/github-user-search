import api from 'store/api';
import {userSchema} from 'store/schema';
import {normalize} from 'normalizr';
import assignAll from 'lodash/fp/assignAll';

export const searchUsersServices = {
    searchUsers
};

function normalizeResponse(response: Object) {
  const normalized = normalize(response.items, userSchema);
  const {total_count, pagination} = response;
  return assignAll([
    normalized,
    {
      totalResults: total_count,
      pagination,
    },
  ]);
}

function searchUsers(search) {
    return new Promise((resolve, reject) => {        
        api.searchUsers(search).then(response => {
          console.log('searchUsers' + response);
          const normalizedResponse = normalizeResponse(response);
          if(normalizedResponse !== null) {
            resolve(normalizedResponse)
          }
          else {
            const strError  = 'No data found for Users'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in searchUsers')
          reject(error)
        })
      })
}
