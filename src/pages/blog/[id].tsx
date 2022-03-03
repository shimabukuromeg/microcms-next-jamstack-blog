import type { NextPage } from 'next';
import { Container, Button, Text } from '@nextui-org/react';
import { client } from '../../libs/client';
import { createOgImage } from '../../libs/createOgImage';
import Link from 'next/link';
import { HeadTemplate } from '../../components/HeadTemplate';
import type { Blog } from '../index';

const Blog: NextPage<{
  blog: Blog;
}> = ({ blog }) => {
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

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const draftKey = context.previewData?.draftKey;
  const content = await fetch(
    `https://shimabukuromeg.microcms.io/api/v1/blog/${id}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ''
    }`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' } }
  ).then((res) => res.json());

  return {
    props: {
      blog: content,
    },
  };
};
