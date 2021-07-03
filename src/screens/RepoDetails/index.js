// @flow

import React from 'react';
import DocumentTitle from 'react-document-title';
import pageTitle from 'util/page-title';
import RepoDetailsContainer from 'containers/RepoDetails';


function RepoDetails(matchProps: Object) {
  const {match} = matchProps;
  const title = pageTitle(`For user ${match.params.username} repository name is ${match.params.repo}`);
  console.log('Title is=' +title)
  return (        
        <DocumentTitle title={title}>
          <RepoDetailsContainer {...matchProps} />
        </DocumentTitle>
  );
}

export default RepoDetails;
