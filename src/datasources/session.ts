import { RESTDataSource } from 'apollo-datasource-rest';

class SessionAPI extends RESTDataSource {
  baseURL: string;

  constructor() {
    super();
    this.baseURL = 'https://api-01.polkascan.io/kusama/api/v1/session';
  }

  sessionReducer(session) {
    return {
      attributes: session.attributes,
      id: session.id,
      type: 'session',
    }
  }

  async getAllSessions() {
    const response = await this.get('session');

    return Array.isArray(response.data)
      ? response.data.map(session => this.sessionReducer(session))
      : [];
  }

  // async getAccount({ accountId }) {
  //   const res = await this.get(`account/${accountId}`);

  //   return this.accountReducer(res.data);
  // }

  // async getAccounts({ accountIds }) {
  //   return Promise.all(
  //     accountIds.map(accountId => this.getAccount({ accountId }))
  //   );
  // }
}

export default SessionAPI;
