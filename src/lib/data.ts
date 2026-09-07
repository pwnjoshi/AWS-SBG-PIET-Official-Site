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

export interface Track {
  id: string;
  number: string;
  title: string;
  tagline: string;
  iconName: string;
  gradient: string;
  color: string;
  accentBg: string;
  level: string;
  topics: string[];
  skillsGained: string[];
}

export interface TicketTier {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  period: string;
  popular: boolean;
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
  tagline: "Powering the Next Generation of Cloud Innovators",
  date: "Friday, 11 September 2026",
  dateShort: "11 Sept 2026",
  time: "9:00 AM – 5:00 PM IST",
  venue: "PIET Campus, Panipat",
  venueFull: "Panipat Institute of Engineering and Technology (PIET), 70 Milestone, Grand Trunk Road (NH-44), Samalkha, Panipat, Haryana 132102",
  venueNotice: "Registered attendees receive direct navigation pins, travel notes, and check-in updates by email.",
  mapsUrl: "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KVeXXlObyA05MYmRg6FmulSR&daddr=70+Milestone,+Grand+Trunk+Rd,+Samalkha,+Haryana+132102",
  commudleUrl: "https://www.commudle.com/communities/aws-student-builder-group-piet",
  commudleEventUrl: "https://www.commudle.com/communities/aws-student-builder-group-piet/events/aws-student-community-day-panipat",
  builderPassFormUrl: "https://www.commudle.com/fill-form/4952",
  blackPassFormUrl: "https://www.commudle.com/fill-form/4982",
  organizer: "AWS Student Builder Group at PIET",
  email: "aws-sbg@piet.co.in",
  registrationPlatform: "Commudle",
  targetAudience: "500+ student builders across regional SBG chapters",
  sponsorshipOutreach: "Regional SBGs & 500+ student builders",
  whatsappUrl: "https://chat.whatsapp.com/EmUhEaFVULDGS1MittXxKt",
  meetupUrl: "https://www.meetup.com/aws-sbg-at-panipat-institute-of-engineering-and-tech",
  linkedinUrl: "https://www.linkedin.com/company/aws-student-builder-group-piet",
  instagramUrl: "https://www.instagram.com/aws.sbg.piet/",
  ideathonFormUrl: "https://forms.gle/8vd2ZwhnyLbnwPyA6",
  competitionGuidelinesPdf: "/docs/AWS-SCD-Panipat-2026-Competition-Guidelines.pdf",
};

