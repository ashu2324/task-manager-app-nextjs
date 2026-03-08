import "./globals.css";
import ReduxProvider from "../redux/provider";

export const metadata = {
 title: "Task Manager",
 description: "Task Manager Dashboard",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en">
   <body>
    <ReduxProvider>
     {children}
    </ReduxProvider>
   </body>
  </html>
 );
}
