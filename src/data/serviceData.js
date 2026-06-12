import rootCanalImg from "../Pages/Services/Assets/root canal.jpg";
import implantImg from "../Pages/Services/Assets/dental implant.jpg";
import cleaningImg from "../Pages/Services/Assets/clean.jpg";
import whiteningImg from "../Pages/Services/Assets/clean.jpg";
import smileImg from "../Pages/Services/Assets/smile design.jpg";
import gumImg from "../Pages/Services/Assets/gum treatment.jpg";
import veneerImg from "../Pages/Services/Assets/veeners.jpeg";
import extractionImg from "../Pages/Services/Assets/extraction.jpg";

const servicesData = [
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    image: rootCanalImg,
    shortDesc: "Save infected teeth and eliminate pain.",
    description:
      "Root canal treatment removes infected or damaged pulp from inside the tooth, cleans the root canals, and seals the tooth to prevent further infection.",
    definition:
      "Root canal treatment is a dental procedure used to save a badly infected or damaged tooth by removing the infected nerve tissue from inside the tooth.",
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
    precautions: [
      "Avoid chewing hard food immediately after treatment",
      "Take prescribed medicines on time",
      "Maintain good oral hygiene",
      "Visit for follow-up checkups",
    ],
    prevention: [
      "Brush twice daily",
      "Floss regularly",
      "Avoid excess sugary foods",
      "Treat cavities early",
      "Visit dentist every 6 months",
    ],
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
    prevention: [
      "Maintain gum health",
      "Treat missing teeth early",
      "Brush and floss daily",
      "Avoid tobacco",
      "Regular dental checkups",
    ],
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
    slug: "teeth-cleaning",
    title: "Teeth Cleaning",
    image: cleaningImg,
    shortDesc: "Professional cleaning for healthier teeth and gums.",
    description:
      "Teeth cleaning removes plaque, tartar, and stains from teeth to improve oral hygiene and prevent gum problems.",
    definition:
      "Professional teeth cleaning, also called scaling, is a dental procedure that removes hardened deposits from teeth and gumline.",
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
    prevention: [
      "Brush twice daily",
      "Floss regularly",
      "Use mouthwash if advised",
      "Avoid tobacco",
      "Get cleaning every 6 months",
    ],
    faqs: [
      {
        question: "Is teeth cleaning painful?",
        answer:
          "Teeth cleaning is generally painless. Mild sensitivity may occur if there is heavy tartar buildup.",
      },
      {
        question: "How often should I get teeth cleaning?",
        answer:
          "Most patients should get professional cleaning every 6 months.",
      },
      {
        question: "Does cleaning weaken teeth?",
        answer:
          "No. Cleaning removes harmful deposits and actually helps protect teeth and gums.",
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
    prevention: [
      "Limit tea and coffee",
      "Avoid tobacco",
      "Rinse after colored foods",
      "Brush twice daily",
      "Regular dental cleaning",
    ],
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
    precautions: [
      "Follow dentist’s aftercare advice",
      "Avoid biting hard objects",
      "Maintain oral hygiene",
      "Attend follow-up visits",
    ],
    prevention: [
      "Maintain oral hygiene",
      "Avoid staining habits",
      "Protect teeth from trauma",
      "Regular dental checkups",
    ],
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
    slug: "gum-treatment",
    title: "Gum Treatment",
    image: gumImg,
    shortDesc: "Healthy gums for a healthy smile.",
    description:
      "Gum treatment focuses on diagnosing, preventing, and treating gum disease to protect teeth and maintain oral health.",
    definition:
      "Gum treatment includes dental procedures used to treat gum inflammation, infection, bleeding, and periodontal disease.",
    causes: [
      "Plaque and tartar buildup",
      "Poor oral hygiene",
      "Smoking or tobacco use",
      "Diabetes",
      "Genetic tendency",
    ],
    whenRequired: [
      "Bleeding gums",
      "Swollen or red gums",
      "Bad breath",
      "Loose teeth",
      "Gum recession",
    ],
    benefits: [
      "Stops gum bleeding",
      "Controls infection",
      "Prevents tooth loss",
      "Improves gum health",
      "Freshens breath",
    ],
    procedure: [
      "Gum examination",
      "Scaling and root planing",
      "Deep cleaning if needed",
      "Medication if required",
      "Maintenance follow-up",
    ],
    precautions: [
      "Brush gently around gums",
      "Use floss or interdental brush",
      "Avoid tobacco",
      "Attend maintenance cleanings",
    ],
    prevention: [
      "Brush twice daily",
      "Floss daily",
      "Professional cleaning every 6 months",
      "Avoid smoking",
      "Control diabetes if applicable",
    ],
    faqs: [
      {
        question: "Why do my gums bleed?",
        answer:
          "Bleeding gums are commonly caused by plaque buildup and gum inflammation.",
      },
      {
        question: "Can gum disease be treated?",
        answer:
          "Yes. Early gum disease can be controlled effectively with professional care and good hygiene.",
      },
      {
        question: "Can gum disease cause tooth loss?",
        answer:
          "Advanced gum disease can loosen teeth if not treated on time.",
      },
    ],
  },

  {
    slug: "dental-veneers",
    title: "Dental Veneers",
    image: veneerImg,
    shortDesc: "Correct imperfections instantly.",
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
    prevention: [
      "Avoid habits that chip teeth",
      "Limit staining foods",
      "Brush and floss daily",
      "Regular dental checkups",
    ],
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
    slug: "tooth-extraction",
    title: "Tooth Extraction",
    image: extractionImg,
    shortDesc: "Safe and comfortable tooth removal.",
    description:
      "Tooth extraction is performed when a tooth is badly damaged, infected, impacted, or cannot be saved with other treatments.",
    definition:
      "Tooth extraction is the removal of a tooth from its socket when keeping it is no longer healthy or possible.",
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
    prevention: [
      "Treat cavities early",
      "Maintain gum health",
      "Regular dental checkups",
      "Protect teeth from injury",
      "Avoid delaying dental treatment",
    ],
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
];

export default servicesData;