"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const utils_1 = require("./utils");
exports.resolvers = {
    Query: {
        accounts: (_, { pageSize = 20, after }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const allAccounts = yield dataSources.accountAPI.getAllAccounts();
            const accounts = utils_1.paginateResults({
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
        }),
        account: (_, { account_id }, { dataSources }) => {
            return dataSources.accountAPI.getAccount({ accountId: account_id });
        },
        accountsById: (_, { account_ids }, { dataSources }) => {
            return dataSources.accountAPI.getAccounts({ accountIds: account_ids });
        },
        nominators: (_, { pageSize = 20, after }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            let allNominatorAccounts = yield dataSources.accountAPI.getAllCurrentNominators();
            const nominators = utils_1.paginateResults({
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
        }),
        sessions: (_, { pageSize = 20, after }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            let allSessions = yield dataSources.sessionAPI.getAllSessions();
            const sessions = utils_1.paginateResults({
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
        }),
        session: (_, { session_id }, { dataSources }) => {
            return dataSources.sessionAPI.getSession({ sessionId: session_id });
        },
        sessionsById: (_, { session_ids }, { dataSources }) => {
            return dataSources.sessionAPI.getSessions({ sessionIds: session_ids });
        },
    },
    JSON: graphql_type_json_1.default
};
