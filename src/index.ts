// src/app.ts
import fastify from 'fastify';

const app = fastify();

// Define a route
app.get('/', async (request, reply) => ({
  message: 'Hello, Fastify with TypeScript!',
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
