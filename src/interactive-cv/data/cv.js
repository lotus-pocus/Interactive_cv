// Transcribed from the live CV PDF, the source of truth:
// https://lotus-pocus-portfolio.vercel.app/Lotus_Tay_CV.pdf (checked 2 November 2026).
// Keep wording and order identical to the PDF. Change this only when the PDF changes.
// Experience entries use heading/subheading because the PDF leads with the role
// for the freelance entry and with the organisation for the others.
// The mobile number is deliberately left out of the HTML version (see CONTENT_CHECKLIST.md).

export const cv = {
  name: "Lotus Tay",
  headline: ["Creative Developer", "Frontend Development", "Interactive Experiences"],
  location: "London",
  email: "lotusetay@gmail.com",
  links: [
    { label: "Portfolio", text: "lotus-pocus-portfolio.vercel.app", href: "https://lotus-pocus-portfolio.vercel.app/" },
    { label: "GitHub", text: "github.com/lotus-pocus", href: "https://github.com/lotus-pocus" },
    { label: "LinkedIn", text: "linkedin.com/in/lotus-tay", href: "https://linkedin.com/in/lotus-tay" },
  ],

  profile: [
    "Creative Developer with four years of hands-on experience building interactive web applications using JavaScript, React, HTML and CSS. Experienced in responsive interface development, rapid prototyping and cross-browser testing, with a particular focus on usability and creating reliable experiences across devices.",
    "Currently working within a creative technology studio, collaborating with designers and developers on digital projects from concept through to delivery. Alongside my studio role, I independently design, develop and launch web applications, including Grown on Trees, a daily browser-based puzzle game.",
  ],

  skills: [
    {
      group: "Creative Development",
      items: [
        "Interactive Prototyping",
        "Responsive UI Development",
        "UX & Usability Testing",
        "Component-based architecture",
        "AI-Assisted Development & Prototyping",
        "VR/AR Testing & Deployment",
      ],
    },
    {
      group: "Technologies",
      items: [
        "React, JavaScript, HTML, CSS",
        "Vite, Sanity, Supabase",
        "MapLibre, Git, GitHub",
        "Netlify, Vercel, Directus",
        "ChatGPT, Claude Code, Copilot",
      ],
    },
    {
      group: "Collaboration",
      items: [
        "Cross-Disciplinary Collaboration",
        "Client Communication",
        "Cross-Browser & Mobile Testing",
        "Technical Documentation & Briefing",
        "Iterative development",
      ],
    },
  ],

  projects: [
    {
      title: "Grown on Trees - Independent Creative Development Project",
      stack: ["React", "Vite", "JavaScript", "Sanity CMS", "MapLibre GL JS", "Netlify"],
      points: [
        "Independently designed, developed and launched a daily browser-based puzzle game featuring interactive geography, word and logic challenges.",
        "Built reusable React components, gameplay mechanics, scoring systems and a Sanity CMS workflow for publishing daily content.",
        "Developed a fallback mapping system to maintain functionality when live maps fail, improving reliability across browsers and mobile devices.",
        "Implemented responsive interfaces, player analytics and shareable results, refining the experience through cross-device testing and user feedback.",
      ],
      links: [{ label: "Live", href: "https://grownontrees.gg/" }],
    },
    {
      title: "Photo-Panic",
      stack: ["React", "Supabase", "Real-Time Multiplayer"],
      points: [
        "Designed and developed a multiplayer photo party game with responsive host and player interfaces.",
        "Implemented realtime gameplay and iteratively improved mobile reliability, image handling and the player experience.",
      ],
      links: [
        { label: "Host Experience", href: "https://photo-panic.netlify.app/" },
        { label: "Player Experience", href: "https://photo-panic.netlify.app/player" },
      ],
      note: "To try it, open the host link on a computer and join as a player on your phone.",
    },
  ],

  experience: [
    {
      heading: "Freelance Frontend Developer",
      subheading: "Freelance Client: Channoil",
      start: { text: "June 2026", iso: "2026-06" },
      end: { text: "July 2026", iso: "2026-07" },
      points: [
        "Designed and developed a custom interactive map using HTML, CSS and JavaScript, deployed via Netlify and integrated into the client's existing website.",
        "Repurposed website content, implemented on-page SEO improvements and monitored performance using Google Analytics.",
        "Worked directly with the client to gather requirements, iterate on feedback and deliver the final solution.",
      ],
    },
    {
      heading: "Gamoola Ltd",
      subheading: "Digital Operations Manager",
      start: { text: "February 2017", iso: "2017-02" },
      end: { text: "Present" },
      points: [
        "Developed React-based campaign and outreach pages for integration with the company's WordPress website.",
        "Built interactive web prototypes and proof-of-concepts using React, JavaScript and Supabase to explore and validate project ideas.",
        "Supported VR/AR production through headset configuration, release channel management and hands-on application testing.",
        "Coordinated multidisciplinary teams of designers, developers and clients to deliver interactive digital projects from concept to launch.",
        "Produced technical specifications, proposals and project documentation, translating creative briefs into actionable development requirements.",
        "Managed production schedules, resources, budgets and delivery deadlines across studio projects.",
      ],
    },
  ],

  // No dates on the PDF for these roles.
  previousExperience: [
    {
      heading: "Brower Lewis PR",
      subheading: "Account Manager",
      points: [
        "Managed fashion and lifestyle client accounts, campaigns and events.",
        "Built long-term client relationships and produced media communications.",
      ],
    },
    {
      heading: "Giorgio Armani",
      subheading: "Press Officer",
      points: [
        "Managed media and stylist relationships while supporting international fashion events, including Milan Fashion Week.",
      ],
    },
  ],

  education: [
    {
      title: "Front-End Web Development Certificate",
      provider: "Trilogy Education Services (EdX)",
      topics: ["HTML", "CSS", "JavaScript", "React"],
    },
  ],

  interests: ["Creative Coding", "Guitar", "Crochet"],
};
