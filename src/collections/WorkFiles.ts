import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null; 

  return{...data, user: user?.id,}
};

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

export const WorkFiles: CollectionConfig = {
  slug: "workFiles",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access:{
    read: async({req}) => {
        const ref = req.headers.referer

        if( !ref?.includes('admin')){
            return true
        }

        return await CanCRUD()({req})
    },
    delete: CanCRUD(),
    update: CanCRUD(),
  },
  upload: {
    staticURL: "/work-files",
    staticDir: "workFiles",
    mimeTypes: [
      "text/plain",
      "text/html",
      "text/javascript",
      "application/json",
      "text/javascript",
      "application/rtf",
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: true,
      required: true,
    },
  ],
};
