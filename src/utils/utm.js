/**
 * Utility to extract UTM parameters from the current URL.
 * Returns an object with utm_source, utm_medium, utm_campaign, utm_content, and utm_term.
 */
export const getUTMParams = () => {
    if (typeof window === "undefined") return {};

    const searchParams = new URLSearchParams(window.location.search);

    return {
        utm_source: searchParams.get("utm_source") || "",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || "",
        utm_content: searchParams.get("utm_content") || "",
        utm_term: searchParams.get("utm_term") || "",
    };
};
