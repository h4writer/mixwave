import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./env.js";
import { contract } from "./contract.js";
import { initServer } from "@ts-rest/fastify";
import { generateOpenApi } from "@ts-rest/open-api";
import { createSession, getSession } from "./session.js";
import {
  formatMasterPlaylist,
  formatMediaPlaylist,
  formatInterstitialsJson,
} from "./playlist.js";

async function buildServer() {
  const app = Fastify();

  app.register(cors);

  const s = initServer();

  const router = s.router(contract, {
    postSession: async ({ request, body }) => {
      const session = await createSession(body);

      return {
        status: 200,
        body: {
          url: `${request.protocol}://${request.hostname}/session/${session.id}/master.m3u8`,
          session,
        },
      };
    },
    getMasterPlaylist: async ({ params, reply }) => {
      const session = await getSession(params.sessionId);
      const response = await formatMasterPlaylist(session);

      reply.type("application/x-mpegURL");

      return {
        status: 200,
        body: response,
      };
    },
    getMediaPlaylist: async ({ params, reply }) => {
      const session = await getSession(params.sessionId);

      const response = await formatMediaPlaylist(session, params.path);

      reply.type("application/x-mpegURL");

      return {
        status: 200,
        body: response,
      };
    },
    getInterstitialsList: async ({ query, params }) => {
      const session = await getSession(params.sessionId);
      return {
        status: 200,
        body: await formatInterstitialsJson(session, query.offset),
      };
    },
    getSpec: async () => {
      return {
        status: 200,
        body: generateOpenApi(contract, {
          info: {
            title: "Stitcher",
            version: "1.0.0",
          },
        }),
      };
    },
  });

  app.register(s.plugin(router));

  return app;
}

async function main() {
  const app = await buildServer();

  await app.listen({ host: env.HOST, port: env.PORT });
}

main();
