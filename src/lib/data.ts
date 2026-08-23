export interface Track {
  id: string;
  number: string;
  title: string;
  tagline: string;
  iconName: string;
  gradient: string;
  topics: string[];
  skillsGained: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  color: string;
  accentBg: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  track: string;
  speaker?: string;
  location: string;
  details: string;
  badge?: string;
  highlight?: boolean;
}

export interface TicketTier {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  period: string;
  popular?: boolean;
  forWhom: string;
  description: string;
  features: string[];
  buttonText: string;
  commudleLink: string;
  badgeColor: string;
}

export const EVENT_DETAILS = {
  name: "AWS Student Community Day Panipat 2026",
  shortName: "AWS SCD Panipat 2026",
  tagline: "Powering the next generation of cloud innovators.",
  positioning: "Largest student-led cloud event in the Haryana region",
  date: "2 September 2026",
  time: "9:00 AM IST onwards",
  isoDate: "2026-09-02T09:00:00+05:30",
  venue: "PIET Campus, Panipat",
  venueFull: "Panipat Institute of Engineering & Technology (PIET), NH-44, Samalkha, Panipat, Haryana – 132102",
  organizer: "AWS Student Builder Group / Student Community Leaders",
  email: "aws-sbg@piet.co.in",
  registrationPlatform: "Commudle",
  targetAudience: "500+ student target across 25+ colleges",
  sponsorshipOutreach: "4,000+ students & 400+ expected builders",
};

export const STATS = [
  { value: "500+", label: "Builders & Students", desc: "Across 25+ top colleges in Haryana & NCR" },
  { value: "25+", label: "Partner Colleges", desc: "Regional campus tech communities connected" },
  { value: "6", label: "Technical Tracks", desc: "Foundations, GenAI, DevOps, Labs & Careers" },
  { value: "100%", label: "Hands-on Focus", desc: "Live code-alongs & guided cloud labs" },
];

export const TRACKS: Track[] = [
  {
    id: "cloud-foundations",
    number: "01",
    title: "Cloud Foundations",
    tagline: "Master core AWS services, IAM security, and architecture fundamentals.",
    iconName: "Cloud",
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    color: "#38BDF8",
    accentBg: "rgba(56, 189, 248, 0.15)",
    level: "Beginner",
    topics: [
      "Core AWS compute (EC2, Lambda) & storage (S3)",
      "AWS Free Tier setup & cost control best practices",
      "Account security essentials & IAM least-privilege policies",
      "Building your first highly-available web architecture",
    ],
    skillsGained: ["AWS Console", "IAM Policies", "VPC Networking", "S3 & EC2 Deployments"],
  },
  {
    id: "gen-ai-aws",
    number: "02",
    title: "Generative AI on AWS",
    tagline: "Build production-grade GenAI apps with Amazon Bedrock & SageMaker.",
    iconName: "Sparkles",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    color: "#C084FC",
    accentBg: "rgba(192, 132, 252, 0.15)",
    level: "Intermediate",
    topics: [
      "Amazon Bedrock: Claude 3.5, Llama 3 & Titan foundation models",
      "SageMaker JumpStart & model fine-tuning workflows",
      "RAG architectures with Knowledge Bases for Amazon Bedrock",
      "Building conversational AI & agentic workflows in Python",
    ],
    skillsGained: ["Amazon Bedrock", "SageMaker", "Prompt Engineering", "Vector DBs & RAG"],
  },
  {
    id: "devops-iac",
    number: "03",
    title: "DevOps & Infrastructure as Code",
    tagline: "Automate modern containerized deployments with AWS CDK & CI/CD pipelines.",
    iconName: "Terminal",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    color: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.15)",
    level: "Intermediate",
    topics: [
      "Docker containers, Amazon ECS & EKS Kubernetes clusters",
      "Automated CI/CD pipelines with AWS CodePipeline & GitHub Actions",
      "AWS CDK (Cloud Development Kit) in TypeScript/Python",
      "Live zero-downtime microservice deployments",
    ],
    skillsGained: ["Docker & ECS", "AWS CDK", "CI/CD Pipelines", "CloudFormation"],
  },
  {
    id: "hands-on-labs",
    number: "04",
    title: "Hands-on Labs",
    tagline: "Open your laptops and build along with AWS Community Builders.",
    iconName: "Cpu",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    color: "#34D399",
    accentBg: "rgba(52, 211, 153, 0.15)",
    level: "All Levels",
    topics: [
      "Guided build-along sessions with step-by-step instructions",
      "Practical AWS implementations you can show on your GitHub",
      "Community Builder-led interactive workshops",
      "Real-time debugging & mentor troubleshooting assistance",
    ],
    skillsGained: ["Live Architecture", "CLI Mastery", "Cloud Debugging", "Real-World Projects"],
  },
  {
    id: "career-certifications",
    number: "05",
    title: "Career & Certifications",
    tagline: "Navigate the cloud job market, AWS certifications, and recruiter expectations.",
    iconName: "Award",
    gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
    color: "#FB7185",
    accentBg: "rgba(251, 113, 133, 0.15)",
    level: "All Levels",
    topics: [
      "AWS certification roadmap: Cloud Practitioner to Solutions Architect",
      "Cloud resume reviews & portfolio building strategies",
      "Recruiter and industry insights on hiring junior engineers",
      "Unlocking AWS Community programs, internships & hackathons",
    ],
    skillsGained: ["Exam Roadmaps", "Cloud Portfolios", "Tech Interview Prep", "Industry Networking"],
  },
  {
    id: "student-showcase",
    number: "06",
    title: "Student Showcase",
    tagline: "Witness cutting-edge cloud applications built by Haryana student developers.",
    iconName: "Rocket",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    color: "#22D3EE",
    accentBg: "rgba(34, 211, 238, 0.15)",
    level: "All Levels",
    topics: [
      "Live demonstrations of student-built cloud applications",
      "Campus innovation and final year capstone presentations",
      "Peer review, feedback from AWS Heroes, and award voting",
      "Networking with potential co-founders and project collaborators",
    ],
    skillsGained: ["Public Speaking", "Project Pitching", "Product Architecture", "Peer Review"],
  },
];

