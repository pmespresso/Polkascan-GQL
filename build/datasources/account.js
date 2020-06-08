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
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const bn_js_1 = __importDefault(require("bn.js"));
class AccountAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api-01.polkascan.io/kusama/api/v1/';
    }
    // leaving this inside the class to make the class easier to test
    accountReducer(account) {
        /**
         * Main thing: the balances and other fields that exceed 53 bit represenntation should be converted to BigNumber and stringify for the Graphql layer.
         * Unfortunately with JS the recommended approach is to serialize as string and store that.
         * See also: https://github.com/graphql/graphql-js/issues/292#issuecomment-186702912
         *
         * # balance_free
         * # balance_reserved
         * # balance_total
         * # balance_history.data
         */
        return {
            id: account.id,
            type: account.type,
            attributes: Object.assign({ balance_free: new bn_js_1.default(String(account.attributes.balance_free)).toString(), balance_reserved: new bn_js_1.default(String(account.attributes.balance_reserved)).toString(), balance_total: new bn_js_1.default(String(account.attributes.balance_total)).toString() }, account.attributes)
        };
    }
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('account');
            return Array.isArray(response.data)
                ? response.data.map(account => this.accountReducer(account))
                : [];
        });
    }
    getAccount({ accountId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.get(`account/${accountId}`);
            return this.accountReducer(res.data);
        });
    }
    getAccounts({ accountIds }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(accountIds.map(accountId => this.getAccount({ accountId })));
        });
    }
    //https://api-01.polkascan.io/kusama/api/v1/account?filter[is_nominator]=1&page[size]=25
    getAllCurrentNominators() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`account?filter[is_nominator]=1`);
            return Array.isArray(response.data)
                ? response.data.map(account => this.accountReducer(account))
                : [];
        });
    }
}
exports.default = AccountAPI;
