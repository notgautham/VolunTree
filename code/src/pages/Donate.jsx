import React from "react";


const Donate = () => {
  return (
    <Container maxW="container.md" py={10} textAlign="center">
      <Heading as="h1" size="xl" color="blue.700" mb={4}>
        Support Our Cause
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        Your contributions help us fund volunteering programs and provide essential 
        resources to those in need.
      </Text>
      <Button colorScheme="blue" size="lg">
        Donate Now
      </Button>
    </Container>
  );
};

export default Donate;
