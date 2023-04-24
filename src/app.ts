import buildServer from './server';

const server = buildServer();

async function main() {
  try {
    const PORT = 3333;
    await server.listen({ port: PORT });

    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
