import { slugify } from "transliteration";

export function cjkSlugify(unicodeStr: string): string {
    return slugify(unicodeStr, { ignore: [".", "/"] });
}