export const AGENDA: AgendaItem[] = [
  {
    time: "9:00 AM – 10:00 AM",
    title: "Registration, Breakfast & Swag Kits",
    track: "All Tracks",
    location: "Main Reception & Expo Area",
    details: "Check-in, grab your official badge, welcome kit, breakfast, and visit sponsor booths.",
    badge: "Check-in & Networking",
  },
  {
    time: "10:00 AM – 10:15 AM",
    title: "Grand Opening Ceremony",
    track: "Main Auditorium",
    location: "PIET Central Auditorium",
    details: "Event inauguration, lighting of the lamp, and community welcome by faculty and student leaders.",
    badge: "Inauguration",
    highlight: true,
  },
  {
    time: "10:15 AM – 10:25 AM",
    title: "Welcome Note — AWS Student Builder Group",
    track: "Main Auditorium",
    speaker: "AWS Student Builder Group PIET Team",
    location: "PIET Central Auditorium",
    details: "Introduction to AWS Student Builder Group PIET, vision, milestones, and mission for Haryana tech.",
    badge: "Community Keynote",
  },
  {
    time: "10:25 AM – 10:45 AM",
    title: "Community Keynote: Powering Next-Gen Cloud Builders",
    track: "Main Auditorium",
    speaker: "AWS Hero / Community Leader (TBA)",
    location: "PIET Central Auditorium",
    details: "The trajectory of cloud computing, Generative AI shifts, AWS certifications, and high-growth careers.",
    badge: "Keynote",
    highlight: true,
  },
  {
    time: "10:45 AM – 1:00 PM",
    title: "Parallel Track Deep Dives & Tech Talks",
    track: "Tracks 1, 2 & 3",
    location: "Auditorium & Seminar Halls A, B",
    details: "Concurrent sessions across Cloud Foundations, Generative AI on Amazon Bedrock, and DevOps & IaC pipelines.",
    badge: "Deep Dives",
  },
  {
    time: "1:00 PM – 2:00 PM",
    title: "Networking Lunch & Sponsor Expo Arena",
    track: "Food Court & Expo Lawn",
    location: "PIET Dining & Innovation Expo",
    details: "Complimentary lunch, explore sponsor tech booths, meet recruiters, mentors, and connect with peers.",
    badge: "Lunch & Expo",
    highlight: true,
  },
  {
    time: "2:00 PM – 4:30 PM",
    title: "Hands-on Labs & Student Innovation Showcase",
    track: "Tracks 4 & 6",
    location: "Cloud Computing Labs 1–4",
    details: "Interactive build-along workshops led by Community Builders followed by live student project demos.",
    badge: "Live Labs & Demos",
  },
  {
    time: "4:30 PM – 5:15 PM",
    title: "Career Panel: Cloud Roadmaps & Industry Q&A",
    track: "Main Auditorium",
    speaker: "Industry Panelists, Recruiters & Mentors",
    location: "PIET Central Auditorium",
    details: "Open floor Q&A with cloud architects, engineering leaders, and HR heads on cracking high-paying cloud roles.",
    badge: "Panel Discussion",
    highlight: true,
  },
  {
    time: "5:15 PM – 5:45 PM",
    title: "Closing Ceremony, Giveaways & Mega Photo",
    track: "Main Auditorium",
    location: "PIET Central Auditorium",
    details: "Student showcase awards, AWS swag distribution, Credly badge issuance instructions, and community group photo.",
    badge: "Celebration",
    highlight: true,
  },
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "student-pass",
    name: "Student Pass",
    price: "₹0",
    priceNum: 0,
    period: "Free for verified students",
    popular: true,
    forWhom: "For enrolled college & university students",
    description: "Full access to all 6 technical tracks, hands-on labs, lunch, and official certificates.",
    features: [
      "Full-day access to all 6 learning tracks",
      "Complimentary lunch and refreshments",
      "Official Participation Certificate",
      "Verified AWS SCD Credly Digital Badge",
      "Access to Sponsor Expo & Career Booths",
      "Welcome Swag Kit & Community Stickers",
    ],
    buttonText: "Claim Free Pass",
    commudleLink: "https://commudle.com",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "priority-pass",
    name: "Priority Pass",
    price: "₹149",
    priceNum: 149,
    period: "Per attendee",
    popular: false,
    forWhom: "For students wanting guaranteed front seating",
    description: "All standard student benefits plus VIP seating, fast-track registration, and priority lab access.",
    features: [
      "All Student Pass benefits included",
      "Front-row VIP priority seating in Auditorium",
      "Fast-Track Express check-in desk",
      "Guaranteed confirmed seat in high-demand labs",
      "Premium AWS Community Day Swag Pack",
      "Direct priority access to Speaker Q&A",
    ],
    buttonText: "Get Priority Pass",
    commudleLink: "https://commudle.com",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "pro-alumni-pass",
    name: "Pro / Alumni Pass",
    price: "₹299",
    priceNum: 299,
    period: "Per attendee",
    popular: false,
    forWhom: "For non-students, alumni & working professionals",
    description: "Dedicated pass for working professionals, alumni, and industry members looking to learn & mentor.",
    features: [
      "Full-day event access to all sessions",
      "Access to all 6 technical tracks & labs",
      "Exclusive Pro & Alumni Networking Lounge",
      "Expo access & direct interaction with student builders",
      "Networking lunch with speakers and sponsors",
      "Official Certificate & Credly Digital Badge",
    ],
    buttonText: "Get Pro / Alumni Pass",
    commudleLink: "https://commudle.com",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
];

