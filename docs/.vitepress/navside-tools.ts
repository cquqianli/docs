import { SidebarItem } from "vocs";

export function replaceText(item: SidebarItem, depth: number = 0) {
  if (item.text) {
    item.text = item.text.replace(/(sp|su|f|w|Ce|Ee|Me)/, function (word) {
      // https://stackoverflow.com/questions/10726638
      return {
        sp: " 春",
        su: " 夏",
        f: " 秋",
        w: " 冬",
        Ce: "视觉算法组",
        Ee: "电控硬件组",
        Me: "机械结构组",
      }[word] as string;
    });
    if (depth === 0 && /\d/.test(item.text[0])) {
      item.text = "20" + item.text;
    }
  }
  if (item.items) {
    item.items = item.items.map((subItem) => replaceText(subItem, depth + 1));
  }
  return item;
}
