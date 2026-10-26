// NotFound.tsx
/**
 * Fallback page for any URL that matches no route (the "*" route in App.tsx).
 *
 * Gives the visitor a way out instead of a blank screen. Rendered inside the
 * shared Layout, so the header navigation is still available too.
 */
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Back to home</Link>
    </>
  );
}