export const WHY_ATTEND_HIGHLIGHTS = [
  {
    icon: "Users",
    title: "500+ Student Builders",
    desc: "Collaborate with talented students, developers, and innovators across 25+ top colleges in Haryana & NCR.",
    tag: "Networking",
  },
  {
    icon: "Layers",
    title: "6 Specialized Tracks",
    desc: "From Cloud Foundations to Generative AI on Amazon Bedrock, DevOps, and career acceleration roadmaps.",
    tag: "Curriculum",
  },
  {
    icon: "Terminal",
    title: "100% Hands-on Focus",
    desc: "No boring slide monologues. Open your laptop and build live cloud architectures alongside experts.",
    tag: "Practical",
  },
  {
    icon: "Rocket",
    title: "Student Project Showcase",
    desc: "Witness live demos of real-world cloud solutions built by campus innovators and vote for top projects.",
    tag: "Innovation",
  },
  {
    icon: "ShieldCheck",
    title: "AWS Heroes & Mentors",
    desc: "Direct mentorship, 1-on-1 code reviews, and career guidance from certified AWS Community Builders.",
    tag: "Mentorship",
  },
  {
    icon: "Award",
    title: "Credly Badge & Certificate",
    desc: "Earn an official AWS Community Day Credly digital credential and verified participation certificate.",
    tag: "Recognition",
  },
  {
    icon: "Coffee",
    title: "Free Lunch & Swag Kits",
    desc: "Enjoy delicious complimentary meals, refreshments, limited-edition AWS stickers, tees, and swag.",
    tag: "Perks",
  },
  {
    icon: "Briefcase",
    title: "Direct Recruiter Pipeline",
    desc: "Connect directly with tech recruiters, explore internships, and discover full-time cloud opportunities.",
    tag: "Career",
  },
];

export const SPONSOR_BENEFITS = [
  {
    title: "Empower Regional Talent",
    desc: "Support hands-on workshops, enable structured cloud learning paths, and foster student builders across Haryana.",
    icon: "Sparkles",
  },
  {
    title: "Elevate Brand Visibility",
    desc: "Showcase your tech brand across digital campaigns, mainstage backdrops, student badges, flyers, and expo booths.",
    icon: "Eye",
  },
  {
    title: "Direct Recruitment Pipeline",
    desc: "Access a curated talent pool of 500+ builders, conduct on-spot interviews, and hire emerging cloud developers.",
    icon: "UserCheck",
  },
];

