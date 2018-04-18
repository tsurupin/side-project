import gql from "graphql-tag";
import { parseFragment } from '../utilities/parseFragment';

export const USER_FRAGMENTS = {
  userDetails: parseFragment(gql`
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
      imageUrl
    }
  }`),
  userOnList: parseFragment(gql`
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
  `)
};
