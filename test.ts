const transpiler = new Bun.Transpiler({
	loader: "tsx",
});

const code = `
import * as whatever from "./whatever.ts"
export default function Home(props: {title: string}){
  return <node
    prop1={a.b()}
>
    <childNode prop1={a.c()} />
</node>
}`;

console.log(transpiler.transformSync(code));
console.log("==========================");
console.log(transpiler.scan(code));
console.log("==========================");
console.log(transpiler.scanImports(code));
