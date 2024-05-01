import { User } from "@/payload-types";
import Image from "next/image";

interface UserContainProps {
    user: User
    imageUrl: string;
  }


const UserContain = ({user, imageUrl}:UserContainProps) => {


    return(
    <div className=" mt-10 z-10 bg-white shadow-md border border-gray-100 rounded-3xl">
        <div className="px-4 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-start space-x-6">
            {" "}
           {imageUrl && <Image
              src={imageUrl}
              alt="User Profile"
              width={300}
              height={300}
              className="flex-shrink-0 rounded-lg"
            />}
            <div className="flex flex-col space-y-4">
              {" "}
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {user && user.email}
              </h1>
              <p className="text-lg text-gray-500">{ user && user.biography}</p>
            </div>
          </div>
        </div>
      </div>
    )

}
export default UserContain;