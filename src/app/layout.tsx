import type { Metadata } from "next";
import { Inter, Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import { noto_sans_lao } from "./ui/fonts";

const inter = Inter({ subsets: ["latin"] });
// const noto = Noto_Sans_Lao({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ລາວລາວ | ໜ້າຫຼັກ",
  description: "ວັດຈະນານຸກົມມ, ພາສາລາວ, ຄຳສັບລາວ, ລາວ, ຄວາມຫມາຍພາສາລາວ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}${noto_sans_lao.className} `}>
        {children}
      </body>
    </html>
  );
}
