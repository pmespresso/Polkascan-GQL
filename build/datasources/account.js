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
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class AccountAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api-01.polkascan.io/kusama/api/v1/';
    }
    // leaving this inside the class to make the class easier to test
    accountReducer(account) {
        return {
            id: account.id,
            type: "account",
            attributes: Object.assign({}, account.attributes)
        };
    }
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('accounts');
            return Array.isArray(response)
                ? response.map(account => this.accountReducer(account))
                : [];
        });
    }
    getAccount({ accountId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get('account', { account_id: accountId });
            return this.accountReducer(res[0]);
        });
    }
    getAccounts({ accountIds }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(accountIds.map(accountId => this.getAccount({ accountId })));
        });
    }
}
exports.default = AccountAPI;
