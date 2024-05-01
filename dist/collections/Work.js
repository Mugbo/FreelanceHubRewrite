"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Work = void 0;
var stripeClient_1 = __importDefault(require("../stripeClient"));
// const addUser: BeforeChangeHook = ({ req, data }) => {
//   const user = req.user as User | null; 
//   return{...data, user: user?.id,}
// };
var CanCRUD = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var user;
    var req = _b.req;
    return __generator(this, function (_c) {
        user = req.user;
        if (!user)
            return [2 /*return*/, false];
        if ((user === null || user === void 0 ? void 0 : user.role) === 'admin')
            return [2 /*return*/, true];
        return [2 /*return*/, {
                user: {
                    equals: user === null || user === void 0 ? void 0 : user.id,
                },
            }];
    });
}); };
var addUser = function (_a) {
    var _b;
    var req = _a.req, data = _a.data;
    var userId = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) || data.user;
    if (userId) {
        return __assign(__assign({}, data), { user: userId });
    }
    return data;
};
exports.Work = {
    slug: "work",
    admin: {
        useAsTitle: "work",
    },
    access: {},
    hooks: {
        beforeChange: [addUser, function (argument) { return __awaiter(void 0, void 0, void 0, function () {
                var argdata, createdWork, Updated, argdata, updateWork, Updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(argument.operation == "create")) return [3 /*break*/, 2];
                            argdata = argument.data;
                            return [4 /*yield*/, stripeClient_1.default.products.create({
                                    name: argdata.title,
                                    default_price_data: {
                                        currency: "EUR",
                                        unit_amount: Math.round(argdata.price * 100)
                                    }
                                })];
                        case 1:
                            createdWork = _a.sent();
                            Updated = __assign(__assign({}, argdata), { stripeId: createdWork.id, priceId: createdWork.default_price });
                            return [2 /*return*/, (Updated)];
                        case 2:
                            if (!(argument.operation == "update")) return [3 /*break*/, 4];
                            argdata = argument.data;
                            return [4 /*yield*/, stripeClient_1.default.products.update(argdata.stripeId, {
                                    name: argdata.title,
                                    default_price: argdata.priceId
                                })];
                        case 3:
                            updateWork = _a.sent();
                            Updated = __assign(__assign({}, argdata), { stripeId: updateWork.id, priceId: updateWork.default_price });
                            return [2 /*return*/, (Updated)];
                        case 4: return [2 /*return*/];
                    }
                });
            }); }],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        { name: "description", type: "textarea", label: "Work description" },
        {
            name: "price",
            label: "Price in Euro",
            type: "number",
            required: true,
        },
        {
            name: "workFiles",
            label: "Work Files",
            type: "relationship",
            required: false,
            relationTo: "workFiles",
            hasMany: true
        },
        {
            name: "approved",
            label: "Approved",
            type: "select",
            defaultValue: "unverified",
            options: [
                {
                    label: "unverified",
                    value: "unverified",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Rejected",
                    value: "rejected",
                },
            ],
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
        },
        {
            name: "category",
            label: "category",
            type: "select",
            defaultValue: "unspecified",
            options: [
                {
                    label: "Front End",
                    value: "front",
                },
                {
                    label: "Back End",
                    value: "back",
                },
                {
                    label: "Full stack",
                    value: "full",
                },
                {
                    label: "unspecified",
                    value: "unspecified",
                },
            ],
        },
        {
            name: "priceId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            },
        }
    ],
};
