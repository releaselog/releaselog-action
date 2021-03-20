#!/bin/sh
npm run build
git commit -am "build"
# redo tag v0.1
git tag -fa -m 'testing' v0.1
# force push tag
git push --tags --force