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

=======================================

难度有点大
本质是做一层 [SSA form](https://en.wikipedia.org/wiki/Static_single-assignment_form) 转化
实力有限 这里为 jsx 做两个限制

1. 只能使用使用 wxml 兼容的数据绑定语法
2. for 和 if 控制语句使用组建自带的 for 和 if
