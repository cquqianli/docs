/* Modification to https://github.com/ozum/vuepress-bar/blob/master/lib/index.js */
import { lstatSync, readdirSync, readFileSync, existsSync } from "fs";
import type { PathLike } from "fs";
import { join, normalize, sep, dirname, basename, resolve } from "path";
import { slugify } from "transliteration";
import { titleize } from "inflection";
import type { DefaultTheme as VPT } from "vitepress";
import { SidebarItem } from "vocs";

interface NavsideOptions {
  stripNumbers?: boolean;
  maxLevel?: number;
  navPrefix?: string;
  skipEmptySidebar?: boolean;
  skipEmptyNavbar?: boolean;
  multipleSideBar?: boolean;
  addReadMeToFirstGroup?: boolean;
  mixDirectoriesAndFilesAlphabetically?: boolean;
  pinyinNav?: boolean;
  pinyinSidebar?: boolean;
}

const isDirectory = (source: PathLike) => lstatSync(source).isDirectory();
const getDirectories = (source: string) =>
  readdirSync(source).filter(
    (name) => !(name === ".vuepress") && isDirectory(join(source, name))
  );
const getFiles = (source: string) =>
  readdirSync(source).filter(
    (name) => !(name === ".vuepress") && !isDirectory(join(source, name))
  );
const hasReadme = (source: string) =>
  readdirSync(source).findIndex(
    (name) =>
      name.toLowerCase() === "readme.md" && !isDirectory(join(source, name))
  ) > -1;

/**
 * Translate chinese to pinyin.
 * Compatible with vuepress-pluin-permalink-pinyin.
 * @param {Array} sidebar
 */
function transliteratePinyin(sidebar: SidebarItem[]): SidebarItem[] {
  //if (Array.isArray(sidebar)) {
  // array
  return sidebar.map((sidebar) => {
    if (sidebar.link) {
      sidebar.link = slugify(sidebar.link, { ignore: [".", "/"] });
    } else if (sidebar.items) {
      sidebar.items = transliteratePinyin(sidebar.items) as SidebarItem[]; // TODO
    }
    return sidebar;
  });
  //} else {
  // object
  //  return sidebar;
  //}
}

/**
 * Returns name to be used in menus after removing navigation prefix, prefix numbers used for ordering and `.`, `-`, `_` and spaces.
 *
 * @param   {string}  path                  - File path to get name for.
 * @param   {NavsideOptions}  options               - Options
 * @param   {string}  options.navPrefix     - Navigation order prefix if present.
 * @param   {boolean} options.stripNumbers  - Whether to strip numbers.
 * @returns {string}                        - Name to be used in navigation.
 * @example
 * getName("/some/path/nav-01-how", { navPrefix: "nav", stripNumbers: true }); // how
 * getName("/some/path/nav.01.how", { navPrefix: "nav", stripNumbers: true }); // how
 */
function getName(path: string, options: NavsideOptions): string {
  let nameSplit = path.split(sep).reverse();
  let name = nameSplit[0] ? nameSplit[0] : nameSplit[1];
  if (name) {
    const argsIndex = name.lastIndexOf("--");
    if (argsIndex > -1) {
      name = name.substring(0, argsIndex);
    }

    //if (navPrefix) {
    //  // "nav.001.xyz" or "nav-001.xyz" or "nav_001.xyz" or "nav 001.xyz" -> "nav"
    //  const pattern = new RegExp(`^${escapeRegExp(navPrefix)}[.\-_ ]?`);
    //  name = name.replace(pattern, "");
    //}
    if (options.stripNumbers) {
      // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
      name = name.replace(/^\d+[.\-_ ]?/, "");
    }
    name = name.replace(/\.(md)/, "");

    return titleize(name.replace("-", " "));
  } else {
    return "";
  }
}

