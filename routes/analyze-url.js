import analyzeCss from "@projectwallace/css-analyzer";
import got from "got";
import normalizeUrl from "normalize-url";
import cors from "micro-cors";
import pkg from "../package.json";

export default cors()(async (req, res) => {
  const { url } = req.query;
  const { body: css } = await got(
    `https://extract-css.now.sh/${normalizeUrl(url, {
      stripProtocol: true,
      stripWWW: false
    })}`
  );
  const stats = await analyzeCss(css);
  res.setHeader(
    "x-css-analyzer-version",
    pkg.dependencies["@projectwallace/css-analyzer"]
  );
  res.json(stats);
});