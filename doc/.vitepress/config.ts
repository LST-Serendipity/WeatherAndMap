import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  
  title: "天气查询与地图展示",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '示例', link: '/API/API' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: '介绍', link: '/introduce/introduce' },
          { text: 'API封装', link: '/API/API' },
          { text: '方法封装', link: '/Method/Method' },
          { text: '天气组件', link: '/component/component_weather' },
          { text: '地图组件', link: '/component/component_map' },
         
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
