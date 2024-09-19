import { defineConfig } from "vocs";
import { cjkSlugify } from "../docs/.vitepress/cjk-slugify";
import { getSideConfig } from "../docs/.vitepress/navside-generator";
import { replaceText } from "../docs/.vitepress/navside-tools";

export default defineConfig({
  title: "重庆大学千里战队",
  titleTemplate: "%s - 千里战队文档",
  description: "",
  topNav: [
    { text: "关于战队", link: "/" },
    {
      text: "知识库",
      items: [
        { text: "基础知识", link: "/generic/basic/ren-shi-ji-qi-ren" },
        { text: "名词解释", link: "/generic/explain/" },
        { text: "外部资料", link: "/external" },
      ],
    },
    {
      text: "分组专题",
      items: [
        { text: "机械结构组", link: "/groups/me" },
        { text: "电控硬件组", link: "/groups/ee" },
        { text: "嵌软算法组", link: "/groups/ce" },
      ],
    },
    {
      text: "培训教程",
      items: [{ text: "2024夏", link: "/tutor/24su" }],
    },
  ],
  sidebar: {
    "/groups/": [
      {
        text: "机械结构组",
        items: [
          {
            text: "沛沛的机械手册",
            link: "https://cquqianli.github.io/docmech",
          },
          ...getSideConfig("", "/groups/me", { pinyinSidebar: true }),
        ],
      },
      {
        text: "电控硬件组",
        items: [...getSideConfig("", "/groups/ee", { pinyinSidebar: true })],
      },
      {
        text: "嵌软算法组",
        items: [...getSideConfig("", "/groups/ce", { pinyinSidebar: true })],
      },
    ],
    "/external/": [
      {
        text: "外部资料",
        items: [...getSideConfig("", "/external", { pinyinSidebar: true })],
      },
    ],
    "/generic/": [
      {
        text: "知识库",
        items: [
          {
            text: "基础知识",
            items: getSideConfig("", "/generic/basic/", {
              pinyinSidebar: true,
            }),
          },
          {
            text: "名词解释",
            items: getSideConfig("", "/generic/explain/", {
              pinyinSidebar: true,
            }),
          },
        ],
      },
    ],
    "/tutor/": [
      {
        text: "按时间分类",
        items: getSideConfig("", "/tutor/").map((item) => replaceText(item, 0)),
      },
      {
        text: "按组别分类",
        items: getSideConfig("", "/tutor/*/").map((item) =>
          replaceText(item, 0)
        ),
      },
    ],
  },
  vite: {
    ssr: {},
  },
  transformId(id: string) {
    let hashMarkSplitArray = id.split("#");
    if (hashMarkSplitArray.length > 1) {
      return (
        cjkSlugify(hashMarkSplitArray[0]) +
        "#" +
        hashMarkSplitArray.slice(1).join("#")
      );
    } else {
      return cjkSlugify(hashMarkSplitArray[0]);
    }
  },
});

//console.log(getSideConfig("", "/external/", { pinyinSidebar: true }))
