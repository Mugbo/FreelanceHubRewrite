"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyQueryValidator = void 0;
var zod_1 = require("zod");
exports.ReplyQueryValidator = zod_1.z.object({
    category: zod_1.z.string().optional(),
    workId: zod_1.z.any(),
});
