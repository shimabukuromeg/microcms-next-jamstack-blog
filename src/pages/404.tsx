import { Container, Text } from '@nextui-org/react';

const Custom404 = () => {
  return (
    <Container css={{ p: 10 }}>
      <Text
        h1
        size={60}
        css={{
          margin: 0,
          textGradient: '45deg, $blue500 -20%, $pink500 50%',
        }}
      >
        404 - Page Not Found
      </Text>
    </Container>
  );
};

export default Custom404;
