import type { Page } from "./Page.ts";
import { Project } from "ts-morph";



export const compilePage = (src:string): Page => {
	// { tsConfigFilePath: "path/to/tsconfig.json" }
	const project = new Project({useInMemoryFileSystem: true});
	const sourceFile = project.createSourceFile("myNewFile.ts", src);
	const classes = sourceFile.getClasses().filter(cls => cls.isDefaultExport());
	const cls = classes[0]
	if(!cls) {
		throw new Error("you need to export a default class as page, see docs...")
	}

	const structure = cls.getStructure()

	return {} as Page;
};

// https://github.com/LeDDGroup/typescript-transform-jsx/tree/master
