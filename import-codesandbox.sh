#!/bin/sh

zipfile=$1
targetname=$2
category=$3

zipdir="./${zipfile/\.zip/}"

unzip "$zipfile" -d "$zipdir"

rm -rf "$zipdir/.codesandbox"

mv "$zipdir" "sandboxes/$category/$targetname"

pnpm run sandboxes:list

pnpm install
