import gql from "graphql-tag";
import { parseFragment } from "../utilities/parseFragment";

export const USER_FRAGMENTS = {
  userDetails: gql`
    fragment UserDetail on User {
      id
      displayName
      schoolName
      companyName
      introduction
      status
      areaName
      genre {
        id
        name
      }
      occupationType {
        id
        name
      }
      country {
        id
        name
      }
      skills {
        id
        name
      }
      photos {
        id
        imageUrl
      }
    }
  `,
  userOnList: gql`
    fragment UserOnList on User {
      id
      displayName
      schoolName
      companyName
      introduction
      areaName
      genre {
        id
        name
      }
      occupationType {
        id
        name
      }
      mainPhotoUrl
    }
  `
};
