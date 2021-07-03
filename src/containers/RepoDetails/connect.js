// @flow

import {connect} from 'react-redux';
import get from 'lodash/fp/get';
// import { getProfileActions} from '../../_action'

export function mapStateToProps(state: Object): Object {
  return {    
    repoEntities: get('entities.repos', state)  
  };
}

export default connect(mapStateToProps, null);
