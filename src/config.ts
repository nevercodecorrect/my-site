import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.mengw.net/",
  author: "Meng Wang",
  profile: "https://www.mengw.net/",
  desc: "Meng Wang is a Ph.D. student working on system and firmware security.",
  title: "Meng Wang",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showWriting: false,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const SOCIALS: SocialObjects = [
  {
    name: "GoogleScholar",
    href: "https://scholar.google.com/citations?user=qbXBGp4AAAAJ&hl=en",
    linkTitle: `Google Scholar`,
    active: true,
  },
  {
    name: "Github",
    href: "https://github.com/nevercodecorrect",
    linkTitle: `GitHub`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/meng-wang-uva/",
    linkTitle: `LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:first.last@gmail.com",
    linkTitle: `Send an email to first.last@cispa.de`,
    active: false,
  },
];
