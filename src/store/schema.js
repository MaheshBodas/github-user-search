import {schema} from 'normalizr';
import pick from 'lodash/fp/pick';

const pickRepoData = pick([
  'description',
  'fork',
  'owner',
  'url',
  'html_url',
  'language',
  'pushed_at',
  'name',
  'stargazers_count',
  'forks_count',
  'open_issues_count',
  'size'
]);
const pickUserData = pick([
  'login',
  'id',
  'avatar_url',
]);
const userProcessStrategy = entity => pickUserData(entity);

const user = new schema.Entity('users', {}, {
  processStrategy: userProcessStrategy,
});
const repo = new schema.Entity('repos', {}, {
  processStrategy: entity => pickRepoData(entity),
});

export const userSchema = new schema.Array(user);
export const repoSchema = new schema.Array(repo);
