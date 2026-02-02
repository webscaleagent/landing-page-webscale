// src/App.jsx
import { Navigate, Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom";
import BadgeCTA from "./components/BadgeCTA";
import UtmListener from "./components/UtmListener";
import AboutUs from "./pages/AboutUs";
import BadgeGeneration from "./pages/BadgeGeneration";
import EventLandingPage from "./pages/EventLandingPage";
import FormationPageWrapper from "./pages/FormationPageWrapper";
import FormationsMenu from "./pages/FormationsMenu";
import InvestorLandingPage from "./pages/InvestorLandingPage";
import MobileFormPage from "./pages/MobileFormPage";
import QRGeneratorPage from "./pages/QRGeneratorPage";
import Registration from "./pages/Registration";
import SubmissionDetails from "./pages/SubmissionDetails";
import SubmissionsCarouselPage from "./pages/SubmissionsCarouselPage";
import WorkshopEventPage from "./pages/WorkshopEventPage";

// Redirect component for /formation/:slug -> /formations/:slug
function FormationSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/formations/${slug}`} replace />;
}

export default function App() {
  return (
    <Router>
      <UtmListener />
      <Routes>
        <Route path="/formation" element={<Navigate to="/formations" replace />} />
        <Route path="/formation/:slug" element={<FormationSlugRedirect />} />
        <Route path="/event" element={<EventLandingPage />} />
        <Route path="/formations" element={<FormationsMenu />} />
        <Route path="/formations/:slug" element={<FormationPageWrapper />} />
        <Route path="/investor" element={<InvestorLandingPage />} />
        <Route path="/workshop-event" element={<WorkshopEventPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/submission/:submission_id" element={<SubmissionDetails />} />
        <Route path="/badge" element={<BadgeGeneration />} />
        <Route path="/badge-request" element={<BadgeCTA />} />
        <Route path="/mobile-form/:form_id" element={<MobileFormPage />} />
        <Route path="/qr-generator" element={<QRGeneratorPage />} />
        <Route path="/submissions/:form_id" element={<SubmissionsCarouselPage />} />
        <Route path="/" element={<Registration />} />
      </Routes>
    </Router>
  );
}
