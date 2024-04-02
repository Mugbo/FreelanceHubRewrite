import { LucideProps } from "lucide-react";
import image from "../../public/UntitledDesign.svg"
import image1 from "../../public/Screenshot.ico"
import image2 from "../../public/Screenshot 2024-04-02 at 17.48.32.svg"



export const Icons = {
  logo: (props: LucideProps) => (
    <svg {...props} >
        <img src = {image} alt = "logo"></img>
      </svg>
  ),
};
