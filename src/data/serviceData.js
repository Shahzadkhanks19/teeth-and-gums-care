/* =====================================
   SERVICE DATA IMAGE IMPORTS
===================================== */

import rootCanalImg from "../Pages/Services/Assets/root canal.jpg";
import implantImg from "../Pages/Services/Assets/dental implant.jpg";
import cleaningImg from "../Pages/Services/Assets/clean.jpg";
import whiteningImg from "../Pages/Services/Assets/clean.jpg";
import smileImg from "../Pages/Services/Assets/smile design.jpg";
import veneerImg from "../Pages/Services/Assets/veeners.jpeg";
import extractionImg from "../Pages/Services/Assets/extraction.jpg";

/* =====================================
   TEMPORARY IMAGE REUSE
   Replace these later when real images are available.
===================================== */

const cosmeticImg = smileImg;
const bracesImg = smileImg;
const alignerImg = smileImg;
const bridgeImg = implantImg;
const fillingImg = cleaningImg;
const scalingImg = cleaningImg;
const retreatmentImg = rootCanalImg;
const singleSittingRCTImg = rootCanalImg;
const apicectomyImg = rootCanalImg;

/* =====================================
   REUSABLE COMMON CONTENT
===================================== */

const commonPrevention = [
  "Brush twice daily",
  "Floss regularly",
  "Avoid excess sugary foods",
  "Visit dentist every 6 months",
  "Treat dental problems early",
];

const commonPrecautions = [
  "Follow dentist’s aftercare instructions",
  "Maintain good oral hygiene",
  "Avoid biting very hard food immediately after treatment",
  "Take prescribed medicines if advised",
  "Visit for follow-up checkups",
];

/* =====================================
   SERVICES DATA
===================================== */

