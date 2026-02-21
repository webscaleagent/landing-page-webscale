import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UtmListener = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    
    let hasUtm = false;
    const utmData = {};

    utmKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        utmData[key] = value;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      // Save found UTMs to localStorage, overwriting existing ones for consistency with latest campaign source
      Object.keys(utmData).forEach(key => {
        localStorage.setItem(key, utmData[key]);
      });
    }
  }, [location]);

  return null;
};

export default UtmListener;
