import {gql} from '@apollo/client';

export const coreMediaFields = gql`
  fragment coreMediaFields on Media {
    id
    genres
    averageScore
    meanScore
    title {
      english
      native
    }
    coverImage {
      medium
    }
  }
`;
