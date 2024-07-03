import { FastifyReply, FastifyRequest } from "fastify";

export async function jwtValidate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const routeFreeList = ["POST-/user", "POST-/user/signin"];
    const validadeRoute = `${request.method}-${request.routeOptions.url}`;

    if (routeFreeList.includes(validadeRoute)) return;
    // const route = request.routeOptions.url;
    // const method = request.method;

    // if (route === "/user" && method === "POST") return;

    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
