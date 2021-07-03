// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';
import { getProfileActions} from '../../_action'

export function mapStateToProps(state: Object): Object {
  return {
    followerIds: get('followers.result', state),
    followerIsPending: get('followers.isPending', state),
    repoIsPending: get('repos.isPending', state),
    repoEntities: get('entities.repos', state),
    repoIds: get('repos.result', state),
    userEntities: get('entities.users', state),
    userIsPending: get('profile.isPending', state),
    userProfile: get('profile.userProfile', state),
  };
}

function mapDispatchToProps(dispatch) {
  return {              
    getProfile: (username) => dispatch(getProfileActions.getProfile(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps);
