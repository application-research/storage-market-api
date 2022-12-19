// NOTE(jim)
// To use file system routing, you must have `page.tsx`.
import DefaultMetaTags from '@components/DefaultMetaTags';

// NOTE(jim):
// example app/[param]/head.js
// params: { param: value }
export default async function Head({ params }) {
  const title = 'data.storage.market | API Documentation';
  const description = 'documentation for data.storage.market, an API for learning more about the cost of storage and available options.';
  const url = 'https://data.storage.market';

  return (
    <>
      <title>{title}</title>
      <DefaultMetaTags />
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="" />
    </>
  );
}
