import got from "got";
import normalizeUrl from "normalize-url";
import cors from "micro-cors";

export default cors()(async (req, res) => {
  const { url } = req.query;
  const { body: css } = await got(
    `https://extract-css.now.sh/${normalizeUrl(url, {
      stripProtocol: true,
      stripWWW: false
    })}`
  );
  res.setHeader("Content-Type", "text/css");
  res.send(css);
});
