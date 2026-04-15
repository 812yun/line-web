FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno cache index.ts

CMD ["run", "--allow-net", "--allow-env", "index.ts"]
