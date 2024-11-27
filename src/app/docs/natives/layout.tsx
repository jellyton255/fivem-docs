import Navbar from "@/components/navbar/navbar";
import { getNatives } from "@/utils/getNatives";

export default async function Layout({
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
