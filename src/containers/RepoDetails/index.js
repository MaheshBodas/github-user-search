import React, {
    Component,
  } from 'react';
  import get from 'lodash/fp/get';
  import {
    css,
    StyleSheet,
  } from 'aphrodite/no-important';
  import Container from 'components/Container';  
  import 'suitcss-utils-flex/lib/flex-sm.css';
  import 'suitcss-utils-size/lib/size-sm.css';
  import 'suitcss-components-grid';
  import RepoDetails from 'components/RepoDetails';
  import connect from './connect';
  import parse from 'date-fns/parse';
  import distanceInWords from 'date-fns/distance_in_words';
  import 'suitcss-utils-flex/lib/flex.css';
  import 'suitcss-utils-flex/lib/flex-sm.css';
  
  type Props = {    
    repoEntities: Object   
  };
  
  const getRepositoryName = get('match.params.repo');
  
  export class RepoDetailsContainer extends Component {
  
    props: Props;
  
    constructor(props: Props) {
      super(props);
      this.state = {
        currentRepositoryName: getRepositoryName(props)
      }      
    }
  

    renderRepoDetails() {
      const currentRepositoryName = getRepositoryName(this.props);
      const {       
        repoEntities    
      } = this.props;
      console.log('renderRepoDetails=' + currentRepositoryName);
      let repoEntitiesVals = Object.values(repoEntities);
      const repository = repoEntitiesVals.find(item => item.name === currentRepositoryName);
      console.log('Repository 0' + {...repository});      
  
      return (
        <div className={css(styles.RepoDetails_container)}>
          <RepoDetails {...repository}/>
        </div>
      );
    }
  
    render() {
      return (
        <Container>
          {this.renderRepoDetails()}
        </Container>
      );
    }
  
  }
  
  const styles = StyleSheet.create({
    RepoDetails_container: {
      paddingTop: 15,
    },
  });
  
   
  export default connect(RepoDetailsContainer);
  
