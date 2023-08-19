import Game from "../../../db/models/Game";
import { connectMongo } from "../../../db/config/index";

//add auth middleware

export default async function handler(req, res) {
  const { id, contact_id } = req.query;
  // Use the `id` parameter in your logic
  // Example: Retrieve user data based on the `id`
  try {
    await connectMongo(process.env.MONGODB_URI);
    const allUsersGames = await Game.find({ user: id });
    console.log("All Games GET made from " + id);
    res.status(200).json(allUsersGames);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.body);
  }
}
