# How to Add a New Formation

This guide explains how to add a new formation with its own landing page to the project.

## Overview

The project now uses a **configuration-based approach** for formations. All formation data is stored in `src/constants/formations.js`, making it easy to add, modify, or manage multiple formations.

## Architecture

- **`src/constants/formations.js`**: Central configuration file containing all formation data
- **`src/pages/FormationPageDynamic.jsx`**: Reusable component that renders any formation based on config
- **`src/pages/FormationPageWrapper.jsx`**: Wrapper that loads formation config from URL slug
- **`src/components/formation/FormationRegistrationForm.jsx`**: Registration form that accepts dynamic `formId` and `cohorts`

## Step-by-Step Guide

### Step 1: Add Formation Configuration

Open `src/constants/formations.js` and add a new formation object. Here's a template:

```javascript
export const formations = {
  // ... existing formations ...
  
  yourFormationId: {
    id: "your-formation-id",
    slug: "your-formation-slug",  // Used in URL: /formations/your-formation-slug
    route: "/formations/your-formation-slug",
    title: "عنوان التكوين الرئيسي",
    subtitle: "العنوان الفرعي أو الوصف القصير",
    description: "وصف التكوين",
    meta: {
      title: "عنوان الصفحة في المتصفح",
      description: "وصف SEO للصفحة",
    },
    formId: "YOUR_CRM_FORM_ID_HERE",  // ⚠️ IMPORTANT: Get this from your CRM
    pricing: {
      regular: "45.000",
      webscaleMember: "39.000",
      discount: "6.000",
      currency: "د.ج",
      taxNote: "HT",
    },
    consultant: {
      name: "اسم المستشار",
      title: "منصب المستشار",
      image: "/path/to/image.jpg",  // Path from public folder
      experience: "25+ سنة خبرة",
      description: "وصف المستشار",
      companies: [
        { logo: "/path/to/company1.jpg" },
        { logo: "/path/to/company2.jpg" },
        // ... more companies
      ],
      results: [
        "نتيجة 1",
        "نتيجة 2",
        // ... more results
      ],
      quote: "اقتباس من المستشار",
    },
    program: [
      {
        id: "section1",
        title: "عنوان القسم",
        items: [
          "عنصر 1",
          "عنصر 2",
          // ... more items
        ],
      },
      // ... more sections
    ],
    cohorts: [
      { value: "فوج 1", label: "فوج 1 - تاريخ", disabled: false },
      { value: "فوج 2", label: "فوج 2 - تاريخ (ممتلئ)", disabled: true },
      // ... more cohorts
    ],
    faq: [
      {
        question: "السؤال؟",
        answer: "الجواب",
      },
      // ... more FAQs
    ],
    problems: [
      "المشكلة 1",
      "المشكلة 2",
      // ... more problems
    ],
    solutions: [
      "الحل 1",
      "الحل 2",
      // ... more solutions
    ],
    benefits: [
      "الفائدة 1",
      "الفائدة 2",
      // ... more benefits
    ],
    targetAudience: [
      "الجمهور المستهدف 1",
      "الجمهور المستهدف 2",
      // ... more audiences
    ],
    maxParticipants: 14,
    duration: "3 أيام متتالية",
    schedule: "من 09:00 إلى 16:00",
    location: "مقر Webscale بالجزائر",
  },
};
```

### Step 2: Get Your CRM Form ID

