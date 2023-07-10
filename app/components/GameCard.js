// create screenshots slider!?const addGame = async (e) => {
const addGame = async (e) => {
  console.log("clicked game");
  console.log(e.target.parentElement.dataset.name);
  const newGame = {
    name: e.target.parentElement.dataset.name,
    image: e.target.parentElement.dataset.img,
    position: 1,
    category: "test",
  };
  try {
    const response = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });
    console.log(response);
  } catch (err) {
    console.log(error);
  }
};

export default function GameCard({ result }) {
  return (
    <>
      <div
        onClick={addGame}
        data-img={result.background_image}
        data-name={result.name}
        className='max-w-sm rounded-lg overflow-hidden shadow-xl'
      >
        <div className='text-white bg-orange-500'>{result.name}</div>
        <img
          className='w-full h-48 object-cover'
          src={result.background_image}
        />
        <button>Add Game</button>
      </div>
    </>
  );
}
