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
exports.paymentsRouter = void 0;
var stripeClient_1 = __importDefault(require("./../stripeClient"));
var zod_1 = require("zod");
var trpc_1 = require("./trpc");
var server_1 = require("@trpc/server");
var get_payload_1 = require("../get-payload");
exports.paymentsRouter = (0, trpc_1.router)({
    initiateSession: trpc_1.privateProcedure
        .input(zod_1.z.object({ workId: zod_1.z.string() }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var user, workId, payloadClient, work, workItem, workOrder, line_items, stripeSession, error_1;
        var ctx = _b.ctx, input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = ctx.user;
                    workId = input.workId;
                    if (!workId.length) {
                        throw new server_1.TRPCError({
                            code: "BAD_REQUEST",
                            message: "No work IDs provided.",
                        });
                    }
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payloadClient = _c.sent();
                    return [4 /*yield*/, payloadClient.find({
                            collection: "work",
                            where: {
                                id: { equals: workId },
                            },
                        })];
                case 2:
                    work = (_c.sent()).docs;
                    if (work.length === 0) {
                        throw new server_1.TRPCError({ code: "NOT_FOUND", message: "Work not found" });
                    }
                    workItem = work[0];
                    return [4 /*yield*/, payloadClient.create({
                            collection: "workOrder",
                            data: {
                                _isPaid: false,
                                work: workItem.id,
                                user: user.id,
                            },
                        })];
                case 3:
                    workOrder = _c.sent();
                    line_items = [];
                    if (workItem) {
                        line_items.push({
                            price: workItem.priceId,
                            quantity: 1,
                        });
                    }
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, stripeClient_1.default.checkout.sessions.create({
                            success_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/ordercomplete?orderId=").concat(workOrder.id),
                            cancel_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/workpayment/").concat(workId),
                            payment_method_types: ["card"],
                            mode: "payment",
                            metadata: {
                                userId: user.id,
                                orderId: workOrder.id,
                            },
                            line_items: line_items,
                        })];
                case 5:
                    stripeSession = _c.sent();
                    return [2 /*return*/, { url: stripeSession.url }];
                case 6:
                    error_1 = _c.sent();
                    console.error("Failed to create Stripe session:", error_1);
                    return [2 /*return*/, { url: null }];
                case 7: return [2 /*return*/];
            }
        });
    }); }),
    checkOrderStatus: trpc_1.privateProcedure
        .input(zod_1.z.object({ orderId: zod_1.z.string() }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var orderId, payloadClient, workOrder, orderDetails;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    orderId = input.orderId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payloadClient = _c.sent();
                    return [4 /*yield*/, payloadClient.find({
                            collection: "workOrder",
                            where: { id: { equals: orderId } },
                        })];
                case 2:
                    workOrder = (_c.sent()).docs;
                    if (workOrder.length === 0) {
                        throw new server_1.TRPCError({ code: "NOT_FOUND", message: "Order not found" });
                    }
                    orderDetails = workOrder[0];
                    return [2 /*return*/, { isPaid: orderDetails._isPaid }];
            }
        });
    }); }),
    createStripeAccount: trpc_1.privateProcedure.mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var user, userId, account, payloadClient, error_2;
        var ctx = _b.ctx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = ctx.user;
                    userId = user.id;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, stripeClient_1.default.accounts.create({
                            type: "express",
                            country: "IE",
                            email: user.email,
                            capabilities: {
                                card_payments: { requested: true },
                                transfers: { requested: true },
                            },
                        })];
                case 2:
                    account = _c.sent();
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 3:
                    payloadClient = _c.sent();
                    return [4 /*yield*/, payloadClient.update({
                            collection: "users",
                            id: userId,
                            data: {
                                stripePayoutId: account.id,
                            },
                        })];
                case 4:
                    _c.sent();
                    return [2 /*return*/, { accountId: account.id }];
                case 5:
                    error_2 = _c.sent();
                    console.error("Failed to create Stripe account:", error_2);
                    throw new server_1.TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create Stripe account",
                    });
                case 6: return [2 /*return*/];
            }
        });
    }); }),
    generateStripeLoginLink: trpc_1.privateProcedure
        .input(zod_1.z.object({ accountId: zod_1.z.string() }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var accountId, loginLink, error_3;
        var ctx = _b.ctx, input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    accountId = input.accountId;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, stripeClient_1.default.accounts.createLoginLink(accountId)];
                case 2:
                    loginLink = _c.sent();
                    return [2 /*return*/, { url: loginLink.url }];
                case 3:
                    error_3 = _c.sent();
                    console.error("Failed to generate Stripe login link:", error_3);
                    throw new server_1.TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to generate Stripe login link",
                    });
                case 4: return [2 /*return*/];
            }
        });
    }); }),
    generateStripeOnboardingLink: trpc_1.privateProcedure
        .input(zod_1.z.object({ accountId: zod_1.z.string() }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var accountId, accountLink, payloadClient;
        var ctx = _b.ctx, input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    accountId = input.accountId;
                    return [4 /*yield*/, stripeClient_1.default.accountLinks.create({
                            account: accountId,
                            refresh_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/user/").concat(ctx.user.id),
                            return_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/user/").concat(ctx.user.id),
                            type: 'account_onboarding',
                        })];
                case 1:
                    accountLink = _c.sent();
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 2:
                    payloadClient = _c.sent();
                    return [4 /*yield*/, payloadClient.update({
                            collection: "users",
                            id: ctx.user.id,
                            data: {
                                onboardedStripe: "verified",
                            },
                        })];
                case 3:
                    _c.sent();
                    return [2 /*return*/, { link: accountLink }];
            }
        });
    }); }),
});
