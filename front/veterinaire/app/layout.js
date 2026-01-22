import "./globals.css";
import { Manrope } from "next/font/google";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./context/authContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "My App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
