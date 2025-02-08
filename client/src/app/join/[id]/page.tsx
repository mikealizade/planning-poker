import { JoinSession } from '@/components/JoinSession/JoinSession'

export default async function Page({ params }: { params: Promise<{ id: string; session_name: string }> }) {
  const { id } = await params
  return <JoinSession sessionId={id} />
}
