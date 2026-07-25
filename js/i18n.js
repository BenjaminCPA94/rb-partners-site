// Bilingual content (FR/EN) — language choice persisted in localStorage.
const RB_LANG_KEY = 'rb-lang';

const RB_TRANSLATIONS = {
  fr: {
    'topbar.account': 'Espace client',
    'nav.expertises': 'Expertises',
    'nav.accompagnement': 'Accompagnement',
    'nav.international': 'International',
    'nav.equipe': 'Le cabinet',
    'nav.contact': 'Contact',
    'nav.cta': 'Prendre rendez-vous',
    'breadcrumb.home': 'Accueil',

    'hero.eyebrow': 'Expertise comptable, sociale & fiscale',
    'hero.title': "Votre partenaire de confiance,<br>de la création à l'international.",
    'hero.lead': "RB Partners accompagne les entrepreneurs français dans chaque étape de leur développement, et guide les sociétés étrangères qui souhaitent s'implanter et réussir en France.",
    'hero.cta_primary': 'Échanger avec un associé',
    'hero.cta_secondary': 'Découvrir nos expertises',

    'intro.text': "Fondé par <strong>Rachel Illouz</strong> et <strong>Benjamin Haziza</strong>, RB Partners est un cabinet d'expertise comptable à taille humaine qui conjugue rigueur technique et proximité relationnelle. Nous accompagnons deux familles de clients&nbsp;: les <strong>sociétés franco-françaises</strong> que nous suivons de la création à l'accompagnement opérationnel du quotidien, et les <strong>sociétés étrangères</strong> qui souhaitent s'installer et se développer sereinement en France.",

    'expertises.eyebrow': 'Nos expertises',
    'expertises.title': 'Une expertise complète, un seul interlocuteur',
    'expertises.lead': 'Comptabilité, social, fiscalité et conseil en gestion réunis au service de votre développement.',
    'card.more': 'En savoir plus',

    'card.comptabilite.title': 'Comptabilité & tenue des comptes',
    'card.comptabilite.desc': 'Production comptable fiable, tableaux de bord clairs et reporting régulier pour piloter votre activité en toute confiance.',
    'card.fiscalite.title': 'Fiscalité française & internationale',
    'card.fiscalite.desc': 'Optimisation et sécurisation de votre stratégie fiscale, conventions fiscales internationales, TVA intracommunautaire et prix de transfert.',
    'card.social.title': 'Social & paie',
    'card.social.desc': 'Bulletins de paie, gestion administrative du personnel, contrats de travail et conformité au droit social français.',
    'card.creation.title': 'Création & structuration juridique',
    'card.creation.desc': "Choix du statut, rédaction des statuts, formalités d'immatriculation et structuration du groupe dès l'origine.",
    'card.conseil.title': 'Conseil en gestion & pilotage',
    'card.conseil.desc': 'Business plan, prévisionnel financier, aide à la levée de fonds et accompagnement dans vos décisions stratégiques.',
    'card.implantation.title': 'Implantation en France',
    'card.implantation.desc': "Filiale ou succursale, choix de la structure, immatriculation, fiscalité d'entrée et accompagnement administratif complet.",

    'accompagnement.eyebrow': 'Sociétés françaises',
    'accompagnement.title': "De la création à l'accompagnement opérationnel",
    'accompagnement.text': "Nous suivons les entrepreneurs français sur la durée, avec un accompagnement qui évolue au rythme de leur entreprise&nbsp;: du premier business plan à la structuration d'un groupe multi-sociétés.",
    'accompagnement.list.0': 'Étude de faisabilité et choix de la structure juridique',
    'accompagnement.list.1': "Immatriculation et démarrage de l'activité",
    'accompagnement.list.2': 'Mise en place des outils comptables, sociaux et de gestion',
    'accompagnement.list.3': 'Suivi mensuel, tableaux de bord et pilotage de la performance',
    'accompagnement.list.4': 'Accompagnement dans la croissance, le recrutement et la levée de fonds',
    'steps.01': 'Diagnostic & structuration',
    'steps.02': 'Création & lancement',
    'steps.03': 'Pilotage opérationnel',
    'steps.04': 'Croissance & développement',

    'international.eyebrow': 'Sociétés étrangères',
    'international.title': "S'implanter et se développer en France",
    'international.text': "Vous dirigez une société étrangère et souhaitez ouvrir une filiale, une succursale ou un bureau de représentation en France&nbsp;? RB Partners est votre interlocuteur unique pour sécuriser chaque étape de votre implantation, en français comme en anglais.",
    'international.list.0': 'Choix de la structure la plus adaptée (filiale, succursale, bureau de liaison)',
    'international.list.1': 'Immatriculation, formalités administratives et bancaires',
    'international.list.2': "Fiscalité d'entrée, conventions fiscales et prix de transfert",
    'international.list.3': 'Mise en conformité sociale et gestion de la paie locale',
    'international.list.4': "Interface avec vos équipes et conseils à l'étranger",
    'globe.text': "Un point d'entrée unique pour votre implantation en France",

    'values.eyebrow': 'Notre approche',
    'values.title': 'Une relation de proximité, une exigence de résultat',
    'value1.title': 'Proximité',
    'value1.desc': 'Un interlocuteur dédié qui connaît votre activité, disponible et réactif.',
    'value2.title': 'Sur-mesure',
    'value2.desc': 'Des solutions adaptées à votre secteur, votre taille et vos objectifs, jamais standardisées.',
    'value3.title': 'Double culture',
    'value3.desc': "Une équipe à l'aise avec les enjeux franco-internationaux, en français et en anglais.",
    'value4.title': 'Exigence',
    'value4.desc': 'Rigueur technique et anticipation pour sécuriser chaque décision.',

    'team.eyebrow': 'Le cabinet',
    'team.title': 'Deux associés, une vision commune',
    'rachel.role': 'Associée — Expert-comptable',
    'rachel.bio': "Rachel accompagne les dirigeants dans la structuration et le pilotage de leur activité, avec une attention particulière portée à la relation client et au conseil de proximité.",
    'benjamin.role': 'Associé — Expert-comptable',
    'benjamin.bio': "Benjamin pilote notamment l'accompagnement des sociétés étrangères s'implantant en France, de la structuration juridique à la mise en conformité fiscale et sociale.",

    'contact.eyebrow': 'Contact',
    'contact.title': 'Parlons de votre projet',
    'contact.text': "Que vous lanciez votre entreprise en France ou prépariez l'implantation d'une société étrangère, nos associés vous répondent directement.",
    'contact.info.address_label': 'Adresse',
    'contact.info.address_value': 'Paris, France',
    'contact.info.phone_label': 'Téléphone',
    'contact.info.email_label': 'Email',

    'form.name_label': 'Nom complet',
    'form.email_label': 'Email',
    'form.company_label': 'Votre société est&hellip;',
    'form.company_fr': 'Française',
    'form.company_foreign': "Étrangère, en projet d'implantation en France",
    'form.message_label': 'Message',
    'form.submit': 'Envoyer ma demande',
    'form.success': 'Merci, votre message a bien été enregistré. Nous revenons vers vous rapidement.',

    'footer.legal': 'RB Partners — Rachel Illouz & Benjamin Haziza, experts-comptables. Tous droits réservés.',

    'meta.home_title': 'RB Partners — Expertise comptable & accompagnement franco-international',

    'exp.eyebrow': 'Expertise',
    'services.title': 'Nos services clés',
    'exp.back': 'Retour aux expertises',
    'exp.cta_button': 'Nous contacter',

    'exp.comptabilite.subtitle': 'Une production comptable fiable et des tableaux de bord clairs pour piloter votre activité en toute confiance, mois après mois.',
    'exp.comptabilite.intro1': "La comptabilité est le socle de toute décision de gestion. Chez RB Partners, nous tenons vos comptes avec rigueur et vous restituons l'information sous une forme directement exploitable, pour que vous puissiez piloter votre entreprise sans avoir à déchiffrer des colonnes de chiffres.",
    'exp.comptabilite.intro2': "Selon la taille et la maturité de votre structure, nous adaptons la fréquence et le niveau de détail de nos restitutions&nbsp;: suivi mensuel pour un pilotage fin, points trimestriels pour une structure plus stable. Dans tous les cas, vous gardez une vision claire et à jour de votre situation financière.",
    'exp.comptabilite.intro3': "Nous assurons également l'établissement de vos comptes annuels et, lorsque votre structure y est soumise, nous coordonnons les échanges avec votre commissaire aux comptes pour une clôture sans accroc.",
    'exp.comptabilite.services.0': 'Tenue comptable mensuelle et rapprochements bancaires',
    'exp.comptabilite.services.1': 'Établissement des comptes annuels (bilan, compte de résultat, annexes)',
    'exp.comptabilite.services.2': 'Tableaux de bord et indicateurs de pilotage sur mesure',
    'exp.comptabilite.services.3': 'Suivi et prévisionnel de trésorerie',
    'exp.comptabilite.services.4': 'Accompagnement lors des clôtures et relations avec le commissaire aux comptes',
    'exp.comptabilite.cta_title': 'Un projet comptable à nous confier ?',
    'exp.comptabilite.cta_text': 'Parlons de votre activité et de vos besoins de suivi.',

    'exp.fiscalite.subtitle': 'Sécuriser votre stratégie fiscale en France et dans vos relations avec l’étranger, sans surprise ni improvisation.',
    'exp.fiscalite.intro1': "La fiscalité française est dense et évolutive ; dès qu'une dimension internationale s'ajoute, la complexité augmente encore. Notre rôle est de vous permettre de vous concentrer sur votre activité en prenant en charge vos obligations déclaratives et en anticipant les points de vigilance propres à votre situation.",
    'exp.fiscalite.intro2': "Pour les entreprises ayant des flux ou des implantations à l'étranger, nous analysons l'application des conventions fiscales internationales, la gestion de la TVA intracommunautaire et, le cas échéant, la documentation de vos prix de transfert entre entités liées.",
    'exp.fiscalite.intro3': "En cas de contrôle fiscal, nous vous accompagnons dans la préparation des échanges avec l'administration et la constitution des dossiers justificatifs.",
    'exp.fiscalite.services.0': 'Déclarations fiscales (IS, TVA, CFE/CVAE, liasse fiscale)',
    'exp.fiscalite.services.1': 'Optimisation et sécurisation de la stratégie fiscale',
    'exp.fiscalite.services.2': 'Conventions fiscales internationales et prévention de la double imposition',
    'exp.fiscalite.services.3': 'TVA intracommunautaire et internationale',
    'exp.fiscalite.services.4': 'Prix de transfert et documentation associée',
    'exp.fiscalite.services.5': 'Assistance en cas de contrôle fiscal',
    'exp.fiscalite.cta_title': 'Une question fiscale, franco-française ou internationale ?',
    'exp.fiscalite.cta_text': 'Parlons de votre situation avant qu’elle ne devienne une contrainte.',

    'exp.social.subtitle': 'Une gestion sociale fiable et conforme, pour que vos équipes soient payées à temps et vos obligations respectées.',
    'exp.social.intro1': "La gestion sociale ne tolère pas l'approximation&nbsp;: bulletins de paie, déclarations sociales et contrats de travail doivent être exacts et transmis dans les délais. Nous prenons en charge l'ensemble de ce processus pour vous libérer de sa technicité.",
    'exp.social.intro2': "Au-delà de la production des bulletins, nous vous accompagnons sur les événements qui rythment la vie d'une équipe&nbsp;: embauches, ruptures de contrat, avenants, ainsi que sur les obligations déclaratives récurrentes comme la DSN.",
    'exp.social.intro3': "Nous assurons également une veille sur les évolutions du droit social français, pour que vos pratiques restent conformes sans que vous ayez à suivre chaque changement de réglementation.",
    'exp.social.services.0': 'Établissement des bulletins de paie',
    'exp.social.services.1': 'Déclarations sociales nominatives (DSN)',
    'exp.social.services.2': 'Rédaction des contrats de travail et avenants',
    'exp.social.services.3': 'Gestion des entrées et sorties (DPAE, soldes de tout compte)',
    'exp.social.services.4': 'Veille et conformité au droit social français',
    'exp.social.services.5': 'Conseil en relations sociales et représentation du personnel',
    'exp.social.cta_title': 'Besoin de reprendre en main votre gestion sociale ?',
    'exp.social.cta_text': 'Parlons de vos effectifs et de votre organisation actuelle.',

    'exp.creation.subtitle': "Poser les bonnes fondations juridiques dès le départ, pour éviter d'avoir à les corriger plus tard.",
    'exp.creation.intro1': "Le choix de la structure juridique conditionne votre fiscalité, votre protection sociale et votre gouvernance pour les années à venir. Nous vous aidons à choisir la forme la plus adaptée à votre projet, en tenant compte de votre activité, de vos associés éventuels et de vos perspectives de développement.",
    'exp.creation.intro2': "Nous prenons en charge la rédaction des statuts et l'ensemble des formalités de constitution, jusqu'à l'obtention de votre immatriculation. Pour les projets plus complexes, nous vous accompagnons également dans la structuration d'un groupe (holding, filiales) et la rédaction de pactes d'associés.",
    'exp.creation.intro3': "Lors d'une levée de fonds ou d'une opération en capital, nous vous assistons dans la préparation des documents juridiques et financiers nécessaires.",
    'exp.creation.services.0': 'Choix de la forme juridique adaptée à votre projet',
    'exp.creation.services.1': 'Rédaction des statuts et formalités de constitution',
    'exp.creation.services.2': 'Immatriculation (RCS, Kbis, INSEE)',
    'exp.creation.services.3': 'Structuration de groupe (holding, filiales)',
    'exp.creation.services.4': "Pactes d'associés et gouvernance",
    'exp.creation.services.5': 'Accompagnement lors des levées de fonds et opérations en capital',
    'exp.creation.cta_title': 'Un projet de création à structurer ?',
    'exp.creation.cta_text': 'Parlons-en avant de déposer vos statuts.',

    'exp.conseil.subtitle': "Des chiffres transformés en décisions&nbsp;: business plan, prévisionnel et outils de pilotage pour avancer avec visibilité.",
    'exp.conseil.intro1': "Diriger une entreprise suppose de prendre des décisions dans l'incertitude&nbsp;: recruter, investir, lever des fonds, changer de modèle. Notre rôle est de vous fournir les repères chiffrés nécessaires pour que ces décisions reposent sur des bases solides plutôt que sur des intuitions seules.",
    'exp.conseil.intro2': "Nous élaborons avec vous des business plans et des prévisionnels financiers réalistes, que ce soit pour structurer un projet de création, préparer une levée de fonds ou anticiper un développement.",
    'exp.conseil.intro3': "Au-delà des documents ponctuels, nous mettons en place des outils de pilotage récurrents (reporting, indicateurs clés) pour que vous puissiez suivre votre performance dans la durée, et pas seulement au moment d'une échéance.",
    'exp.conseil.services.0': 'Élaboration de business plans et prévisionnels financiers',
    'exp.conseil.services.1': 'Analyse de rentabilité et de performance',
    'exp.conseil.services.2': 'Aide à la levée de fonds et relations avec les investisseurs',
    'exp.conseil.services.3': 'Mise en place d’outils de pilotage (reporting, indicateurs clés)',
    'exp.conseil.services.4': 'Accompagnement dans les décisions stratégiques (investissement, recrutement, développement)',
    'exp.conseil.cta_title': "Besoin d'y voir plus clair sur votre pilotage ?",
    'exp.conseil.cta_text': 'Parlons de vos objectifs et de vos échéances.',

    'exp.implantation.subtitle': "Un point d'entrée unique pour les sociétés étrangères qui souhaitent s'installer et se développer en France.",
    'exp.implantation.intro1': "S'implanter dans un nouveau pays suppose de naviguer entre des règles juridiques, fiscales et sociales qui ne sont pas les vôtres. Nous accompagnons les dirigeants de sociétés étrangères tout au long de ce processus, en français comme en anglais, pour que l'implantation en France se fasse sans mauvaise surprise.",
    'exp.implantation.intro2': "La première étape consiste à choisir la structure la plus adaptée à votre projet&nbsp;: filiale, succursale ou simple bureau de liaison n'ont ni la même fiscalité, ni les mêmes obligations. Nous vous aidons à faire ce choix avant d'engager les formalités d'immatriculation.",
    'exp.implantation.intro3': "Une fois la structure en place, nous assurons la mise en conformité sociale, la gestion de la paie locale et servons d'interface avec vos équipes et vos conseils à l'étranger, pour que la coordination reste fluide malgré la distance.",
    'exp.implantation.services.0': 'Choix de la structure (filiale, succursale, bureau de liaison)',
    'exp.implantation.services.1': 'Immatriculation et formalités administratives et bancaires',
    'exp.implantation.services.2': "Fiscalité d'entrée et conventions fiscales",
    'exp.implantation.services.3': 'Mise en conformité sociale et gestion de la paie locale',
    'exp.implantation.services.4': "Interface avec vos équipes et conseils à l'étranger",
    'exp.implantation.services.5': 'Accompagnement en français et en anglais',
    'exp.implantation.cta_title': "Un projet d'implantation en France ?",
    'exp.implantation.cta_text': 'Parlons de votre structure d’origine et de vos objectifs.',
  },

  en: {
    'topbar.account': 'Client area',
    'nav.expertises': 'Services',
    'nav.accompagnement': 'Support',
    'nav.international': 'International',
    'nav.equipe': 'The Firm',
    'nav.contact': 'Contact',
    'nav.cta': 'Book a meeting',
    'breadcrumb.home': 'Home',

    'hero.eyebrow': 'Accounting, HR & Tax Expertise',
    'hero.title': 'Your trusted partner,<br>from launch to international growth.',
    'hero.lead': "RB Partners supports French entrepreneurs at every stage of their growth, and guides foreign companies looking to establish and thrive in France.",
    'hero.cta_primary': 'Talk to a partner',
    'hero.cta_secondary': 'Discover our expertise',

    'intro.text': "Founded by <strong>Rachel Illouz</strong> and <strong>Benjamin Haziza</strong>, RB Partners is a boutique accounting firm that combines technical rigor with genuine personal attention. We support two types of clients: <strong>French companies</strong>, whom we accompany from formation through day-to-day operational management, and <strong>foreign companies</strong> looking to establish themselves and grow smoothly in France.",

    'expertises.eyebrow': 'Our Expertise',
    'expertises.title': 'Complete expertise, a single point of contact',
    'expertises.lead': 'Accounting, HR, tax and management consulting, all working toward your growth.',
    'card.more': 'Learn more',

    'card.comptabilite.title': 'Accounting & Bookkeeping',
    'card.comptabilite.desc': 'Reliable bookkeeping, clear dashboards and regular reporting so you can run your business with confidence.',
    'card.fiscalite.title': 'French & International Tax',
    'card.fiscalite.desc': "Optimizing and securing your tax strategy — international tax treaties, intra-EU VAT and transfer pricing.",
    'card.social.title': 'Payroll & HR',
    'card.social.desc': 'Payslips, HR administration, employment contracts and compliance with French labor law.',
    'card.creation.title': 'Company Formation & Legal Structuring',
    'card.creation.desc': 'Choosing the right legal form, drafting bylaws, registration formalities and group structuring from day one.',
    'card.conseil.title': 'Management Advisory',
    'card.conseil.desc': 'Business plans, financial forecasts, fundraising support and guidance on your strategic decisions.',
    'card.implantation.title': 'Setting Up in France',
    'card.implantation.desc': 'Subsidiary or branch, choice of structure, registration, entry taxation and full administrative support.',

    'accompagnement.eyebrow': 'French Companies',
    'accompagnement.title': 'From company formation to day-to-day support',
    'accompagnement.text': "We support French entrepreneurs for the long haul, with guidance that evolves alongside their business&nbsp;— from the first business plan to structuring a multi-entity group.",
    'accompagnement.list.0': 'Feasibility study and choice of legal structure',
    'accompagnement.list.1': 'Registration and business launch',
    'accompagnement.list.2': 'Setting up accounting, HR and management tools',
    'accompagnement.list.3': 'Monthly follow-up, dashboards and performance tracking',
    'accompagnement.list.4': 'Support with growth, hiring and fundraising',
    'steps.01': 'Diagnosis & structuring',
    'steps.02': 'Formation & launch',
    'steps.03': 'Operational management',
    'steps.04': 'Growth & development',

    'international.eyebrow': 'Foreign Companies',
    'international.title': 'Establish and grow in France',
    'international.text': "Do you run a foreign company looking to open a subsidiary, branch or representative office in France&nbsp;? RB Partners is your single point of contact to secure every step of your setup, in both French and English.",
    'international.list.0': 'Choosing the most suitable structure (subsidiary, branch, liaison office)',
    'international.list.1': 'Registration, administrative and banking formalities',
    'international.list.2': 'Entry taxation, tax treaties and transfer pricing',
    'international.list.3': 'Labor law compliance and local payroll management',
    'international.list.4': 'Liaison with your teams and advisors abroad',
    'globe.text': 'A single entry point for your setup in France',

    'values.eyebrow': 'Our Approach',
    'values.title': 'A close relationship, a commitment to results',
    'value1.title': 'Close Relationship',
    'value1.desc': 'A dedicated contact who knows your business, always available and responsive.',
    'value2.title': 'Tailored Approach',
    'value2.desc': "Solutions adapted to your industry, size and goals — never off-the-shelf.",
    'value3.title': 'Cross-Cultural Fluency',
    'value3.desc': 'A team comfortable with French-international matters, in both French and English.',
    'value4.title': 'High Standards',
    'value4.desc': 'Technical rigor and foresight to secure every decision.',

    'team.eyebrow': 'The Firm',
    'team.title': 'Two partners, one shared vision',
    'rachel.role': 'Partner — Chartered Accountant',
    'rachel.bio': "Rachel supports business owners in structuring and steering their operations, with close attention to the client relationship and hands-on advice.",
    'benjamin.role': 'Partner — Chartered Accountant',
    'benjamin.bio': "Benjamin leads the support of foreign companies setting up in France, from legal structuring through tax and labor law compliance.",

    'contact.eyebrow': 'Contact',
    'contact.title': "Let's talk about your project",
    'contact.text': "Whether you're launching a business in France or planning a foreign company's setup, our partners will respond to you personally.",
    'contact.info.address_label': 'Address',
    'contact.info.address_value': 'Paris, France',
    'contact.info.phone_label': 'Phone',
    'contact.info.email_label': 'Email',

    'form.name_label': 'Full name',
    'form.email_label': 'Email',
    'form.company_label': 'Your company is&hellip;',
    'form.company_fr': 'French',
    'form.company_foreign': 'Foreign, planning to set up in France',
    'form.message_label': 'Message',
    'form.submit': 'Send my request',
    'form.success': "Thank you, your message has been received. We'll get back to you shortly.",

    'footer.legal': 'RB Partners — Rachel Illouz & Benjamin Haziza, Chartered Accountants. All rights reserved.',

    'meta.home_title': 'RB Partners — Accounting Expertise & French-International Support',

    'exp.eyebrow': 'Expertise',
    'services.title': 'Our Key Services',
    'exp.back': 'Back to services',
    'exp.cta_button': 'Contact us',

    'exp.comptabilite.subtitle': 'Reliable bookkeeping and clear dashboards to help you run your business with confidence, month after month.',
    'exp.comptabilite.intro1': "Accounting is the foundation of every management decision. At RB Partners, we keep your books with rigor and deliver information in a directly usable form, so you can run your business without having to decode columns of figures.",
    'exp.comptabilite.intro2': "Depending on your company's size and maturity, we adapt the frequency and level of detail of our reporting: monthly follow-up for fine-grained control, quarterly check-ins for a more established structure. Either way, you keep a clear, up-to-date view of your financial position.",
    'exp.comptabilite.intro3': "We also prepare your annual accounts and, where your company is subject to a statutory audit, coordinate with your auditor for a smooth year-end close.",
    'exp.comptabilite.services.0': 'Monthly bookkeeping and bank reconciliations',
    'exp.comptabilite.services.1': 'Preparation of annual accounts (balance sheet, income statement, notes)',
    'exp.comptabilite.services.2': 'Custom dashboards and management indicators',
    'exp.comptabilite.services.3': 'Cash flow monitoring and forecasting',
    'exp.comptabilite.services.4': 'Support during year-end closing and liaison with your auditor',
    'exp.comptabilite.cta_title': 'Have an accounting project for us?',
    'exp.comptabilite.cta_text': "Let's talk about your business and your reporting needs.",

    'exp.fiscalite.subtitle': 'Securing your tax strategy in France and in your dealings abroad — no surprises, no guesswork.',
    'exp.fiscalite.intro1': "French tax law is dense and constantly evolving; add an international dimension and the complexity grows further. Our role is to let you focus on your business while we handle your filing obligations and anticipate the risk areas specific to your situation.",
    'exp.fiscalite.intro2': "For companies with flows or operations abroad, we review the application of international tax treaties, manage intra-EU VAT, and, where relevant, prepare transfer pricing documentation between related entities.",
    'exp.fiscalite.intro3': "In the event of a tax audit, we help you prepare your exchanges with the tax authorities and assemble the supporting documentation.",
    'exp.fiscalite.services.0': 'Tax filings (corporate income tax, VAT, local business taxes, annual tax return)',
    'exp.fiscalite.services.1': 'Tax strategy optimization and risk management',
    'exp.fiscalite.services.2': 'International tax treaties and prevention of double taxation',
    'exp.fiscalite.services.3': 'Intra-EU and international VAT',
    'exp.fiscalite.services.4': 'Transfer pricing and related documentation',
    'exp.fiscalite.services.5': 'Support during tax audits',
    'exp.fiscalite.cta_title': 'A tax question, domestic or international?',
    'exp.fiscalite.cta_text': "Let's discuss your situation before it becomes a constraint.",

    'exp.social.subtitle': "Reliable, compliant HR management, so your team gets paid on time and your obligations are met.",
    'exp.social.intro1': "HR management leaves no room for error: payslips, social filings and employment contracts must be accurate and submitted on time. We handle this entire process so you're free of its technicalities.",
    'exp.social.intro2': "Beyond producing payslips, we support you through the events that shape a team's life — hiring, terminations, contract amendments — as well as recurring filing obligations such as France's DSN payroll declaration.",
    'exp.social.intro3': "We also monitor changes in French labor law, so your practices stay compliant without you having to track every regulatory change.",
    'exp.social.services.0': 'Payslip preparation',
    'exp.social.services.1': 'Payroll social filings (DSN)',
    'exp.social.services.2': 'Drafting employment contracts and amendments',
    'exp.social.services.3': 'Managing hires and departures (pre-employment declarations, final settlements)',
    'exp.social.services.4': 'Monitoring and compliance with French labor law',
    'exp.social.services.5': 'Advice on labor relations and employee representation',
    'exp.social.cta_title': 'Need to get your HR management under control?',
    'exp.social.cta_text': "Let's talk about your workforce and current setup.",

    'exp.creation.subtitle': "Laying the right legal foundations from the start, so you don't have to fix them later.",
    'exp.creation.intro1': "Your choice of legal structure shapes your taxation, social protection and governance for years to come. We help you choose the form best suited to your project, taking into account your activity, any co-founders, and your growth plans.",
    'exp.creation.intro2': "We handle the drafting of bylaws and all formation formalities, through to registration. For more complex projects, we also support you in structuring a group (holding company, subsidiaries) and drafting shareholders' agreements.",
    'exp.creation.intro3': "During a fundraising round or capital transaction, we assist you in preparing the necessary legal and financial documents.",
    'exp.creation.services.0': 'Choosing the legal form suited to your project',
    'exp.creation.services.1': 'Drafting bylaws and formation formalities',
    'exp.creation.services.2': 'Registration (trade register, business ID)',
    'exp.creation.services.3': 'Group structuring (holding company, subsidiaries)',
    'exp.creation.services.4': "Shareholders' agreements and governance",
    'exp.creation.services.5': 'Support during fundraising and capital transactions',
    'exp.creation.cta_title': 'A new venture to structure?',
    'exp.creation.cta_text': "Let's talk before you file your bylaws.",

    'exp.conseil.subtitle': 'Turning numbers into decisions: business plans, forecasts and management tools to move forward with clarity.',
    'exp.conseil.intro1': "Running a business means making decisions under uncertainty: hiring, investing, raising funds, changing your model. Our role is to give you the figures you need so those decisions rest on solid ground rather than intuition alone.",
    'exp.conseil.intro2': "We build realistic business plans and financial forecasts with you, whether to structure a new venture, prepare a fundraising round, or plan for growth.",
    'exp.conseil.intro3': "Beyond one-off documents, we set up recurring management tools (reporting, key indicators) so you can track your performance over time, not just at deadline.",
    'exp.conseil.services.0': 'Building business plans and financial forecasts',
    'exp.conseil.services.1': 'Profitability and performance analysis',
    'exp.conseil.services.2': 'Fundraising support and investor relations',
    'exp.conseil.services.3': 'Setting up management tools (reporting, key indicators)',
    'exp.conseil.services.4': 'Guidance on strategic decisions (investment, hiring, growth)',
    'exp.conseil.cta_title': 'Need more clarity on your business management?',
    'exp.conseil.cta_text': "Let's talk about your goals and deadlines.",

    'exp.implantation.subtitle': 'A single entry point for foreign companies looking to establish and grow in France.',
    'exp.implantation.intro1': "Setting up in a new country means navigating legal, tax and labor rules that aren't your own. We support the leaders of foreign companies throughout this process, in both French and English, so your setup in France goes smoothly.",
    'exp.implantation.intro2': "The first step is choosing the structure best suited to your project: a subsidiary, branch or simple liaison office each carry different tax treatment and obligations. We help you make that choice before starting the registration process.",
    'exp.implantation.intro3': "Once the structure is in place, we handle labor law compliance and local payroll, and serve as the interface with your teams and advisors abroad, keeping coordination smooth despite the distance.",
    'exp.implantation.services.0': 'Choice of structure (subsidiary, branch, liaison office)',
    'exp.implantation.services.1': 'Registration and administrative/banking formalities',
    'exp.implantation.services.2': 'Entry taxation and tax treaties',
    'exp.implantation.services.3': 'Labor law compliance and local payroll management',
    'exp.implantation.services.4': 'Liaison with your teams and advisors abroad',
    'exp.implantation.services.5': 'Support in French and English',
    'exp.implantation.cta_title': 'Planning to set up in France?',
    'exp.implantation.cta_text': "Let's talk about your parent company and your goals.",
  },
};

