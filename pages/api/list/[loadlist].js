// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// add auth middleware

import List from "../../../db/models/List";
import { connectMongo } from "../../../db/config/index";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("loading list of " + req.query.id);
      await connectMongo(process.env.MONGODB_URI);
      const loadedList = await List.find({ userId: req.query.id });
      console.log(loadedList);
      res.status(200).json(loadedList);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.body);
    }
  }
}
