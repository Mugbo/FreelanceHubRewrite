import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CollectionConfig } from "payload/types";

const addUserAndWork: BeforeChangeHook = ({ req, data }) => {
    // Prefer user ID directly from data if present, otherwise use req.user
    const userId = data.user || req.user?.id;

    // Check if 'work' field is provided in the incoming data
    const work = data.work; // Assuming 'work' is an ID or array of IDs that need to be linked

    // Combine incoming data with user and work data
    const newData = {
        ...data,
        ...(userId && { user: userId }),  // Only add 'user' key if userId is not null
        ...(work && { work: work })       // Only add 'work' key if work is not null
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
