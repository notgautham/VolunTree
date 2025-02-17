import React from "react";




const Contact = () => {
  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h1" size="xl" color="blue.700" mb={4}>
        Contact Us
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        Have questions? Reach out to us using the form below.
      </Text>

      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input type="text" placeholder="Your Name" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Your Email" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Message</FormLabel>
        <Textarea placeholder="Your Message" />
      </FormControl>

      <Button colorScheme="blue">Send Message</Button>
    </Container>
  );
};

export default Contact;
