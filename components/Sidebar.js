"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/customers", label: "Customers" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <h1>Mini CRM</h1>
      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname.startsWith(link.href) ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
