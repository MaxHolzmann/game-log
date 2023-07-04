// create screenshots slider!? 
export default function GameCard({result}) {
    return (
    <>
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="text-orange-400">{result.name}</div>
    <img className="w-full h-48 object-cover" src={result.background_image}/>
    </div>
    </>
    )
}