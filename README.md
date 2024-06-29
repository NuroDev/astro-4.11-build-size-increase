# Bug Reproduction

This repository is a minimal reproduction of a bug I noticed since the release of version 4.11+ in `astro`.

A few notes going into this however:

- The bug I primarily noticed when upgrading the repository for my personal site so the unique elements here are matching closely to that.
- The Cloudflare adapter is used as that is both what is used for my personal site & the key area where this size increase is causing issues since Cloudflare Pages has a size limit.
- Satori is added, similar to my personal site, to dynamically generate OpenGraph images for pages.

## Usage

To see the key differences in size you can clone the repository, install dependencies with `pnpm install` and then run `pnpm build` to see the output.

For the default branch, `4.11`, which is running `astro` version `4.11.3` the `dist/` output directory is 1.1 megabytes in size.

If you switch to the `4.10.2` branch however, run `pnpm install` to switch versions and run a new build with `pnpm build`, the `dist/` output directory is 400 kilobytes in size.

## Disk Usage

`4.11`:

```bash
1.1M └─┬ dist
1.1M   ├─┬ _worker.js
1.0M   │ ├─┬ chunks
740K   │ │ ├── og.png_WpHHH3Va.mjs
144K   │ │ ├── asm_B01tAiv6.mjs
 88K   │ │ ├─┬ astro
 72K   │ │ │ ├── server_BO2VP7fw.mjs
 16K   │ │ │ └── env-setup_DQkCwUzq.mjs
 28K   │ │ ├── _@astro-renderers_DdsZeMx4.mjs
 20K   │ │ ├── _@astrojs-manifest_LFh70i04.mj
4.0K   │ │ └── index_CDJmnF1l.mjs
 80K   │ ├── index.js
 12K   │ ├─┬ pages
4.0K   │ │ ├── og.png.astro.mjs
4.0K   │ │ ├── index.astro.mjs
4.0K   │ │ └── _image.astro.mjs
4.0K   │ ├── renderers.mjs
4.0K   │ ├── manifest_vBsjPyow.mjs
4.0K   │ └── _noop-middleware.mjs
 24K   ├─┬ _astro
 12K   │ ├── client.BR24tkAJ.js
8.0K   │ ├── signals.module.HmMX0rop.js
4.0K   │ └── client.BmKWqeu1.js
 12K   ├── og.png
4.0K   ├── favicon.svg
4.0K   └── _routes.json
```

`4.10.2`:

```bash
420K └─┬ dist
376K   ├─┬ _worker.js
252K   │ ├─┬ chunks
144K   │ │ ├── asm_B01tAiv6.mjs
 84K   │ │ ├── astro_GQeINQaX.mjs
8.0K   │ │ ├─┬ pages
4.0K   │ │ │ ├── index_NGKOfVEC.mjs
4.0K   │ │ │ └── image-endpoint_nxDOIah1.mjs
4.0K   │ │ ├── prerender_8tHxMGrz.mjs
4.0K   │ │ ├── og_XK9wvbH2.mjs
4.0K   │ │ ├── index_mwIjEo2c.mjs
4.0K   │ │ └── image-endpoint_RvDj3-CK.mjs
 80K   │ ├── index.js
 20K   │ ├── renderers.mjs
 20K   │ ├── manifest_BsOtgiX8.mjs
4.0K   │ └── _noop-middleware.mjs
 24K   ├─┬ _astro
 12K   │ ├── client.BR24tkAJ.js
8.0K   │ ├── signals.module.HmMX0rop.js
4.0K   │ └── client.BmKWqeu1.js
 12K   ├── og.png
4.0K   ├── favicon.svg
4.0K   └── _routes.json
```
