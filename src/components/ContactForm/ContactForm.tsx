import { useState } from "react";
import type { FormEvent } from "react";
import { sendContact } from "../../services/contactService";
import styles from "./ContactForm.module.css";

// The form is a small state machine. Modelling the lifecycle as one union
// (rather than separate isSending / isSuccess / isError booleans) makes
// contradictory combinations, such as "sending and failed", impossible.
type Status = "idle" | "sending" | "success" | "error";
// Fields a visitor can get wrong.
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const empty = { name: "", email: "", message: "" };

/**
 * Pure validation: values in, error messages out. Returns an empty object
 * when everything is valid.
 */
function validate(values: typeof empty): Errors {
    const errors: Errors = {};
    if (!values.name.trim()) errors.name = "Please enter your name.";
    if (!values.email.trim()) errors.email = "Please enter your email.";
    if (values.message.trim().length < 10)
        errors.message = "Please write at least a short message (10+ characters).";
    return errors;
}

export default function ContactForm() {
    const [values, setValues] = useState(empty);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<Status>("idle");

    function update(field: keyof typeof empty, value: string) {
        setValues((prev) => ({ ...prev, [field]: value }));

        // A new edit means the visitor is working on the form again,
        // but don't interrupt a message that's still being sent.
        setStatus((prev) => (prev === "sending" ? prev : "idle"));

        // Clear the error for the field being edited.
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        // Stop the browser's default full-page form POST. We submit with
        // fetch instead so the visitor stays on the page.
        e.preventDefault();
        if (status === "sending") return;

        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStatus("sending");
        try {
            await sendContact({
                name: values.name.trim(),
                email: values.email.trim(),
                message: values.message.trim(),
            });
            setStatus("success");
            setValues(empty);
        } catch (err) {
            // The UI shows one generic message; the real cause goes to the
            // console for debugging (missing endpoint, 403, network, etc.).
            console.error("Contact form error:", err);
            setStatus("error");
        }
    }

    const sending = status === "sending";

    return (
        // noValidate turns off the browser's built-in validation pop-ups so
        // our own inline messages are the only ones shown, with consistent
        // wording and styling.
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                    <p id="name-error" className={styles.error}>
                        {errors.name}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                    <p id="email-error" className={styles.error}>
                        {errors.email}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={2000}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                    <p id="message-error" className={styles.error}>
                        {errors.message}
                    </p>
                )}
            </div>

            {/* Disabled while sending to prevent duplicate submissions, with
                text feedback so the visitor knows something is happening. */}
            <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? "Sending…" : "Send message"}
            </button>

            <div aria-live="polite">
                {status === "success" && (
                    <p className={styles.success}>
                        Thanks! Your message was sent. I'll get back to you soon.
                    </p>
                )}
                {/* Failures need immediate attention. If the message just appeared
                    silently, a screen reader user would never know the send failed and
                    might assume it worked. role="alert" makes assistive tech announce it
                    right away, interrupting whatever it is reading.
                    The text offers a way out (retry, or the mailto link on this page) so
                    a failed send never leaves the visitor with no way to reach me. */}
                {status === "error" && (
                    <p className={styles.error} role="alert">
                        Something went wrong sending your message. Please try again, or
                        email me directly using the link above.
                    </p>
                )}
            </div>
        </form>
    );
}