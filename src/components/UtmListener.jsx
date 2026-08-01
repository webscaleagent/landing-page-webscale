import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "affiliated_by",
];

const UtmListener = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const trackingData = {};
    let hasTracking = false;

    TRACKING_KEYS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        trackingData[key] = value;
        hasTracking = true;
      }
    });

    if (hasTracking) {
      // Persist latest campaign / affiliate source across navigations
      Object.keys(trackingData).forEach((key) => {
        localStorage.setItem(key, trackingData[key]);
      });

      // Keep ref and affiliated_by in sync when only one is present
      const ref = trackingData.ref || trackingData.affiliated_by;
      if (ref) {
        localStorage.setItem("ref", ref);
        localStorage.setItem("affiliated_by", ref);
      }
    }
  }, [location]);

  return null;
};

export default UtmListener;
