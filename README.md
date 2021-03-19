# releaselog-action

This action sends your commit information to releaselog.app

## Authentication

Create a [GitHub secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) with API key named `releaselog_api_key`, and then pass it to action as `api_key` as shown below.

```
- id: releaselog
  uses: releaselog/releaselog-action@v1
  with:
    api_key: ${{ secrets.releaselog_api_key }}
```

## For developing

Build:

    ncc build index.js --license licenses.txt