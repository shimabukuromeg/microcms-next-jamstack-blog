import type { NextPage } from 'next';
import { Container, Text, Card } from '@nextui-org/react';
import Link from 'next/link';
import { client } from '../libs/client';
import { CustomImage } from '../components/CustomImage';
import { Fragment } from 'react';

export type Blog = {
  id: string;
  title: string;
  body: string;
  category: {
    name: string;
  };
  author: {
    id: string;
    name: string;
    image: {
      url: string;
    };
  };
  image: {
    url: string;
  };
  publishedAt: string;
};

const Home: NextPage<{ blogs: Blog[] }> = ({ blogs }) => {
  return (
    <Container
      css={{
        p: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container css={{ p: 16, mb: 50 }} display="flex" direction="row">
        <Text
          h1
          size={60}
          css={{
            margin: 0,
            textGradient: '45deg, $blue500 -20%, $pink500 50%',
          }}
          weight="bold"
        >
          microCMS
        </Text>
        <Text
          h1
          size={60}
          css={{
            margin: 0,
            textGradient: '45deg, $yellow500 -20%, $red500 100%',
          }}
          weight="bold"
        >
          + Next.js のブログ
        </Text>
      </Container>

      {blogs.map((blog) => (
        <Link href={`/blog/${blog.id}`}>
          <a>
            <Card color="gradient" css={{ mb: 20, p: 20, maxW: 590 }}>
              <Fragment key={blog.author.id}>
                <CustomImage
                  baseImageUrl={blog.image.url}
                  width={600}
                  height={315}
                  title={blog?.title}
                  author={blog.author}
                />
              </Fragment>
              <Text
                css={{ fontWeight: '$bold', color: '$white' }}
                transform="capitalize"
              >
                {blog.title}
              </Text>
            </Card>
          </a>
        </Link>
      ))}
    </Container>
  );
};

export async function getStaticProps() {
  const data = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blogs: data.contents,
    },
  };
}

export default Home;
