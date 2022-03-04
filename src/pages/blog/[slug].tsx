import type { NextPage } from 'next';
import { Container, Button, Text, Row, Card } from '@nextui-org/react';
import { client } from '../../libs/client';
import { createOgImage } from '../../libs/createOgImage';
import Link from 'next/link';
import { HeadTemplate } from '../../components/HeadTemplate';
import type { Blog } from '../index';
import ErrorPage from 'next/error';
import { Link as NextUiLink } from '@nextui-org/react';

const Blog: NextPage<{
  blog: Blog;
  preview: boolean;
}> = ({ blog, preview }) => {
  if (!blog) {
    return <ErrorPage statusCode={404} />;
  }
  const { ogImageUrl } = createOgImage(
    blog?.image?.url,
    blog?.author,
    blog.title
  );
  return (
    <>
      <HeadTemplate
        pagetitle={blog.title}
        pagedescription={blog.title}
        pagepath="blogs"
        postimg={ogImageUrl}
      />
      {preview && (
        <Container>
          <Card color="gradient">
            <Row justify="center" align="center">
              <Text h6 size={15} color="white" css={{ m: 0 }}>
                下書きのプレビューです。プレビューを終了する場合は
                <NextUiLink block color="error" href="/api/exit-preview">こちら</NextUiLink>
              </Text>
            </Row>
          </Card>
        </Container>
      )}
      <Container css={{ p: 30 }}>
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>

        {blog.category && (
          <Text
            span
            size={12}
            css={{ border: '1px solid', p: 8, borderRadius: 4 }}
          >{`${blog.category.name}`}</Text>
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
        <Link href="/">
          <a>
            <Button bordered color="gradient" auto>
              記事一覧に戻る
            </Button>
          </a>
        </Link>
      </Container>
    </>
  );
};

export default Blog;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });

  const paths = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  );
  return { paths, fallback: true };
};

export const getStaticProps = async (context: any) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;
  const blog = await fetch(
    `https://shimabukuromeg.microcms.io/api/v1/blog/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ''
    }`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' } }
  ).then((res) => res.json());
  return {
    props: {
      blog,
      preview: context.preview ?? false,
    },
  };
};
