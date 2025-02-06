
export default async function Page({
  params,
}: {
  params: Promise<{ id: string; session_name: string }>
}) {
  const {id} = (await params)
  return (
    <>
    {/* <div>My session name: {session_name}</div> */}
    <div>My session: {id}</div>
    </>
  )
}