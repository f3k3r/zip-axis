import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Axis Bank",
  description: "Axis Bank Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>{children}</body> 

      
    </html>
  );
}
