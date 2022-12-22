# OpenGraph

Basic opengraph API to get all meta tags `metadata`, `title` and `images` for a website with the power of Cloudflare Workers.

`GET /?url=<url>` returns the following json

```ts
type Response = {
	title: string;
	metadata: string;
	images: string[];
};
```

## Demo

Please use the following with moderation: https://opengraph.weis.workers.dev/ or even better, host it yourself!

You can get started by cloning this repo and running `publish` script.

## License

MIT. Wei

For more information, please refer to the LICENSE file at the root of this repository.