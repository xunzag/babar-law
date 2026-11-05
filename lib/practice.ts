// Landing page content for each practice area. Facts here mirror the rest of
// the site (partners, panels, record); keep them in step when those change.

export type PracticePage = {
  num: string;
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  lead: string;
  body: string[];
  services: string[];
  forWhom: string;
  related: string[];
};

export const practicePages: PracticePage[] = [
  {
    num: "01",
    slug: "immigration-visas",
    title: "Immigration & visas",
    seoTitle: "Immigration Lawyer in Karachi: US, UK, Canada & EU Visas",
    description:
      "Immigration advice and representation since 2004 for study, work, family and settlement routes to the United States, United Kingdom, Canada and the European Union, with associated counsel in New York.",
    lead: "Immigration advice for individuals and families moving to the United States, the United Kingdom, Canada and the European Union, provided from Karachi since 2004.",
    body: [
      "Babar Law Associates has provided immigration consultancy worldwide since September 2004. The firm advises on the route that fits a client's circumstances, prepares and reviews applications and supporting documents, and represents clients when an application is refused or appealed.",
      "Matters connected to the United States are handled together with the Law Offices of Manuel B. Quintal, P.C., 291 Broadway, New York, where Ghulam Shabbir Babar is Foreign Attorney. In Canada the firm works with Zamin Talpur, Barrister, Solicitor and Notary Public, in Mississauga.",
      "Mr. Babar is an Erasmus Mundus scholar and has spent many years advising students on admissions and scholarships abroad, so study routes and the move from study to work are a particular strength.",
    ],
    services: [
      "Study visas, admissions and scholarship guidance",
      "Work and skilled-worker routes",
      "Family, spouse and dependant applications",
      "Settlement and permanent residence",
      "United States immigration matters, jointly with New York counsel",
      "Refusals, appeals and representation",
      "Preparation and review of documents and supporting evidence",
    ],
    forWhom: "Students, professionals, families and businesses in Pakistan and the diaspora in the US, UK, Canada and the Gulf.",
    related: ["residency-by-investment", "corporate-commercial"],
  },
  {
    num: "02",
    slug: "residency-by-investment",
    title: "Citizenship & residency by investment",
    seoTitle: "Golden Visa Lawyer: Greece, Cyprus & Portugal",
    description:
      "Golden Visa and property-based residency advice for Greece, Cyprus and Portugal, through government-approved developments and partners in Greece, Cyprus and Portugal.",
    lead: "Advice on property-based residency and citizenship programmes in Greece, Cyprus and Portugal, through partners on the ground in each country.",
    body: [
      "Investment migration has been part of the firm's practice since 2017, when Babar Law Associates began working with Cyprus developers including Karma Developers, Singularis Investment Ltd, JWPegasus Ltd and Giovani Developers Limited. Singularis developments in Larnaca are approved by the Cyprus Government and meet the requirements for permanent residency, citizenship and passport applications.",
      "For Greece, the firm cooperates with PassBeyond in Athens, where Mr. Babar is Relationship Manager, with Epirus Assets Real Estate Investment, and with CHRO'NI & Associates Law Firm under a memorandum of understanding on the Greece Golden Visa programme. For Portugal and the wider EU, it works with Visa Doro, an Accredited STP Agent.",
      "Programme rules and investment thresholds change from time to time, so every engagement starts with a current assessment of the options for the client and their family.",
    ],
    services: [
      "Greece Golden Visa through property investment",
      "Cyprus permanent residency and citizenship applications",
      "Portugal and EU Golden Visa routes",
      "Choosing a programme and a government-approved development",
      "Coordination with developers, lawyers and agents in each country",
      "Preparation of the application file",
    ],
    forWhom: "Investors and families in Pakistan, the Gulf and beyond looking for European residency through property.",
    related: ["immigration-visas", "corporate-commercial"],
  },
  {
    num: "03",
    slug: "banking-consumer-law",
    title: "Banking & consumer law",
    seoTitle: "Banking & Recovery Lawyer in Karachi",
    description:
      "Banking, consumer and recovery matters in Karachi. Babar Law Associates is enlisted on the United Bank Limited (UBL) legal panel.",
    lead: "Banking, consumer and recovery work in Karachi, as enlisted counsel on the United Bank Limited (UBL) legal panel.",
    body: [
      "Since April 2026 Babar Law Associates has been enlisted on the UBL Legal Panel Team, providing banking law, consumer law and related legal services to United Bank Limited from Karachi.",
      "The firm's banking experience goes back to its early work on bank mergers and privatisation, including the privatisation of Habib Bank Limited, and to drafting the mortgage and security documents that banking transactions depend on.",
    ],
    services: [
      "Recovery proceedings for banks and financial institutions",
      "Consumer and customer disputes with banks",
      "Mortgage, security and other banking documentation",
      "Advice on banking transactions and compliance",
      "Litigation arising from banking matters",
    ],
    forWhom: "Banks and financial institutions, and individuals or businesses in disputes with them.",
    related: ["litigation", "corporate-commercial"],
  },
  {
    num: "04",
    slug: "corporate-commercial",
    title: "Corporate & commercial",
    seoTitle: "Corporate & Commercial Lawyer in Karachi",
    description:
      "Company incorporation, agreements and contracts, mergers, acquisitions and privatisation, and the drafting of deeds, for businesses in Pakistan and abroad.",
    lead: "Agreements, contracts, company formation, mergers, acquisitions and privatisation for businesses operating in Pakistan and across borders.",
    body: [
      "Corporate and commercial work has been part of the practice from the start. At Haidermota & Co. and later as a partner of Babar & Malgani Law Associates, Mr. Babar worked on mergers of banks and companies and on privatisation, including Habib Bank Limited and National Refinery.",
      "Today the firm incorporates public and private companies, drafts and negotiates agreements and contracts, and prepares mortgage, trust, gift, relinquishment and adoption deeds. His European Master in Law and Economics, with a thesis on corporate governance, informs the firm's advice to growing companies.",
    ],
    services: [
      "Incorporation of public and private companies",
      "Drafting and negotiating agreements and contracts",
      "Mergers, acquisitions and privatisation",
      "Mortgage, trust, gift, relinquishment and adoption deeds",
      "Corporate governance advice",
      "Intellectual property rights",
    ],
    forWhom: "Founders, family businesses, investors and companies with interests in Pakistan.",
    related: ["banking-consumer-law", "mediation-adr"],
  },
  {
    num: "05",
    slug: "litigation",
    title: "Litigation",
    seoTitle: "Litigation Lawyer in Karachi: High Court of Sindh",
    description:
      "Constitutional petitions, bail, criminal, civil, family, service and labour matters before the High Court of Sindh at Karachi, Sukkur, Larkana and Hyderabad, and the courts below.",
    lead: "Representation before the High Court of Sindh and the courts below it, in constitutional, criminal, civil, family, service and labour matters.",
    body: [
      "Ghulam Shabbir Babar has practised litigation since 2004 and was enrolled as an Advocate of the High Court by the Sindh Bar Council in 2006. The firm's chambers include partners, Advocates of the High Court and advocates, supported by court clerks who manage filings and cause lists.",
      "The firm's record on the High Court of Sindh register runs to more than 600 matters since 2008, at the Karachi, Sukkur, Larkana and Hyderabad benches. From 2011 to 2015 Mr. Babar served as Special Public Prosecutor for the Home Department, Government of Sindh, working closely with Pakistan Rangers (Sindh).",
    ],
    services: [
      "Constitutional petitions",
      "Bail, pre-arrest bail and criminal proceedings",
      "Criminal appeals and revisions",
      "Civil suits, appeals and revisions",
      "Family law matters",
      "Service appeals and labour matters",
    ],
    forWhom: "Individuals, families, businesses and public servants with matters before the courts of Sindh.",
    related: ["banking-consumer-law", "mediation-adr"],
  },
  {
    num: "06",
    slug: "mediation-adr",
    title: "Mediation & ADR",
    seoTitle: "Mediation & ADR Lawyer in Karachi",
    description:
      "Mediation, negotiated settlement and alternative dispute resolution for commercial and family disputes in Pakistan.",
    lead: "Mediation and negotiated settlement, used where an agreed outcome serves the client better than contested proceedings.",
    body: [
      "Not every dispute is best resolved in court. Babar Law Associates uses mediation, arbitration and negotiated settlement for commercial and family matters where they offer a faster, cheaper or more private result.",
      "The firm's litigation practice means settlement is negotiated with a clear view of how the matter would fare in court, and court proceedings remain available if talks do not succeed.",
    ],
    services: [
      "Mediation of commercial disputes",
      "Family dispute resolution",
      "Arbitration and adjudication",
      "Negotiated settlements and settlement agreements",
    ],
    forWhom: "Businesses, partners and families who want to resolve a dispute without a long court process.",
    related: ["litigation", "corporate-commercial"],
  },
  {
    num: "07",
    slug: "academic-advisory",
    title: "Academic & advisory",
    seoTitle: "Academic Advisory: LLM Supervision & Lectures",
    description:
      "Visiting professorships, LLM thesis supervision, guest lectures and curriculum advice, including the European Master in Law and Economics (EMLE) network.",
    lead: "Teaching, supervision and advice for universities and students, in Pakistan and through the European Master in Law and Economics.",
    body: [
      "Mr. Babar is Visiting Professor and LLM Thesis Supervisor at Shaheed Zulfiqar Ali Bhutto University of Law, Karachi; Visiting Professor at Government Pir Illahi Bux Law College, Dadu; and Member Expert (Law) at the University of Sufism and Modern Sciences, Bhitshah. He taught at the School of Law, University of Karachi, in 2025.",
      "Since 2009 Babar Law Associates has been an Associated Partner of the European Master in Law and Economics (EMLE) at Erasmus University Rotterdam: presenting the firm to students, advising on the curriculum, giving guest lectures and offering internships.",
    ],
    services: [
      "LLM thesis supervision",
      "Guest lectures and seminars",
      "Curriculum advice",
      "Scholarship and admissions guidance for students",
      "Internships for law and economics graduates",
    ],
    forWhom: "Universities, law colleges, bar associations and students.",
    related: ["immigration-visas", "corporate-commercial"],
  },
];

export const practiceBySlug = (slug: string) => practicePages.find((p) => p.slug === slug);
export const practiceHref = (num: string) => `/practice-areas/${practicePages.find((p) => p.num === num)?.slug ?? ""}`;
