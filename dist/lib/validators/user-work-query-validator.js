"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWorkQueryValidator = void 0;
var zod_1 = require("zod");
exports.UserWorkQueryValidator = zod_1.z.object({
    category: zod_1.z.string().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(),
    limit: zod_1.z.number().optional(),
    userId: zod_1.z.any(),
});
