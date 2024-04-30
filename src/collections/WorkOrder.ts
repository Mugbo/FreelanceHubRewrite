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
    read: () => true, 
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => req.user && req.user.role === 'admin', 
    delete: ({ req }) => req.user && req.user.role === 'admin', 
  },
  admin: {
    useAsTitle: 'WorkOrders',
  },
};

export default WorkOrder;
