import GraphQLJSON from 'graphql-type-json';

import { paginateResults } from './utils';

export const resolvers = {
  Query: {
    accounts: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allAccounts = await dataSources.accountAPI.getAllAccounts();
      // we want these in reverse chronological order
      // allAccounts.reverse();

      const accounts = paginateResults({
        after,
        pageSize,
        results: allAccounts,
      });

      return {
        accounts,
        cursor: accounts.length ? accounts[accounts.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: accounts.length
          ? accounts[accounts.length - 1].cursor !==
            allAccounts[allAccounts.length - 1].cursor
          : false,
      };
    },
    account: (_, { id }, { dataSources }) =>
      dataSources.accountAPI.getAccount({ account_id: id }),
  },
  JSON: GraphQLJSON
};
