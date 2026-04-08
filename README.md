# line-web

## run
`deno task dev`

## secret
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj '/CN=localhost'`

## deploy
- Deno Deploy では本番 TLS をアプリ側で扱う必要はありません。
- `localhost` での開発時のみ `./secret/cert.pem` / `./secret/key.pem` を使用します。
- Deno Deploy へのデプロイ例:

```bash
deno deploy --project=<your-project-name>
```

## local dev
`localhost` で起動する場合:

```bash
deno task dev
```