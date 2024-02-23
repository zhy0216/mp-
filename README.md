# mplus

微信小程序框架

我看了 [taro](https://github.com/nervjs/taro) 和 [mpx](https://github.com/didi/mpx)
看的时候产生有很多自己的想法 所以就尝试也写一个
我的思路更像 mpx，但又希望更符合 react
所以大概是各种借鉴
因为我本身没有写小程序的需求 所以这只是我 yy 出来的工具

我这个项目应该是会直接编译到小程序的生产物
但因为小程序缺少全局管理的 store
所以我会引入类似 [jotai](https://jotai.org/) 的状态管理库
会有一个比较小的运行时

我尝试用 bun 做这个项目的 bundler
之前没试过 不行的话再试试 vite

下面是这个项目的目标

- Next.js style router
- minimum runtime
- typescript first
- similar to react mental
- work intuitively
- fast compile

### 动态 jsx 转静态 wxml 的原理

- 我会用 <If> 和 <For> 来代替 wx:if 和 wx:for，这样能保证生成的 template 的结构总是一致的
- 因为 wxml 里面的变量不能 js 计算

对于

```
<Node
    prop1={a.b()}
/>
```

编译我们会给 Node 设定一个 id， 比如 123
其下的 props 都会生成 Node123props 的变量
然后给 Node 传递就可以了

- 我们假设每一个 Node 只有一个 slot 先
  - 对于下面的 Node

```
<Node
    prop1={a.b()}
>
    <ChildNode prop1={a.c()} />
</Node>
```

我们把他转成 h 函数先

```
h("Node", {
    prop1: a.b(),
    children: h("childNode", {
        prop1: a.c()
        }, undefined, false, undefined, this
    )
  }, undefined, false, undefined, this
)
```

注意第一个 h 和 第二个 h 之间是没有副作用的

所以我们可以改写成

```
const Node123children = h("childNode", {
    prop1: a.c()
    }, undefined, false, undefined, this
)

const Node123 = h("Node", {
    prop1: a.b(),
    children: Node123children,
  }, undefined, false, undefined, this
)
```

改写成这样 只用生成对应的 templates
这样就回到了之前提到的点
只用转化 props 的动态的情况 而不用担心有 slot 的情况
