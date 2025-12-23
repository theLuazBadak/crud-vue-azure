export async function getSasUrl(filename: string){
    const res = await fetch(`/api/sas?filename=${encodeURIComponent(filename)}`)
    if(!res.ok) throw new Error('No se obtuvo el SAS')
    return res.json() as Promise<{uploadUrl: string}>
}