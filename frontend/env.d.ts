/// <reference types="vite/client" />

declare module 'echarts' {
  const content: any
  export = content
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
