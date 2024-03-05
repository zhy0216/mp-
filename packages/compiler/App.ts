// config

import type { Page } from "./Page.ts";

class App {
	pages: Page[] = [];

	addPage(page: Page) {
		this.pages.push(page);
	}
}
