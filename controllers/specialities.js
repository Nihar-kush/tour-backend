import request from "request";
import { createResponse } from "../response.js";
import uuid4 from "uuid4";
import cheerio from "cheerio";

export const specialities = (req, res, next) => {
  let finalResults = [];
  let url = `https://uttarakhandtourism.gov.in/`;

  request(url, (err, result, html) => {
    if (!err) {
      let $ = cheerio.load(html);
      $(".owl-stage")
        .children(".owl-item")
        .each((index, element) => {
          let item = {
            id: uuid4(),
            img_url: `https://uttarakhandtourism.gov.in${$(element)
              .find("img")
              .attr("src")}`,
            title: $(element).find(".title").text(),
            description: $(element).find(".title").next().text(),
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
