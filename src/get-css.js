import got from "got";
import normalizeUrl from "normalize-url";
import storeCss from "./store-css";

export default async url => {
  const normalizedUrl = normalizeUrl(url, {
    stripProtocol: true,
    stripWWW: true
  });
  const { body: css } = await got(
    `https://extract-css.now.sh/${normalizedUrl}`
  );
  await storeCss({ filename: normalizedUrl, css });

  return Promise.resolve(css);
};
