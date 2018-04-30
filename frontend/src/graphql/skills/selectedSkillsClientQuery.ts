import gql from "graphql-tag";
import { SKILL_FRAGMENTS } from './skillFragments';

export const SELECTED_SKILLS_CLIENT_QUERY = gql`
{
  selectedSkills @client {
    id
    name
  }
}`;
