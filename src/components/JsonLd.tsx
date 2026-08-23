export default function JsonLd() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "AWS Student Community Day Panipat 2026",
    "description": "Haryana's first-ever AWS Student Community Day hosted at PIET Panipat on 11 Sept 2026. Keynotes, 6 cloud tracks, KIRO Buildathon, Ideathon, and tech recruiting expo.",
    "startDate": "2026-09-11T09:00:00+05:30",
    "endDate": "2026-09-11T17:00:00+05:30",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Panipat Institute of Engineering and Technology (PIET)",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "70 Milestone, GT Karnal Road, NH-44, Samalkha",
        "addressLocality": "Panipat",
        "addressRegion": "Haryana",
        "postalCode": "132102",
        "addressCountry": "IN"
      }
    },
    "image": [
      "https://awssbgpiet.in/images/sbg-logo.png",
      "https://awssbgpiet.in/images/og-scd-panipat-2026.jpg"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "AWS Student Builder Group at PIET",
      "url": "https://awssbgpiet.in"
    },
    "performer": [
      { "@type": "Person", "name": "Praful Bagai", "jobTitle": "AWS Community Leader and Speaker" },
      { "@type": "Person", "name": "Amit Kumar", "jobTitle": "Solutions Architect" },
      { "@type": "Person", "name": "Chhavi Garg", "jobTitle": "GenAI Specialist" },
      { "@type": "Person", "name": "Shivani Singh Vimal", "jobTitle": "Cloud Developer" }
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Builder Pass",
        "price": "399",
        "priceCurrency": "INR",
        "url": "https://www.commudle.com/communities/aws-student-builder-group-piet/events/aws-student-community-day-panipat-2026",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01T00:00:00+05:30"
      },
      {
        "@type": "Offer",
        "name": "Black Pass VIP Priority",
        "price": "899",
        "priceCurrency": "INR",
        "url": "https://www.commudle.com/communities/aws-student-builder-group-piet/events/aws-student-community-day-panipat-2026",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01T00:00:00+05:30"
      }
    ]
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "AWS Student Builder Group at PIET",
    "alternateName": "AWS SBG PIET",
    "url": "https://awssbgpiet.in",
    "logo": "https://awssbgpiet.in/images/sbg-logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/aws-student-builder-group-piet",
      "https://www.instagram.com/awssbg_piet",
      "https://github.com/pwnjoshi/AWS-SBG-PIET-Official-Site",
      "https://www.commudle.com/communities/aws-student-builder-group-piet"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AWS Student Builder Group PIET",
    "url": "https://awssbgpiet.in"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
