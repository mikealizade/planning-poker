import { CurrentSession } from '@/components/CurrentSession/CurrentSession'
export default async function Page({ params }: { params: Promise<{ id: string; session_name: string }> }) {
  const { id } = await params
  return <CurrentSession sessionId={id} />
}
