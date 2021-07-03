// @flow

import {connect} from 'react-redux';
import { searchUsersActions} from '../../_action'
// export function mapDispatchToProps(dispatch: Function) {
//   return {
//     searchForUser(search: string) {
//       dispatch({
//         type: 'SEARCH_REQUEST',
//         payload: {
//           search,
//         },
//       });
//     },
//   };
// }

function mapDispatchToProps(dispatch) {
  return {              
      searchForUser: (search) => dispatch(searchUsersActions.searchUsers(search))
  }
}
export default connect(null, mapDispatchToProps);
