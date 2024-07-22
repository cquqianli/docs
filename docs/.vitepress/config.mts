import { defineConfig, defineConfigWithTheme, DefaultTheme } from "vitepress";
import { getSideConfig } from "./navside-generator";
import { cjkSlugify } from "./cjk-slugify";

export default defineConfigWithTheme<DefaultTheme.Config>({
  lang: "zh-cn",
  title: "千里战队文档",
  titleTemplate: ":title - 千里战队文档",
  description: "",
  srcDir: "groups",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "重庆大学千里战队",
    nav: [
      { text: "关于战队", link: "/" },
      {
        text: "分组专题",
        items: [
          { text: "机械结构组", link: "/groups/me" },
          { text: "电控硬件组", link: "/groups/ee" },
          { text: "嵌软算法组", link: "/groups/ce" },
        ],
      },
    ],
    sidebar: {
      "/groups/me": [
        {
          text: "机械结构组",
          items: [
            {
              text: "沛沛的机械手册",
              link: "https://cquqianli.github.io/docmech",
            },
            //...getSideConfig("docs/groups/me", { pinyinSidebar: true }),
          ],
        },
      ],
    },
    lastUpdated: {
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC+8",
      },
    },
  },
  transformId(id) {
    console.log(id);
    return cjkSlugify(id);
  },
  transformHead(context){
    //context.page = cjkSlugify(context.page);
    //console.log(context);
  },
  transformPageData(pageData) {
  },
  transformHtml(code, id, context) {
    console.log(id);
  }
});
//console.log(getSideConfig("/groups/me", {pinyinSidebar: true}));