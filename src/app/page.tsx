import { getNatives } from "../utils/getNatives";

export default function Home() {
  getNatives();

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-900 p-4 md:max-w-4xl">
        <h1 className="scroll-m-20 text-3xl font-extrabold lg:text-5xl">
          Welcome to the <span className="text-neutral-500">(Unofficial)</span> FiveM Native Docs
        </h1>

        <h2 className="scroll-m-20 text-2xl font-bold">What is this site? Why does it exist?</h2>
        <p className="text-neutral-300">
          FiveM's documentation site hasn't really been visually updated since the first time I saw it, which was 6 years ago. So I've
          decided to make my own, originally just for fun, and to improve my knowledge of Next.js. However this has become my daily driver
          for native documentation. It's visually much more modern and has a far better layout than the standard FiveM documentation site.
          It's also much easier to use if you're just browsing for natives without a specific name to search by. But most importantly, it
          has a dark theme, which is a god send for late night development.
        </p>
        <p className="text-right text-neutral-500">This site is not affiliated with Cfx.re or Rockstar Games.</p>
      </div>
    </main>
  );
}
