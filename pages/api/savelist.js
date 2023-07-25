// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// add auth middleware

import List from "../../db/models/List";
import { connectMongo } from "../../db/config/index";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // try {
    //   await connectMongo(process.env.MONGODB_URI);
    //   const newList = await List.create(req.body);
    //   console.log(newGame);
    //   res.status(200).json(newGame);
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json(err.body);
    // }
    let list = await List.findOne({ userId: req.body.userId });

    if (list) {
      list = await List.findOneAndUpdate(
        { userId: req.body.userId },
        { list: req.body.list }
      );
    } else {
      list = await List.create({
        userId: req.body.userId,
        list: req.body.list,
      });
      res.status(200).json(list);
    }

    try {
    } catch (err) {
      res.status(500).json(err.body);
    }
  }
}
