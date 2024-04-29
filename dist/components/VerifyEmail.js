"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = require("@/trpc/client");
var lucide_react_1 = require("lucide-react");
var image_1 = __importDefault(require("next/image"));
var link_1 = __importDefault(require("next/link"));
var button_1 = require("./ui/button");
var VerifyEmail = function (_a) {
    var token = _a.token;
    //destructure from trpc beu
    var _b = client_1.trpc.auth.verifyEmail.useQuery({
        token: token,
    }), data = _b.data, isError = _b.isError;
    if (isError) {
        return (react_1.default.createElement("div", { className: "flex flex-col items-center gap -2" },
            react_1.default.createElement(lucide_react_1.XCircle, { className: "h-8 w-8 text-red-600" }),
            react_1.default.createElement("h3", { className: "font-semibold text-xl" }, "There has been a Problem"),
            react_1.default.createElement("p", { className: "text-muted-foreground text-sm" }, "invalid token. try again")));
    }
    if (data === null || data === void 0 ? void 0 : data.success) {
        return (react_1.default.createElement("div", { className: "flex h-full flex-col items-center justify-center" },
            react_1.default.createElement("div", { className: "relative mb-4 h-60 w-60 text-muted-foreground" },
                react_1.default.createElement(image_1.default, { src: "/screenshot.io", fill: true, alt: "email sent" })),
            react_1.default.createElement("h3", { className: "font-semibold text-2xl" }, "You are all ready to go "),
            react_1.default.createElement(link_1.default, { className: (0, button_1.buttonVariants)({ className: "mt-4" }), href: "/sign-in" }, "Sign in")));
    }
};
exports.default = VerifyEmail;
