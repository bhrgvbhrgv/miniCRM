import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import { CRMProvider } from "../context/CRMContext";

export const metadata = {
  title: "Mini CRM Dashboard",
  description: "Simple customer management dashboard in Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CRMProvider>
          <div className="app-shell">
            <Sidebar />
            <main className="content">{children}</main>
          </div>
        </CRMProvider>
      </body>
    </html>
  );
}
