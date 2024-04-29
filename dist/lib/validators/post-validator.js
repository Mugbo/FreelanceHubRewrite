"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDataValidator = void 0;
var zod_1 = require("zod");
exports.PostDataValidator = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().max(3000, "Description must be at most 3000 characters long"),
    //   workFiles: z.array(z.string()).min(1, "At least one work file is required"),
    workFiles: zod_1.z.any(),
});
