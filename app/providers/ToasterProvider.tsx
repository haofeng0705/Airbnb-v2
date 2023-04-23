// 为什么使用包裹的形式: 因为 Toaster 是一个外部库, 没有适配 nextjs的 app router,
// 是一个 client 组件, 包裹后才能在 layout.tsx 中直接使用
'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster />
   );
}

export default ToasterProvider;
