FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno cache index.ts

EXPOSE 8000

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "index.ts"]
