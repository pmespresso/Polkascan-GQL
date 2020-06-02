import { RESTDataSource } from 'apollo-datasource-rest';

type AnyJSON = {} | object;

interface BalanceHistory {
  name: string,
  type: string,
  data: Array<Array<number>>
}

interface Account {
  attributes: {
    account_info: AnyJSON | null
    address: string
    balance_free: number
    balance_history: Array<BalanceHistory>
    balance_reserved: number
    balance_total: number | string
    count_reaped: number
    created_at_block: number
    has_identity: false
    has_subidentity: false
    hash_blake2b: string
    id: string
    identity_display: string | null
    identity_email: string | null
    identity_judgement_bad: number
    identity_judgement_good: number
    identity_legal: string | null
    identity_riot: string | null
    identity_twitter: string | null
    identity_web: string | null
    index_address: string | number | null
    is_contract: boolean
    is_council_member: boolean
    is_nominator: boolean
    is_reaped: boolean
    is_registrar: boolean
    is_sudo: boolean
    is_tech_comm_member: boolean
    is_treasury: boolean
    is_validator: boolean
    nonce: number
    parent_identity: string | null
    subidentity_display: string | null
    updated_at_block: number
    was_council_member: boolean
    was_nominator: boolean
    was_registrar: boolean
    was_sudo: boolean
    was_tech_comm_member: boolean
    was_validator: boolean
  }
  id: string,
  type: "account"
}

class AccountAPI extends RESTDataSource {
  baseURL: string;

  constructor() {
    super();
    this.baseURL = 'https://api-01.polkascan.io/kusama/api/v1/';
  }

  // leaving this inside the class to make the class easier to test
  accountReducer(account) {
    return {
      id: account.id,
      type: account.type,
      attributes: account.attributes
    }
  }

  async getAllAccounts() {
    const response = await this.get('account');
    console.log('response -> ', response);

    return Array.isArray(response.data)
      ? response.data.map(account => this.accountReducer(account))
      : [];
  }

  async getAccount({ accountId }) {
    const res = await this.get('account', { account_id: accountId });
    return this.accountReducer(res[0]);
  }

  async getAccounts({ accountIds }) {
    return Promise.all(
      accountIds.map(accountId => this.getAccount({ accountId }))
    );
  }
}

export default AccountAPI;
