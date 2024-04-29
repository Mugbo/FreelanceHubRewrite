import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Please verify Email</p>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
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
      name:"stripePayoutId",
      type:"text",
      access: {
        read: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },

    }
  
  ],
};
