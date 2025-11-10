// src/pages/Registration.jsx
import { Helmet } from "react-helmet-async";
// Landing page components
import { AboutSection, CommunitySection, EventsSection, SmartManagerSection } from "@/components/landing";
// Registration components
import ApplicationForm from "@/components/registration/ApplicationForm";
import ContactSection from "@/components/registration/ContactSection";
import FAQSection from "@/components/registration/FAQSection";
import Hero from "@/components/registration/Hero";
import PricingSection from "@/components/registration/PricingSection";
// Shared components
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
// Constants
import { communityLinks, registrationNav, registrationPlatformLinks, registrationResourcesLinks } from "@/constants";

export default function Registration() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>WEBSCALE - مجتمع حصري لأرباب العمل في الجزائر</title>
        <meta name="description" content="مجتمع مدفوع ومغلق لأصحاب الشركات والمسيرين في الجزائر. محتوى عملي، جلسات مباشرة أسبوعية، وأحداث حضورية مع شبكة علاقات عالية القيمة." />
        <meta name="keywords" content="webscale, مجتمع أرباب العمل, الجزائر, شركات, مسيرين, شبكة علاقات, جلسات مباشرة, أحداث حضورية" />
        <meta property="og:title" content="WEBSCALE - مجتمع حصري لأرباب العمل في الجزائر" />
        <meta property="og:description" content="مجتمع مدفوع ومغلق لأصحاب الشركات والمسيرين في الجزائر. محتوى عملي، جلسات مباشرة أسبوعية، وأحداث حضورية مع شبكة علاقات عالية القيمة." />
        <meta property="og:url" content="https://webscale.dz/" />
        <meta property="twitter:title" content="WEBSCALE - مجتمع حصري لأرباب العمل في الجزائر" />
        <meta property="twitter:description" content="مجتمع مدفوع ومغلق لأصحاب الشركات والمسيرين في الجزائر. محتوى عملي، جلسات مباشرة أسبوعية، وأحداث حضورية مع شبكة علاقات عالية القيمة." />
        <link rel="canonical" href="https://webscale.dz/" />
      </Helmet>
      <Navbar navConfig={registrationNav} />

      <Hero/>
      <AboutSection/>
      <CommunitySection/>
      {/* <TrainingSpeakersSection/> */}
      <EventsSection/>
      <SmartManagerSection/>
      <PricingSection/>
      <main className="flex-grow">
        <ApplicationForm />
      </main>
      <FAQSection/>
      <ContactSection/>
      {/* <Footer /> */}
      <Footer 
  resourcesLinks={registrationPlatformLinks} 
  platformLinks={registrationResourcesLinks} 
  communityLinks={communityLinks}
/>
    </div>
  );
}
