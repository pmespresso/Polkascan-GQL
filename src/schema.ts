import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar JSON

  type Query {
    accounts(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): AccountsConnection!
    # account_id is the public key ss58 encoded to the appropriate network
    account(account_id: String!): Account
    accountsById(account_ids: [String]!): [Account]
    events(
      pageSize: Int
      after: String
    ): EventsConnection!
    accountEvents(account_id: String!, pageSize: Int
      after: String): EventsConnection!
    nominators(
      pageSize: Int
      after: String
    ): AccountsConnection! ## just filtered accounts by their role
    sessions(
      pageSize: Int
      after: String
    ): SessionsConnection!
    session(session_id: Int!): Session
    sessionsById(session_ids: [Int]!): [Session]
  }

  type AccountAttributes {
      account_info: JSON
      address: String
      has_identity: Boolean
      has_subidentity: Boolean
      balance_free: String
      # balance_history: [[String]]
      balance_reserved: String
      balance_total: String
      count_reaped: Int
      created_at_block: Int
      hash_blake2b: String
      id: String
      identity_display: String
      identity_email: String
      identity_judgement_bad: Int
      identity_judgement_good: Int
      identity_legal: String
      identity_riot: String
      identity_twitter: String
      identity_web: String
      index_address: Int
      is_contract: Boolean
      is_council_member: Boolean
      is_nominator: Boolean
      is_reaped: Boolean
      is_registrar: Boolean
      is_sudo: Boolean
      is_tech_comm_member: Boolean
      is_treasury: Boolean
      is_validator: Boolean
      nonce: Int
      parent_identity: String
      subidentity_display: String
      updated_at_block: Int
      was_council_member: Boolean
      was_nominator: Boolean
      was_registrar: Boolean
      was_sudo: Boolean
      was_tech_comm_member: Boolean
      was_validator: Boolean
  }

  type Account {
    attributes: AccountAttributes
    id: String
    type: String
  }

  type AccountsConnection {
    cursor: String!
    hasMore: Boolean!
    accounts: [Account]
  }

  type EventAttributeAttribute {
    type: String,
    value: Int,
    valueRaw: String
  }

  type EventAttributes {
    block_id: Int,
    event_idx: Int,
    extrinsic_idx: Int,
    type: String,
    spec_version_id: Int,
    module_id: String,
    event_id: String,
    system: Int,
    module: Int,
    phase: Int,
    attributes: [EventAttributeAttribute],
    codec_error: Boolean
  }

  type Event {
    attributes: EventAttributes
    id: String
    type: String
  }

  type EventsConnection {
    cursor: String!
    hasMore: Boolean!
    events: [Event]
  }

  type SessionAttributes {
    id: Int
    start_at_block: Int
    era: Int
    era_idx: Int
    created_at_block: Int
    created_at_extrinsic: Int
    created_at_event: Int
    count_validators: Int
    count_nominators: Int
    end_at_block: Int
    count_blocks: Int
  }

  type Session {
    attributes: SessionAttributes
    id: String
    type: String
  }

  type SessionsConnection {
    cursor: String
    hasMore: Boolean!
    sessions: [Session]!
  }
`;