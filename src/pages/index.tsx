import type { NextPage } from 'next';
import { Container, Text, Card, Row, Col, Button } from '@nextui-org/react';
import Link from 'next/link';
import { client } from '../libs/client';
import { CustomImage } from '../components/CustomImage';

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
        <Link href={`/blog/${blog.id}`} key={blog.id}>
          <a>
            <Card
              color="gradient"
              css={{ mb: 20, p: '10px 5px 80px 5px', maxW: 590 }}
            >
              <CustomImage
                baseImageUrl={blog.image.url}
                width={600}
                height={315}
                title={blog?.title}
                author={blog.author}
              />
              <Card.Footer
                blur
                css={{
                  position: 'absolute',
                  bgBlur: '#ffffff',
                  borderTop:
                    '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
                }}
              >
                <Row>
                  <Col>
                    <Text color="#000" size={12}>
                      {blog.title}
                    </Text>
                  </Col>
                  <Col>
                    <Row justify="flex-end">
                      <Button flat auto rounded color="gradient">
                        <Text
                          css={{ color: 'inherit' }}
                          size={12}
                          weight="bold"
                          transform="uppercase"
                        >
                          詳細
                        </Text>
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Card.Footer>
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
