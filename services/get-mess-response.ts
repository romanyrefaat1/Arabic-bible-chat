export default async function getMessResponse (query: string){
    
    const response = await fetch(`http://http://localhost:3000` + '/api/end-mess-response', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: query,
        })
    })
    const data = await response.json()
    console.log(`data from services`, data)
    return data
}