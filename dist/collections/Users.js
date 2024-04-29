"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "'>Please verify Email</p>");
            },
        },
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
    },
    fields: [
        {
            name: "role",
            admin: {
            // condition: () => false,
            // condition: ({req}) => req.user.role === "admin"
            // // this allows only visible to admins
            },
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
        },
        {
            name: "biography",
            label: "biography",
            type: "textarea",
            required: false,
        },
        {
            name: "ProfilePicture",
            type: "upload",
            relationTo: "images"
        },
        {
            name: "stripePayoutId",
            type: "text",
            access: {
                read: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "onboardedStripe",
            type: "select",
            defaultValue: "unerified",
            options: [
                {
                    label: "unverified",
                    value: "unverified",
                },
                {
                    label: "verified",
                    value: "verified",
                },
            ],
            admin: {
                hidden: true,
            },
        }
    ],
};
