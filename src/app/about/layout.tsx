import Navbar from "../components/navbar";
import Footer from "../components/footter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="sticky top-0">
          <Navbar />
        </div>

        {children}
        <div className="bg-primaryBg w-full shadow-lg sticky inset-0 bottom-0 ">
          <div className="container  flex justify-center">
            <h1 className="text-white text-center font-semibold p-2">
              © 2024 - ສະຫງວນລິຂະສິດ
            </h1>
          </div>
        </div>
      </body>
    </html>
  );
}