/**
 * Returns SideBar configuration for given path.
 * @param   {String}          rootDir           - Path of the directory to get navbar configuration for.
 * @param   {NavsideOptions}  options           - Options
 * @param   {String}          relativeDir       - (Used internally for recursion) Relative directory to `rootDir` to get navconfig for.
 * @param   {Number}          currentNavLevel   - (Used internally for recursion) Recursion level.
 * @returns {Array.<Object>}
 */
function generateSidebar(
  rootDir: string,
  options: NavsideOptions,
  relativeDir = "/",
  currentLevel = 1
): SidebarItem | SidebarItem[] {
  relativeDir = relativeDir.replace(/\\/g, "/");
  const baseDir = join(rootDir, relativeDir);

  if (baseDir.includes("*")) {
    const searchDir = relativeDir.split("*")[0];
    const topDirs = getDirectories(join(rootDir, searchDir)) || ["./"];
    let result = topDirs
      .map((topDir) =>
        [
          generateSidebar(
            rootDir,
            options,
            join(searchDir, topDir),
            currentLevel
          ),
        ].flat()
      )
      .reduce((result, child) => {
        return [result, child].flat().reduce((pre, cur) => {
          if (cur.items) {
            let sameTextItem = pre.find((i) => i.text === cur.text);
            if (sameTextItem) {
              (sameTextItem.items as SidebarItem[]).push(...cur.items);
            }
          } else {
            pre.push(cur); // May have same name multiple files.
          }
          return pre;
        }, [] as SidebarItem[]);
      });
    return result;
  }

  const childrenDirs = getDirectories(baseDir);
  const childrenFiles = getFiles(baseDir);
  let result;

  if (childrenDirs.length === 0) {
    // if (1 === childrenFiles.length) {
    //   result = {
    //     text: getName(baseDir, options),
    //     link: relativeDir + childrenFiles[0],
    //   };
    // } else {
    let items = childrenFiles
      .map((subFile) => ({
        text: getName(subFile, options),
        link: relativeDir + subFile.replace(/\.(md)/, ""),
      }))
      .filter(Boolean);
    result =
      currentLevel === 1 ? items : { text: getName(baseDir, options), items };
    // }
  } else if (childrenDirs.length > 0) {
    let items = childrenDirs
      .map((subDir) =>
        generateSidebar(
          rootDir,
          options,
          join(relativeDir, subDir, "/"),
          currentLevel + 1
        )
      )
      .filter(Boolean);
    //if(!Array.isArray(items)){items = [items];}
    items = items.concat(
      childrenFiles
        .map((subFile) => ({
          text: getName(subFile, options),
          link: relativeDir + subFile.replace(/\.(md)/, ""),
        }))
        .filter(Boolean)
    );
    result =
      currentLevel === 1 ? items : { text: getName(baseDir, options), items };
  }

  return result;
}

export function getSideConfig(
  rootDir?: string,
  relativeDir = "/",
  options?: NavsideOptions
): SidebarItem[] {
  rootDir =
    typeof rootDir === "string"
      ? join(resolve("./docs/pages"), rootDir)
      : join(dirname("./docs/pages"), ".");
  //console.log(rootDir);
  //rootDir = rootDir.endsWith(sep) ? rootDir.slice(0, -1) : rootDir; // Remove last / if exists.

  options = {
    stripNumbers: false,
    maxLevel: 2,
    navPrefix: "nav",
    skipEmptySidebar: true,
    skipEmptyNavbar: true,
    multipleSideBar: true,
    addReadMeToFirstGroup: true,
    mixDirectoriesAndFilesAlphabetically: true,
    pinyinNav: true,
    pinyinSidebar: true,
    ...options,
  };

  //const navItems = nav(rootDir, options);

  const result = {
    nav: null, //navItems || [],
    sidebar: generateSidebar(rootDir, options, join(relativeDir, "/")),
  };

  if (!Array.isArray(result.sidebar)) {
    result.sidebar = [result.sidebar];
  }
  if (options.pinyinSidebar) {
    result.sidebar = transliteratePinyin(result.sidebar);
  }
  return result.sidebar;
}

//export {getSideConfig};
