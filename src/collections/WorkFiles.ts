import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null; 

  return{...data, user: user?.id,}
};

const CanCRUD: Access = async ({ req }) => {
    const user = req.user as User | null

    if (!user) return false
    if (user?.role === 'admin') return true

    const {docs: work} = await req.payload.find({
      collection: 'work',
      depth: 0,
      where:{
        user: {
          equals: user.id,
        },
      }
    })

    const OwnedWorkFiles = work.map((wk) => wk.workFiles)

    return{
      id:{
        in: [...OwnedWorkFiles]
      }
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
    read: () => true,
    // async({req}) => {
    //     const ref = req.headers.referer

    //     if( !ref?.includes('admin')){
    //         return true
    //     }

    //     return await CanCRUD()({req})
    // },
    delete: CanCRUD,
    update: CanCRUD,
  },
  upload: {
    staticURL: "/work_files",
    staticDir: "work_files",
    mimeTypes: [
      "text/*",
      "application/*",
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
