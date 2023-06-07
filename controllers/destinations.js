import request from "request";
import { createResponse } from "../response.js";
import uuid4 from "uuid4";
import cheerio from "cheerio";

export const destinations = (req, res, next) => {
  let finalResults = [];
  let url = `https://chhattisgarhtourism.co.in/tourist-destinations-of-chhattisgarh.html`;

  request(url, (err, result, html) => {
    if (!err) {
      let $ = cheerio.load(html);
      $(".package-wiget").each((index, element) => {
        let item = {
          id: uuid4(),
          img_url: `https://chhattisgarhtourism.co.in/${$(element)
            .find("img")
            .attr("src")}`,
          name: $(element).find("a").find("h3").text(),
          link: `https://chhattisgarhtourism.co.in/${$(element)
            .find("a")
            .attr("href")}`,
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
