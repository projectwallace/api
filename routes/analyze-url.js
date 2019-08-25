import analyzeCss from "@projectwallace/css-analyzer";
import cors from "micro-cors";
import pkg from "../package.json";
import getCss from "../src/get-css";

export default cors()(async (req, res) => {
  const { url } = req.query;
  const css = await getCss(url);
  const stats = await analyzeCss(css);

  res.setHeader(
    "x-css-analyzer-version",
    pkg.dependencies["@projectwallace/css-analyzer"]
  );
  res.json(stats);
});
