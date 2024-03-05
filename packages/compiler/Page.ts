interface PageParameters {
	name: string;
	pathName: string;
	stylesheet: string;
	templates: string[]; // ?
	script: string;
}

export class Page {
	name: string;
	pathName: string;
	stylesheet: string;
	templates: string[];
	script: string;

	constructor(option: PageParameters) {
		this.name = option.name;
		this.pathName = option.pathName;
		this.stylesheet = option.stylesheet;
		this.templates = option.templates;
		this.script = option.script;
	}
}
