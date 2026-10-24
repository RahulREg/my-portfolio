import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  return (
    <div className="shell">
      <header className="header">
        <span className="brand">Rahul Ram</span>
        <nav aria-label="Main">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Rahul Ram
      </footer>
    </div>
  );
}