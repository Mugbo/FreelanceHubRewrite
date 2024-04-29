"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkOrder = {
    slug: 'workOrder',
    fields: [
        {
            name: 'work',
            type: 'relationship',
            relationTo: 'work',
            required: true,
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: '_isPaid',
            type: 'checkbox',
            required: true,
            defaultValue: false,
            admin: {
                position: 'sidebar',
                description: 'Indicates whether the order has been paid for.'
            },
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
                create: function () { return false; },
                update: function () { return false; },
            },
        }
    ],
    access: {
        // Define your access control functions here if needed
        read: function () { return true; }, // Example: Allow read access universally
        create: function (_a) {
            var req = _a.req;
            return Boolean(req.user);
        }, // Example: Only logged-in users can create orders
        update: function (_a) {
            var req = _a.req;
            return req.user && req.user.role === 'admin';
        }, // Example: Only admin users can update orders
        delete: function (_a) {
            var req = _a.req;
            return req.user && req.user.role === 'admin';
        }, // Example: Only admin users can delete orders
    },
    admin: {
        useAsTitle: 'WorkOrders',
    },
};
exports.default = WorkOrder;
