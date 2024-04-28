// import frontendImg from "../../public/Frontend.png"
// import backendImg from "../../public/backend.png"
// import fullStackImg from "../../public/Fullstack.png"

export const CATEGORIES = [
  {
    label: "Find Work",
    value: "Find Work" as const,
    featured: [
      {
        name: "Front-end",
        href: "/market",
        // imageSrc: frontendImg,
      },
      {
        name: "Back-end",
        href: "#",
        // imageSrc: backendImg,
      },
      {
        name: "All",
        href: "#",
        // imageSrc: fullStackImg,
      },
    ],
  },
  {
    label: "Find Devleopers",
    value: "Find Devleopers" as const,
    featured: [
      {
        name: "Front-end",
        href: "#",
        // imageSrc: frontendImg,
      },
      {
        name: "Back-end",
        href: "#",
        // imageSrc: backendImg,
      },
      {
        name: "All",
        href: "#",
        // imageSrc: fullStackImg,
      },
    ],
  },
];
