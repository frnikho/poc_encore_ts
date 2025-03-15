FROM oven/bun:1.2.5-slim

COPY package.json bun.lock drizzle.config.ts ./
COPY migrations ./migrations

RUN bun install

ENTRYPOINT ["bun", "run", "migrate"]