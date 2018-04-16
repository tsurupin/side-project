import gql from "graphql-tag";

export const PROJECT_FRAGMENTS = {
  projectDetails: gql`
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
  }`,
  projectOnList: gql`
  fragment ProjectOnList on Project {
    id
    name
    leadSentence
    mainPhotoUrl
    genre {
      id
      name
    }
  }`,
  projectCore: gql`
  fragment ProjectCore on Project {
    id
    name
    status
  }`
};

