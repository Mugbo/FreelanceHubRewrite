"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDataValidator = void 0;
var zod_1 = require("zod");
exports.PostDataValidator = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z
        .string()
        .max(3000, "Description must be at most 3000 characters long"),
    price: zod_1.z.number(),
    category: zod_1.z
        .union([
        zod_1.z.literal("front"),
        zod_1.z.literal("back"),
        zod_1.z.literal("full"),
        zod_1.z.literal("unspecified"),
        zod_1.z.null(),
        zod_1.z.undefined(),
    ])
        .default("unspecified"),
});