export const SPONSOR_TIERS = [
  {
    name: "Title Sponsor",
    price: "Custom",
    highlight: true,
    perks: [
      "Keynote speaking slot on main stage (20 min)",
      "Prime exhibition booth at Expo center",
      "Brand logo on all attendee badges & lanyards",
      "Direct resume access of all registered attendees",
      "Social media spotlight campaign across all channels",
      "Exclusive branding in opening & closing ceremonies",
    ],
  },
  {
    name: "Platinum Sponsor",
    price: "₹50,000",
    highlight: false,
    perks: [
      "Technical track workshop / talk slot (30 min)",
      "Standard exhibition stall in Expo area",
      "Brand logo on main stage digital screen & website",
      "Distribution of company swag inside welcome kits",
      "Access to opt-in student talent resumes",
    ],
  },
  {
    name: "Gold Sponsor",
    price: "₹25,000",
    highlight: false,
    perks: [
      "Exhibition desk in Sponsor Expo arena",
      "Logo placement on website, brochures & banner",
      "Inclusion of promotional materials in welcome kits",
      "Social media mention and appreciation",
    ],
  },
  {
    name: "Community Partner",
    price: "In-kind / Support",
    highlight: false,
    perks: [
      "Logo on official website partner section",
      "Community cross-promotions & shoutouts",
      "Reserved VIP tickets for partner team",
    ],
  },
];

export const FAQS = [
  {
    question: "Who can attend AWS Student Community Day Panipat 2026?",
    answer:
      "The event is open to all university and college students, aspiring developers, recent graduates, cloud enthusiasts, and faculty members. Whether you are a total beginner or an experienced builder, there are tracks designed for every skill level!",
  },
  {
    question: "Is the Student Pass really 100% Free?",
    answer:
      "Yes! The Student Pass is completely free of charge for all enrolled students. It includes full-day access to all 6 tracks, hands-on labs, meals, swag kits, participation certificate, and the official Credly badge. You will just need to present a valid student ID card at the registration desk.",
  },
  {
    question: "Do I need prior AWS or Cloud Computing experience to attend?",
    answer:
      "Not at all! Track 1 (Cloud Foundations) is built specifically for beginners starting from scratch, guiding you through core AWS concepts and Free Tier setup. Intermediate builders can dive into Generative AI and DevOps tracks.",
  },
  {
    question: "What should I bring with me to the event?",
    answer:
      "Please bring your college ID card, your registration QR code on your phone, a laptop (with charger) for the hands-on lab sessions, and your passion for cloud learning! Free high-speed Wi-Fi and power stations will be available.",
  },
  {
    question: "How will I receive the official Credly badge and certificate?",
    answer:
      "Attendees who check in and attend the sessions will receive an email within 48-72 hours post-event with the official digital participation certificate and an invitation to claim the verified AWS Community Day badge on Credly to display on LinkedIn.",
  },
  {
    question: "How can I reach PIET Campus in Panipat?",
    answer:
      "PIET Campus is conveniently situated right on NH-44 (Grand Trunk Road) at Samalkha, Panipat. It is easily accessible via direct buses and trains from Delhi/NCR (approx. 60-75 mins), Sonipat, Karnal, Kurukshetra, and Chandigarh. Dedicated shuttle buses will also operate from nearby transit points.",
  },
  {
    question: "How can I submit a speaker proposal (CFP) or volunteer?",
    answer:
      "You can submit your talk proposal using the 'Submit CFP' button on this site or email us directly at aws-sbg@piet.co.in. Student volunteers can join our WhatsApp community to sign up for organizing teams!",
  },
];

export const SOCIAL_LINKS = [
  { name: "Email", handle: "aws-sbg@piet.co.in", href: "mailto:aws-sbg@piet.co.in", icon: "Mail" },
  { name: "Commudle", handle: "AWS SBG PIET", href: "https://commudle.com", icon: "Globe" },
  { name: "LinkedIn", handle: "AWS Student Builder Group PIET", href: "https://linkedin.com", icon: "Linkedin" },
  { name: "Instagram", handle: "@awssbg_piet", href: "https://instagram.com", icon: "Instagram" },
  { name: "WhatsApp", handle: "Join Community Group", href: "https://chat.whatsapp.com", icon: "MessageSquare" },
  { name: "Meetup", handle: "AWS Panipat Group", href: "https://meetup.com", icon: "Users" },
];
