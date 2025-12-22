import axios from "axios";

const PUBLIC_FORM_ID = "47401ef7-042c-4994-8645-569b14749758";
const PUBLIC_SUBMIT_URL = `https://crmgo.webscale.dz/api/v1/public/forms/${PUBLIC_FORM_ID}/submit`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const payload = req.body || {};

    const upstream = await axios.post(PUBLIC_SUBMIT_URL, payload, {
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      withCredentials: false,
      validateStatus: () => true,
    });

    return res.status(upstream.status).json(upstream.data);
  } catch (error) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data || { error: "proxy error" };
    return res.status(status).json(message);
  }
}


