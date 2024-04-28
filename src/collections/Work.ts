import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CATEGORIES } from "../config";
import { CollectionConfig } from "payload/types";
import { User } from "../payload-types";

// const addUser: BeforeChangeHook = ({ req, data }) => {
//   const user = req.user as User | null; 

//   return{...data, user: user?.id,}
// };

const addUser: BeforeChangeHook = ({ req, data }) => {
  const userId = data.user || req.user?.id;
  if (userId) {
    return { ...data, user: userId };
  }
  return data;
};

export const Work: CollectionConfig = {
  slug: "work",
  admin: {
    useAsTitle: "work",
  },
  access: {},
  hooks: {
    beforeChange: [addUser],
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
      name: "price",
      label: "Price in Euro",
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "category",
      type: "select",
      options: CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: false,
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
      name: "approved",
      label: "Approved",
      type: "select",
      defaultValue: "unverified",
      options: [
        {
          label: "unverified",
          value: "unverified",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Rejected",
          value: "rejected",
        },
      ],
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    }
  ],
};
