/**
 * Utility to extract UTM and affiliate referral parameters from the current URL
 * (falling back to localStorage for persistence across navigations).
 */
export const getUTMParams = () => {
    if (typeof window === "undefined") return {};

    const searchParams = new URLSearchParams(window.location.search);

    const getParam = (key) => {
        return searchParams.get(key) || localStorage.getItem(key) || "";
    };

    const affiliatedBy =
        getParam("affiliated_by") || getParam("ref") || "";

    const params = {
        utm_source: getParam("utm_source"),
        utm_medium: getParam("utm_medium"),
        utm_campaign: getParam("utm_campaign"),
        utm_content: getParam("utm_content"),
        utm_term: getParam("utm_term"),
    };

    if (affiliatedBy) {
        params.affiliated_by = affiliatedBy;
        params.ref = affiliatedBy;
    }

    return params;
};
