import {gql} from '@apollo/client';

const searchQuery = gql`
  query Query($search: String) {
    Character(search: $search) {
      name {
        full
      }
      description
    }
  }
`;

export default searchQuery;
