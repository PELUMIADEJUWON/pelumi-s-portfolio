export enum ProjectStatus {
  Completed = 'Completed',
  InDevelopment = 'In Development',
  ComingSoon = 'Coming Soon',
}

export interface ProjectItem {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  screenshots: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface ContactLinks {
  linkedin: string;
  github: string;
  email: string;
}

/**
 * Replace PROFILE_PHOTO_URL with a path or URL to your portrait (e.g. "/profile.jpg")
 * or upload directly using the interactive portrait frame on the website.
 */
export const PROFILE_PHOTO_URL = '/assets/aistudio/IMG-20260629-WA0026_b69748a6.jpg';

export const INTRODUCTION_PARAGRAPHS: string[] = [
  "I'm a Registered Nurse with six years of clinical experience and a growing career in AI application development, Agentic AI and automation.",
  'I work with Python and tools such as LangGraph, MCP and CrewAI to build AI-powered applications and explore practical ways to simplify tasks, improve processes and solve everyday problems.',
];

export const TOOLS_AND_TECHNOLOGIES: string[] = [
  'Python',
  'LangGraph',
  'MCP (Model Context Protocol)',
  'CrewAI',
  'Streamlit',
  'OpenAI SDK',
  'Render',
];

export const AREAS_OF_FOCUS: string[] = [
  'Agentic AI',
  'Workflow Automation',
  'AI Application Development',
];

/**
 * Easy-to-edit project configuration:
 * You can update descriptions, add screenshot file paths to `screenshots`,
 * update `technologies`, or paste your `liveUrl` and `githubUrl` here anytime.
 */
export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    status: ProjectStatus.Completed,
    description:
      'A currency conversion application that allows users to enter an amount, select currencies and convert between them.',
    technologies: ['Python', 'MCP', 'CrewAI', 'Streamlit'],
    screenshots: [
      '/assets/aistudio/CC_1_66d423cb.PNG',
      '/assets/aistudio/CC_2_0259c077.PNG',
    ],
    liveUrl: 'https://my-currency-converter.streamlit.app/',
    githubUrl: 'https://github.com/PELUMIADEJUWON/MCP-Currency-Converter',
  },
  {
    id: 'business-idea-reality-check',
    title: 'Business Idea Reality Check',
    status: ProjectStatus.Completed,
    description:
      'An application designed to help users examine a business idea, explore potential customers, identify possible challenges and assess its basic feasibility.',
    technologies: ['Python', 'Streamlit', 'OpenAI SDK'],
    screenshots: [
      '/assets/aistudio/Business_idea_check_49b18766.PNG',
      '/assets/aistudio/results_1_55a2afef.PNG',
      '/assets/aistudio/result_2_f1553d4a.PNG',
    ],
    liveUrl: 'https://businesscheck.streamlit.app/',
    githubUrl: 'https://github.com/PELUMIADEJUWON/Business-Analysis-AI',
  },
  {
    id: 'medical-instructions-made-simple',
    title: 'Medical Instructions Made Simple',
    status: ProjectStatus.InDevelopment,
    description:
      'An application designed to explain sample medical instructions in simple, everyday language while preserving their original meaning.',
    technologies: [],
    screenshots: [],
    liveUrl: '',
    githubUrl: '',
  },
];

/**
 * Replace empty strings below with your profile URLs and email address when ready,
 * or update them directly from the Contact section on the page.
 */
export const DEFAULT_CONTACT_LINKS: ContactLinks = {
  linkedin: 'https://linkedin.com/in/pelumi-adejuwon',
  github: 'https://github.com/PELUMIADEJUWON',
  email: 'adejuwonpelumi4@gmail.com',
};
