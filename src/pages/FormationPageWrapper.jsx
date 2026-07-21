// Wrapper component that loads formation config and renders FormationPageDynamic
import { useParams } from "react-router-dom";
import FormationPageDynamic from "./FormationPageDynamic";
import MarketingDayPage from "./MarketingDayPage";
import { getFormationBySlug, formations } from "../constants/formations";

const FormationPageWrapper = () => {
  const { slug } = useParams();

  if (slug === "promotion-days") {
    return <MarketingDayPage />;
  }

  // Get formation by slug, or default to 'smq' if not found
  const formation = slug ? getFormationBySlug(slug) : formations.smq;

  return <FormationPageDynamic formation={formation} />;
};

export default FormationPageWrapper;
