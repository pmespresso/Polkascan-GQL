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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const utils_1 = require("./utils");
exports.resolvers = {
    Query: {
        accounts: (_, { pageSize = 20, after }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const allAccounts = yield dataSources.accountAPI.getAllAccounts();
            // we want these in reverse chronological order
            allAccounts.reverse();
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
        account: (_, { id }, { dataSources }) => dataSources.accountAPI.getAccount({ account_id: id }),
    }
};
