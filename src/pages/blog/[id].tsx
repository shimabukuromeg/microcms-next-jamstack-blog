import type { NextPage } from 'next';
import { Container, Button } from '@nextui-org/react';
import { client } from '../../libs/client';
import Link from 'next/link';

const Blog: NextPage<{
  blog: { id: string; title: string; publishedAt: string; body: string };
}> = ({ blog }) => {
  return (
    <Container css={{ p: 30 }}>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
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
  );
};

export default Blog;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });

  const paths = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  );
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
