import request from "request";
import { createResponse } from "../response.js";
import uuid4 from "uuid4";
import cheerio from "cheerio";

export const videos = (req, res, next) => {
  let finalResults = [];
  let url = `http://www.chhattisgarhtourism.in/videogallery/`;

  request(url, (err, result, html) => {
    if (!err) {
      let $ = cheerio.load(html);
      $(".card").each((index, element) => {
        let item = {
          id: uuid4(),
          title: $(element).find("small").text(),
          video: $(element).find("iframe").attr("src"),
        };
        finalResults.push(item);
      });
      res
        .status(200)
        .send(
          createResponse(true, null, finalResults, "Data fetched successfully")
        );
    }
  });
};
