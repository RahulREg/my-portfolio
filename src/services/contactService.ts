export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export async function sendContact(payload: ContactPayload): Promise<void> {
  if (!ENDPOINT) {
    throw new Error("Contact endpoint is not configured.");
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to send message.");
  }
}