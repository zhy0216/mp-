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


下面是这个项目的目标

- Next.js style router
- minimum runtime
- typescript first
- similar to react mental
- work intuitively
- fast compile


* [taro](https://github.com/nervjs/taro)
* [mpx](https://github.com/didi/mpx)
* [一种让小程序支持JSX语法的新思路](https://areslabs.github.io/alita/%E4%B8%80%E7%A7%8D%E8%AE%A9%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%94%AF%E6%8C%81JSX%E8%AF%AD%E6%B3%95%E7%9A%84%E6%96%B0%E6%80%9D%E8%B7%AF.html)
* [weact](https://github.com/haojy/weact)
* [omi](https://github.com/Tencent/omi)
