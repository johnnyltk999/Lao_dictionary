import Navbar from "../components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        {children}
        <div className="bg-primaryBg w-full shadow-lg inset-x-0 bottom-0 sticky">
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
