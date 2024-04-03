import type { Metadata } from "next";
import "./globals.scss";
import styles from "./layout.module.scss";
import Nav from "@/components/nav/Nav";
import { UserTokenProvider } from "@/components/user-token-context/UserTokenContext";
import { UserProgressStatusProvider } from "@/components/user-progress-status-context/UserProgressStatusContext";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <div className={styles.back} data-testid="background">
        <UserTokenProvider><UserProgressStatusProvider>
            <Nav />
            <div className={styles.container} data-testid="container">
              <div className={styles.content} data-testid="content">
                { children }
              </div>
            </div>
        </UserProgressStatusProvider></UserTokenProvider>
        </div>
      </body>
    </html>
  );
}
