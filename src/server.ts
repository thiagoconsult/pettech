import { env } from "@/env";
import { app } from "@/app";

app
  .listen({
    host: "localhost",
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server started at port #${env.PORT}`);
  });