function rbGetLang() {
  const stored = localStorage.getItem(RB_LANG_KEY);
  return stored === 'en' ? 'en' : 'fr';
}

function rbTranslate(key, lang) {
  const dict = RB_TRANSLATIONS[lang] || RB_TRANSLATIONS.fr;
  return dict[key] !== undefined ? dict[key] : (RB_TRANSLATIONS.fr[key] !== undefined ? RB_TRANSLATIONS.fr[key] : null);
}

function rbApplyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = rbTranslate(el.getAttribute('data-i18n'), lang);
    if (val !== null) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const val = rbTranslate(el.getAttribute('data-i18n-html'), lang);
    if (val !== null) el.innerHTML = val;
  });

  const doctitleEl = document.querySelector('[data-i18n-doctitle]');
  if (doctitleEl) {
    const key = doctitleEl.getAttribute('data-i18n-doctitle');
    if (key === 'meta.home_title') {
      document.title = rbTranslate('meta.home_title', lang);
    } else {
      const base = rbTranslate(key, lang);
      document.title = base ? `${base} — RB Partners` : document.title;
    }
  }

  document.querySelectorAll('.lang-switch input').forEach((el) => { el.checked = lang === 'en'; });
  document.querySelectorAll('[data-lang-label="fr"]').forEach((el) => el.classList.toggle('lang-toggle__label--active', lang === 'fr'));
  document.querySelectorAll('[data-lang-label="en"]').forEach((el) => el.classList.toggle('lang-toggle__label--active', lang === 'en'));
}

function rbSetLang(lang) {
  localStorage.setItem(RB_LANG_KEY, lang);
  rbApplyLang(lang);
}

window.rbI18n = {
  get: (key) => rbTranslate(key, rbGetLang()),
  getLang: rbGetLang,
};

document.addEventListener('DOMContentLoaded', () => {
  rbApplyLang(rbGetLang());
  const toggle = document.getElementById('lang-switch');
  if (toggle) {
    toggle.addEventListener('change', (e) => {
      rbSetLang(e.target.checked ? 'en' : 'fr');
    });
  }
});
