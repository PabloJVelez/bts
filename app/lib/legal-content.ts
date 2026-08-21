export type LegalPageSlug = "terms" | "privacy" | "cancellation-policy" | "security";

type LegalSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

export type LegalPageContent = {
  slug: LegalPageSlug;
  title: string;
  eyebrow: string;
  description: string;
  effectiveDate: string;
  sections: LegalSection[];
};

const contactDetails = [
  "Behind the Sauté",
  "A product of PMLTECH PILE LLC",
  "Austin, Texas",
  "Email: pmltechpile@gmail.com",
];

export const legalPages: Record<LegalPageSlug, LegalPageContent> = {
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    eyebrow: "Legal",
    description:
      "Terms for chefs, culinary businesses, and booking guests who use Behind the Sauté pages, booking flows, and payment features.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. Who We Are",
        body: [
          "Behind the Sauté is a private-chef booking product operated by PMLTECH PILE LLC. In these Terms, Behind the Sauté, BTS, we, us, or our refers to PMLTECH PILE LLC. Chef, you, or your refers to the chef, culinary business, or customer using our services. Event client or booking guest refers to a person who submits an inquiry, booking request, deposit, or payment through a BTS-powered booking page.",
          "These Terms apply when you visit our website, use a BTS booking page, submit an inquiry, make or receive a payment, start onboarding, pay an invoice, or continue using the service.",
        ],
      },
      {
        title: "2. What BTS Provides",
        body: [
          "BTS helps private chefs create and operate a branded booking experience for private events. The exact scope, pricing, commission, subscription level, setup work, and support level for each chef are confirmed separately in writing by invoice, order form, email, or signed agreement.",
        ],
        bullets: [
          "Private-chef website or booking page setup",
          "Service, menu, and offer structure",
          "Event inquiry and booking request flows",
          "Chef and client notification flows",
          "Stripe Connect setup support",
          "Launch QA and test booking support",
          "Ongoing hosting, maintenance, and support",
        ],
      },
      {
        title: "3. Chef Responsibilities",
        body: [
          "Chefs are independent businesses. You are responsible for the food, hospitality services, staffing, event execution, customer communication, refunds, taxes, permits, licenses, insurance, and legal compliance related to your chef business.",
          "You are also responsible for reviewing and approving your page content, pricing, event policies, menu claims, allergy language, availability, and client communications before launch.",
        ],
        bullets: [
          "Business name, service area, contact information, and event types",
          "Menus, sample menus, service descriptions, pricing, minimum spend, deposit rules, and payment rules",
          "Photos, logo, brand materials, reviews, and other content you want displayed",
          "Booking rules, availability guidance, cancellation/refund policy, allergy policy, travel policy, and event policy",
          "Any approvals needed before BTS publishes or updates your booking page",
        ],
      },
      {
        title: "4. Event Clients and Chef Policies",
        body: [
          "BTS provides booking infrastructure. BTS is not the chef, caterer, food provider, event operator, employer, agent, or guarantor of any chef or event client.",
          "The chef's own cancellation, refund, deposit, allergy, travel, event, and service policies control the chef-client relationship unless BTS expressly states otherwise in writing. Event clients should review the applicable chef policies before submitting a request or payment.",
        ],
      },
      {
        title: "5. Payments Through Stripe Connect",
        body: [
          "BTS uses Stripe Connect to support online booking payments, deposits, platform fees, and related payment flows. During onboarding, BTS may help a chef create or connect a Stripe account.",
          "Client payments are processed by Stripe. Where configured, payments are associated with the chef's connected Stripe account, and BTS may collect agreed platform fees, subscription fees, commissions, setup fees, or other fees through Stripe Connect or by separate invoice.",
          "Stripe's own terms, account requirements, payout schedules, dispute processes, and fees may apply. Chefs are responsible for refunds, chargebacks, disputes, taxes, and payment obligations connected to their chef services unless BTS caused the issue through its own error.",
        ],
      },
      {
        title: "6. Pricing and Billing",
        body: [
          "BTS pricing is determined after reviewing the chef's business, booking needs, setup complexity, and support requirements. In general, BTS charges a monthly or yearly maintenance subscription plus a commission percentage on bookings processed through the site. Any setup fees, customization fees, commission percentages, subscription amounts, or other fees will be confirmed before paid work begins.",
        ],
      },
      {
        title: "7. Refunds for BTS Fees",
        body: [
          "If you pay a setup or launch fee to BTS, that fee is fully refundable before your site is launched. After launch, setup fees are non-refundable unless we agree otherwise in writing.",
          "Subscription fees and commissions are not refundable once the applicable billing period or processed booking has begun, unless required by law or agreed in writing.",
        ],
      },
      {
        title: "8. Launch Timeline",
        body: [
          "If BTS commits to a 10-business-day launch timeline, that timeline begins only after BTS receives all required assets, business information, approvals, and onboarding inputs from the chef.",
          "If BTS does not launch your site within 10 business days after all required assets are received, your first month of maintenance is free. This is a delivery guarantee, not a guarantee of bookings, revenue, leads, sales, search ranking, ad performance, or business growth.",
        ],
      },
      {
        title: "9. Ongoing Service and Cancellation",
        body: [
          "BTS may offer monthly or yearly subscriptions. You may cancel ongoing service with 30 days' written notice. Cancellation does not remove your obligation to pay fees already due, commissions on bookings already processed, or charges for work already approved.",
          "After cancellation, BTS may disable hosting, booking forms, payment flows, admin access, and related services after the notice period ends.",
        ],
      },
      {
        title: "10. Ownership of Materials",
        body: [
          "Chefs retain ownership of their business name, brand, domain, photographs, menus, customer information, policies, and other materials they provide to BTS.",
          "BTS retains ownership of its templates, code, platform components, workflows, designs, processes, and reusable implementation materials. You grant BTS permission to use the materials you provide solely to build, operate, maintain, support, and promote your booking experience, unless you tell us otherwise in writing.",
        ],
      },
      {
        title: "11. Domains and Account Access",
        body: [
          "Chefs own and control their own domains unless otherwise agreed in writing. BTS may help connect a domain to a booking site, but domain ownership remains with the chef.",
          "Do not send BTS passwords, full card numbers, bank credentials, or unnecessary access to unrelated systems. If account access is needed, provide only the access reasonably required through secure account invitations, delegated access, or setup flows whenever possible.",
        ],
      },
      {
        title: "12. Data Export and Removal",
        body: [
          "Upon cancellation or written request, BTS can provide an export of submitted booking inquiry data, customer records collected through BTS, site content, and uploaded business materials, where reasonably available.",
          "BTS may delete or remove business materials and customer data after cancellation, subject to legal, tax, accounting, fraud-prevention, backup, security, and dispute-resolution retention requirements. Backup copies may remain for a limited time before being deleted through normal backup rotation.",
        ],
      },
      {
        title: "13. Food Safety, Allergies, and Event Services",
        body: [
          "BTS is not responsible for food safety, allergen handling, ingredient sourcing, menu accuracy, kitchen conditions, health permits, insurance, event staffing, service quality, event execution, client refunds, or chef-client disputes. Chefs are responsible for their own services and for communicating accurate allergy, dietary, cancellation, refund, and event terms to clients.",
        ],
      },
      {
        title: "14. No Professional Advice",
        body: [
          "BTS may provide operational, technical, copywriting, and setup support. BTS does not provide legal, tax, accounting, food safety, insurance, or regulatory advice. You should consult your own qualified professionals for those matters.",
        ],
      },
      {
        title: "15. No Guarantee of Results",
        body: [
          "BTS does not guarantee bookings, revenue, conversion rates, client quality, repeat customers, search ranking, ad performance, or business growth. Your results depend on your offer, market, pricing, reputation, availability, client communication, and other factors outside our control.",
        ],
      },
      {
        title: "16. Indemnity",
        body: [
          "To the maximum extent allowed by law, you agree to defend, indemnify, and hold harmless BTS, PMLTECH PILE LLC, and their owners, contractors, and service providers from claims, damages, liabilities, costs, and expenses arising from your chef services, event conduct, food, staff, policies, content, customer disputes, taxes, permits, insurance, legal compliance, misuse of the service, or breach of these Terms.",
        ],
      },
      {
        title: "17. Limitation of Liability",
        body: [
          "To the maximum extent allowed by law, BTS is not liable for indirect, incidental, special, consequential, exemplary, punitive, or lost-profit damages. BTS's total liability for claims related to the service will not exceed the fees paid by you to BTS during the three months before the event giving rise to the claim, unless a different limit is required by law.",
        ],
      },
      {
        title: "18. Service Changes and Termination",
        body: [
          "BTS may update, improve, suspend, or discontinue parts of the service over time. BTS may suspend or terminate service if invoices are unpaid, the service is used unlawfully, required onboarding information is false or incomplete, a Stripe or payment issue prevents safe operation, continued service creates legal/security/reputational/operational risk, or you materially breach these Terms.",
        ],
      },
      {
        title: "19. Governing Law",
        body: [
          "These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law rules. Any dispute that cannot be resolved informally will be handled in the state or federal courts located in Texas, unless applicable law requires a different forum.",
        ],
      },
      {
        title: "20. Updates and Contact",
        body: [
          "BTS may update these Terms from time to time. The updated version will be posted on this page with a new effective date.",
          ...contactDetails,
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "Privacy",
    description:
      "How BTS handles chef business data, booking inquiry data, payment-related data, site analytics, and support information.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. Overview",
        body: [
          "This Privacy Policy explains how Behind the Sauté, a product of PMLTECH PILE LLC, collects, uses, shares, stores, exports, and removes information related to our website, chef onboarding, booking pages, payment flows, and support services.",
        ],
      },
      {
        title: "2. Information We Collect",
        bullets: [
          "Chef business details such as name, email, phone, business name, service area, social links, policies, services, menus, pricing, and brand assets",
          "Booking inquiry details submitted by event clients, such as name, email, phone, event date, location, guest count, dietary notes, budget range, and event notes",
          "Payment-related records needed to operate Stripe Connect payment flows, invoices, subscriptions, commissions, refunds, and disputes",
          "Technical information such as device/browser data, logs, page interactions, form events, and analytics",
          "Support communications, emails, onboarding responses, and operational notes",
        ],
      },
      {
        title: "3. How We Use Information",
        bullets: [
          "Build, launch, host, maintain, and support chef booking pages",
          "Send inquiry, booking, payment, approval, rejection, and support notifications",
          "Support Stripe Connect setup and payment-related workflows",
          "Improve booking flows, site reliability, security, and customer support",
          "Prevent fraud, abuse, unauthorized access, or misuse",
          "Comply with tax, accounting, legal, security, and dispute-resolution obligations",
        ],
      },
      {
        title: "4. Payment Information",
        body: [
          "BTS uses Stripe Connect for payment processing. Stripe may collect and process payment details, identity information, bank account information, card information, tax information, and other data required for payment processing, payouts, compliance, fraud prevention, and dispute handling. BTS does not ask for or store full card numbers or bank credentials.",
        ],
      },
      {
        title: "5. Sharing Information",
        body: [
          "BTS shares information only as needed to operate the service, support chefs and event clients, process payments, host the site, send emails, provide analytics, prevent abuse, comply with law, or handle disputes.",
        ],
        bullets: [
          "Stripe for payment processing and connected-account flows",
          "Hosting, database, email, analytics, and infrastructure providers",
          "The applicable chef or culinary business for booking inquiries submitted through that chef's page",
          "Professional advisors, authorities, or counterparties when needed for legal, tax, accounting, safety, or dispute reasons",
        ],
      },
      {
        title: "6. Chef and Event Client Data",
        body: [
          "Booking inquiry data belongs to the relevant chef business and is used to support that chef's booking workflow. Event clients should expect their submitted booking details to be shared with the chef or culinary business they are trying to book.",
        ],
      },
      {
        title: "7. Data Retention",
        body: [
          "BTS keeps information as long as reasonably needed to provide the service, support bookings, maintain business records, resolve disputes, comply with legal/tax/accounting/security requirements, and operate backups. We may delete or anonymize information when it is no longer needed, subject to retention requirements and backup rotation.",
        ],
      },
      {
        title: "8. Export, Correction, and Removal",
        body: [
          "Chefs may request an export, correction, or removal of their business materials and booking data. Event clients may contact the applicable chef or BTS to request reasonable access, correction, or removal of submitted information. Some records may be retained where required for legal, tax, accounting, security, fraud-prevention, backup, or dispute reasons.",
        ],
      },
      {
        title: "9. Security",
        body: [
          "BTS uses reasonable administrative, technical, and operational safeguards to protect information. No online system can be guaranteed perfectly secure. Chefs should use strong passwords, secure their own email, domain, Stripe, and social accounts, and avoid sending passwords, full card numbers, or bank credentials to BTS.",
        ],
      },
      {
        title: "10. Children's Privacy",
        body: [
          "BTS is not intended for children under 13. We do not knowingly collect personal information from children under 13.",
        ],
      },
      {
        title: "11. Updates and Contact",
        body: [
          "BTS may update this Privacy Policy from time to time. The updated version will be posted on this page with a new effective date.",
          ...contactDetails,
        ],
      },
    ],
  },
  "cancellation-policy": {
    slug: "cancellation-policy",
    title: "Cancellation & Refund Policy",
    eyebrow: "Booking Policy",
    description:
      "How BTS handles its own fees, chef subscriptions, and the default relationship between chef event policies and client booking payments.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. BTS Setup and Launch Fees",
        body: [
          "If a chef pays a BTS setup or launch fee, that fee is fully refundable before the chef's booking site is launched. After launch, setup fees are non-refundable unless BTS agrees otherwise in writing.",
        ],
      },
      {
        title: "2. Subscriptions",
        body: [
          "BTS may offer monthly or yearly subscriptions. Chefs may cancel ongoing service with 30 days' written notice. Cancellation does not remove the obligation to pay subscription fees already due, commissions on bookings already processed, or charges for work already approved.",
        ],
      },
      {
        title: "3. Commission and Platform Fees",
        body: [
          "Commission percentages, platform fees, and payment-processing fees are confirmed in writing for each chef. Commissions on bookings already processed are not refundable unless required by law or agreed in writing.",
        ],
      },
      {
        title: "4. Chef Event Cancellations",
        body: [
          "For private chef events, the chef's own cancellation, refund, deposit, rescheduling, travel, and event policies control the booking unless BTS expressly states otherwise in writing. BTS does not provide chef services and is not responsible for event performance, food, staffing, service quality, or chef-client disputes.",
        ],
      },
      {
        title: "5. Event Client Refunds and Chargebacks",
        body: [
          "Event clients should contact the chef directly about event refunds, rescheduling, cancellation, service issues, dietary concerns, or disputes. Chefs are responsible for refunds, chargebacks, payment disputes, and customer issues connected to their chef services unless BTS caused the issue through its own error.",
        ],
      },
      {
        title: "6. Payment Processor Rules",
        body: [
          "Payments may be processed through Stripe Connect. Stripe's own fees, refund rules, dispute procedures, payout schedules, and account requirements may apply. Payment processor fees may not always be refundable.",
        ],
      },
      {
        title: "7. Contact",
        body: contactDetails,
      },
    ],
  },
  security: {
    slug: "security",
    title: "Security & Data Handling",
    eyebrow: "Trust",
    description:
      "A plain-English overview of how BTS handles access, payments, chef materials, booking data, and account boundaries.",
    effectiveDate: "August 21, 2026",
    sections: [
      {
        title: "1. Our Security Posture",
        body: [
          "BTS is built to collect booking details and support online payments without asking chefs to hand over unnecessary access. We use reasonable technical and operational safeguards, but no online service can guarantee perfect security.",
        ],
      },
      {
        title: "2. What We Do Not Request",
        bullets: [
          "Bank account passwords",
          "Full card numbers",
          "Unrelated business-system credentials",
          "Social media passwords when delegated access or secure alternatives are available",
          "Client lists or private business materials that are not needed for setup",
        ],
      },
      {
        title: "3. Stripe Connect",
        body: [
          "BTS uses Stripe Connect for supported payment flows. Stripe handles payment processing, connected-account onboarding, compliance checks, payouts, disputes, and related payment data. Chefs should manage their own Stripe accounts and keep Stripe credentials secure.",
        ],
      },
      {
        title: "4. Limited Access",
        body: [
          "If BTS needs access to a domain, email, Stripe, website, or other account for setup or support, chefs should provide the minimum access needed through secure invitations, delegated access, or setup flows where possible. Access should be removed when it is no longer needed.",
        ],
      },
      {
        title: "5. Data Export and Removal",
        body: [
          "Upon cancellation or written request, BTS can provide an export of reasonably available booking data, site content, and uploaded business materials. BTS may remove data and materials from active systems, subject to legal, tax, accounting, fraud-prevention, backup, security, and dispute-resolution retention requirements.",
        ],
      },
      {
        title: "6. Chef Responsibilities",
        bullets: [
          "Use strong passwords and multi-factor authentication where available",
          "Keep email, domain, Stripe, and social accounts secure",
          "Do not send passwords, full card numbers, bank credentials, or unnecessary client data by email",
          "Review booking page content and policies before launch",
          "Tell BTS promptly about suspected unauthorized access or inaccurate booking data",
        ],
      },
      {
        title: "7. Contact",
        body: contactDetails,
      },
    ],
  },
};

export const legalNavItems = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cancellation-policy", label: "Cancellation" },
  { href: "/security", label: "Security" },
];
