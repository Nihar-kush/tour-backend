import request from "request";
import { createResponse } from "../response.js";
import uuid4 from "uuid4";
import cheerio from "cheerio";

export const discover = (req, res, next) => {
  let finalResults = [];
  let url = `https://uttarakhandtourism.gov.in/`;

  request(url, (err, result, html) => {
    if (!err) {
      let $ = cheerio.load(html);
      $(".flip-card").each((index, element) => {
        let item = {
          id: uuid4(),
          link: `https://uttarakhandtourism.gov.in${$(element)
            .find("a")
            .attr("href")}`,
          img_url: `https://uttarakhandtourism.gov.in${$(element)
            .find(".flip-card-front")
            .find("img")
            .attr("src")}`,
          title: $(element)
            .find(".flip-card-front")
            .find(".fig-caption")
            .find("h4")
            .text(),
          caption: $(element)
            .find(".flip-card-front")
            .find(".fig-caption")
            .find("h4")
            .next()
            .text(),
          description: $(element)
            .find(".flip-card-back")
            .find(".fig-caption")
            .find("p")
            .text(),
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
