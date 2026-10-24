import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./ButtonLink.module.css";

interface Props {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function ButtonLink({ to, children, variant = "primary" }: Props) {
  return (
    <Link to={to} className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </Link>
  );
}