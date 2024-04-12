import {gql} from '@apollo/client';
import {coreMediaFields} from '../fragments/mediaFragments';

const getAnimeListQuery = gql`
  ${coreMediaFields}
  query Query($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        ...coreMediaFields
        episodes
      }
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
    }
  }
`;

export default getAnimeListQuery;
