import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "./components/navbar/page"
import Footer from "./components/footer/page"
import ReduxProvider from "./redux/provider";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Provider>
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
