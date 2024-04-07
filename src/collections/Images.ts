import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const CanCRUD = (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    return {
      user: {
        equals: req.user.id,
      },
    }
}

export const Images: CollectionConfig = {
  slug: "images",
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "profile",
        width: 400,
        height: 300,
        position: "center",
      },
    ],
    mimeTypes: ["image/*"],
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
  ],
  admin:{
    hidden:({user}) => user.role !== "admin"
  },
  access: {
    read: () => true,
    delete: CanCRUD(),
    update: CanCRUD(),

  }
};
