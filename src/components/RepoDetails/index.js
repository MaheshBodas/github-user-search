// @flow

import React from 'react';
import {
  StyleSheet,
  css,
} from 'aphrodite/no-important';
import get from 'lodash/fp/get';
import {Link} from 'react-router-dom';
import parse from 'date-fns/parse';
import distanceInWords from 'date-fns/distance_in_words';
import 'suitcss-utils-flex/lib/flex.css';
import 'suitcss-utils-flex/lib/flex-sm.css';
import ForkIcon from './repo-forked.svg';
import StarIcon from './star.svg';

type Props = {
  // username: string,
  description: string | null,
  fork: boolean,
  owner: Object,
  url:string,
  html_url: string,
  language: string | null,  
  name: string,
  stargazers_count: number,
  pushed_at: string,
  forks_count: number,
};

function renderFooterItem(Icon: any, text: number | string, title: string): React$Element<*> {
  return (
    <div className={`${css(styles.Repo_footerItem)} u-flex u-flexAlignItemsCenter`} title={title}>
      <Icon
        className={css(styles.Repo_footerIcon)}
        width={18}
        height={18}
      />
      <p>{text}</p>
    </div>
  );
}

export default function RepoDetails(props: Props) {
  const {
    description,
    fork,
    owner,
    url,
    html_url,
    language,
    name,    
    stargazers_count,
    pushed_at,
    forks_count,
    open_issues_count,
    size
  } = props;

  const pushedDate = distanceInWords(parse(pushed_at), new Date());
  
  // console.log('url is=' + url)
  // console.log('login=' + owner.login)
  // const repoUrl = '/repo_detail/' + owner.login + '/' + name;
  const userUrl = '/' + owner.login;
  
  return (
    <div>
      <p className={css(styles.User_username)}>{name}</p>
      <p className={`${css(styles.Repo_name)} u-flex u-flexAlignItemsBaseline`}>       
        {/* <a href={html_url}>{name}</a> */}
        {fork
          ? <span className={css(styles.Repo_fork)}>(fork)</span>
          : null
        }
      </p>
      {description
        ? <p className={css(styles.Repo_desc)}>{description}</p>
        : null
      }
      <div className={`${css(styles.Repo_footer)} u-flex u-flexWrap u-flexAlignItemsCenter`}>
        {language
          ? <p className={css(styles.Repo_footerItem)}>{language}</p>
          : null
        }
        {renderFooterItem(StarIcon, open_issues_count, 'Open Issues Count')}
        {renderFooterItem(ForkIcon, forks_count, 'Fork Count')}
        <p className="u-sm-flexExpandLeft">last push {pushedDate} ago</p>        
        <br></br>
      </div>
      <div>
        <Link to = {userUrl}>
           <p className={css(styles.Repo_footer_Link)}>Back to User {owner.login}</p>
        </Link>        
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  Repo_footerItem: {
    marginRight: 12,
  },

  Repo_footerIcon: {
    marginRight: 3,
  },

  Repo_footer: {
    color: '#666',
    marginTop: 35,
    fontSize: 13,
  },

  Repo_footer_Link: {    
    marginTop: 35,
    fontSize: 13,
  },

  Repo_fork: {
    fontSize: 12,
    marginLeft: 5,
    color: '#666',
  },

  Repo_name: {
    marginBottom: 10,
    fontSize: 30,
    width:15,
    height: 15,
    fontSize: 18,
  },

  Repo_desc: {
    fontSize: 14,
    lineHeight: 1.4,
  },
});
