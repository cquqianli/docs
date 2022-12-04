#!/usr/bin/env sh
pushd `dirname $0`
python3 -m pip -q install -r requirements.txt
sphinx-autobuild docs/ docs/_build/html/ --re-ignore index.md
popd
