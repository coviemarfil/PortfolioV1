export const navigation = ["About", "Projects", "Experience", "Skills", "Contact"] as const;

export const socials = [
  { label: "GitHub", value: "github.com/coviemarfil", href: "https://github.com/coviemarfil", external: true },
  { label: "Facebook", value: "facebook.com/covie.marfil", href: "https://www.facebook.com/covie.marfil/", external: true },
  { label: "LinkedIn", value: "linkedin.com/in/covie-marfil-367484322", href: "https://www.linkedin.com/in/covie-marfil-367484322/", external: true },
  { label: "Email", value: "coviemarfil1@gmail.com", href: "mailto:coviemarfil1@gmail.com", external: false }
] as const;

export const projects = [
  {
    type: "Personal",
    title: "Portfolio Website",
    description: "Demonstrates component-based frontend development with Next.js, React, TypeScript, and Tailwind CSS. I designed and built a responsive interface with reusable UI components, mobile navigation, and persistent light and dark theme behavior.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    screenshots: ["/media/portfolio-desktop.png", "/media/portfolio-mobile.png"],
    links: [{ label: "GitHub", href: "https://github.com/coviemarfil", external: true }, { label: "Live demo", href: "#hero", external: false }]
  },
  {
    type: "Personal",
    title: "MOBEE",
    description: "Demonstrates JavaScript API integration and asynchronous data handling through searchable, filterable movie content. Built responsive UI interactions, persistent favorites with local storage, theme management, and a Node.js proxy that keeps API requests secure.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "API Integration", "Vercel"],
    screenshots: ["/media/mobee-01.png", "/media/mobee-02.png", "/media/mobee-03.png", "/media/mobee-04.png", "/media/mobee-05.png", "/media/mobee-06.png", "/media/mobee-07.png", "/media/mobee-08.png"],
    links: []
  },
  {
    type: "Personal",
    title: "Unimart",
    description: "Demonstrates full-stack PHP and MySQL development through role-based student and administrator workflows. Built CRUD operations for products and inventory, relational order management, carts and checkout, order tracking, authentication, and dashboard analytics.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "CRUD"],
    screenshots: ["/media/unimart-01.png", "/media/unimart-02.png", "/media/unimart-03.png", "/media/unimart-04.png", "/media/unimart-05.png", "/media/unimart-06.png", "/media/unimart-07.png", "/media/unimart-08.png", "/media/unimart-09.png", "/media/unimart-10.png"],
    links: []
  }
] as const;

export const experience = [
  { date: "Sept 2025 - Feb 2026", role: "Database Developer Intern (OJT)", company: "Datablazers Inc. · Muntinlupa City", details: ["Assisted in the development, testing, and optimization of database systems to support business operations.", "Performed database queries, data validation, and debugging to ensure data accuracy and system performance.", "Collaborated with the development team to identify and resolve database-related issues and inefficiencies.", "Documented database structures, test results, and optimization procedures for internal reference."] },
  { date: "Sept 2023 - Nov 2023", role: "Customer Service Representative", company: "IBEX Philippines · Muntinlupa City", details: ["Handled inbound calls and live chat support for customers inquiring about automotive products including tires and batteries.", "Maintained accurate customer records and resolved inquiries in a timely and professional manner.", "Consistently met call handling and customer satisfaction targets in a high-volume call center environment."] },
  { date: "2020", role: "OJT - Data Entry & ID Processing", company: "Muntinlupa City Hall · Muntinlupa City", details: ["Processed and encoded Care Card applications by collecting and documenting applicant personal information.", "Maintained accuracy and confidentiality of sensitive government data records."] }
] as const;

export const education = [
  { date: "2022 - 2026", degree: "Bachelor of Science in Information Technology", school: "Pamantasan ng Lungsod ng Muntinlupa, Muntinlupa City" },
  { date: "2020 - 2022", degree: "Senior High School", school: "Cupang Senior High School, Muntinlupa City" },
  { date: "2016 - 2020", degree: "Junior High School", school: "Muntinlupa Business High School, Muntinlupa City" }
] as const;

export const skillGroups = [
  { title: "Frontend Development", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript", "Responsive Design"] },
  { title: "Backend & Data", skills: ["PHP", "Node.js", "MySQL", "PDO", "API Integration", "CRUD Operations", "Database Design"] },
  { title: "Tools & Software", skills: ["VS Code", "Git & GitHub", "Vercel", "XAMPP", "Postman", "Chrome DevTools", "Figma", "Canva", "Photoshop", "Microsoft Office", "Google Workspace"] },
  { title: "IT Fundamentals", skills: ["PC Troubleshooting", "Hardware & Software Setup", "Operating Systems", "File Management", "Database Basics", "Networking", "Cybersecurity Basics", "Video Editing", "AI Tools"] }
] as const;
