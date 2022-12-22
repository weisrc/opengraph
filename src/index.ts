const headers = {
	"Access-Control-Allow-Origin": "*",
};

export default {
	async fetch(request: Request): Promise<Response> {
		const params = new URL(request.url).searchParams;
		const url = params.get("url");
		if (!url) {
			return new Response("No url provided", { status: 400, headers });
		}
		const metadata: Record<string, string> = {};
		const images = new Set<string>();
		let title: string | undefined;

		const site = await fetch(url);

		const metaHandler = (element: Element) => {
			const name =
				element.getAttribute("name") ?? element.getAttribute("property");
			const content = element.getAttribute("content");
			if (!name || !content) return;
			metadata[name] = content;
		};

		const imgHandler = (element: Element) => {
			const src = element.getAttribute("src");
			if (!src) return;
			images.add(src);
		};

		const titleHandler = (text: Text) => {
			if (title) return;
			title = text.text;
		};

		await new HTMLRewriter()
			.on("meta", { element: metaHandler })
			.on("img", { element: imgHandler })
			.on("title", { text: titleHandler })
			.transform(site)
			.arrayBuffer();

		return new Response(
			JSON.stringify({ title, metadata, images: [...images] }),
			{ headers }
		);
	},
};
