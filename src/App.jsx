// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BadgeCTA from "./components/BadgeCTA";
import BadgeGeneration from "./pages/BadgeGeneration";
import AboutUs from "./pages/AboutUs";
import EventLandingPage from "./pages/EventLandingPage";
import FormationPage from "./pages/FormationPage";
import InvestorLandingPage from "./pages/InvestorLandingPage";
import MobileFormPage from "./pages/MobileFormPage";
import QRGeneratorPage from "./pages/QRGeneratorPage";
import Registration from "./pages/Registration";
import SubmissionDetails from "./pages/SubmissionDetails";
import SubmissionsCarouselPage from "./pages/SubmissionsCarouselPage";
import WorkshopEventPage from "./pages/WorkshopEventPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/event" element={<EventLandingPage />} />
        <Route path="/formation" element={<FormationPage />} />
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
