import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CollectionConfig } from "payload/types";

const addUserAndWork: BeforeChangeHook = ({ req, data }) => {
    const userId = data.user || req.user?.id;

    const work = data.work;

    const newData = {
        ...data,
        ...(userId && { user: userId }), 
        ...(work && { work: work })      
    };

    return newData;
};

export const Replies: CollectionConfig = {
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
        condition: () => false,
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
    create: ({ req }) => req.user.role === "admin",
    read: ({ req }) => req.user.role === "admin",
    update: ({ req }) => req.user.role === "admin",
  },
};
