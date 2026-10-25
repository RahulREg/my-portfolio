import ContactForm from "../ContactForm/ContactForm";
import styles from "./Contact.module.css";

const EMAIL = "rahulram00925@gmail.com";

export default function Contact() {
  return (
    <section className={styles.page}>
      <h1>Contact</h1>
      <p className={styles.intro}>
        Have a role, project, or question in mind? Send a message below, or
        email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
      <ContactForm />
    </section>
  );
}