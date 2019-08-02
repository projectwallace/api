import analyzeCss from "@projectwallace/css-analyzer";

export default async (req, res) => {
  const stats = await analyzeCss(req.body);
  res.json(stats);
};
