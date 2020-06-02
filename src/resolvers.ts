import GraphQLJSON from 'graphql-type-json';

import { paginateResults } from './utils';

export const resolvers = {
  Query: {
    accounts: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allAccounts = await dataSources.accountAPI.getAllAccounts();

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
    account: (_, { account_id }, { dataSources }) => {
      return dataSources.accountAPI.getAccount({ accountId: account_id });
    },
    accountsById: (_, { account_ids }, { dataSources }) => {
      return dataSources.accountAPI.getAccounts({ accountIds: account_ids });
    }
  },
  JSON: GraphQLJSON
};
