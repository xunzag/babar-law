// Insights: plain-language articles on matters the firm handles. Each is
// general information, reviewed by Ghulam Shabbir Babar before publication.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: { title: string; text: string }[] };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string; // ISO date of publication
  updated?: string;
  readMinutes: number;
  category: string;
  practice: string; // practice-area slug for the related link
  image: string;
  imagePos: string;
  imageAlt: string;
  summary: string[];
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "cyprus-permanent-residency-for-pakistani-investors",
    title: "Cyprus permanent residency: a guide for Pakistani investors",
    seoTitle: "Cyprus Permanent Residency for Pakistani Investors (€300,000 Route)",
    description:
      "How Cyprus permanent residency by investment works for investors from Pakistan: the €300,000 requirement, income rules, who can be included, what the permit allows, and the steps to apply.",
    date: "2026-11-09",
    readMinutes: 6,
    category: "Residency by investment",
    practice: "residency-by-investment",
    image: "/assets/gallery/cyprus-02.jpg",
    imagePos: "center 55%",
    imageAlt: "A Karma Developers residential property in Cyprus",
    summary: [
      "Cyprus grants permanent residence, not a renewable temporary permit, to non-EU investors who make a qualifying investment of at least €300,000 (excluding VAT).",
      "Applicants must also show a secure annual income from outside Cyprus, starting at €50,000 for the main applicant.",
      "The permit can cover a spouse and children, but it does not allow employment in Cyprus or residence in other EU countries.",
      "Cyprus closed its citizenship-by-investment programme in 2020; this is a residence route, not a passport.",
    ],
    body: [
      { type: "p", text: "Cyprus is one of the few countries in the European Union that offers investors permanent residence from the outset, rather than a permit that must be renewed every few years. For families in Pakistan looking for a secure base in Europe, it is often considered alongside the Greece Golden Visa. This guide explains how the Cyprus route works and what to check before committing to a property." },
      { type: "h2", text: "What the route is" },
      { type: "p", text: "The permit is granted under Regulation 6(2) of the Cyprus Aliens and Immigration Regulations, often called the fast-track or investment route. It is a permanent residence permit: once granted, it does not need to be renewed, as long as the investor continues to meet the conditions." },
      { type: "h2", text: "The main requirements" },
      { type: "list", items: [
        "An investment of at least €300,000, excluding VAT, in an eligible category. Most families choose new residential property bought directly from a developer; other categories include certain commercial property, shares in a Cypriot company and units in a regulated Cyprus investment fund.",
        "A secured annual income from outside Cyprus of at least €50,000 for the main applicant, increased for each family member included, currently by €15,000 for a spouse and €10,000 for each child.",
        "A clear criminal record certificate from the country of origin and the country of residence.",
        "Health insurance that covers the family in Cyprus.",
        "A declaration by the applicant and spouse that they will not take up employment in Cyprus.",
      ] },
      { type: "p", text: "The conditions on property, in particular which purchases count as new and which developers qualify, have been tightened more than once. Every engagement therefore starts with a check of the rules in force at the time." },
      { type: "h2", text: "Who can be included" },
      { type: "p", text: "One application can cover the investor's spouse and their children: minor children and, in many cases, unmarried adult children who are full-time students and financially dependent, generally up to the age of 25. The position on including parents has changed over time, so it needs to be confirmed for each family." },
      { type: "h2", text: "What the permit allows, and what it does not" },
      { type: "list", items: [
        "The right to live in Cyprus permanently and to travel in and out without visas for Cyprus.",
        "Ownership of shares in a Cypriot company, and the role of director, are possible; taking up employment in Cyprus is not permitted under this route.",
        "It does not, by itself, give the right to live or work in other EU countries.",
        "It does not lead automatically to Cypriot citizenship. Citizenship now depends on the ordinary naturalisation rules, which require years of actual residence in Cyprus.",
      ] },
      { type: "h2", text: "Keeping the permit" },
      { type: "p", text: "The qualifying investment must be maintained, and the permit holder is expected to visit Cyprus regularly, at least once every two years. Long absences can lead to the permit being withdrawn." },
      { type: "h2", text: "How the process usually works" },
      { type: "steps", items: [
        { title: "Initial assessment", text: "A review of the family's documents, income and goals, and a comparison with other routes such as the Greece Golden Visa." },
        { title: "Choosing a property", text: "Shortlisting qualifying properties from developers, with independent checks on the title, permits and the developer itself." },
        { title: "Purchase and payment", text: "Signing the sale contract and paying through the banking system from funds whose source can be documented." },
        { title: "Application", text: "Preparing the file, with translated and legalised Pakistani documents, and submitting it to the Civil Registry and Migration Department in Cyprus." },
        { title: "Decision and permit", text: "Processing usually takes a few months. The family gives biometrics in Cyprus and the permanent residence permit is issued." },
      ] },
      { type: "h2", text: "Cyprus or Greece?" },
      { type: "p", text: "Both are EU countries with property-based routes, but they work differently. Cyprus grants permanent residence from the start and requires proof of income from abroad. The Greece Golden Visa is a five-year renewable permit with no minimum stay, and the investment required depends on the area. The better choice depends on budget, family circumstances and how the family plans to use the permit, which is why we compare them for each client." },
      { type: "h2", text: "How we help" },
      { type: "p", text: "Babar Law Associates has worked with Cyprus developers since 2017, including Karma Developers, Singularis Investment Ltd, JWPegasus Ltd and Giovani Developers Limited, and Mr. Babar has visited developments in Cyprus in person. We assess whether the route suits the family, coordinate with developers and lawyers in Cyprus, and prepare the application file. Consultations are available at our chambers in Saddar, Karachi, or remotely." },
    ],
  },
  {
    slug: "greece-golden-visa-guide-for-pakistani-investors",
    title: "Greece Golden Visa: a guide for Pakistani investors",
    seoTitle: "Greece Golden Visa for Pakistani Investors: How It Works",
    description:
      "How the Greece Golden Visa works for investors from Pakistan: the property routes, who can be included, what the permit allows, and the steps from first consultation to residence card.",
    date: "2026-11-05",
    readMinutes: 6,
    category: "Residency by investment",
    practice: "residency-by-investment",
    image: "/assets/gallery/photo-03.jpg",
    imagePos: "center 30%",
    imageAlt: "Ghulam Shabbir Babar beside the flags of the European Union and Belgium",
    summary: [
      "A five-year, renewable Greek residence permit obtained through investment, most often in real estate.",
      "The minimum property investment depends on where the property is; thresholds were raised in 2024.",
      "Spouse, children and parents can usually be included in the same application.",
      "There is no requirement to live in Greece to keep the permit, but it does not by itself give the right to work.",
    ],
    body: [
      { type: "p", text: "Greece's residence-by-investment programme, widely known as the Golden Visa, has become one of the most popular routes into Europe for families from Pakistan and the Gulf. It offers a residence permit in an EU and Schengen country in return for a qualifying investment, usually the purchase of property." },
      { type: "h2", text: "What the Golden Visa gives you" },
      { type: "list", items: [
        "A Greek residence permit valid for five years and renewable for as long as the investment is kept.",
        "The right to live in Greece and to travel within the Schengen area under the usual short-stay rules.",
        "No minimum period you must spend in Greece to keep the permit.",
        "A permit that covers residence, not employment: holding it does not on its own allow you to work in Greece.",
      ] },
      { type: "h2", text: "The property investment" },
      { type: "p", text: "Real estate is the route most investors choose. Under the rules introduced in 2024, the minimum purchase is higher in the most sought-after areas, including Attica (Athens), Thessaloniki, Mykonos, Santorini and the larger islands, and lower in the rest of the country. A lower threshold also applies to specific categories, such as converting commercial buildings to residential use or restoring listed buildings." },
      { type: "p", text: "Because the amounts, the qualifying areas and the conditions on the property (for example, restrictions on short-term rental) have changed more than once, every engagement starts with a check of the rules in force on the day, before any money is committed." },
      { type: "h2", text: "Who can be included" },
      { type: "p", text: "One investment can usually cover the main applicant's spouse, their children up to the age of 21, and the parents of both spouses. Each family member receives their own residence permit." },
      { type: "h2", text: "The process, step by step" },
      { type: "steps", items: [
        { title: "Initial assessment", text: "Your goals, family, budget and source of funds, and whether Greece is the right programme compared with Cyprus or Portugal." },
        { title: "Choosing a property", text: "Shortlisting properties that meet the threshold for their area, with legal and technical checks on title and permits." },
        { title: "Greek tax number and bank account", text: "Obtained for the investor, usually through a power of attorney, so the process can move forward without repeated travel." },
        { title: "Purchase and payment", text: "The contract is signed before a Greek notary, and the price is paid through the Greek banking system, as the programme requires." },
        { title: "Application and biometrics", text: "The residence application is filed, and the family attends a biometrics appointment in Greece." },
        { title: "Residence permits", text: "Permits are issued for each family member, valid for five years and renewable." },
      ] },
      { type: "h2", text: "Things Pakistani investors should plan for" },
      { type: "list", items: [
        "Documenting the source of funds and moving money abroad through proper banking channels.",
        "Translations and legalisation of Pakistani documents such as birth and marriage certificates.",
        "Ongoing costs of owning the property, including Greek taxes and maintenance.",
        "How the permit fits longer-term plans, such as education for children or a future citizenship application.",
      ] },
      { type: "h2", text: "How we help" },
      { type: "p", text: "Babar Law Associates advises on the Greece Golden Visa from Karachi, working with partners in Greece: PassBeyond in Athens, Epirus Assets Real Estate Investment, and CHRO'NI & Associates Law Firm. We also advise on Cyprus and Portugal, so you can compare the options side by side before deciding." },
    ],
  },
  {
    slug: "pre-arrest-bail-in-sindh-explained",
    title: "Pre-arrest bail in Sindh, explained",
    seoTitle: "Pre-arrest Bail in Sindh Explained: Process and Requirements",
    description:
      "What pre-arrest bail is, when courts in Sindh grant it, how it differs from post-arrest and protective bail, and what to prepare if you fear arrest in a case you believe is false.",
    date: "2026-11-05",
    readMinutes: 5,
    category: "Litigation",
    practice: "litigation",
    image: "/assets/gallery/photo-13.jpg",
    imagePos: "25% center",
    imageAlt: "Ghulam Shabbir Babar at the All Pakistan Lawyers Convention, Sindh High Court Bar Association",
    summary: [
      "Pre-arrest bail protects a person from being arrested in a case that has been registered or is expected.",
      "It is an exceptional remedy: courts expect a real reason to believe the arrest would be unjustified.",
      "The application is usually made to the Sessions Court, or to the High Court, under section 498 CrPC.",
      "Interim bail is followed by a confirmation hearing, which the accused must attend.",
    ],
    body: [
      { type: "p", text: "If an FIR has been registered against you, or you fear one will be, you may be able to ask the court to protect you from arrest before it happens. This is pre-arrest bail, sometimes called bail before arrest. It is one of the most common and most urgent matters our chambers handle before the courts in Sindh." },
      { type: "h2", text: "Pre-arrest bail and post-arrest bail" },
      { type: "list", items: [
        "Post-arrest bail is sought after a person has been arrested, to secure their release while the case continues. It is governed mainly by sections 496 and 497 of the Code of Criminal Procedure.",
        "Pre-arrest bail is sought before any arrest, under section 498 CrPC. Because it stops the police from arresting someone at all, courts treat it as an extraordinary remedy.",
      ] },
      { type: "h2", text: "When courts grant it" },
      { type: "p", text: "Courts generally need to be satisfied that the intended arrest is not genuine: for example, that the case has been brought with mala fide intent, for an ulterior motive, or to humiliate or harass the accused. The court also looks at the case on its merits, including the evidence, any delay in reporting, the role attributed to the accused, and whether the offence falls within the prohibitory clause." },
      { type: "h2", text: "How the process usually works" },
      { type: "steps", items: [
        { title: "Application", text: "An application is filed before the Sessions Court or the High Court, with a copy of the FIR (if available) and the grounds." },
        { title: "Interim bail", text: "If the court is satisfied at first sight, it may grant interim pre-arrest bail, usually on furnishing surety, and fix a date for the next hearing." },
        { title: "Personal appearance", text: "The accused must appear in person. Pre-arrest bail is not granted to someone who is absent." },
        { title: "Confirmation", text: "After hearing the prosecution and the complainant, the court either confirms the bail or recalls it. If it is recalled, the accused may be taken into custody." },
      ] },
      { type: "h2", text: "Protective bail" },
      { type: "p", text: "If you are in one city and the case is registered in another, a court may grant short protective bail so that you can travel and approach the court that has jurisdiction, without being arrested on the way. It is temporary and does not replace pre-arrest bail from the proper court." },
      { type: "h2", text: "What to prepare" },
      { type: "list", items: [
        "A copy of the FIR, or details of the complaint if no FIR has been registered yet.",
        "Your CNIC, and documents for a surety.",
        "Any evidence of the dispute behind the case, such as earlier complaints, property or business disputes, or messages.",
        "A timeline of events, with dates, while they are fresh in your memory.",
      ] },
      { type: "h2", text: "Act quickly" },
      { type: "p", text: "Timing matters in bail matters. Babar Law Associates appears before the High Court of Sindh at Karachi, Sukkur, Larkana and Hyderabad, and before the Sessions Courts. If you are worried about an arrest, contact us as soon as possible with a copy of the FIR." },
    ],
  },
  {
    slug: "uk-student-visa-refused-options-for-pakistani-students",
    title: "UK student visa refused? Your options",
    seoTitle: "UK Student Visa Refused? Options for Pakistani Students",
    description:
      "What to do after a UK Student visa refusal: reading the refusal letter, administrative review, making a fresh application, and when other remedies apply.",
    date: "2026-11-05",
    readMinutes: 5,
    category: "Immigration & visas",
    practice: "immigration-visas",
    image: "/assets/studyuk.png",
    imagePos: "center",
    imageAlt: "Ghulam Shabbir Babar at the Study UK awards, British Council",
    summary: [
      "A refusal is not the end: most students who are refused can either challenge the decision or reapply.",
      "There is usually no full appeal against a Student visa refusal; the main challenge is administrative review.",
      "Administrative review only corrects caseworker errors; it is not a chance to add new evidence.",
      "Often the strongest option is a fresh application that answers every reason given for the refusal.",
    ],
    body: [
      { type: "p", text: "Every year many students from Pakistan receive a UK Student visa refusal, often with a university place already confirmed. A refusal is stressful, but it is usually fixable if you act quickly and choose the right route." },
      { type: "h2", text: "Start with the refusal letter" },
      { type: "p", text: "The refusal notice sets out exactly why the application failed and what options you have. Common reasons include:" },
      { type: "list", items: [
        "Financial evidence: funds not held for the required period, the wrong type of account, or a sponsor letter that does not meet the rules.",
        "Credibility: doubts, often after an interview, that you are a genuine student who intends to study the course.",
        "Documents: missing or inconsistent documents, or translations that do not meet the requirements.",
        "Course or sponsor issues, such as problems with the Confirmation of Acceptance for Studies (CAS).",
      ] },
      { type: "h2", text: "Option 1: administrative review" },
      { type: "p", text: "Student visa refusals usually do not carry a full right of appeal. Instead, you can ask for an administrative review, in which a different caseworker checks whether the original decision contained a mistake: for example, evidence that was overlooked or a rule that was applied wrongly." },
      { type: "list", items: [
        "It must be requested within a short deadline stated in the refusal letter, so check the date as soon as you receive it.",
        "You generally cannot submit new evidence; the review looks at the application as it was decided.",
        "It suits cases where the Home Office made an error, not cases where something was genuinely missing.",
      ] },
      { type: "h2", text: "Option 2: a fresh application" },
      { type: "p", text: "Where the refusal was caused by missing or weak evidence, a new application that addresses each reason is often faster and more effective than a review. Your university will usually need to issue a new or updated CAS, so tell them about the refusal straight away." },
      { type: "steps", items: [
        { title: "Analyse the refusal", text: "Identify every reason given, and the evidence needed to answer each one." },
        { title: "Fix the evidence", text: "For example, a bank statement that meets the funds rules, a stronger study plan, or corrected documents." },
        { title: "Prepare for credibility", text: "If the refusal questioned your intentions, prepare to explain your course choice, career plans and finances clearly and consistently." },
        { title: "Reapply", text: "Submit the new application with a CAS from your university and full supporting documents." },
      ] },
      { type: "h2", text: "Other remedies" },
      { type: "p", text: "In limited cases, such as an unlawful decision after an administrative review, a judicial review may be possible. Refusals that involve human rights grounds can carry a right of appeal. These routes are technical, and legal advice is needed before relying on them." },
      { type: "h2", text: "How we help" },
      { type: "p", text: "Mr. Babar has advised students on admissions and international scholarships for many years and is himself an Erasmus Mundus scholar. Babar Law Associates reviews refusal letters, advises whether to seek a review or reapply, and prepares the new application with you." },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
