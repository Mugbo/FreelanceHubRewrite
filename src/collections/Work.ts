import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CATEGORIES } from "../config";
import { Access, CollectionConfig } from "payload/types";
import { User, Work as WorkType } from "../payload-types";
import stripe from "../stripeClient";

// const addUser: BeforeChangeHook = ({ req, data }) => {
//   const user = req.user as User | null; 

//   return{...data, user: user?.id,}
// };

const CanCRUD: Access = async ({ req }) => {
  const user = req.user as User | null

  if (!user) return false
  if (user?.role === 'admin') return true
  return {
    user: {
      equals: user?.id,
    },
  }
}

const addUser: BeforeChangeHook = ({ req, data }) => {
  const userId = req.user?.id|| data.user;
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
    beforeChange: [addUser, async (argument) => {
      if(argument.operation == "create"){
        const argdata = argument.data as WorkType

        const createdWork = await stripe.products.create({
          name: argdata.title,
          default_price_data:{
            currency: "EUR",
            unit_amount: Math.round(argdata.price * 100)
          }
        })

        const Updated: WorkType = {
          ...argdata,
          stripeId: createdWork.id,
          priceId: createdWork.default_price as string
        }
        return(Updated)
      }
      else if(argument.operation == "update") {
        const argdata = argument.data as WorkType

        const updateWork = await stripe.products.update(argdata.stripeId!, {
          name: argdata.title,
          default_price: argdata.priceId!
        }
        )
        
        const Updated: WorkType = {
          ...argdata,
          stripeId: updateWork.id,
          priceId: updateWork.default_price as string
        }
        return(Updated)

      }
    }],
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
