import {gql} from '@apollo/client';
import {coreMediaFields} from '../fragments/mediaFragments';

const getAnimeDetailsQuery = gql`
  ${coreMediaFields}
  query Query($mediaId: Int) {
    Media(id: $mediaId) {
      ...coreMediaFields
      description
      genre
      startDate {
        year
        month
        day
      }
    }
  }
`;

export default getAnimeDetailsQuery;
