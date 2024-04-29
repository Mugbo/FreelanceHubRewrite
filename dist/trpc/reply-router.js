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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyRouter = void 0;
var reply_validator_1 = require("../lib/validators/reply-validator");
var trpc_1 = require("./trpc");
var get_payload_1 = require("../get-payload");
var zod_1 = require("zod");
var replies_query_validator_1 = require("../lib/validators/replies-query-validator");
exports.replyRouter = (0, trpc_1.router)({
    createWorkreply: trpc_1.publicProcedure
        .input(reply_validator_1.ReplyDataValidator)
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var title, description, user, workFiles, work, payload, newReply;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    title = input.title, description = input.description, user = input.user, workFiles = input.workFiles, work = input.work;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.create({
                            collection: "replies",
                            data: {
                                title: title,
                                description: description,
                                user: user,
                                workFiles: workFiles,
                                work: work,
                            },
                        })];
                case 2:
                    newReply = _c.sent();
                    return [2 /*return*/, newReply];
            }
        });
    }); }),
    getAllRepliesOnWork: trpc_1.publicProcedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(100),
        cursor: zod_1.z.number().nullish(),
        query: replies_query_validator_1.ReplyQueryValidator,
    }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var query, cursor, workId, queryOpts, payload, parsedQerOpts, page, _c, items, hasNextPage, nextPage;
        var input = _b.input;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    query = input.query, cursor = input.cursor;
                    workId = query.workId, queryOpts = __rest(query, ["workId"]);
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _d.sent();
                    parsedQerOpts = {};
                    Object.entries(queryOpts).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        parsedQerOpts[key] = {
                            equals: value,
                        };
                    });
                    page = cursor || 1;
                    return [4 /*yield*/, payload.find({
                            collection: "replies",
                            where: {
                                work: {
                                    equals: workId,
                                },
                            },
                            sort: "desc",
                            depth: 1,
                            limit: 100,
                            page: page,
                        })];
                case 2:
                    _c = _d.sent(), items = _c.docs, hasNextPage = _c.hasNextPage, nextPage = _c.nextPage;
                    return [2 /*return*/, {
                            items: items,
                            nextPage: hasNextPage ? nextPage : null,
                        }];
            }
        });
    }); }),
    addUpvotesOnReplies: trpc_1.publicProcedure
        .input(zod_1.z.object({ replyId: zod_1.z.string() }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var replyId, payload, reply, thisReply, newvote;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    replyId = input.replyId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            depth: 0,
                            limit: 1,
                        })];
                case 2:
                    reply = (_c.sent()).docs;
                    thisReply = reply[0];
                    if (!reply)
                        throw new Error("Reply not found");
                    newvote = thisReply.upvotes + 1;
                    return [4 /*yield*/, payload.update({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            data: {
                                upvotes: newvote,
                            },
                        })];
                case 3: return [2 /*return*/, _c.sent()];
            }
        });
    }); }),
    removeUpvotesOnReplies: trpc_1.publicProcedure
        .input(zod_1.z.object({ replyId: zod_1.z.string() }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var replyId, payload, reply, thisReply, newvote;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    replyId = input.replyId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            depth: 0,
                            limit: 1,
                        })];
                case 2:
                    reply = (_c.sent()).docs;
                    thisReply = reply[0];
                    if (!reply)
                        throw new Error("Reply not found");
                    if (thisReply.upvotes == 0)
                        throw new Error("Votes cannot be less than 0");
                    newvote = thisReply.upvotes - 1;
                    return [4 /*yield*/, payload.update({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            data: {
                                upvotes: newvote,
                            },
                        })];
                case 3: return [2 /*return*/, _c.sent()];
            }
        });
    }); }),
    getUpvotesOnReplies: trpc_1.publicProcedure
        .input(zod_1.z.object({ replyId: zod_1.z.string() }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var replyId, payload, reply, thisReply, upvotes;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    replyId = input.replyId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            depth: 0,
                            limit: 1,
                        })];
                case 2:
                    reply = (_c.sent()).docs;
                    if (!reply) {
                        throw new Error("Reply not found");
                    }
                    thisReply = reply[0];
                    upvotes = thisReply.upvotes;
                    return [2 /*return*/, upvotes];
            }
        });
    }); }),
    addDownvotesOnReplies: trpc_1.publicProcedure
        .input(zod_1.z.object({ replyId: zod_1.z.string() }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var replyId, payload, reply, thisReply, newvote;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    replyId = input.replyId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            depth: 0,
                            limit: 1,
                        })];
                case 2:
                    reply = (_c.sent()).docs;
                    thisReply = reply[0];
                    if (!reply)
                        throw new Error("Reply not found");
                    newvote = thisReply.downvotes + 1;
                    return [4 /*yield*/, payload.update({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            data: {
                                downvotes: newvote,
                            },
                        })];
                case 3: return [2 /*return*/, _c.sent()];
            }
        });
    }); }),
    removeDownvotesOnReplies: trpc_1.publicProcedure
        .input(zod_1.z.object({ replyId: zod_1.z.string() }))
        .mutation(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var replyId, payload, reply, thisReply, newvote;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    replyId = input.replyId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            depth: 0,
                            limit: 1,
                        })];
                case 2:
                    reply = (_c.sent()).docs;
                    thisReply = reply[0];
                    if (!reply)
                        throw new Error("Reply not found");
                    if (thisReply.downvotes == 0)
                        throw new Error("Votes cannot be less than 0");
                    newvote = thisReply.downvotes - 1;
                    return [4 /*yield*/, payload.update({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            data: {
                                downvotes: newvote,
                            },
                        })];
                case 3: return [2 /*return*/, _c.sent()];
            }
        });
    }); }),
    getDownvotesOnReplies: trpc_1.publicProcedure
        .input(zod_1.z.object({ replyId: zod_1.z.string() }))
        .query(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var replyId, payload, reply, thisReply, downvotes;
        var input = _b.input;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    replyId = input.replyId;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _c.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "replies",
                            where: {
                                id: {
                                    equals: replyId,
                                },
                            },
                            depth: 0,
                            limit: 1,
                        })];
                case 2:
                    reply = (_c.sent()).docs;
                    if (!reply) {
                        throw new Error("Reply not found");
                    }
                    thisReply = reply[0];
                    downvotes = thisReply.downvotes;
                    return [2 /*return*/, downvotes];
            }
        });
    }); }),
});
