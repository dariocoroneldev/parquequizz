import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <Image
          src="https://media.istockphoto.com/id/1329251224/es/foto/vista-a%C3%A9rea-de-un-r%C3%ADo-que-fluye-a-trav%C3%A9s-de-una-selva-tropical-templada.jpg?s=1024x1024&w=is&k=20&c=aPo84bEUmOtFl69ZVckcj4eiI08jXbOLVmP6oKYZa5w=" // replace with your header image path
          alt="Header Image"
          layout="responsive"
          width={1920}
          height={300}
        />
      </header>

      <main className="flex flex-col items-center justify-center flex-grow text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz!</h1>
        <p className="text-xl mb-8">Test your knowledge and have fun!</p>
        <Link href="/trivia">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Play
        </button>
        </Link>
      </main>

      <footer className="w-full">
        <Image
          src="https://media.istockphoto.com/id/1329251224/es/foto/vista-a%C3%A9rea-de-un-r%C3%ADo-que-fluye-a-trav%C3%A9s-de-una-selva-tropical-templada.jpg?s=1024x1024&w=is&k=20&c=aPo84bEUmOtFl69ZVckcj4eiI08jXbOLVmP6oKYZa5w=" // replace with your footer image path
          alt="Footer Image"
          layout="responsive"
          width={1920}
          height={300}
        />
      </footer>
    </div>
  )
}