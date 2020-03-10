import cors from "micro-cors";
import getCss from "../src/get-css";

export default cors()(async (req, res) => {
  const { url } = req.query;
  const result = await getCss(url);

  if (req.headers.accept === "application/json") {
    return res.json(result)
  }

  const css = result.map(({css}) => css).join('\n')
  res.setHeader("Content-Type", "text/css");
  return res.send(css);
});
