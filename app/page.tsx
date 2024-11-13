import Link from 'next/link'
import Image from 'next/image'
import { Pacifico, Lato } from '@next/font/google'



const pacifico = Pacifico({ subsets: ['latin'] , weight: '400' })
const lato = Lato({ subsets: ['latin'] , weight: '400' })

export default function Home() {
  return (
    <>
      <div className={`image-container ${pacifico.className}`}>
        <Image 
        src="/banners/bg.png" 
        alt="Background Image"  
        className="background-image" 
        width={100} 
        height={100} 
        quality={100}
        priority
        unoptimized={true} 
        />
      </div>
      {/* Contenedor del texto y botón */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[55vh] space-y-4 text-center text-[#044e78] animate-fade-in-up">
        <h1 className={`text-7xl font-bold  ${pacifico.className}`}>Participa</h1>
        <p className={`text-2xl max-w-xs ${lato.className}`}>por una tirolesa gratis</p>
        <Link href="/form" className="bg-[#044e78] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#2774a1]">
          Participar
        </Link>
      </div>
    </>
  )
}
