import { getStore } from "@netlify/blobs";

export const handler = async (event) => {
  // Vamos buscar as credenciais que o Netlify fornece automaticamente
  const store = getStore({ 
    name: "nilson_brindes_store",
    siteID: process.env.SITE_ID,
    token: process.env.NETLIFY_API_TOKEN // Use a variável que você criou
  });
  // O restante do código permanece igual
  if (event.httpMethod === "GET") {
    const data = await store.get("site_state", { type: "json" });
    return { statusCode: 200, body: JSON.stringify(data || {}) };
  }

  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    await store.setJSON("site_state", body);
    return { statusCode: 200, body: JSON.stringify({ message: "Salvo!" }) };
  }
};