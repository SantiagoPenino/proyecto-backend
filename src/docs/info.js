export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coder API",
      version: "1.0.0",
      description: "API de backend Coder",
    },
    server: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/docs/*yml"],
};
