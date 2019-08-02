import analyzeCss from "@projectwallace/css-analyzer";
import got from "got";
import normalizeUrl from "normalize-url";

export default async (req, res) => {
  const { url } = req.query;
  const { body: css } = await got(
    `https://extract-css.now.sh/${normalizeUrl(url, {
      stripProtocol: true,
      stripWWW: false
    })}`
  );
  const stats = await analyzeCss(css);
  res.json(stats);
};
