export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

/**
 * Sends one contact message.
 *
 * Resolves on success and throws on any failure.
 */
export async function sendContact(payload: ContactPayload): Promise<void> {
  // This is easier to diagnose than a request to "undefined".
  if (!ENDPOINT) {
    throw new Error("Contact endpoint is not configured.");
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Asks the provider to answer with JSON instead of redirecting the
      // browser to its own "thank you".
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to send message.");
  }
}