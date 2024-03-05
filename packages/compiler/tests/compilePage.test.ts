import { test, expect } from "bun:test";
import { compilePage } from "../helper.ts";
test("compile a simple page", () => {
	const src = `
		export default class Page {
			render() {
				return <View>hello, world</View>
			}
		}
	`;
	expect(compilePage(src)).toMatchSnapshot();
});
