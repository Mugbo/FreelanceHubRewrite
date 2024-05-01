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

    },
    {
      name: "onboardedStripe",
      type: "select",
      defaultValue: "unerified",
      options:[
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
    },
    {
      name: "category",
      label: "category",
      type: "select",
      defaultValue: "unspecified",
      options: [
        {
          label: "Front End",
          value: "front",
        },
        {
          label: "Back End",
          value: "back",
        },
        {
          label: "Full stack",
          value: "full",
        },
        {
          label: "unspecified",
          value: "unspecified",
        },
      ],
    },
  
  ],
};
