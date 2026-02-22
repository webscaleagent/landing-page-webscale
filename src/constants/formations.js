// Formations Configuration
// This file contains all formation data that can be easily modified or extended

export const formations = {
  // Existing SMQ Formation
  smq: {
    id: "smq",
    slug: "smq",
    route: "/formations/smq",
    title: "دورة الادارة بالجودة",
    subtitle: "مع مستشار قضى أكثر من 25 سنة يصنع النتائج داخل Henkel، Nestlé، Danone، NCA، Renault Trucks…",
    description: "تكوين تطبيقي 100% للمسيرين الذين يريدون نتائج… وليس النظريات.",
    meta: {
      title: "قلّل الأخطاء، نظم مؤسستك - تكوين تطبيقي مع سليم بن عراب",
      description: "تكوين تطبيقي 100% للمسيرين الذين يريدون نتائج. مع مستشار قضى أكثر من 25 سنة يصنع النتائج داخل Henkel، Nestlé، Danone، NCA، Renault Trucks…",
    },
    formId: "9699183e-5d2b-4969-832b-9abf4dddea48", // CRM Form ID
    fallbackApiFields: [
      { id: "7687702e-ee6f-4f6d-942c-226b927625eb", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "اسم الشركة", type: "text", required: true, options: null, validation: {}, order: 1 },
      { id: "0ece5530-a070-461e-881b-488200397596", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "عدد الموظفين", type: "select", required: true, options: ["أقل من 5", "من 05 إلى 10 موظفين", "من 10 إلى 50 موظف", "من 50 موظف فما فوق"], validation: {}, order: 2 },
      { id: "3c1be377-ffe6-470d-a517-7646b881394e", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "الاسم واللقب", type: "text", required: true, options: null, validation: {}, order: 3 },
      { id: "877e4192-8768-4c3e-b37c-d4a59ba65d28", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "رقم الواتس آب", type: "phone", required: true, options: null, validation: { unique: true }, order: 4 },
      { id: "09bd10c2-57ca-463e-b93b-8e83d8875ee6", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "الايميل", type: "email", required: true, options: null, validation: { unique: true }, order: 5 },
      { id: "96b4f2e0-c7fa-44fa-b0a4-ee8a8463bebd", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "اختر الفوج", type: "select", required: false, options: ["فوج 13, 14, 15 ديسمبر", "فوج 27, 28, 29 ديسمبر", "الفوج الثالث - 10, 11, 12 جانفي", "الفوج الرابع - 13, 14, 15 جانفي", "الفوج الخامس - 17, 18, 19 جانفي", "الفوج السادس - 20, 21, 22 جانفي", "الفوج السابع - 31 جانفي 02 , 01 فيفري", "قائمة الإنتظار"], validation: {}, order: 6 },
      { id: "0cb047b4-17f9-4f92-b21d-ea663e28263a", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "الولاية", type: "select", required: false, options: ["أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة", "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "إن صالح", "إن قزام", "تقرت", "جانت", "المغير", "المنيعة", "أخرى"], validation: {}, order: 7 },
      { id: "84369a9b-1d94-4b9a-9410-758d14c30009", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "هل أنت عضو في Webscale؟", type: "radio", required: false, options: ["نعم", "لا"], validation: {}, order: 8 },
      { id: "6aa4aaf4-7e3b-4af5-b209-bf9ca16b6fb7", form_id: "9699183e-5d2b-4969-832b-9abf4dddea48", label: "المنصب الوظيفي", type: "select", required: false, options: ["رئيس الشركة", "مسير", "موظف"], validation: {}, order: 9 },
    ],
    fieldsConfig: {
      companyName: { required: true },
      employeeCount: { required: true },
      fullName: { required: true },
      phone: { required: true },
      email: { required: true },
      cohort: { required: false },
      state: { required: false },
      isWebscaleMember: { required: false },
      jobTitle: { required: false },
      legalForm: { hidden: true },
      companyEstablished: { hidden: true },
      businessSector: { hidden: true },
      managerExperienceDuration: { hidden: true },
      hasAttendedWebscaleTraining: { hidden: true },
    },
    pricing: {
      regular: "45.000",
      webscaleMember: "39.000",
      discount: "6.000",
      currency: "د.ج",
      taxNote: "HT",
    },
    consultant: {
      name: "سليم بن عراب",
      title: "مستشار في إدارة الجودة والعمليات",
      image: "/experts/benarab.png",
      experience: "25+ سنة خبرة",
      description: "25 سنة خبرة داخل شركات:",
      companies: [
        { logo: "/formation/logos/photo_2025-11-30_15-00-42.jpg" },
        { logo: "/formation/logos/photo_2025-11-30_15-01-00.jpg" },
        { logo: "/formation/logos/photo_2025-11-30_15-01-49.jpg" },
        { logo: "/formation/logos/photo_2025-11-30_15-01-55.jpg" },
        { logo: "/formation/logos/photo_2025-11-30_15-02-24.jpg" },
        { logo: "/formation/logos/photo_2025-11-30_15-23-31.jpg" },
      ],
      results: [
        "خفض الديون بـ 43%",
        "رفع هامش الربح بـ +42%",
        "قيادة فرق تصل إلى 580 موظف",
        "إدارة مداخيل تفوق 78 مليون يورو",
        "إعادة تشغيل وحدات إنتاج",
        "تحسين مؤشرات التوزيع والعمليات على مستوى 23 ولاية",
        "خبرة ISO (9001 / 18000 / 22000)",
      ],
      quote: "كل ما ستتعلّمه في هذا التكوين خرج من تجارب ميدانية حقيقية.",
    },
    program: [
      {
        id: "opening",
        title: "كلمة الافتتاح — Mot d'ouverture",
        items: [],
      },
      {
        id: "introduction",
        title: "مقدمة حول الموضوع — Introduction à la thématique",
        items: [
          "فهم المؤسسة — Comprendre l'Entreprise",
          "ملف المدير / صاحب المؤسسة — Profil du Chef d'entreprise",
          "ما هو نظام إدارة الجودة (SMQ)؟ — Qu'est-ce qu'un Système de Management de la Qualité (SMQ) ?",
          "التعريف، الأهداف، وأمثلة — Définition, Objectifs et exemples",
          "المكوّنات الأساسية — Composantes Clés",
          "المبادئ السبعة في نظام إدارة الجودة — Les 7 principes dans le système Management qualité",
          "المزايا السبعة لنظام إدارة الجودة — Les 7 Avantages du système Management qualité",
          "التحديات الشائعة وكيفية التغلب عليها — Les Défis Courants et Comment les Surmonter",
          "من هم الفاعلون داخل SMQ؟ — Qui sont les acteurs du SMQ ?",
          "أدوات مراقبة نظام إدارة الجودة — Outils pour surveiller un SMQ ?",
        ],
      },
      {
        id: "processes",
        title: "التفكير والعمل بمنطق العمليات — Raisonnez et travaillez en processus",
        items: [
          "ما هي العملية (Processus)؟ — Qu'est ce qu'un processus",
          "ما الفرق بين: عملية، إجراء، وبروسيس؟ — Quelle différence entre processus ; procédure ; process ?",
          "ما هي نمذجة العمليات؟ — Qu'est-ce que la modélisation des processus ?",
          "المؤسسة مرسومة في شكل عمليات — L'entreprise Cartographié en processus",
          "مخطط التدفقات — diagramme des flux",
        ],
      },
      {
        id: "process-types",
        title: "أنواع العمليات في جميع المؤسسات…؟ — Les types de processus dans toutes entreprises…?",
        items: [],
      },
      {
        id: "mapping",
        title: "خريطة المؤسسة من خلال العمليات… — Cartographie de l'Entreprise en processus …",
        items: [],
      },
      {
        id: "exercises",
        title: "تطبيقات وتمارين — Exercices et pratiques",
        items: [],
      },
      {
        id: "discussion",
        title: "نقاش وتبادل الآراء في مجال تسيير المؤسسات — Discussion et échange d'opinions dans le domaine de la gestion d'entreprise",
        items: [],
      },
      {
        id: "closing",
        title: "كلمة الختام — Mot de Clôture",
        items: [],
      },
    ],
    cohorts: [
      { value: "قائمة الإنتظار", label: "✅ قائمة الإنتظار - احصل على أولوية عند فتح مقاعد جديدة", disabled: false },
      { value: "فوج 13, 14, 15 ديسمبر", label: "فوج 13, 14, 15 ديسمبر (ممتلئ)", disabled: true },
      { value: "فوج 27, 28, 29 ديسمبر", label: "فوج 27, 28, 29 ديسمبر (ممتلئ)", disabled: true },
      { value: "الفوج الثالث - 10, 11, 12 جانفي", label: "الفوج الثالث - 10, 11, 12 جانفي (ممتلئ)", disabled: true },
      { value: "الفوج الرابع - 13, 14, 15 جانفي", label: "الفوج الرابع - 13, 14, 15 جانفي (ممتلئ)", disabled: true },
      { value: "الفوج الخامس - 17, 18, 19 جانفي", label: "الفوج الخامس - 17, 18, 19 جانفي (ممتلئ)", disabled: true },
      { value: "الفوج السادس - 20, 21, 22 جانفي", label: "الفوج السادس - 20, 21, 22 جانفي (ممتلئ)", disabled: true },
      { value: "الفوج السابع - 31 جانفي 02 , 01 فيفري", label: "الفوج السابع - 31 جانفي 02 , 01 فيفري (ممتلئ)", disabled: true },
    ],
    faq: [
      {
        question: "كيف يمكنني التسجيل في الدورة؟",
        answer: "يمكنك التسجيل بسهولة من خلال النقر على زر \"سجل الآن\" وملء النموذج. الأماكن محدودة (20 مشارك فقط)، لذا ننصح بالتسجيل المبكر.",
      },
      {
        question: "ما هو الفرق بين السعر العام وسعر أعضاء Webscale؟",
        answer: "السعر العام للدورة هو 45.000 دج HT، بينما يحصل أعضاء مجتمع Webscale على خصم خاص بقيمة 6000 دج HT.",
      },
      {
        question: "ما الذي أحتاجه لحضور الدورة؟",
        answer: "الدورة حضورية في مقر Webscale بالجزائر. تحتاج فقط إلى الحضور في الوقت المحدد (من 09:00 إلى 16:00) لمدة 3 أيام متتالية. سيتم توفير جميع المواد التعليمية اللازمة.",
      },
      {
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "نقبل الدفع عبر البطاقات الائتمانية، التحويل البنكي، والدفع الإلكتروني. يمكنك التواصل معنا لمعرفة التفاصيل.",
      },
      {
        question: "هل الدورة مناسبة للمبتدئين؟",
        answer: "نعم، الدورة موجهة للمديرين والمسيرين في مختلف المستويات. يبدأ البرنامج من الأساسيات ويتدرج إلى التطبيق العملي، مما يجعلها مناسبة للجميع.",
      },
    ],
    problems: [
      "أخطاء متكررة وضياع وقت",
      "نقص التنسيق بين الفرق",
      "قرارات يومية بلا بيانات",
      "ضغط دائم على المدير لمتابعة كل شيء",
    ],
    solutions: [
      "تشخيص أصل المشاكل داخل مؤسستك",
      "تقليل الأخطاء التشغيلية وتحسين الانضباط",
      "بناء نظام جودة عملي وبسيط",
      "تنظيم العمل داخل الفرق",
      "استخدام أدوات فعلية للشركات الكبرى",
      "اتخاذ قرارات دقيقة اعتمادًا على البيانات",
    ],
    benefits: [
      "طريقة واضحة لقراءة مؤسستك وتشخيص أصل المشاكل",
      "تقليل الأخطاء التشغيلية وتحسين الانضباط",
      "بناء نظام جودة بسيط وعملي",
      "ضبط العمليات لتنظيم العمل داخل الفرق",
      "اعتماد أدوات تُستخدم فعليًا في المؤسسات الكبرى",
      "القدرة على اتخاذ قرارات دقيقة اعتمادًا على العمليات والبيانات",
      "إنهاء \"إطفاء الحرائق اليومية\"",
    ],
    targetAudience: [
      "تقليل الأخطاء اليومية",
      "تنظيم العمل داخل شركتك",
      "فهم العمليات بدل الاعتماد على الحدس",
      "بناء نظام يشتغل حتى لو تغيّر الموظفون",
      "تحسين الأداء بدون رفع التكاليف",
    ],
    maxParticipants: 20,
    duration: "3 أيام متتالية",
    schedule: "من 09:00 إلى 16:00",
    location: "مقر Webscale بالجزائر",
  },

  // Comptabilité pour non Comptable Formation
  comptabilite: {
    id: "comptabilite",
    slug: "comptabilite",
    route: "/formations/comptabilite",
    title: "المحاسبة لغير المحاسبين",
    subtitle: "مع السيد فريد مقران -تكوين شامل في مفهوم المحاسبة المالية مع اساسيات التحليل المالي",
    description: "تعلم لغة المحاسبة، قراءة القوائم المالية، والتحليل المالي لاتخاذ قرارات مالية مدروسة",
    meta: {
      title: "المحاسبة لغير المحاسبين - تكوين مع مقران فريد | Webscale",
      description: "تكوين شامل في أساسيات المحاسبة المالية للمديرين وكل من يريد فهم لغة المحاسبة وقراءة القوائم المالي مع السيد فريد مقران -",
    },
    formId: "a53dae24-f5ac-4457-91f5-4011d74e5a0e",
    fieldsConfig: {
      // Field order 1: اسم الشركة (Company Name)
      companyName: { 
        required: true,
        label: "اسم الشركة",
        type: "text",
        order: 1
      },
      // Field order 2: عدد الموظفين (Employee Count)
      employeeCount: { 
        required: true,
        label: "عدد الموظفين",
        type: "select",
        order: 2,
        options: [
          "أقل من 5",
          "من 05 إلى 10 موظفين",
          "من 10 إلى 50 موظف",
          "من 50 موظف فما فوق"
        ]
      },
      // Field order 2: ما هو الشكل القانوني لشركتك؟ (Legal Form)
      legalForm: { 
        required: true,
        label: "ما هو الشكل القانوني لشركتك؟",
        type: "select",
        order: 2,
        allow_custom_input: true,
        custom_input_label: "أخرى..",
        options: [
          "مؤسسة فردية",
          "شركة ذات مسؤولية محدودة (SARL)",
          "شركة مساهمة (SPA)",
          "شركة تضامن",
          "تعاونية",
          "شركة ناشئة (Startup)"
        ]
      },
      // Field order 2: ما هو مجال نشاط شركتك؟ (Business Sector)
      businessSector: { 
        required: true,
        label: "ما هو مجال نشاط شركتك؟",
        type: "select",
        order: 2,
        allow_custom_input: true,
        custom_input_label: "أخرى (يرجى التحديد)",
        options: [
          "خدمات",
          "تجارة (جملة / تجزئة)",
          "صناعة / إنتاج",
          "فلاحية / زراعية",
          "تكنولوجيا / شركة رقمية",
          "مقاولات / أشغال عمومية",
          "تعليم وتكوين",
          "صحة",
          "سياحة"
        ]
      },
      // Field order 2: منذ متى تأسست شركتك؟ (Company Established)
      companyEstablished: { 
        required: true,
        label: "منذ متى تأسست شركتك؟",
        type: "select",
        order: 2,
        options: [
          "أقل من سنة",
          "من 1 إلى 3 سنوات",
          "من 3 إلى 5 سنوات",
          "أكثر من 5 سنوات."
        ]
      },
      // Field order 3: الاسم واللقب (Full Name)
      fullName: { 
        required: true,
        label: "الاسم واللقب",
        type: "text",
        order: 3
      },
      // Field order 4: رقم الواتس آب (Phone)
      phone: { 
        required: true,
        label: "رقم الواتس آب",
        type: "phone",
        order: 4,
        validation: { unique: true }
      },
      // Field order 5: الايميل (Email)
      email: { 
        required: true,
        label: "الايميل",
        type: "email",
        order: 5,
        validation: { unique: true }
      },
      // Field order 6: اختر الفوج (Cohort)
      cohort: { 
        required: false,
        label: "اختر الفوج",
        type: "select",
        order: 6
      },
      // Field order 7: الولاية (State)
      state: { 
        required: false,
        label: "الولاية",
        type: "select",
        order: 7
      },
      // Field order 8: هل أنت عضو في Webscale؟ (Is Webscale Member)
      isWebscaleMember: { 
        required: true,
        label: "هل أنت عضو في Webscale؟",
        type: "radio",
        order: 8,
        options: ["نعم", "لا"]
      },
      // Field order 9: المنصب الوظيفي (Job Title)
      jobTitle: { 
        required: true,
        label: "المنصب الوظيفي",
        type: "select",
        order: 9,
        options: [
          "رئيس الشركة",
          "مسير",
          "موظف",
          "مدير قسم التسويق",
          "مدير قسم المبيعات"
        ]
      },
      // Hidden field: Manager Experience Duration (not in schema)
      managerExperienceDuration: { hidden: true },
      // Hidden field: Has Attended Webscale Training (not in schema for comptabilite)
      hasAttendedWebscaleTraining: { hidden: true }
    },
    pricing: {
      regular: "45.000",
      webscaleMember: "39.000",
      discount: "6.000",
      currency: "د.ج",
      taxNote: "HT",
    },
    consultant: {
      name: "مقران فريد",
      title: "مختص في المحاسبة و المالية",
      image: "/experts/mokrane_farid.jpeg",
      experience: " مختص في المحاسبة و المالية",
      description: "",
      companies: [
        { logo: "/formation/logos/WhatsApp Image 2026-01-27 at 12.26.07 PM (1).jpeg" },
        { logo: "/formation/logos/WhatsApp Image 2026-01-27 at 12.26.07 PM (2).jpeg" },
        { logo: "/formation/logos/WhatsApp Image 2026-01-27 at 12.26.07 PM.jpeg" },
        { logo: "/formation/logos/WhatsApp Image 2026-01-27 at 12.26.08 PM.jpeg" },
      ],
      results: [
        "خبرة واسعة في المحاسبة المالية",
        "تدريب المديرين على قراءة القوائم المالية",
        "مساعدة المؤسسات في فهم المعلومات المالية",
      ],
      quote: "فهم المحاسبة هو أساس اتخاذ القرارات المالية الصحيحة",
    },
    program: [
      {
        id: "objectifs-generaux",
        title: "أهداف التكوين",
        items: [
          "تعلم لغة المحاسبة وإدارة الحوار المالي",
          "قراءة وتفسير القوائم المالية",
          "استخدام المعلومات المحاسبية كأداة مساعدة في اتخاذ القرار",
          "إجراء مقارنات دورية وتقييم تطور الكيان",
          "أساسيات التحليل المالي، أداة التحليل والتنبؤ",
        ],
      },
      {
        id: "axes-principaux",
        title: "المحاور الرئيسية",
        items: [
          "فهم المصطلحات والأساسيات المحاسبية والمالية للمؤسسة",
          "تمييز أدوار المحاسبة والمالية",
          "عرض الواقعة المالية في المؤسسة",
          "فهم الكتل الكبيرة في الميزانية",
          "الدورات الثلاثة للنشاط المالي: الاستغلال، الاستثمار، التمويل",
          "مصادر تمويل الاستثمارات ومفهوم رأس المال العامل (FR)",
          "الحاجة إلى رأس المال العامل (BFR) وتكوين الخزينة",
        ],
      },
      {
        id: "jour1-matin",
        title: "المقدمة",
        items: [
          "تعريف المحاسبة والتدفقات التي تمس الكيان",
          "تعريف الإطار التنظيمي والمفاهيمي لنظام المحاسبة المالية (SCF)",
          "الإطار التنظيمي والمفاهيمي للمحاسبة المالية (SCF)",
          "التدفقات والتسجيل",
        ],
      },
      {
        id: "jour1-apres-midi",
        title: "التنظيم المحاسبي وتصنيف الحسابات",
        items: [
          "فهم عمل وترميز الحسابات",
          "التنظيم المحاسبي",
          "تصنيف الحسابات (Nomenclature des comptes)",
        ],
      },
      {
        id: "jour2-matin",
        title: "القوائم المالية والدفاتر المحاسبية",
        items: [
          "تعريف وفهم التقاطعات بين القوائم المالية",
          "الدفاتر المحاسبية",
          "العلاقة بين القوائم المالية والدفاتر المحاسبية",
        ],
      },
      {
        id: "jour2-apres-midi",
        title: "المبادئ المحاسبية",
        items: [
          "فهم المبادئ المحاسبية",
          "تطبيقات المبادئ المحاسبية",
        ],
      },
      {
        id: "jour3-matin",
        title: "أساسيات التحليل المالي",
        items: [
          "فهم أساسيات التحليل المالي",
          "المقاربات: الميزانية الوظيفية",
          "الميزانية المالية (Bilan patrimonial)",
        ],
      },
      {
        id: "jour3-apres-midi",
        title: "رأس المال العامل والحاجة إلى رأس المال العامل",
        items: [
          "رأس المال العامل (Fonds de Roulement - FR)",
          "الحاجة إلى رأس المال العامل (Besoin en Fonds de Roulement - BFR)",
          "الخزينة (Trésorerie)",
          "الخلاصات ونهاية التكوين",
        ],
      },
    ],
    cohorts: [
      { value: "فوج 7, 8, 9 فيفري", label: "فوج 7, 8, 9 فيفري (ممتلئ)", disabled: true },
      { value: "قائمة الانتظار", label: "قائمة الانتظار", disabled: false },
    ],
    faq: [
      {
        question: "لمن هذا التكوين؟",
        answer: "هذا التكوين موجه لإطارات الشركات والمؤسسات، المهنيين الراغبين في اكتساب أساسيات قوية في المحاسبة المالية، والمديرين والأشخاص الذين لا يملكون تكوينًا أوليًا في المحاسبة.",
      },
      {
        question: "ما هي مدة التكوين؟",
        answer: "التكوين يستمر 3 أيام في مقر Webscale بالجزائر.",
      },
      {
        question: "ما هي أهداف هذا التكوين؟",
        answer: "تعلم لغة المحاسبة وإدارة الحوار المالي، قراءة وتفسير القوائم المالية، استخدام المعلومات المحاسبية كأداة مساعدة في اتخاذ القرار، إجراء مقارنات دورية وتقييم تطور الكيان، وفهم أساسيات التحليل المالي كأداة للتحليل والتنبؤ.",
      },
      {
        question: "هل أحتاج إلى معرفة مسبقة في المحاسبة؟",
        answer: "لا، هذا التكوين مصمم خصيصًا للأشخاص الذين لا يملكون تكوينًا أوليًا في المحاسبة. سيبدأ من الأساسيات.",
      },
      {
        question: "ما الذي سأتعلمه في نهاية التكوين؟",
        answer: "ستتمكن من فهم لغة المحاسبة، قراءة وتفسير القوائم المالية والدفاتر المحاسبية، فهم المبادئ المحاسبية وتطبيقاتها، معرفة التنظيم المحاسبي وتصنيف الحسابات، فهم أساسيات التحليل المالي والميزانية الوظيفية، وحساب رأس المال العامل والحاجة إلى رأس المال العامل والخزينة.",
      },
    ],
    problems: [
      "عدم فهم لغة المحاسبة والبيانات المالية",
      "صعوبة قراءة وتفسير القوائم المالية",
      "عدم القدرة على استخدام المعلومات المالية في اتخاذ القرارات",
      "عدم فهم تطور المؤسسة من الناحية المالية",
    ],
    solutions: [
      "تعلم لغة المحاسبة وإدارة الحوار المالي بثقة",
      "قراءة وتفسير القوائم المالية (الميزانية وقائمة الدخل)",
      "استخدام المعلومات المحاسبية كأداة مساعدة في اتخاذ القرار",
      "إجراء مقارنات دورية وتقييم تطور الكيان",
      "فهم المبادئ المحاسبية الأساسية وتطبيقاتها",
      "معرفة كيفية تنظيم النظام المحاسبي وتصنيف الحسابات",
      "فهم أساسيات التحليل المالي والميزانية الوظيفية",
      "حساب رأس المال العامل والحاجة إلى رأس المال العامل والخزينة",
    ],
    benefits: [
      "فهم لغة المحاسبة وإدارة الحوار المالي بثقة",
      "قراءة وتفسير القوائم المالية والدفاتر المحاسبية",
      "استخدام المعلومات المحاسبية في اتخاذ القرار",
      "فهم المبادئ المحاسبية وتطبيقاتها العملية",
      "أساسيات التحليل المالي وإدارة رأس المال العامل",
    ],
    targetAudience: [
      "إطارات الشركات والمؤسسات",
      "المهنيون الراغبون في اكتساب أساسيات قوية في المحاسبة المالية",
      "المديرين الذين يريدون فهم اللغة المالية",
      "الأشخاص الذين لا يملكون تكوينًا أوليًا في المحاسبة",
      "كل من يرغب في فهم القوائم المالية والتحليل المالي",
      "المسيرين الذين يحتاجون لاتخاذ قرارات مالية مدروسة",
    ],
    maxParticipants: 20,
    duration: "3 أيام",
    schedule: "من 09:00 إلى 16:00",
    location: "مقر Webscale بالجزائر",
  },

  // Promotion Days Formation
  promotionDays: {
    id: "promotion-days",
    slug: "promotion-days",
    route: "/formations/promotion-days",
    title: "PROMOTION DAYS",
    subtitle: "في يومين، اصنع نقلة نوعية في الترويج لشركتك",
    description: "دورة تدريبية شاملة في الترويج وبناء العلامات التجارية مع الدكتور عبد الرحيم عبد اللاوي",
    meta: {
      title: "PROMOTION DAYS - دورة الترويج الاستراتيجي | Webscale",
      description: "في يومين، اصنع نقلة نوعية في الترويج لشركتك. دورة تدريبية مع الدكتور عبد الرحيم عبد اللاوي، مستشار في الترويج وبناء العلامات التجارية.",
    },
    formId: "8129a431-0fc1-42b2-9a62-1faf034d7fae", // Promotion Days form ID
    // Form fields configuration matching CRM schema
    fieldsConfig: {
      companyName: { required: true, label: "اسم الشركة" },
      employeeCount: { required: true, label: "عدد الموظفين" },
      legalForm: { required: true, label: "ما هو الشكل القانوني لشركتك؟" },
      businessSector: { required: true, label: "ما هو مجال نشاط شركتك؟" },
      companyEstablished: { required: true, label: "منذ متى تأسست شركتك؟" },
      fullName: { required: true, label: "الاسم واللقب" },
      phone: { required: true, label: "رقم الواتس آب" },
      email: { required: true, label: "الايميل" },
      cohort: { required: false, label: "اختر الفوج" }, // Optional according to schema
      state: { required: false, label: "الولاية" },
      isWebscaleMember: { required: true, label: "هل أنت عضو في Webscale؟" }, // Required according to schema
      jobTitle: { required: true, label: "المنصب الوظيفي" },
      hasAttendedWebscaleTraining: { required: true, label: "هل سبق لك حضور دورة تدريبية في Webscale؟" },
    },
    pricing: {
      regular: "40.000",
      webscaleMember: "37.000",
      returningParticipant: "35.000",
      currency: "د.ج",
      taxNote: "HT",
      notes: [
        "السعر تع الدورة تعي 40000 HT لغير الاعضاء",
        "الاعضاء تع واب سكايل ولم يحضر اي دورة من قبل 37000 دج",
        "لمن حضر معنا الدورات سابقا 35000 دج"
      ]
    },
    consultant: {
      name: "عبد الرحيم عبد اللاوي",
      title: "مستشار في الترويج وبناء العلامات التجارية",
      image: "/experts/abderrahim.png",
      experience: "",
      description: "المؤسس والمدير التنفيذي لـ Webscale. أحد صناع المحتوى الاقتصادي الاحترافي في الجزائر وشمال إفريقيا",
      companies: [
        { logo: "/promotionsbrands/hanooty.jpg" },
        { logo: "/promotionsbrands/mourin.jpg" },
        { logo: "/promotionsbrands/yinvesti.jpg" },
      ],
      results: [
        "مؤسس ومدير تنفيذي لـ Webscale",
        "صانع محتوى اقتصادي احترافي في الجزائر وشمال إفريقيا",
        "مختص في الترويج وبناء العلامات التجارية",
      ],
      quote: "في يومين، اصنع نقلة نوعية في الترويج لشركتك",
    },
    program: [
      {
        id: "identity",
        title: "من انت وماذا تريد ؟ لماذا انت وليس غيرك",
        items: [],
      },
      {
        id: "buyer-persona",
        title: "شخصية العميل Buyer Persona",
        items: [
          "تعلّم كيف تبني شخصية عميل انطلاقًا من البيانات",
          "فهم الاحتياجات، الآلام، والدوافع الشرائية",
          "ربط الرسالة التسويقية بسلوك العميل الحقيقي",
        ],
      },
      {
        id: "brand-archetypes",
        title: "نماذج الشخصيات التسويقية (Archetypes Brand)",
        items: [
          "كيفية اختيار النموذج المناسب للعلامة التجارية",
          "توحيد الخطاب التسويقي والعاطفي مع الجمهور",
        ],
      },
      {
        id: "sostac",
        title: "نموذج التخطيط الاستراتيجي SOSTAC",
        items: [
          "Situation Analysis - تحليل الوضع",
          "Objectives (SMART Goals) - الأهداف الذكية",
          "Strategy (Segmentation – Targeting – Positioning) - الاستراتيجية",
          "Tactics: اختيار القنوات والأدوات التسويقية المناسبة",
          "Action: تحديد من سينفذ، متى، وكيف",
          "Control: قياس الأداء، تحليل النتائج، وتعديل المسار",
        ],
      },
      {
        id: "financial-metrics",
        title: "مؤشرات الأداء المالية",
        items: [
          "CAC (تكلفة اكتساب العميل)",
          "LTV (القيمة العمرية للعميل)",
          "كيفية استخدام الأرقام في اتخاذ القرار",
        ],
      },
      {
        id: "budget",
        title: "حساب الميزانية التسويقية",
        items: [
          "كيفية تحديد الميزانية المناسبة حسب حجم المشروع",
          "الفرق بين الميزانية الثابتة (Fix) والمتغيرة (Variable)",
          "توزيع الميزانية حسب القنوات والأهداف",
        ],
      },
      {
        id: "team",
        title: "بناء فريق التسويق، فهم الأدوار",
        items: [
          "CMO - مدير التسويق",
          "Brand content creator - منشئ محتوى العلامة التجارية",
          "Media buyer - مشتري الإعلانات",
          "Community manager - مدير المجتمع",
        ],
      },
      {
        id: "crm",
        title: "CRM وإدارة العلاقة مع العملاء",
        items: [
          "أهمية أنظمة CRM في الترويج والمتابعة",
          "ربط التسويق بالمبيعات",
          "تتبع العملاء وتحسين التجربة",
        ],
      },
      {
        id: "kpi",
        title: "KPI وقياس الأداء",
        items: [
          "اختيار مؤشرات الأداء المناسبة",
          "قراءة الأرقام بذكاء",
          "تحسين النتائج بناءً على البيانات",
        ],
      },
      {
        id: "advertising-strategies",
        title: "اختيار الاستراتيجيات الإعلانية المناسبة",
        items: [
          "التسويق بالمحتوى",
          "أنواع المحتوى",
          "بناء خطة محتوى فعّالة",
          "الربط بين المحتوى والتحويل (Conversion)",
        ],
      },
      {
        id: "case-study",
        title: "دراسة حالة تطبيقية",
        items: [
          "ربط كل المحاور السابقة بالتطبيق العملي",
          "استخلاص الدروس والأخطاء الشائعة",
        ],
      },
    ],
    cohorts: [
      { value: "فوج 15 ، 16 فيفري", label: "فوج 15 ، 16 فيفري (ممتلئ)", disabled: true },
      { value: "قائمة الانتظار", label: "قائمة الانتظار", disabled: false },
    ],
    faq: [
      {
        question: "لمن هذه الدورة؟",
        answer: "هذه الدورة موجهة لمسيرو المؤسسات وأصحاب الشركات، رواد الأعمال، مدراء التسويق، أصحاب المشاريع الصغيرة والمتوسطة، وكل من يعاني من ضعف الترويج رغم جودة المنتج أو الخدمة.",
      },
      {
        question: "ما هي مدة الدورة؟",
        answer: "الدورة تستمر يومان تدريبيان (02 أيام) حضورية في مقر Webscale بالجزائر.",
      },
      {
        question: "ما هي أهداف الدورة؟",
        answer: "تهدف الدورة إلى تمكين المشاركين من معرفة كيفية تحديد الميزانية التسويقية المناسبة، اتخاذ القرار التسويقي الصحيح في الوقت المناسب، فهم كيفية الترويج بذكاء حسب مرحلة المشروع، وتعلم كيفية تحديد هوية المشروع وطريقة التواصل الخاصة به مع السوق.",
      },
      {
        question: "ما الذي سأتعلمه في نهاية الدورة؟",
        answer: "ستتمكن من امتلاك رؤية واضحة حول هوية مشروعك، فهم كيفية تحليل السوق واتخاذ قرارات مبنية على معطيات واقعية، بناء شخصية العميل (Buyer Persona)، استخدام نموذج SOSTAC لبناء خطة تسويق متكاملة، وحساب مؤشرات الأداء المالية مثل CAC و LTV.",
      },
      {
        question: "هل أحتاج إلى معرفة مسبقة في التسويق؟",
        answer: "لا، الدورة مصممة لتناسب جميع المستويات. ستبدأ من الأساسيات وتتدرج إلى التطبيق العملي المتقدم.",
      },
    ],
    problems: [
      "عدم وضوح هوية المشروع وما الذي يميّزه عن غيره",
      "الترويج دون فهم حقيقي للعميل المستهدف",
      "اتخاذ قرارات تسويقية مبنية على الحدس لا على التحليل",
      "غياب خطة تسويق واضحة تربط بين الهدف، التنفيذ، والقياس",
      "صرف ميزانية تسويقية دون معرفة العائد أو تكلفة اكتساب العميل",
      "صعوبة اختيار القنوات والاستراتيجيات المناسبة",
      "ضعف المتابعة وغياب مؤشرات قياس الأداء",
      "عدم وضوح الأدوار داخل فريق التسويق أو غياب الهيكلة",
    ],
    solutions: [
      "معرفة كيف يحددون الميزانية التسويقية المناسبة لمشروعهم دون تبذير أو عشوائية",
      "اكتساب القدرة على اتخاذ القرار التسويقي الصحيح في الوقت المناسب: متى نطلق حملة إعلانات ممولة؟ متى نعتمد على التسويق بالمحتوى؟ متى نتعاقد مع مؤثر؟ ومتى نوقف حملة لا تعطي نتائج؟",
      "فهم كيف نروّج بذكاء حسب مرحلة المشروع (بداية – نمو – استقرار)",
      "تعلّم كيفية تحديد هوية المشروع وطريقة التواصل الخاصة به مع السوق، بلغة يفهمها العميل ويثق بها",
      "التمييز بين ما هو ترويج فعّال وما هو مجرّد إنفاق بلا عائد",
      "تعلّم كيفية اختيار القنوات التسويقية المناسبة بدل التواجد في كل مكان دون نتائج",
      "القدرة على تقييم أداء الحملات التسويقية ومعرفة إن كانت ناجحة أو تحتاج تعديل",
      "فهم كيف نحسب تكلفة اكتساب العميل وهل الجهد المبذول مربح فعلاً أم لا",
      "اكتساب نظرة شاملة تسمح للمسير بـ: توجيه فريق التسويق أو التعامل بوعي مع الوكالات والمسوقين دون الاعتماد الأعمى على الآراء",
    ],
    benefits: [
      "امتلاك رؤية واضحة حول هوية مشروعك (من نحن؟ ماذا نريد؟ ولماذا يختارنا العميل؟)",
      "فهم كيفية تحليل السوق والوضع الحالي واتخاذ قرارات مبنية على معطيات واقعية",
      "تعلّم كيفية بناء شخصية العميل (Buyer Persona) خطوة بخطوة",
      "استيعاب نماذج Brand Archetypes واختيار الشخصية الأنسب للعلامة التجارية",
      "القدرة على استخدام نموذج SOSTAC لبناء خطة تسويق متكاملة ومنهجية",
      "صياغة أهداف تسويقية SMART قابلة للقياس والمتابعة",
      "فهم كيفية حساب الميزانية التسويقية وتوزيعها بين الميزانية الثابتة والمتغيرة",
      "الإلمام بمؤشرات الأداء الأساسية (CAC, LTV, KPI) واستخدامها في تقييم الأداء",
      "فهم أسس بناء فريق تسويق فعّال وتحديد الأدوار والمسؤوليات بوضوح",
      "إدراك أهمية أنظمة CRM في تحسين الترويج وإدارة العلاقة مع العملاء",
      "تطوير القدرة على قراءة النتائج، تصحيح المسار، وتحسين الأداء بشكل مستمر",
    ],
    targetAudience: [
      "مسيرو المؤسسات وأصحاب الشركات",
      "مدراء التسويق ورواد الأعمال",
      "أصحاب المشاريع الصغيرة والمتوسطة",
      "كل من يعاني من ضعف الترويج رغم جودة المنتج أو الخدمة",
    ],
    maxParticipants: 20,
    duration: "يومان تدريبيان (02 أيام)",
    schedule: "من 09:00 إلى 16:00",
    location: "مقر Webscale بالجزائر",
    methodology: [
      "تحليل واقعي لحالات حقيقية",
      "أمثلة تطبيقية",
      "نماذج وقوالب جاهزة",
      "ورشات تفكير وتمرين عملي",
      "نقاش مباشر مع المتدربين",
    ],
  },

  // ============================================
  // TEMPLATE: Add Your New Formation Here
  // ============================================
  // Copy this template, uncomment it, and fill in your information
  // Then access it at: /formations/your-formation-slug

  // yourFormationName: {
  //   id: "your-formation-id",                    // Unique ID (e.g., "digital-marketing")
  //   slug: "your-formation-slug",                // URL slug (e.g., "digital-marketing")
  //   route: "/formations/your-formation-slug",   // Full route path
  //   title: "عنوان التكوين الرئيسي",              // Main title (shown in hero)
  //   subtitle: "العنوان الفرعي",                 // Subtitle (shown in hero)
  //   description: "وصف قصير للتكوين",             // Short description
  //   meta: {
  //     title: "عنوان الصفحة في المتصفح",           // Browser tab title
  //     description: "وصف SEO للصفحة",             // SEO description
  //   },
  //   formId: "YOUR_CRM_FORM_ID_HERE",            // ⚠️ Get from CRM (UUID format)
  //   pricing: {
  //     regular: "45.000",                         // Regular price
  //     webscaleMember: "39.000",                 // Webscale member price
  //     discount: "6.000",                          // Discount amount
  //     currency: "د.ج",                           // Currency
  //     taxNote: "HT",                             // Tax note
  //   },
  //   consultant: {
  //     name: "اسم المستشار",
  //     title: "منصب المستشار",
  //     image: "/experts/consultant-photo.jpg",    // Path from public folder
  //     experience: "10+ سنة خبرة",
  //     description: "وصف المستشار",
  //     companies: [                                // Company logos
  //       { logo: "/formation/logos/company1.jpg" },
  //       { logo: "/formation/logos/company2.jpg" },
  //     ],
  //     results: [                                  // Consultant achievements
  //       "نتيجة 1",
  //       "نتيجة 2",
  //     ],
  //     quote: "اقتباس من المستشار",
  //   },
  //   program: [                                    // Training program sections
  //     {
  //       id: "section1",
  //       title: "عنوان القسم",
  //       items: [                                  // Items in this section
  //         "عنصر 1",
  //         "عنصر 2",
  //       ],
  //     },
  //     {
  //       id: "section2",
  //       title: "قسم آخر",
  //       items: [],
  //     },
  //   ],
  //   cohorts: [                                    // Available cohorts/dates
  //     { value: "فوج 1", label: "فوج 1 - 15 جانفي", disabled: false },
  //     { value: "فوج 2", label: "فوج 2 - 20 جانفي (ممتلئ)", disabled: true },
  //   ],
  //   faq: [                                        // Frequently asked questions
  //     {
  //       question: "السؤال الأول؟",
  //       answer: "الجواب على السؤال الأول",
  //     },
  //     {
  //       question: "السؤال الثاني؟",
  //       answer: "الجواب على السؤال الثاني",
  //     },
  //   ],
  //   problems: [                                   // Problems this solves
  //     "المشكلة 1",
  //     "المشكلة 2",
  //   ],
  //   solutions: [                                  // Solutions provided
  //     "الحل 1",
  //     "الحل 2",
  //   ],
  //   benefits: [                                  // Benefits after training
  //     "الفائدة 1",
  //     "الفائدة 2",
  //   ],
  //   targetAudience: [                            // Who is this for
  //     "الجمهور المستهدف 1",
  //     "الجمهور المستهدف 2",
  //   ],
  //   maxParticipants: 14,                         // Maximum participants
  //   duration: "3 أيام متتالية",                  // Duration
  //   schedule: "من 09:00 إلى 16:00",              // Schedule
  //   location: "مقر Webscale بالجزائر",           // Location
  // },
};

// Helper function to get formation by slug
export const getFormationBySlug = (slug) => {
  return Object.values(formations).find((formation) => formation.slug === slug) || formations.smq;
};

// Helper function to get formation by route
export const getFormationByRoute = (route) => {
  return Object.values(formations).find((formation) => formation.route === route) || formations.smq;
};

// Export all formation IDs for easy reference
export const formationIds = Object.keys(formations);

