# 🚀 Quick Start: Add Your New Formation Landing Page

## Step 1: Open the Configuration File

Open: `src/constants/formations.js`

## Step 2: Add Your Formation

1. Find the template at the bottom of the `formations` object (after the `smq` formation)
2. Copy the entire template (the commented section starting with `// yourFormationName:`)
3. Uncomment it (remove the `//` at the start of each line)
4. Replace `yourFormationName` with your actual formation name (e.g., `digitalMarketing`)
5. Fill in all the fields with your information

## Step 3: Required Information

### Must Have:
- ✅ **formId**: Get this from your CRM system (UUID format like: `9699183e-5d2b-4969-832b-9abf4dddea48`)
- ✅ **slug**: URL-friendly name (e.g., `digital-marketing`)
- ✅ **title**: Main title of your formation
- ✅ **consultant.image**: Path to consultant photo (put image in `public/experts/`)

### Important Fields:
- `id` and `slug` should match (e.g., both `"digital-marketing"`)
- `route` should be `/formation/your-slug`
- `formId` must be a valid UUID from your CRM

## Step 4: Add Images

1. Put consultant photo in: `public/experts/your-consultant.jpg`
2. Put company logos in: `public/formation/logos/company1.jpg`
3. Update paths in the config (e.g., `"/experts/your-consultant.jpg"`)

## Step 5: Test It

1. Save the file
2. The dev server should auto-reload
3. Visit: `http://localhost:5173/formation/your-slug`

## Example: Adding "Digital Marketing" Formation

```javascript
// In formations.js, add this:
digitalMarketing: {
  id: "digital-marketing",
  slug: "digital-marketing",
  route: "/formation/digital-marketing",
  title: "تسويق رقمي متقدم",
  subtitle: "تعلم أحدث استراتيجيات التسويق الرقمي",
  description: "دورة شاملة في التسويق الرقمي",
  meta: {
    title: "تسويق رقمي متقدم - Webscale",
    description: "دورة شاملة في التسويق الرقمي",
  },
  formId: "your-crm-form-id-here",  // ⚠️ Replace with real ID
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
    image: "/experts/ahmed.jpg",  // Put image in public/experts/
    experience: "10+ سنة خبرة",
    description: "10 سنوات خبرة في التسويق الرقمي",
    companies: [
      { logo: "/formation/logos/company1.jpg" },
    ],
    results: [
      "زيادة المبيعات بـ 200%",
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
  ],
  targetAudience: [
    "المسيرين",
  ],
  maxParticipants: 20,
  duration: "3 أيام",
  schedule: "من 09:00 إلى 17:00",
  location: "مقر Webscale بالجزائر",
},
```

Then visit: `http://localhost:5173/formation/digital-marketing`

## Common Issues

### ❌ Page not found?
- Check that `slug` matches the URL
- Make sure you saved the file
- Check browser console for errors

### ❌ Images not showing?
- Images must be in `public/` folder
- Use paths starting with `/` (e.g., `/experts/image.jpg`)
- Check file names match exactly

### ❌ Form not submitting?
- Verify `formId` is correct (UUID format)
- Check form exists in CRM
- Test API: `https://crmgo.webscale.dz/api/v1/public/forms/{formId}/submit`

## Need Help?

1. Look at the `smq` formation as a reference
2. Check `HOW_TO_ADD_NEW_FORMATION.md` for detailed guide
3. Make sure all required fields are filled

## That's It! 🎉

Once you add the configuration, your landing page will automatically work at `/formation/your-slug`