export const STATS = [
  { value: "500+", label: "Builders & Students", desc: "Passionate student cloud developers" },
  { value: "6+", label: "Community Partners", desc: "Regional AWS Student Builder Groups" },
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
    tagline: "Witness cutting-edge cloud applications built by student developers.",
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
    time: "9:00 AM – 9:30 AM",
    title: "Registration & Entry",
    track: "All",
    location: "Main Lobby",
    details: "Check-in, collect your event badge, swag kit, and connect with fellow builders before the day kicks off.",
    badge: "Registration",
  },
  {
    time: "9:30 AM – 10:00 AM",
    title: "Lamp Lighting & Inauguration",
    track: "Main Auditorium",
    speaker: "College Management",
    location: "APJ Auditorium",
    details: "Official inauguration of Haryana's first-ever AWS Student Community Day. Address by College Management and lighting of the ceremonial lamp.",
    badge: "Inauguration",
    highlight: true,
  },
  {
    time: "10:00 AM – 10:20 AM",
    title: "Welcome Keynote",
    track: "Main Auditorium",
    speaker: "Lisa Bagley",
    location: "APJ Auditorium",
    details: "Opening keynote setting the vision for the day — cloud-native learning, community building, and student innovation across India.",
    badge: "Keynote",
    highlight: true,
  },
  {
    time: "10:20 AM – 11:00 AM",
    title: "Technical Keynote",
    track: "Main Auditorium",
    speaker: "Praful Bagai",
    location: "APJ Auditorium",
    details: "Deep dive into modern cloud architectures, enterprise scale on AWS, and Generative AI shifts shaping the industry in 2026 and beyond.",
    badge: "Keynote",
    highlight: true,
  },
  {
    time: "11:00 AM – 12:00 PM",
    title: "Special Session",
    track: "Main Auditorium",
    speaker: "Amit Dubey",
    location: "APJ Auditorium",
    details: "An exclusive special session covering cutting-edge topics in cloud, AI, and technology that are reshaping the future for student builders.",
    badge: "Special Session",
    highlight: true,
  },
  {
    time: "12:00 PM – 1:00 PM",
    title: "Parallel Technical Sessions",
    track: "Seminar Halls 1, 2 & 3",
    speaker: "Amit Kumar • Chhavi Garg • Shivani Singh Vimal",
    location: "Seminar Halls 1, 2 & 3",
    details: "Three simultaneous deep-dive sessions: Amit Kumar on AWS Bedrock (Seminar Hall 1) · Chhavi Garg on AR/VR (Seminar Hall 2) · Shivani Singh Vimal on Building a Global Career Through Skills, Language & Opportunity (Seminar Hall 3).",
    badge: "Technical Sessions",
    highlight: true,
  },
  {
    time: "1:00 PM – 2:00 PM",
    title: "Lunch & Networking",
    track: "Dining Area",
    location: "Dining Area / Co-working Space",
    details: "Complimentary lunch, explore sponsor booths, meet recruiters and mentors, and network with 500+ builders across Delhi-NCR & Haryana.",
    badge: "Lunch & Expo",
    highlight: true,
  },
  {
    time: "2:00 PM – 3:00 PM",
    title: "Competition",
    track: "Hackathon Arena",
    location: "Co-working Space",
    details: "KIRO Buildathon and Ideathon competitions run simultaneously. Participants build functional MVPs or pitch innovative ideas before an AWS jury.",
    badge: "Competition",
    highlight: true,
  },
  {
    time: "2:30 PM – 3:00 PM",
    title: "Fireside Chat",
    track: "Main Auditorium",
    location: "APJ Auditorium",
    details: "An intimate fireside conversation with industry leaders on career journeys, cloud innovation, and advice for student builders.",
    badge: "Fireside Chat",
  },
  {
    time: "3:00 PM – 3:30 PM",
    title: "Open Source Session",
    track: "Main Auditorium",
    speaker: "Hardik & Manvendra",
    location: "APJ Auditorium",
    details: "Practical session on contributing to open source, building in public, and leveraging the open source ecosystem for cloud projects.",
    badge: "Open Source",
  },
  {
    time: "3:30 PM – 4:00 PM",
    title: "Results & Networking",
    track: "Main Auditorium",
    location: "APJ Auditorium",
    details: "Competition results announced, networking session with speakers, mentors, and fellow builders. Certificate distribution begins.",
    badge: "Results",
  },
  {
    time: "4:00 PM – 4:30 PM",
    title: "Rewards & Closing",
    track: "Main Auditorium",
    location: "APJ Auditorium",
    details: "Awards ceremony for Ideathon & Buildathon winners. Vote of Thanks by AWS SBG PIET team. Mega group photograph. See you next time!",
    badge: "Celebration",
    highlight: true,
  },
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "builder-pass",
    name: "Builder Pass",
    price: "₹399.00",
    priceNum: 399,
    period: "Official Attendee Pass",
    popular: true,
    forWhom: "For student developers & cloud builders",
    description: "Full-day access to all keynote sessions, technical tracks, hands-on workshops, lunch, Credly badge & swag kit.",
    features: [
      "Full-day access to all technical tracks & keynotes",
      "Entry to hands-on cloud workshops & code-alongs",
      "Complimentary lunch and refreshments",
      "Official Credly Verified Digital Participant Badge",
      "Verified Participation Certificate",
      "Welcome Swag Kit & Community Stickers",
      "Access to Sponsor Expo & Career Booths",
    ],
    buttonText: "Register on Commudle (₹399)",
    commudleLink: "https://www.commudle.com/fill-form/4952",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "black-pass",
    name: "Black Pass",
    price: "₹799.00",
    priceNum: 799,
    period: "VIP Priority Access",
    popular: false,
    forWhom: "For VIP attendees & future cloud leaders",
    description: "All Builder Pass benefits plus front-row VIP keynote seating, fast-track entry, exclusive Black Pass swag, and speaker networking.",
    features: [
      "All Builder Pass benefits included",
      "Front-Row VIP Keynote Seating in Auditorium",
      "Fast-Track Express Check-in Desk",
      "Priority Allocation in Hands-on Cloud Labs",
      "Exclusive Black Pass Premium Swag Pack",
      "Direct Speaker & Mentor Networking Access",
      "Guaranteed Participation in KIRO Buildathon",
    ],
    buttonText: "Get Black Pass (₹799)",
    commudleLink: "https://www.commudle.com/fill-form/4982",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
];

export const PREVIOUS_SCDS = [
  {
    name: "AWS Student Community Day 2026",
    organizer: "AWS SBG MJCET (Telangana)",
    date: "June 10, 2026",
    highlights: "Dedicated tracks for AI, DevOps, hands-on build sessions, and FAANG-ready skill development.",
  },
  {
    name: "AWS Cloud Club SCD Delhi-NCR",
    organizer: "Sharda University",
    date: "March 27, 2026",
    highlights: "Focused on interactive labs, skill development with AWS tools, and cloud career exposure.",
  },
  {
    name: "AWS Student Community Day Colombia",
    organizer: "EAFIT",
    date: "September 13, 2025",
    highlights: "Featured sessions on Generative AI security, prompt engineering, and transitioning to a Cloud Engineer.",
  },
];

export const WHY_ATTEND_HIGHLIGHTS = [
  {
    icon: "Users",
    title: "500+ Student Builders",
    desc: "Collaborate with talented students, developers, and innovators across 6+ regional AWS Student Builder Groups.",
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
    title: "KIRO Buildathon & Ideathon",
    desc: "Participate in rapid prototyping competitions, pitch cloud solutions, and win exciting prizes.",
    tag: "Competitions",
  },
  {
    icon: "ShieldCheck",
    title: "Praful Bagai & AWS Leaders",
    desc: "Direct mentorship, production insight, and tech keynote sessions from distinguished industry leaders.",
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
    title: "Lunch & Swag Kits Included",
    desc: "Enjoy delicious meals, refreshments, limited-edition AWS stickers, tees, and commemorative swag.",
    tag: "Perks",
  },
  {
    icon: "Briefcase",
    title: "Tech Panel & Career Hub",
    desc: "Connect directly with tech recruiters, explore internships, and discover full-time cloud opportunities.",
    tag: "Career",
  },
];

