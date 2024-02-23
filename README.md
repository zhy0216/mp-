# mplus

微信小程序框架

我看了 [taro](https://github.com/nervjs/taro) 和 [mpx](https://github.com/didi/mpx)
看的时候产生有很多自己的想法 所以就尝试也写一个
我的思路更像 mpx，但又希望更符合 react
所以大概是各种借鉴
因为我本身没有写小程序的需求 所以这只是我 yy 出来的工具

我这个项目应该是会直接编译到小程序的生产物
但因为小程序缺少全局管理的store
所以我会引入类似 [jotai](https://jotai.org/) 的状态管理库
会有一个比较小的运行时

我尝试用 bun 做这个项目的 bundler
之前没试过 不行的话再试试 vite

下面是这个项目的目标
* Next.js style router
* minimum runtime
* typescript first
* similar to react mental
* work intuitively
* fast compile


