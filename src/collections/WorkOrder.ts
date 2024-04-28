import { CollectionConfig } from 'payload/types';

const WorkOrder: CollectionConfig = {
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
        read: ({ req }) => req.user.role === 'admin',
        create: () => false,
        update: () => false,
      },
    }
  ],
  access: {
    // Define your access control functions here if needed
    read: () => true, // Example: Allow read access universally
    create: ({ req }) => Boolean(req.user), // Example: Only logged-in users can create orders
    update: ({ req }) => req.user && req.user.role === 'admin', // Example: Only admin users can update orders
    delete: ({ req }) => req.user && req.user.role === 'admin', // Example: Only admin users can delete orders
  },
  admin: {
    useAsTitle: 'WorkOrders',
  },
};

export default WorkOrder;
