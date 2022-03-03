import fetch from 'node-fetch';

export default async (req, res) => {
  if (!req.query.id) {
    return res.status(404).end();
  }
  const content = await fetch(
    `https://shimabukuromeg.microcms.io/api/v1/blog/${req.query.id}?fields=id&draftKey=${req.query.draftKey}`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' } }
  )
    .then((res) => res.json())
    .catch(() => null);

  if (!content) {
    return res.status(401).json({ message: 'Invalid id' });
  }

  res.setPreviewData({
    id: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/blog/${content.id}` });
  res.end('Preview mode enabled');
};
