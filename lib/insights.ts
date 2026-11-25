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
    slug: "supreme-court-leave-to-appeal-article-185-3",
    title: "Appealing to the Supreme Court: petitions for leave to appeal under Article 185(3)",
    seoTitle: "Article 185(3): Leave to Appeal in the Supreme Court of Pakistan",
    description:
      "How to challenge a High Court order in the Supreme Court of Pakistan under Article 185(3): civil and criminal petitions for leave to appeal, bail refused by the High Court, appeals dismissed, time limits and the process.",
    date: "2026-11-25",
    readMinutes: 6,
    category: "Supreme Court",
    practice: "litigation",
    image: "/assets/hero/supreme-court.jpg",
    imagePos: "center 45%",
    imageAlt: "The Supreme Court of Pakistan, Islamabad",
    summary: [
      "Most appeals from a High Court to the Supreme Court are not automatic: under Article 185(3), the Supreme Court must first grant leave to appeal.",
      "This route covers civil and criminal cases, including bail refused by the High Court and appeals it has dismissed.",
      "Time limits are short: generally 30 days for a criminal petition and 60 days for a civil petition, counted from the High Court's decision.",
      "Appeals in constitutional petitions under Article 199 now go to the Federal Constitutional Court instead, apart from rent and family matters.",
    ],
    body: [
      { type: "p", text: "When the High Court refuses bail, dismisses an appeal or decides a civil case against you, the next step is usually the Supreme Court of Pakistan. Under Article 185 of the Constitution of the Islamic Republic of Pakistan, 1973, the Supreme Court hears appeals from the judgments, decrees, final orders and sentences of the High Courts. In most cases, though, there is no automatic right of appeal: the Supreme Court must first agree to hear the case." },
      { type: "h2", text: "What Article 185(3) says" },
      { type: "p", text: "Article 185(3) provides that an appeal from a judgment, decree, order or sentence of a High Court, in a case to which clause (2) does not apply, lies only if the Supreme Court grants leave to appeal. Clause (2) covers a narrow set of cases where an appeal lies as of right, such as certain cases in which the High Court has imposed a sentence of death or imprisonment for life. Almost everything else needs leave." },
      { type: "h2", text: "Common situations" },
      { type: "list", items: [
        "Bail refused by the High Court, whether pre-arrest or post-arrest bail.",
        "A criminal appeal dismissed, or a conviction upheld, by the High Court.",
        "A civil appeal, revision or second appeal decided against you by the High Court.",
        "Rent and family matters decided by the High Court.",
      ] },
      { type: "h2", text: "The petitions" },
      { type: "steps", items: [
        { title: "Civil Petition for Leave to Appeal", text: "Filed against a civil judgment, decree or order of a High Court." },
        { title: "Criminal Petition for Leave to Appeal", text: "Filed against a criminal judgment or order of a High Court, including an order refusing bail." },
        { title: "Jail petition", text: "A prisoner can also petition the Supreme Court through the jail authorities." },
      ] },
      { type: "h2", text: "Time limits" },
      { type: "list", items: [
        "Criminal petitions for leave to appeal: generally within 30 days of the High Court's judgment or order.",
        "Civil petitions for leave to appeal: generally within 60 days of the High Court's judgment or order.",
        "Delay is excused only for sufficient cause, and the Supreme Court applies these limits strictly, including in bail matters. Apply for certified copies straight away and take advice as soon as the order is passed.",
      ] },
      { type: "h2", text: "How leave is decided" },
      { type: "p", text: "At the leave stage, the Supreme Court considers whether the case deserves its attention: for example, a question of law, a misreading or non-reading of the evidence, or a decision that departs from settled principles. If leave is granted, the petition becomes an appeal and is heard on its merits. In bail matters the Supreme Court can decide the question of bail itself when it hears the petition." },
      { type: "h2", text: "How the process usually works" },
      { type: "steps", items: [
        { title: "Certified copies", text: "Certified copies of the High Court's judgment and the orders of the courts below are obtained without delay." },
        { title: "Assessment", text: "The judgment and record are reviewed to identify the grounds on which leave can realistically be sought." },
        { title: "Drafting and filing", text: "The petition sets out concise grounds and is filed with the required documents, at the Supreme Court in Islamabad or at one of its branch registries, including Karachi." },
        { title: "Leave hearing", text: "The Supreme Court hears the petition and decides whether to grant leave, dismiss the petition or, in some matters, dispose of it on the spot." },
        { title: "Appeal", text: "If leave is granted, the appeal is heard on its merits." },
      ] },
      { type: "h2", text: "Constitutional petitions are different" },
      { type: "p", text: "Since the Constitution (Twenty-seventh Amendment) Act, 2025, appeals against High Court judgments in constitutional petitions under Article 199 lie to the Federal Constitutional Court rather than the Supreme Court, except in rent and family matters. Ordinary civil and criminal appeals, including bail matters, remain with the Supreme Court under Article 185." },
      { type: "h2", text: "How we help" },
      { type: "p", text: "Babar Law Associates reviews High Court judgments and orders, advises whether a petition for leave to appeal is worth pursuing, and prepares the petition within the time limit. Because the deadlines are short, contact us as soon as the High Court's order is passed, with a copy of the order if you have it." },
    ],
  },
  {
    slug: "article-199-constitutional-petition-high-court",
    title: "Constitutional petitions under Article 199: enforcing your rights in the High Court",
    seoTitle: "Article 199 Constitutional Petition: Writs & Fundamental Rights in Pakistan",
    description:
      "How a constitutional petition under Article 199 works in Pakistan: the five writs, who can file, the fundamental rights the High Court can enforce, the limits, and how a petition proceeds in the High Court of Sindh.",
    date: "2026-11-25",
    readMinutes: 7,
    category: "Constitutional law",
    practice: "litigation",
    image: "/assets/hero/lady-justice.jpg",
    imagePos: "center 30%",
    imageAlt: "Statue of Lady Justice holding the scales",
    summary: [
      "Article 199 of the Constitution lets the High Court correct unlawful action by government departments, officials and other public authorities, and enforce fundamental rights.",
      "It is available where no other adequate remedy is provided by law.",
      "The court can order an authority to act or to stop acting, declare an unlawful order void, free a person held unlawfully, or ask by what right someone holds a public office.",
      "Petitions should be filed promptly: unexplained delay can defeat an otherwise good case.",
    ],
    body: [
      { type: "p", text: "When a public body, such as a department of the Provincial or Federal Government, acts against the law, refuses to do what the law requires, or treats a person or an organisation unfairly, the Constitution of the Islamic Republic of Pakistan, 1973 provides a direct route to the High Court. Article 199 of the Constitution gives the High Courts their constitutional, or writ, jurisdiction. In Sindh, petitions are filed before the High Court of Sindh at Karachi or at its benches." },
      { type: "h2", text: "What Article 199 allows the High Court to do" },
      { type: "p", text: "The High Court can act on a petition when it is satisfied that no other adequate remedy is provided by law. Article 199 then allows it to make five kinds of orders, traditionally known as writs, and to give directions for the enforcement of fundamental rights." },
      { type: "steps", items: [
        { title: "Mandamus", text: "Directs a person performing functions in connection with the affairs of the Federation, a Province or a local authority to do what the law requires of them, for example to decide a pending application or issue a document they are legally bound to issue." },
        { title: "Prohibition", text: "Directs such a person to refrain from doing something the law does not permit, such as acting beyond their powers." },
        { title: "Certiorari", text: "Declares that an act done or a proceeding taken by such a person was without lawful authority and of no legal effect, for example an order passed without jurisdiction." },
        { title: "Habeas corpus", text: "Directs that a person held in custody be brought before the court, so that it can satisfy itself that the person is not held without lawful authority or in an unlawful manner." },
        { title: "Quo warranto", text: "Requires a person holding, or claiming to hold, a public office to show under what authority they hold it." },
      ] },
      { type: "h2", text: "Who can file" },
      { type: "list", items: [
        "Mandamus, prohibition and certiorari: an aggrieved party, meaning someone whose own legal rights or interests are affected by the action complained of.",
        "Habeas corpus and quo warranto: any person, which is why a family member can file for someone who has been detained.",
        "Enforcement of fundamental rights: an aggrieved person, under Article 199(1)(c).",
      ] },
      { type: "h2", text: "Fundamental rights the court can enforce" },
      { type: "p", text: "Chapter 1 of Part II of the Constitution sets out the fundamental rights. Those most often relied on in petitions include:" },
      { type: "list", items: [
        "Security of person: the right to life and liberty (Article 9).",
        "Safeguards on arrest and detention (Article 10), and the right to a fair trial and due process (Article 10A).",
        "Dignity of the person and privacy of the home (Article 14).",
        "Freedom of movement (Article 15) and freedom of trade, business or profession (Article 18).",
        "Protection of property rights (Articles 23 and 24).",
        "Equality of citizens before the law (Article 25).",
      ] },
      { type: "h2", text: "Common situations" },
      { type: "list", items: [
        "A family member detained by the police or another agency without lawful authority.",
        "An application, licence, permission or record that a department has left undecided for months without reason.",
        "A business sealed, a property demolished or an allotment cancelled without notice or a hearing.",
        "Repeated harassment of a person or an organisation by an official or a department acting beyond its powers.",
        "A public office filled by someone who does not meet the legal requirements for it.",
      ] },
      { type: "h2", text: "Limits to keep in mind" },
      { type: "list", items: [
        "A petition generally lies against the State and its functionaries, not against private persons or companies acting in a purely private capacity.",
        "If the law provides another adequate remedy, such as an appeal, a revision or a specialised tribunal, the court will usually expect it to be used first. Disputes about the terms of service of civil servants, for example, generally go to the Service Tribunals.",
        "The Constitution itself excludes some matters, such as certain matters relating to members of the Armed Forces.",
        "Delay matters: a petition should be filed promptly, because the court can refuse relief to someone who waited too long without explanation.",
      ] },
      { type: "h2", text: "How a petition usually proceeds" },
      { type: "steps", items: [
        { title: "Assessment", text: "A review of the facts and documents, to confirm that a constitutional petition is the right route and that no other adequate remedy applies." },
        { title: "Drafting", text: "The petition sets out the facts, the law and the relief sought, supported by documents and an affidavit." },
        { title: "Filing and first hearing", text: "The petition is filed and fixed before a bench. In urgent cases the court can be asked for interim relief." },
        { title: "Notice and reply", text: "If the court is satisfied, it issues notice to the respondents, who file their comments or reply." },
        { title: "Arguments and decision", text: "After hearing both sides, the court decides the petition and may issue directions to the authorities concerned." },
      ] },
      { type: "p", text: "Since the Constitution (Twenty-seventh Amendment) Act, 2025, an appeal against a High Court's judgment in an Article 199 petition lies to the Federal Constitutional Court rather than the Supreme Court, except in rent and family matters." },
      { type: "h2", text: "How we help" },
      { type: "p", text: "Babar Law Associates represents individuals, families, businesses and organisations in constitutional petitions before the High Court of Sindh at Karachi and its benches. Ghulam Shabbir Babar has practised before the High Court since 2006. If a public authority has acted against you unlawfully, or has failed to act when the law requires it, send a short summary with the relevant documents and we will advise whether a petition is the right route." },
    ],
  },
  {
    slug: "cyprus-permanent-residency-for-pakistani-investors",
    title: "Cyprus permanent residency: a guide for Pakistani investors",
    seoTitle: "Cyprus Golden Visa (Permanent Residency) for Pakistani Investors: €300,000 Route",
    description:
      "How Cyprus permanent residency by investment works for investors from Pakistan: the €300,000 requirement, income rules, who can be included, what the permit allows, and the steps to apply.",
    date: "2026-11-09",
    readMinutes: 6,
    category: "Residency by investment",
    practice: "residency-by-investment",
    image: "/assets/hero/residency-villa.jpg",
    imagePos: "center 50%",
    imageAlt: "A Mediterranean villa with an infinity pool overlooking the sea at sunset",
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
      { type: "p", text: "Babar Law Associates advises on the Greece Golden Visa from Karachi, working with partners in Greece: PassBeyond in Athens, the developers Epirus Assets Real Estate Investment and Hellenic Investment Fund (HIF), and CHRO'NI & Associates Law Firm. We also advise on Cyprus and Portugal, so you can compare the options side by side before deciding." },
    ],
  },
  {
    slug: "pre-arrest-bail-in-sindh-explained",
    title: "Pre-arrest bail in Sindh, explained",
    seoTitle: "Pre-Arrest Bail in Pakistan (Section 498 CrPC): What It Is & How to Apply",
    description:
      "What is pre-arrest bail under Section 498 CrPC, when courts in Sindh grant it, how it differs from post-arrest and protective bail, and what to prepare if you fear arrest in a false case.",
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
