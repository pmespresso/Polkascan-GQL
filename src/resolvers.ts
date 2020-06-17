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
    },
    events: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allEvents = await dataSources.eventAPI.getAllEvents();

      const events = paginateResults({
        after,
        pageSize,
        results: allEvents,
      });

      return {
        events,
        cursor: events.length ? events[events.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: events.length
          ? events[events.length - 1].cursor !==
            allEvents[allEvents.length - 1].cursor
          : false,
      };
    },
    accountEvents: async (_, { account_id, pageSize = 20, after }, { dataSources }) => {
      // get events associated with an account_id
      const allEventsForThisAccount = await dataSources.eventAPI.getAccountEvents({ accountId: account_id });

      const events = paginateResults({
        after,
        pageSize,
        results: allEventsForThisAccount,
      });

      return {
        events,
        cursor: events.length ? events[events.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: events.length
          ? events[events.length - 1].cursor !==
          allEventsForThisAccount[allEventsForThisAccount.length - 1].cursor
          : false,
      };
    },
    nominators: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allNominatorAccounts = await dataSources.accountAPI.getAllCurrentNominators();

      const nominators = paginateResults({
        after,
        pageSize,
        results: allNominatorAccounts,
      });

      return {
        accounts: nominators,
        cursor: nominators.length ? nominators[nominators.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: nominators.length
          ? nominators[nominators.length - 1].cursor !==
            allNominatorAccounts[allNominatorAccounts.length - 1].cursor
          : false,
      };
    },
    sessions: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allSessions = await dataSources.sessionAPI.getAllSessions();

      const sessions = paginateResults({
        after,
        pageSize,
        results: allSessions,
      });

      return {
        sessions,
        cursor: sessions.length ? sessions[sessions.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: sessions.length
          ? sessions[sessions.length - 1].cursor !==
            allSessions[allSessions.length - 1].cursor
          : false,
      };
    },
    session: (_, { session_id }, { dataSources }) => {
      return dataSources.sessionAPI.getSession({ sessionId: session_id });
    },
    sessionsById: (_, { session_ids }, { dataSources }) => {
      return dataSources.sessionAPI.getSessions({ sessionIds: session_ids });
    },
  },
  JSON: GraphQLJSON
};
