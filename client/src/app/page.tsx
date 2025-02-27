import Link from 'next/link'

export default function Home() {
  return (
    <main>
      Home page: <Link href={`http://localhost:3000/create`}>Create a new session</Link>
    </main>
  )
}
