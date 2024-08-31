import Navbar from "./_components/Navbar/Navbar";
import { getNatives } from "./_utils/getNatives";

export default async function Shell({ children }: { children: React.ReactNode }) {
  const natives = await getNatives();

  return (
    <div className="flex h-screen w-screen flex-col overflow-x-hidden">
      <h1 className="scroll-m-20 p-2 px-4 text-3xl font-extrabold tracking-tight lg:text-4xl">Native Documentation</h1>
      <div className="flex h-0 w-full grow px-4 pb-4">
        <Navbar natives={natives} />
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
