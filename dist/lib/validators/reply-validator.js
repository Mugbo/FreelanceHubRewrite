"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyDataValidator = void 0;
var zod_1 = require("zod");
exports.ReplyDataValidator = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().max(3000, "Description must be at most 3000 characters long"),
    user: zod_1.z.any(),
    workFiles: zod_1.z.any(),
    work: zod_1.z.any()
});
