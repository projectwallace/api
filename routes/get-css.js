import cors from "micro-cors";
import getCss from "../src/get-css";

export default cors()(async (req, res) => {
  const { url } = req.query;
  const css = await getCss(url);

  res.setHeader("Content-Type", "text/css");
  res.send(css);
});
