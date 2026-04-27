export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Stats", link: "#stats" },
    { name: "Experience", link: "#experience" },
    { name: "Music", link: "#beyond" },
    { name: "LLD", link: "#lld" },
    { name: "Contact", link: "#contact" },
  ];

  export interface WorkExperienceItem {
    id: number
    role: string
    company: string
    duration: string
    location: string
    description: string
    tech: string[]
  }

  export const gridItems = [
    {
      id: 1,
      title: "Hi, I’m Himanshu Mishra – a Software Developer 2 at Serko with a passion for system design and cloud technologies. Outside of work, I’m a trained Indian classical singer and guitar enthusiast, always exploring creativity alongside code.",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-start",
      img: "HimanshuPhoto.png",
      spareImg: "",
    },
    
    {
      id: 2,
      title: "Building for a globally connected world",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for development.",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "Building an AI Travel Agent that autonomously plans trips using LLMs, RAG & real-time flight data",
      description: "The Inside Scoop",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Do you want to start a project together?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
  export interface Project {
    id: number;
    title: string;
    des: string;
    img: string;
    iconLists: string[];
    link: string;
    liveUrl?: string;
    liveLabel?: string;
    tags: string[];
    status: string;
  }

  export const projects: Project[] = [
    {
      id: 1,
      title: "LLD Playground Hub",
      des: "React and Vite visualiser for my Java LLD implementations. Walk through Spotify, KV-Store, and Distributed Message Queue designs with pattern maps, execution flows, and an AI chat grounded in the actual code.",
      img: "/p1.svg",
      iconLists: ["/re.svg", "/ts.svg", "/three.svg"],
      link: "https://github.com/Himanshu-prog-hub/LLDPlayground",
      // The built LLD Playground app lives at public/lld-playground/ — served at /lld-playground/.
      // To update it: run build-lld.bat (Windows) which rebuilds and copies the dist automatically.
      liveUrl: "/lld-playground/",
      liveLabel: "Launch Playground",
      tags: ["React", "Vite", "Java", "LLD", "System Design"],
      status: "Live",
    },
    {
      id: 2,
      title: "LinkedIn Post Generator",
      des: "Generates LinkedIn posts from a topic, tone, and length selection. Backed by a Groq LLM via FastAPI, with a focused React UI built for quick drafting and copy-paste output.",
      img: "/p2.svg",
      iconLists: ["/re.svg", "/ts.svg", "/next.svg"],
      link: "https://github.com/Himanshu-prog-hub/LinkedinPostGenerator",
      // liveUrl: "/linkedin-post-generator/",  ← uncomment when backend is deployed
      // liveLabel: "Launch App",
      tags: ["Python", "Groq", "LLM", "React", "FastAPI"],
      status: "In Progress",
    },
    {
      id: 3,
      title: "Interactive Developer Portfolio",
      des: "This site. Next.js 15, Three.js, Framer Motion. 3D instrument canvas, live constellation background, AI chat over my LLD code, Spotify collab matcher, command palette, and terminal easter egg.",
      img: "/p4.svg",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
      link: "https://github.com/Himanshu-prog-hub/portfolio",
      tags: ["Next.js", "Three.js", "TypeScript", "Frontend", "React"],
      status: "Live",
    },
    {
      id: 4,
      title: "Policy Compliance Agent",
      des: "Internal tool at Serko. Reads corporate travel policies written in plain English and filters live flight results against them. Python backend, LLM integration for policy parsing.",
      img: "/p3.svg",
      iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
      link: "",
      tags: ["Python", "LLM", "GenAI", "AI Agent"],
      status: "Shipped",
    },
  ];
  
  export const testimonials = [
    {
      quote:
        "At Serko, I work as a Software Developer 2, contributing to backend development and system design for large-scale travel and expense management solutions. My role involves designing and implementing scalable microservices, optimizing system performance, and ensuring reliability through CI/CD pipelines and cloud-native practices on GCP. I collaborate closely with cross-functional teams to deliver features that enhance booking experiences and payment workflows, while also driving initiatives around observability, automation, and maintainability.Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
      name: "Serko",
      title: "Software Developer 2",
    },
    {
      quote:
        "At Sabre, I worked as a Software Developer 2 on GetThere, a corporate booking tool. I contributed to backend feature development, focusing on integrating NDC-based content alongside traditional ATPCO fares to enhance fare visibility and amenities for corporate travelers. My work also included projects around PCI compliance and direct data handling, ensuring security and reliability of sensitive transactions. Collaborated with global teams to deliver scalable solutions that improved both performance and user experience.",
      name: "Sabre Travel Technologies",
      title: "Software Developer 2",
    },
    {
      quote:
        "At Sabre, I began as a Software Developer Intern, gaining hands-on experience in backend development and enterprise-scale systems. I contributed to feature enhancements and bug fixes on the GetThere platform, while building a strong foundation in Java, microservices, and database design. This role gave me exposure to working in an agile environment and set the stage for my transition into a full-time Software Developer role.",
      name: "Sabre Travel Technologies",
      title: "Software Developer Intern",
    },
  ];
  
  export const companies = [
    {
      id: 1,
      name: "cloudinary",
      img: "/cloud.svg",
      nameImg: "/cloudName.svg",
    },
    {
      id: 2,
      name: "appwrite",
      img: "/app.svg",
      nameImg: "/appName.svg",
    },
    {
      id: 3,
      name: "HOSTINGER",
      img: "/host.svg",
      nameImg: "/hostName.svg",
    },
    {
      id: 4,
      name: "stream",
      img: "/s.svg",
      nameImg: "/streamName.svg",
    },
    {
      id: 5,
      name: "docker.",
      img: "/dock.svg",
      nameImg: "/dockerName.svg",
    },
  ];
  
  export const workExperience = [
    {
      id: 1,
      role: "Software Developer 2",
      company: "Serko",
      duration: "2025 – Present",
      location: "Bengaluru, India",
      description: "Building scalable microservices and cloud-native systems for travel & expense management. Designing booking and payment workflows on GCP, driving CI/CD pipelines, observability, and system reliability across cross-functional teams.",
      tech: ["Java", "Spring Boot", "GCP", "Kubernetes", "PostgreSQL", "React"],
    },
    {
      id: 2,
      role: "Software Developer",
      company: "Sabre GetThere",
      duration: "2023 – 2025",
      location: "Bengaluru, India",
      description: "Integrated NDC-based airline content alongside traditional ATPCO fares for corporate travelers. Led PCI compliance initiatives and improved fare visibility and amenities across the GetThere booking platform.",
      tech: ["Java", "Spring Boot", "MySQL", "REST APIs", "Microservices"],
    },
    {
      id: 3,
      role: "Software Developer Intern",
      company: "Sabre GetThere",
      duration: "2023",
      location: "Bengaluru, India",
      description: "Contributed to backend feature development and bug fixes on the GetThere platform. Built strong foundations in Java, microservices, and agile delivery while gaining exposure to enterprise travel tech at scale.",
      tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    },
  ];
