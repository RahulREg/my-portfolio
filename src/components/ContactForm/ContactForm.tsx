import { useState } from "react";
import type { FormEvent } from "react";
import { sendContact } from "../../services/contactService";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "success" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty = { name: "", email: "", message: "", _gotcha: "" };

function validate(values: typeof empty): Errors {
    const errors: Errors = {};
    if (!values.name.trim()) errors.name = "Please enter your name.";
    if (!values.email.trim()) errors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(values.email.trim()))
        errors.email = "That email doesn't look right.";
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
        if (field !== "_gotcha") {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (status === "sending") return;

        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        // Bots fill the hidden field. Pretend it worked and send nothing.
        if (values._gotcha) {
            setStatus("success");
            setValues(empty);
            return;
        }

        setStatus("sending");
        try {
            await sendContact({
                name: values.name.trim(),
                email: values.email.trim(),
                message: values.message.trim(),
            });
            setStatus("success");
            setValues(empty);
        } catch {
            setStatus("error");
        }
    }

    const sending = status === "sending";

    return (
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

            {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
            <div className={styles.trap} aria-hidden="true">
                <label htmlFor="_gotcha">Leave this field empty</label>
                <input
                    id="_gotcha"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values._gotcha}
                    onChange={(e) => update("_gotcha", e.target.value)}
                />
            </div>

            <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? "Sending…" : "Send message"}
            </button>

            <div aria-live="polite">
                {status === "success" && (
                    <p className={styles.success}>
                        Thanks! Your message was sent. I'll get back to you soon.
                    </p>
                )}
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