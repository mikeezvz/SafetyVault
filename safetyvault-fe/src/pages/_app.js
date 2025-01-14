import "@/styles/globals.css";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  return (
    <div>
    <nav className="flex justify-between bg-gray-900 text-white w-screen h-24">
    <div className="ml-10 flex gap-4">
      <div className="m-auto">
   <p className="text-5xl font-bold font-heading place">
    Safety Vault
    </p>
    </div>
    <div className="m-auto mt-12">
    <a className="font-bold ml-5">
      By Devin and Mike
    </a>
    </div>
    </div>
    <div className="place-self-center mr-10">
    <a href="https://github.com/mikeezvz/SafetyVault" target="_blank" className="mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
      <Image
      src="/github.svg"
      width={50}
      height={50}
    />
    </a>
    </div>
   </nav>
   <Component {...pageProps}/>
   </div>
  )
}