1. Log into your CRM system (crmgo.abderrahime.com)
2. Create a new form or use an existing one
3. Copy the form ID (UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
4. Replace `YOUR_CRM_FORM_ID_HERE` in the configuration

### Step 3: Add Images

Place your images in the `public/` folder:
- Consultant image: `public/experts/your-consultant.jpg`
- Company logos: `public/formation/logos/company1.jpg`

Update the paths in your formation configuration.

### Step 4: Test Your Formation

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:5173/formations/your-formation-slug`
3. Verify all sections display correctly
4. Test the registration form submission

## Routes

- **Formations menu**: `/formations` → Shows menu with all available formations
- **Dynamic route**: `/formations/:slug` → Shows formation based on slug

Examples:
- `/formations` → Formations menu page
- `/formations/smq` → SMQ formation
- `/formations/comptabilite` → Comptabilité formation
- `/formations/your-formation-slug` → Your new formation

## Key Features

### ✅ What's Already Handled

- Responsive design (mobile & desktop)
- Dark mode support
- Registration form with validation
- FAQ accordion
- Pricing calculator (regular vs Webscale member)
- Consultant section with company logos
- Program sections with expand/collapse
- Contact section with social links
- SEO meta tags

### 🔧 What You Need to Customize

- Formation content (title, description, program, etc.)
- Images (consultant photo, company logos)
- CRM Form ID
- Cohorts (available dates)
- Pricing
- FAQ items

## Example: Adding a Digital Marketing Formation

```javascript
digitalMarketing: {
  id: "digital-marketing",
  slug: "digital-marketing",
  route: "/formations/digital-marketing",
  title: "تسويق رقمي متقدم",
  subtitle: "تعلم أحدث استراتيجيات التسويق الرقمي",
  description: "دورة شاملة في التسويق الرقمي للمسيرين",
  meta: {
    title: "تسويق رقمي متقدم - Webscale",
    description: "دورة شاملة في التسويق الرقمي",
  },
  formId: "your-form-id-here",
  pricing: {
    regular: "30.000",
    webscaleMember: "25.000",
    discount: "5.000",
    currency: "د.ج",
    taxNote: "HT",
  },
  consultant: {
    name: "أحمد محمد",
    title: "خبير في التسويق الرقمي",
    image: "/experts/ahmed.jpg",
    experience: "10+ سنة خبرة",
    description: "10 سنوات خبرة في التسويق الرقمي",
    companies: [
      { logo: "/formation/logos/company1.jpg" },
    ],
    results: [
      "زيادة المبيعات بـ 200%",
      "إدارة حملات بقيمة 5 مليون دج",
    ],
    quote: "التسويق الرقمي هو المستقبل",
  },
  program: [
    {
      id: "intro",
      title: "مقدمة في التسويق الرقمي",
      items: [
        "ما هو التسويق الرقمي؟",
        "أهمية التسويق الرقمي",
      ],
    },
  ],
  cohorts: [
    { value: "فوج 1", label: "فوج 1 - 15 جانفي", disabled: false },
  ],
  faq: [
    {
      question: "ما هي مدة الدورة؟",
      answer: "الدورة تستمر 3 أيام",
    },
  ],
  problems: [
    "عدم وجود استراتيجية تسويق رقمي",
  ],
  solutions: [
    "بناء استراتيجية تسويق رقمي فعالة",
  ],
  benefits: [
    "زيادة المبيعات",
    "تحسين الوصول للعملاء",
  ],
  targetAudience: [
    "المسيرين",
    "أصحاب المؤسسات",
  ],
  maxParticipants: 20,
  duration: "3 أيام",
  schedule: "من 09:00 إلى 17:00",
  location: "مقر Webscale بالجزائر",
},
```

## Troubleshooting

### Formation not showing?
- Check that the `slug` in the config matches the URL
- Verify the formation object is exported in `formations.js`
- Check browser console for errors

### Registration form not working?
- Verify the `formId` is correct
- Check that the form exists in your CRM
- Test the API endpoint: `https://crmgo.abderrahime.com/api/v1/public/forms/{formId}/submit`

### Images not loading?
- Ensure images are in the `public/` folder
- Use paths starting with `/` (e.g., `/experts/image.jpg`)
- Check file names match exactly (case-sensitive)

## Best Practices

1. **Use descriptive slugs**: `digital-marketing` is better than `dm`
2. **Keep content organized**: Use arrays for lists (problems, solutions, etc.)
3. **Test thoroughly**: Check all sections before going live
4. **Update cohorts regularly**: Mark full cohorts as `disabled: true`
5. **Optimize images**: Compress images before adding to `public/`

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all required fields are filled in the config
3. Compare with the existing `smq` formation as a reference
4. Check that routes are properly configured in `App.jsx`

## Summary

Adding a new formation is now as simple as:
1. ✅ Add configuration to `formations.js`
2. ✅ Get CRM form ID
3. ✅ Add images to `public/` folder
4. ✅ Test at `/formations/your-slug`

The system automatically handles routing, rendering, and form submission!