const servicesData = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    image: implantImg,
    shortDesc: "Permanent solution for missing teeth.",
    description:
      "Dental implants replace missing teeth with strong, natural-looking artificial teeth supported by titanium posts placed in the jawbone.",
    definition:
      "A dental implant is an artificial tooth root placed into the jawbone to support a crown, bridge, or denture.",
    causes: [
      "Missing tooth due to decay",
      "Tooth loss from gum disease",
      "Accidental tooth injury",
      "Failed root canal or extraction",
      "Loose or uncomfortable dentures",
    ],
    whenRequired: [
      "One or more missing teeth",
      "Difficulty chewing due to missing teeth",
      "Gap affecting smile appearance",
      "Need for fixed replacement instead of removable denture",
    ],
    benefits: [
      "Natural look and feel",
      "Improves chewing ability",
      "Long-lasting tooth replacement",
      "Prevents bone loss",
      "Does not damage nearby teeth",
    ],
    procedure: [
      "Consultation and bone evaluation",
      "Digital X-ray or scan",
      "Implant placement",
      "Healing and bone integration",
      "Abutment placement",
      "Final crown placement",
    ],
    precautions: [
      "Avoid smoking during healing",
      "Follow dentist’s cleaning instructions",
      "Avoid hard biting initially",
      "Maintain regular follow-ups",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Are dental implants permanent?",
        answer:
          "Dental implants are a long-lasting solution and can last many years with proper care.",
      },
      {
        question: "Is implant surgery painful?",
        answer:
          "The procedure is performed under anesthesia, so patients usually feel minimal discomfort.",
      },
      {
        question: "How long does implant treatment take?",
        answer:
          "It may take a few months because the implant needs time to bond with the jawbone.",
      },
    ],
  },

  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    image: cosmeticImg,
    shortDesc: "Enhance the appearance of your teeth and smile.",
    description:
      "Cosmetic dentistry focuses on improving the appearance of teeth, gums, and overall smile using modern aesthetic dental treatments.",
    definition:
      "Cosmetic dentistry includes dental procedures that improve smile appearance, tooth color, shape, size, alignment, and overall facial harmony.",
    causes: [
      "Discolored teeth",
      "Chipped or cracked teeth",
      "Gaps between teeth",
      "Uneven tooth shape",
      "Unattractive smile appearance",
    ],
    whenRequired: [
      "When you are unhappy with your smile",
      "When teeth are stained or dull",
      "When teeth are chipped or uneven",
      "When smile improvement is desired",
    ],
    benefits: [
      "Improves smile appearance",
      "Boosts confidence",
      "Corrects minor tooth imperfections",
      "Enhances facial aesthetics",
      "Customized treatment planning",
    ],
    procedure: [
      "Smile assessment",
      "Discussion of cosmetic goals",
      "Digital or clinical planning",
      "Selection of suitable treatment",
      "Final smile enhancement",
    ],
    precautions: commonPrecautions,
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is cosmetic dentistry only for appearance?",
        answer:
          "Cosmetic dentistry mainly improves appearance, but some procedures can also improve function and bite balance.",
      },
      {
        question: "Which treatments are included in cosmetic dentistry?",
        answer:
          "It may include teeth whitening, veneers, smile designing, bonding, aligners, and other aesthetic dental treatments.",
      },
      {
        question: "Is cosmetic dentistry safe?",
        answer:
          "Yes, cosmetic dentistry is safe when planned and performed by a qualified dentist.",
      },
    ],
  },

  {
    slug: "smile-designing",
    title: "Smile Designing",
    image: smileImg,
    shortDesc: "Transform your smile aesthetically.",
    description:
      "Smile designing combines cosmetic dental treatments to improve the shape, color, alignment, and overall appearance of your smile.",
    definition:
      "Smile designing is a customized cosmetic dental approach used to enhance smile aesthetics according to facial features and patient goals.",
    causes: [
      "Discolored teeth",
      "Chipped or broken teeth",
      "Gaps between teeth",
      "Uneven tooth shape",
      "Misaligned smile",
    ],
    whenRequired: [
      "Unhappy with smile appearance",
      "Visible gaps or stains",
      "Uneven teeth",
      "Before special occasions",
      "For cosmetic smile enhancement",
    ],
    benefits: [
      "Improves smile aesthetics",
      "Boosts confidence",
      "Customized treatment plan",
      "Enhances facial appearance",
    ],
    procedure: [
      "Smile evaluation",
      "Digital planning",
      "Discussion of treatment options",
      "Cosmetic corrections",
      "Final smile finishing",
    ],
    precautions: commonPrecautions,
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is smile designing only cosmetic?",
        answer:
          "Smile designing mainly improves appearance but can also improve bite balance and oral function depending on treatment.",
      },
      {
        question: "How long does smile designing take?",
        answer:
          "It depends on the treatments required. Some cases are quick, while others may need multiple visits.",
      },
      {
        question: "Is smile designing permanent?",
        answer:
          "Results can last long with proper care, but duration depends on the procedures used.",
      },
    ],
  },

  {
    slug: "dental-veneers",
    title: "Dental Veneers",
    image: veneerImg,
    shortDesc: "Correct smile imperfections with natural-looking veneers.",
    description:
      "Dental veneers are thin tooth-colored shells placed on the front surface of teeth to improve smile appearance.",
    definition:
      "Dental veneers are custom-made shells bonded to teeth to correct cosmetic issues like stains, chips, gaps, or uneven shape.",
    causes: [
      "Discolored teeth",
      "Chipped teeth",
      "Small gaps",
      "Uneven tooth shape",
      "Worn-down teeth",
    ],
    whenRequired: [
      "For cosmetic smile improvement",
      "To cover stains",
      "To correct minor chips",
      "To improve tooth shape",
      "To close small gaps",
    ],
    benefits: [
      "Natural-looking smile",
      "Covers stains and chips",
      "Improves tooth shape",
      "Quick cosmetic correction",
      "Long-lasting results with care",
    ],
    procedure: [
      "Smile consultation",
      "Tooth preparation if needed",
      "Impression or digital scan",
      "Veneer fabrication",
      "Bonding veneers to teeth",
    ],
    precautions: [
      "Avoid biting hard objects",
      "Do not use teeth to open packages",
      "Maintain oral hygiene",
      "Use night guard if advised",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Do veneers look natural?",
        answer:
          "Yes, veneers are designed to match your natural teeth and smile aesthetics.",
      },
      {
        question: "Are veneers permanent?",
        answer:
          "Veneers are long-lasting but may need replacement after several years depending on care.",
      },
      {
        question: "Can veneers stain?",
        answer:
          "Porcelain veneers resist stains better than natural teeth, but good care is still important.",
      },
    ],
  },

  {
    slug: "painless-tooth-extraction",
    title: "Painless Tooth Extraction",
    image: extractionImg,
    shortDesc: "Safe and comfortable tooth removal.",
    description:
      "Painless tooth extraction is performed when a tooth is badly damaged, infected, impacted, or cannot be saved with other treatments.",
    definition:
      "Tooth extraction is the removal of a tooth from its socket using local anesthesia and gentle dental techniques.",
    causes: [
      "Severe tooth decay",
      "Advanced gum disease",
      "Impacted wisdom tooth",
      "Broken tooth",
      "Orthodontic treatment requirement",
    ],
    whenRequired: [
      "Tooth cannot be saved",
      "Severe infection",
      "Loose tooth due to gum disease",
      "Painful impacted wisdom tooth",
      "Crowding correction",
    ],
    benefits: [
      "Removes source of infection",
      "Relieves pain",
      "Prevents spread of dental disease",
      "Supports future replacement planning",
    ],
    procedure: [
      "Dental examination and X-ray",
      "Local anesthesia",
      "Gentle tooth removal",
      "Cleaning the socket",
      "Post-extraction instructions",
    ],
    precautions: [
      "Bite on gauze as advised",
      "Avoid spitting forcefully for 24 hours",
      "Avoid smoking",
      "Eat soft foods initially",
      "Follow prescribed medicines",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is tooth extraction painful?",
        answer:
          "The area is numbed with anesthesia, so the procedure is usually comfortable.",
      },
      {
        question: "How long does healing take?",
        answer:
          "Initial healing usually takes a few days, while complete healing may take longer.",
      },
      {
        question: "Can I replace the extracted tooth?",
        answer:
          "Yes. Replacement options include implants, bridges, or dentures depending on the case.",
      },
    ],
  },

  {
    slug: "orthodontic-treatment",
    title: "Orthodontic Treatment",
    image: bracesImg,
    shortDesc: "Dental braces for proper teeth alignment.",
    description:
      "Orthodontic treatment corrects teeth alignment, bite problems, spacing, and crowding using braces or other orthodontic appliances.",
    definition:
      "Orthodontic treatment is a dental specialty treatment used to move teeth into better alignment for improved appearance and function.",
    causes: [
      "Crooked teeth",
      "Crowded teeth",
      "Spacing between teeth",
      "Overbite or underbite",
      "Jaw alignment issues",
    ],
    whenRequired: [
      "Misaligned teeth",
      "Difficulty cleaning crowded teeth",
      "Bite problems",
      "Smile correction requirement",
      "Teeth spacing or crowding",
    ],
    benefits: [
      "Improves smile alignment",
      "Improves bite function",
      "Makes teeth easier to clean",
      "Reduces uneven tooth wear",
      "Boosts smile confidence",
    ],
    procedure: [
      "Orthodontic consultation",
      "X-ray or scan",
      "Treatment planning",
      "Braces placement",
      "Regular adjustments",
      "Retention after treatment",
    ],
    precautions: [
      "Avoid sticky and hard foods",
      "Maintain proper brushing around braces",
      "Attend regular adjustment visits",
      "Use retainers after treatment",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Are braces painful?",
        answer:
          "Braces may cause mild discomfort after adjustments, but it usually settles within a few days.",
      },
      {
        question: "How long does orthodontic treatment take?",
        answer:
          "Treatment duration depends on the case and may range from several months to a few years.",
      },
      {
        question: "Can adults get braces?",
        answer:
          "Yes, adults can also get orthodontic treatment depending on their dental condition.",
      },
    ],
  },

  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    image: rootCanalImg,
    shortDesc: "Save infected teeth and eliminate pain.",
    description:
      "Root canal treatment removes infected or damaged pulp from inside the tooth, cleans the root canals, and seals the tooth to prevent further infection.",
    definition:
      "Root canal treatment is a dental procedure used to save a badly infected or damaged tooth by removing infected nerve tissue from inside the tooth.",
    causes: [
      "Deep tooth decay",
      "Cracked or fractured tooth",
      "Repeated dental procedures on the same tooth",
      "Untreated cavities",
      "Dental trauma or injury",
    ],
    whenRequired: [
      "Severe tooth pain",
      "Sensitivity to hot or cold",
      "Swelling around gums",
      "Tooth infection or abscess",
      "Darkening of the tooth",
    ],
    benefits: [
      "Saves natural tooth",
      "Relieves severe pain",
      "Stops infection from spreading",
      "Restores chewing function",
      "Prevents tooth extraction",
    ],
    procedure: [
      "Dental examination and X-ray",
      "Local anesthesia for comfort",
      "Removal of infected pulp",
      "Cleaning and shaping of canals",
      "Filling and sealing the tooth",
      "Crown placement if required",
    ],
    precautions: commonPrecautions,
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is root canal treatment painful?",
        answer:
          "No. Modern root canal treatment is usually comfortable because it is performed under local anesthesia.",
      },
      {
        question: "How many visits are required?",
        answer:
          "Most root canal treatments are completed in one or two visits depending on the infection.",
      },
      {
        question: "Do I need a crown after root canal?",
        answer:
          "In many cases, a crown is recommended to protect and strengthen the treated tooth.",
      },
    ],
  },

  {
    slug: "single-sitting-root-canal-treatment",
    title: "Single Sitting Root Canal Treatment",
    image: singleSittingRCTImg,
    shortDesc: "Complete root canal treatment in a single visit.",
    description:
      "Single sitting root canal treatment completes the cleaning, shaping, and sealing of infected root canals in one appointment when suitable.",
    definition:
      "Single sitting root canal treatment is an RCT procedure completed in one visit for selected cases with manageable infection and proper clinical conditions.",
    causes: [
      "Deep decay requiring quick treatment",
      "Mild to moderate infection",
      "Dental pain due to pulp damage",
      "Tooth trauma",
      "Time-sensitive treatment need",
    ],
    whenRequired: [
      "When infection is controlled",
      "When patient wants fewer visits",
      "When tooth condition allows single visit treatment",
      "When quick pain relief is needed",
    ],
    benefits: [
      "Fewer dental visits",
      "Quick pain relief",
      "Saves natural tooth",
      "Comfortable treatment experience",
      "Convenient for busy patients",
    ],
    procedure: [
      "Dental examination and X-ray",
      "Local anesthesia",
      "Pulp removal",
      "Cleaning and shaping canals",
      "Filling and sealing in same visit",
    ],
    precautions: commonPrecautions,
    prevention: commonPrevention,
    faqs: [
      {
        question: "Can every root canal be done in one sitting?",
        answer:
          "No, only suitable cases can be completed in one sitting. Some infected teeth may need multiple visits.",
      },
      {
        question: "Is single sitting RCT safe?",
        answer:
          "Yes, it is safe when the tooth condition is suitable and the dentist recommends it.",
      },
      {
        question: "Will I need a crown after single sitting RCT?",
        answer:
          "A crown may be advised to protect the tooth, especially for back teeth.",
      },
    ],
  },

  {
    slug: "root-canal-retreatment",
    title: "Root Canal Retreatment",
    image: retreatmentImg,
    shortDesc: "Treatment for failed or reinfected root canals.",
    description:
      "Root canal retreatment is performed when a previously treated tooth becomes painful, infected, or does not heal properly.",
    definition:
      "Root canal retreatment involves reopening a previously treated tooth, removing old filling material, cleaning the canals again, and resealing the tooth.",
    causes: [
      "Incomplete previous root canal cleaning",
      "New decay after root canal",
      "Cracked filling or crown",
      "Reinfection of canals",
      "Complex root canal anatomy",
    ],
    whenRequired: [
      "Pain in previously root canal treated tooth",
      "Swelling near treated tooth",
      "Infection visible on X-ray",
      "Failed previous RCT",
      "Recurring dental abscess",
    ],
    benefits: [
      "Saves previously treated tooth",
      "Controls reinfection",
      "Relieves pain",
      "Avoids extraction when possible",
      "Improves long-term tooth survival",
    ],
    procedure: [
      "Clinical examination and X-ray",
      "Removal of old restoration if required",
      "Removal of previous root filling",
      "Cleaning and disinfecting canals",
      "Refilling and sealing",
      "Crown or restoration if needed",
    ],
    precautions: commonPrecautions,
    prevention: commonPrevention,
    faqs: [
      {
        question: "Why does a root canal fail?",
        answer:
          "A root canal may fail due to missed canals, reinfection, leakage, new decay, or tooth fracture.",
      },
      {
        question: "Can a failed root canal be saved?",
        answer:
          "In many cases, retreatment can save the tooth if the tooth structure is suitable.",
      },
      {
        question: "Is retreatment painful?",
        answer:
          "The procedure is done with anesthesia, so it is usually comfortable.",
      },
    ],
  },

  {
    slug: "apicectomy",
    title: "Apicectomy",
    image: apicectomyImg,
    shortDesc: "Surgical removal of infection from root tips.",
    description:
      "Apicectomy is a minor surgical procedure used to remove infected tissue and the tip of a tooth root when infection persists after root canal treatment.",
    definition:
      "Apicectomy is the surgical removal of the root tip and surrounding infected tissue to save a tooth with persistent root-end infection.",
    causes: [
      "Persistent infection after root canal",
      "Root tip infection",
      "Dental cyst or abscess",
      "Complex root canal anatomy",
      "Failed root canal healing",
    ],
    whenRequired: [
      "Infection remains after RCT",
      "Root-end abscess is present",
      "Retreatment is not enough",
      "To save the natural tooth",
    ],
    benefits: [
      "Removes persistent infection",
      "Helps save natural tooth",
      "Prevents spread of infection",
      "Useful when retreatment is difficult",
    ],
    procedure: [
      "Examination and X-ray",
      "Local anesthesia",
      "Small gum opening near root tip",
      "Removal of infected tissue and root tip",
      "Sealing the root end",
      "Suturing and healing",
    ],
    precautions: [
      "Follow post-surgical instructions",
      "Avoid hard chewing near treated area",
      "Maintain oral hygiene gently",
      "Take medicines as prescribed",
      "Attend follow-up visit",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is apicectomy painful?",
        answer:
          "It is performed under local anesthesia, so discomfort during the procedure is minimal.",
      },
      {
        question: "Why is apicectomy needed?",
        answer:
          "It is needed when infection remains near the root tip even after root canal treatment.",
      },
      {
        question: "Can apicectomy save my tooth?",
        answer:
          "Yes, apicectomy is often done to save a natural tooth from extraction.",
      },
    ],
  },

  {
    slug: "dental-scaling-treatment",
    title: "Dental Scaling Treatment",
    image: scalingImg,
    shortDesc: "Professional deep cleaning for healthier teeth and gums.",
    description:
      "Dental scaling removes plaque, tartar, and stains from teeth and gumline to improve oral hygiene and prevent gum disease.",
    definition:
      "Dental scaling is a professional cleaning procedure that removes hardened tartar deposits from teeth and around the gums.",
    causes: [
      "Plaque buildup",
      "Tartar deposits",
      "Poor brushing technique",
      "Food particles stuck around gums",
      "Irregular dental cleaning",
    ],
    whenRequired: [
      "Bleeding gums",
      "Bad breath",
      "Yellow or stained teeth",
      "Tartar buildup",
      "Routine preventive care",
    ],
    benefits: [
      "Prevents gum disease",
      "Freshens breath",
      "Removes tartar and stains",
      "Improves oral hygiene",
      "Helps detect dental problems early",
    ],
    procedure: [
      "Oral examination",
      "Scaling to remove tartar",
      "Polishing of teeth",
      "Oral hygiene guidance",
    ],
    precautions: [
      "Avoid very hot or cold foods for a few hours if sensitivity occurs",
      "Brush gently after cleaning",
      "Follow dentist’s oral hygiene advice",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is dental scaling painful?",
        answer:
          "Dental scaling is generally painless. Mild sensitivity may occur if there is heavy tartar buildup.",
      },
      {
        question: "How often should I get scaling?",
        answer:
          "Most patients should get professional cleaning every 6 months.",
      },
      {
        question: "Does scaling weaken teeth?",
        answer:
          "No. Scaling removes harmful deposits and helps protect teeth and gums.",
      },
    ],
  },

  {
    slug: "dental-filling-treatment",
    title: "Dental Filling Treatment",
    image: fillingImg,
    shortDesc: "Restore cavities and damaged teeth effectively.",
    description:
      "Dental filling treatment repairs cavities, minor fractures, and damaged tooth structure using tooth-colored filling material.",
    definition:
      "A dental filling is a restorative treatment used to fill cavities and restore the shape, strength, and function of a damaged tooth.",
    causes: [
      "Tooth decay",
      "Small cavities",
      "Chipped tooth",
      "Worn tooth surface",
      "Food lodgement due to decay",
    ],
    whenRequired: [
      "Visible cavity",
      "Food getting stuck in tooth",
      "Mild tooth sensitivity",
      "Small chipped area",
      "Early tooth decay",
    ],
    benefits: [
      "Stops cavity progression",
      "Restores tooth shape",
      "Improves chewing comfort",
      "Prevents deeper infection",
      "Natural tooth-colored appearance",
    ],
    procedure: [
      "Dental examination",
      "Decay removal",
      "Tooth cleaning",
      "Filling placement",
      "Shaping and polishing",
    ],
    precautions: [
      "Avoid chewing hard food immediately after filling",
      "Maintain good oral hygiene",
      "Report high bite or discomfort",
      "Avoid sticky foods for some time if advised",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is dental filling painful?",
        answer:
          "Most fillings are comfortable. Local anesthesia may be used if the cavity is deep.",
      },
      {
        question: "How long does a filling last?",
        answer:
          "A filling can last many years depending on oral hygiene, diet, and bite forces.",
      },
      {
        question: "Can cavities heal without filling?",
        answer:
          "Early enamel changes may be managed, but formed cavities usually need filling.",
      },
    ],
  },

  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    image: whiteningImg,
    shortDesc: "Brighten your smile safely.",
    description:
      "Teeth whitening is a cosmetic dental treatment that helps remove stains and discoloration to make teeth appear brighter.",
    definition:
      "Teeth whitening is a professional dental procedure that lightens tooth color using safe whitening agents.",
    causes: [
      "Tea and coffee stains",
      "Smoking or tobacco use",
      "Food color stains",
      "Age-related discoloration",
      "Poor oral hygiene",
    ],
    whenRequired: [
      "Yellow or dull teeth",
      "Stained teeth",
      "Before weddings or events",
      "For smile enhancement",
    ],
    benefits: [
      "Brighter smile",
      "Improved confidence",
      "Safe professional treatment",
      "Quick cosmetic improvement",
    ],
    procedure: [
      "Smile assessment",
      "Cleaning if required",
      "Gum protection",
      "Application of whitening gel",
      "Final shade evaluation",
    ],
    precautions: [
      "Avoid tea, coffee, and colored foods for 24–48 hours",
      "Avoid smoking",
      "Maintain oral hygiene",
      "Use dentist-recommended toothpaste if sensitivity occurs",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is teeth whitening safe?",
        answer:
          "Yes, professional teeth whitening is safe when performed under dental supervision.",
      },
      {
        question: "How long does whitening last?",
        answer:
          "Results can last several months or longer depending on diet and oral habits.",
      },
      {
        question: "Can whitening cause sensitivity?",
        answer:
          "Some patients may feel temporary sensitivity, which usually settles quickly.",
      },
    ],
  },

  {
    slug: "dental-aligners",
    title: "Dental Aligners",
    image: alignerImg,
    shortDesc: "Clear braces for discreet teeth straightening.",
    description:
      "Dental aligners are clear, removable trays used to gradually straighten teeth without traditional metal braces.",
    definition:
      "Dental aligners are custom-made transparent trays that fit over the teeth and gently move them into better alignment over time.",
    causes: [
      "Crooked teeth",
      "Spacing between teeth",
      "Crowded teeth",
      "Mild bite problems",
      "Teeth shifting after previous treatment",
    ],
    whenRequired: [
      "Mild to moderate teeth misalignment",
      "Visible gaps between teeth",
      "Crowded teeth",
      "Patient wants discreet orthodontic treatment",
    ],
    benefits: [
      "Nearly invisible appearance",
      "Comfortable and removable",
      "Easy to clean",
      "No metal brackets or wires",
      "Improves smile alignment",
    ],
    procedure: [
      "Dental consultation",
      "Digital scan or impression",
      "Treatment planning",
      "Custom aligner fabrication",
      "Aligner delivery",
      "Regular progress monitoring",
    ],
    precautions: [
      "Wear aligners as advised",
      "Remove aligners while eating",
      "Clean aligners regularly",
      "Avoid hot water on aligners",
      "Do not skip follow-ups",
    ],
    prevention: [
      "Maintain oral hygiene",
      "Wear retainers after treatment",
      "Avoid habits that shift teeth",
      "Visit dentist regularly",
    ],
    faqs: [
      {
        question: "Are dental aligners painful?",
        answer:
          "Aligners may cause mild pressure when changed, but they are generally comfortable.",
      },
      {
        question: "Can I remove dental aligners?",
        answer:
          "Yes, aligners are removable, but they should be worn as advised for best results.",
      },
      {
        question: "How long does aligner treatment take?",
        answer:
          "Treatment time depends on the case and may range from a few months to over a year.",
      },
    ],
  },

  {
    slug: "dental-bridge",
    title: "Dental Bridge",
    image: bridgeImg,
    shortDesc: "Replace missing teeth with fixed bridge solutions.",
    description:
      "A dental bridge replaces one or more missing teeth by anchoring artificial teeth to nearby natural teeth or implants.",
    definition:
      "A dental bridge is a fixed dental restoration used to fill the gap created by missing teeth.",
    causes: [
      "Missing tooth",
      "Tooth loss due to decay",
      "Tooth loss due to gum disease",
      "Accidental tooth loss",
      "Extraction of damaged tooth",
    ],
    whenRequired: [
      "One or more missing teeth",
      "Difficulty chewing",
      "Gap affecting smile",
      "Need for fixed replacement",
      "To prevent nearby teeth from shifting",
    ],
    benefits: [
      "Restores missing teeth",
      "Improves chewing",
      "Maintains facial appearance",
      "Prevents tooth shifting",
      "Fixed and comfortable solution",
    ],
    procedure: [
      "Dental examination",
      "Tooth preparation if required",
      "Impression or scan",
      "Temporary bridge if needed",
      "Final bridge placement",
      "Bite adjustment and polishing",
    ],
    precautions: [
      "Clean under the bridge properly",
      "Avoid very hard foods initially",
      "Maintain gum hygiene",
      "Visit for regular checkups",
    ],
    prevention: commonPrevention,
    faqs: [
      {
        question: "Is a dental bridge fixed?",
        answer:
          "Yes, a dental bridge is fixed and cannot be removed by the patient like a removable denture.",
      },
      {
        question: "How long does a dental bridge last?",
        answer:
          "A dental bridge can last many years with proper oral hygiene and regular dental care.",
      },
      {
        question: "Is bridge better than implant?",
        answer:
          "It depends on the case. The dentist will suggest the best option based on oral health, bone support, and patient preference.",
      },
    ],
  },
];

export default servicesData;