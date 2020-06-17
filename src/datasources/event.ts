import { RESTDataSource } from 'apollo-datasource-rest';
import BN from 'bn.js';

interface EventAttributeAttribute {
  type: string,
  value: string,
  valueRaw: string,
  orig_value?: string | null
}

interface Event {
  type: string,
  id: string,
  attributes: {
    block_id: number,
    event_idx: number,
    extrinsic_idx: number,
    type: number,
    spec_version_id: number,
    module_id: string,
    event_id: string,
    system: number,
    module: number,
    phase: number,
    attributes: EventAttributeAttribute,
    codec_error: false
  }
}

class EventAPI extends RESTDataSource {
  baseURL: string;

  constructor() {
    super();
    this.baseURL = 'https://api-01.polkascan.io/kusama/api/v1/';
  }

  eventReducer(account) {
    return {
      id: account.id,
      type: account.type,
      attributes: account.attributes
    }
  }

  async getAllEvents(pageSize: number, after: number) {
    const response = await this.get('event');

    return Array.isArray(response.data)
      ? response.data.map(account => this.eventReducer(account))
      : [];
  }

  async getAccountEvents(accountId: string, pageSize = 20, after=10) {
    let events = await this.getAllEvents(pageSize, after);

    events.map((event) => {
      console.log(event.attributes.attributes.type === 'AccountId')
    })

    return events.filter((event: Event) => {
      event.attributes.attributes.type === 'AccountId' && event.attributes.attributes.value === accountId
    })
  }
}

export default EventAPI;
