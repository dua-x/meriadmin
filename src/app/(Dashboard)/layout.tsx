import "../globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex max-lg:flex-col text-grey-1">
          <LeftSideBar />
          <TopBar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
