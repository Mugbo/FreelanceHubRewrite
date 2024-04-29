"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_1 = __importDefault(require("stripe"));
var stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    typescript: true,
    apiVersion: "2023-10-16",
});
exports.default = stripe;
