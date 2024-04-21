import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import { Work } from "./collections/Work"
import dotenv from "dotenv"
import { WorkFiles } from "./collections/WorkFiles";
import { Images } from "./collections/Images";
import { Replies } from "./collections/Replies";

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Work, WorkFiles, Images, Replies],
  routes: {
    admin: "/admin",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- FreelanceHub",
      favicon: "/Screenshot.ico",
      ogImage: "/EmptyCart.png",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({ url: process.env.MONGODB_URL! }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
