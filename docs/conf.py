# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = '千里战队'
copyright = '2022 - 2023, 重庆大学学生交叉创新中心千里机器人战队'
author = 'Team MechaX'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.todo",
    "sphinx.ext.viewcode",
    # not a part of sphinx
    "myst_parser",
    "sphinx_design",
    "sphinx_copybutton",
    "sphinx_last_updated_by_git",
    "sphinxext.opengraph",
    "sphinxext.rediraffe", # rather than sphinxcontrib.redirect
]

myst_enable_extensions = [
    "colon_fence", # To parse correctly under non-myst parsing environment
    "dollarmath", # See more at optional.html#mathjax-and-math-parsing
    "amsmath", # See more at optional.html#mathjax-and-math-parsing
    "attrs_inline",
    "html_admonition",
    "html_image",
    #"strikethrough" # only support HTML output
]
myst_title_to_header = True

# This only generate implicity slug, see <https://myst-parser.readthedocs.io/en/stable/syntax/optional.html#auto-generated-header-anchors>
# The real slug generation process: <https://github.com/sphinx-doc/sphinx/issues/8709>
# Already replaced by `replace_docutils_make_id()`
myst_heading_anchors = 4
#import os, sys
#sys.path.insert(0, os.path.abspath('./'))
#from conf_func import slugify_conf
#myst_heading_slug_func = slugify_conf

git_last_updated_timezone = "Asia/Shanghai"

rediraffe_redirects = "redirects"
#rediraffe_template = "redirects.html"

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = 'zh_CN'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

suppress_warnings = ['toctree'] # Not working, see <https://github.com/sphinx-doc/sphinx/pull/11677>

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'furo'
html_theme_options = {
    "source_repository": "https://gitlab.com/cqumechax/docs/",
    "source_branch": "master",
    "source_directory": "docs/",
    "light_css_variables": {
    # "font-stack": "'REEJI ZhenyanGB2.0-GX', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,Segoe UI Emoji"
    }
}
# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']
html_css_files = ['fonts.css']

# User Script, thanks to <https://stackoverflow.com/a/70990772>
import os
from pathlib import Path
if True: # TODO move to app.connect() # TODO takes too much time
    index_md_content = "```{toctree}\n:maxdepth: 3\n:glob:\n*\n*/index\n```\n"
    index_md_content_without_subdir = "```{toctree}\n:maxdepth: 3\n:glob:\n*\n```\n"
    autogen_str = "<!-- auto generated by conf.py -->"
    path_needed = filter(
        lambda path: not any((part for part in path.parts if part.startswith("_"))),
        Path(".").rglob("*/")
    )
    for i in path_needed:
        if os.path.isdir(i): # TODO
            listdir_content = os.listdir(i)
            if "index.md" in listdir_content:
                with open(os.path.join(i, "index.md"), "r", encoding="utf-8") as f:
                    try:
                        if f.readline()[2 : -1] == i.name: # Avoid write-build circulation or no update
                            continue
                        elif f.readline()[: -1] != autogen_str: # Avoid write to existing file
                            continue
                    except Exception:
                        pass
            with open(os.path.join(i, "index.md"), "w", encoding="utf-8") as f:
                #if any(os.path.isdir(os.path.join(i, pp)) for pp in listdir_content): # TODO avoid warning
                #    f.write("# {}\n\n".format(i.name) + index_md_content)
                #else:
                f.write("# {}\n{}\n".format(i.name, autogen_str) + index_md_content)

def replace_docutils_make_id(app):
    """
    https://github.com/executablebooks/MyST-Parser/blob/350c6331da4738057556d966b0bfd9d98d570352/myst_parser/mdit_to_docutils/base.py#L1969
    https://github.com/daangn/cjk-slug/blob/main/src/index.ts
    https://gist.github.com/seff/993db2fd29ef07550923
    https://docutils.sourceforge.io/docutils/nodes.py # since it rarely update make_id()
    """
    from docutils import nodes
    import re, inspect
    nodes._non_id_chars = re.compile(u"[^a-z\d\-\u3040-\u309f\u30a0-\u30ff\u3400-\u4dbf\u4e00-\u9faf\uac00-\ud7a3\uff00-\uff9f]")
    exec(inspect.getsource(nodes.make_id).replace(".encode(\'ascii\', \'ignore\').decode(\'ascii\')", ""), nodes.__dict__, nodes.__dict__)

def setup(app):
    app.connect("builder-inited", replace_docutils_make_id)
    pass
