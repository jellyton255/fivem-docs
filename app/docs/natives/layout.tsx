import { getNatives } from "@/app/_utils/getNatives";
import Navbar from "@/app/Navbar/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const natives = await getNatives();

  return (
    <div className="flex w-full flex-nowrap gap-2">
      <Navbar natives={natives} />
      {children}
    </div>
  );
}
