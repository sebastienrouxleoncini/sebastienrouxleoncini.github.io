# sebastienrouxleoncini.github.io

Personal engineering portfolio of Sébastien Roux — mechanical engineer (EPFL),
robotics hardware design & validation.

**Live site:** https://sebastienrouxleoncini.github.io

## Structure

```
index.html   → the whole single-page site (hero, about, 8 projects, skills, contact)
style.css    → all styling (palette ported from the LaTeX portfolio)
figures/     → images and renders
```

## How to edit

This is a plain HTML/CSS site — no build step. To preview locally, just open
`index.html` in a browser (double-click it), or run a local server:

```bash
cd sebastienrouxleoncini.github.io
python3 -m http.server 8000
# then open http://localhost:8000
```

## How to publish changes

```bash
git add -A
git commit -m "describe the change"
git push
```

GitHub Pages rebuilds automatically within ~30 seconds.

## Adding a new project

Copy an existing `<section class="project">…</section>` block in `index.html`,
change the id, number, title, text, and image paths. Drop new images into `figures/`.
