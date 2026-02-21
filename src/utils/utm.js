/**
 * Utility to extract UTM parameters from the current URL.
 * Returns an object with utm_source, utm_medium, utm_campaign, utm_content, and utm_term.
 */
export const getUTMParams = () => {
    if (typeof window === "undefined") return {};

    const searchParams = new URLSearchParams(window.location.search);

    const getParam = (key) => {
        return searchParams.get(key) || localStorage.getItem(key) || "";
    };

    return {
        utm_source: getParam("utm_source"),
        utm_medium: getParam("utm_medium"),
        utm_campaign: getParam("utm_campaign"),
        utm_content: getParam("utm_content"),
        utm_term: getParam("utm_term"),
    };
};
