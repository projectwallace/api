import analyzeCss from "@projectwallace/css-analyzer";
import cors from "micro-cors";
import pkg from "../package.json";

export default cors()(async (req, res) => {
  const stats = await analyzeCss(req.body);
  res.setHeader(
    "x-css-analyzer-version",
    pkg.dependencies["@projectwallace/css-analyzer"]
  );
  res.json(stats);
});
