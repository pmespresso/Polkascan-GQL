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

  async getSession({ sessionId }) {
    const res = await this.get(`session/${sessionId}`);

    return this.sessionReducer(res.data);
  }

  async getSessions({ sessionIds }) {
    return Promise.all(
      sessionIds.map(sessionId => this.getSession({ sessionId }))
    );
  }
}

export default SessionAPI;
