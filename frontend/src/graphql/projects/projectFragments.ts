import gql from 'graphql-tag';

export const PROJECT_FRAGMENTS = {
  projectDetails: gql`
    fragment ProjectDetail on Project {
      id
      title
      leadSentence
      status
      motivation
      requirement
      owner {
        id
        displayName
      }
      users {
        id
        displayName
        mainPhotoUrl
        occupationType {
          id
          name
        }
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
        id
        rank
        imageUrl
      }
      city {
        id
        name
        fullName
      }
    }
  `,
  projectOnList: gql`
    fragment ProjectOnList on Project {
      id
      title
      leadSentence
      mainPhotoUrl
      status
      genre {
        id
        name
      }
    }
  `,
  projectCore: gql`
    fragment ProjectCore on Project {
      id
      title
      status
    }
  `
};
