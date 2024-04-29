"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Replies = void 0;
var addUserAndWork = function (_a) {
    var _b;
    var req = _a.req, data = _a.data;
    var userId = data.user || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
    var work = data.work;
    var newData = __assign(__assign(__assign({}, data), (userId && { user: userId })), (work && { work: work }));
    return newData;
};
exports.Replies = {
    slug: "replies",
    admin: {
        useAsTitle: "replies",
    },
    hooks: {
        beforeChange: [addUserAndWork],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        { name: "description", type: "textarea", label: "Work description" },
        {
            name: "work",
            type: "relationship",
            required: true,
            relationTo: "work",
            hasMany: false,
        },
        {
            name: "workFiles",
            label: "Work Files",
            type: "relationship",
            required: false,
            relationTo: "workFiles",
            hasMany: true
        },
        {
            name: 'upvotes',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'downvotes',
            type: 'number',
            defaultValue: 0,
        },
    ],
    access: {
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        read: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
};
