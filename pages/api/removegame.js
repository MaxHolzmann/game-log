// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// add auth middleware

import Game from "../../db/models/Game";
import { connectMongo } from "../../db/config/index";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongo(process.env.MONGODB_URI);
      const deletedGame = await Game.deleteOne({ name: req.body.name });
      res.status(200).json(deletedGame);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.body);
    }
  }
}
