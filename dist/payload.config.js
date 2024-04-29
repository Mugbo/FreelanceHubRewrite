"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var config_1 = require("payload/config");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var path_1 = __importDefault(require("path"));
var Users_1 = require("./collections/Users");
var Work_1 = require("./collections/Work");
var dotenv_1 = __importDefault(require("dotenv"));
var WorkFiles_1 = require("./collections/WorkFiles");
var Images_1 = require("./collections/Images");
var Replies_1 = require("./collections/Replies");
var WorkOrder_1 = __importDefault(require("./collections/WorkOrder"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    collections: [Users_1.Users, Work_1.Work, WorkFiles_1.WorkFiles, Images_1.Images, Replies_1.Replies, WorkOrder_1.default],
    routes: {
        admin: "/admin",
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: "- FreelanceHub",
            favicon: "/Screenshot.ico",
            ogImage: "/EmptyCart.png",
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({ url: process.env.MONGODB_URL }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "payload-types.ts"),
    },
});
