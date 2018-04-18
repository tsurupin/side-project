import gql from "graphql-tag";
import { parseFragment } from '../utilities/parseFragment';

export const PROJECT_FRAGMENTS = {
  projectDetails: parseFragment(gql`
  fragment ProjectDetail on Project {
    id
    name
    leadSentence
    status
    motivation
    requirement
    owner {
      id
      displayName
    }
    genre {
      id
      name
    }
    skills {
      id
      name
    }
    photos {
      image_url
    }
  }`),
  projectOnList: parseFragment(gql`
  fragment ProjectOnList on Project {
    id
    name
    leadSentence
    mainPhotoUrl
    genre {
      id
      name
    }
  }`),
  projectCore: parseFragment(gql`
  fragment ProjectCore on Project {
    id
    name
    status
  }`)
};

