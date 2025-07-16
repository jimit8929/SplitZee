"use client";
import {Separator} from "@/components/ui/separator"
import { SOCIAL_LINKS } from "@/lib/FooterLinks"

const Footer = () => {
  return (
   <footer className="p-4 pb-0 ">
    <div className="w-full min-h-16 py-4 bg-background border border-b-0 rounded-t-2xl 
    flex flex-col gap-3 items-center lg:flex-row lg:justify-between p-8">
        <p className="text-center text-2xl font-bold">&copy; 2025 JIMIT_MEHTA</p>

        <ul className="flex flex-wrap items-center p-2">
            {SOCIAL_LINKS.map(({href , label},index) => (
                <li className="flex items-center" key={index}>
                    <a href={href} className="text-2xl text-black hover:text-green-800 hover:scale-110 transition-all duration-300 font-bold
                    dark:text-white" target="_blank">
                        {label}
                    </a>

                    {index !== SOCIAL_LINKS.length -1 && <Separator orientation="vertical" className="h-3 mx-3" /> }
                </li>
            ))}
        </ul>
    </div>
   </footer>
  )
}

export default Footer
