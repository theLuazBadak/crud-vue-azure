export async function getSasUrl(filename: string): Promise<{ uploadUrl: string }>{
    const res = await fetch(`/api/httpTrigger2?filename=${encodeURIComponent(filename)}`)
    if(!res.ok) throw new Error('No se obtuvo el SAS')
    return res.json()
}