export const SPONSOR_BENEFITS = [
  {
    title: "Empower Regional Talent",
    desc: "Support hands-on workshops, enable structured cloud learning paths, and foster student builders across regional SBGs.",
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
    tag: "FEATURED TIER",
    price: "₹80,000",
    highlight: true,
    perks: [
      "Speaking / Keynote Slot",
      "Exclusive Track Branding on Social media",
      "On-Ground Booth on prime Space",
      "Logo on Stage Backdrop and attendee badges",
      "Participants Database Access*",
      "5 Complimentary passes",
    ],
    buttonText: "Select Title Sponsor →",
  },
  {
    name: "Platinum Sponsor",
    tag: "AVAILABLE TIER",
    price: "₹50,000",
    highlight: false,
    perks: [
      "Logo on event website & materials",
      "Social media mention",
      "Exhibit / booth space",
      "Optional workshop or breakout slot",
      "3 complimentary passes",
    ],
    buttonText: "Select Platinum →",
  },
  {
    name: "Gold Sponsor",
    tag: "AVAILABLE TIER",
    price: "₹35,000",
    highlight: false,
    perks: [
      "Logo on event website & materials",
      "Exhibit space",
      "2 complimentary passes",
      "Post-event recognition",
    ],
    buttonText: "Select Gold →",
  },
  {
    name: "Silver Sponsor",
    tag: "AVAILABLE TIER",
    price: "₹25,000",
    highlight: false,
    perks: [
      "Logo on event website & materials",
      "1 complimentary pass",
      "Post-event recognition",
    ],
    buttonText: "Select Silver →",
  },
];

export const FAQS = [
  {
    question: "Who can attend AWS Student Community Day Panipat 2026?",
    answer:
      "The event is open to all university and college students, aspiring developers, recent graduates, cloud enthusiasts, and faculty members. Whether you are a total beginner or an experienced builder, there are tracks designed for every skill level!",
  },
  {
    question: "How do I register for Builder Pass or Black Pass?",
    answer:
      "Registration is managed through Commudle. You can select either the Builder Pass (₹399.00) or the VIP Black Pass (₹799.00) using the registration links on this site to secure your spot.",
  },
  {
    question: "Do I need prior AWS or Cloud Computing experience to attend?",
    answer:
      "Not at all! Track 1 (Cloud Foundations) is built specifically for beginners starting from scratch, guiding you through core AWS concepts and Free Tier setup. Intermediate builders can dive into Generative AI and DevOps tracks.",
  },
  {
    question: "What should I bring with me to the event?",
    answer:
      "Please bring your college ID card, your Commudle confirmation QR code on your phone, a laptop (with charger) for the hands-on lab sessions and KIRO Buildathon, and your passion for cloud learning! Free high-speed Wi-Fi and power stations will be available.",
  },
  {
    question: "How will I receive the official Credly badge and certificate?",
    answer:
      "Attendees who check in and attend the sessions will receive an email post-event with the official digital participation certificate and an invitation to claim the verified AWS Community Day badge on Credly to display on LinkedIn.",
  },
  {
    question: "How can I reach PIET Campus in Panipat?",
    answer:
      "PIET Campus is located at 70 Milestone, G.T. Road, Pattikalyana, Samalkha, Panipat, Haryana - 132102. It is easily accessible via direct buses and trains from Delhi/NCR (approx. 60-75 mins), Sonipat, Karnal, Kurukshetra, and Chandigarh.",
  },
  {
    question: "How can I participate in KIRO Buildathon & Ideathon?",
    answer:
      "All registered pass holders are eligible to participate in the KIRO Buildathon and Ideathon. Dedicated problem statements and guidelines will be shared during the summit.",
  },
];

export const SOCIAL_LINKS = [
  { name: "WhatsApp", handle: "Quick Updates", href: "https://chat.whatsapp.com/EmUhEaFVULDGS1MittXxKt", icon: "MessageSquare" },
  { name: "Meetup", handle: "Meetup Events", href: "https://www.meetup.com/aws-sbg-at-panipat-institute-of-engineering-and-tech", icon: "Users" },
  { name: "Commudle", handle: "Community Hub", href: "https://www.commudle.com/communities/aws-student-builder-group-piet", icon: "Globe" },
  { name: "LinkedIn", handle: "AWS SBG PIET", href: "https://www.linkedin.com/company/aws-student-builder-group-piet", icon: "Linkedin" },
  { name: "Instagram", handle: "@aws.sbg.piet", href: "https://www.instagram.com/aws.sbg.piet/", icon: "Instagram" },
  { name: "Email", handle: "aws-sbg@piet.co.in", href: "mailto:aws-sbg@piet.co.in", icon: "Mail" },
];
