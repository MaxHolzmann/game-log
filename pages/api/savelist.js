import List from "../../db/models/List";
import { connectMongo } from "../../db/config/index";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
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
    } catch (err) {
      res.status(500).json(err.body);
    }
  }
}
