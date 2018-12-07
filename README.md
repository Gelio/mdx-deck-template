# mdx deck template

An extended template for MDX-based presentations.

## Features

- Static assets (images, videos)
- Additional components
  - `ImageWithLabel`
  - `PostponedVideo`
  - `Video`
- [Publishing to GitHub Pages](#publishing-to-github-pages)

## Development

To run the presentation deck in development mode:

```sh
npm start
```

Edit the [`deck.mdx`](deck.mdx) file to get started.

### Additional components

1. `ImageWithLabel` - displays an image with a label underneath

   ```jsx
   <ImageWithLabel label="A picture of a cat">
     <img src="./static/cat.png" />
   </ImageWithLabel>
   ```

2. `PostponedVideo` - displays a paused video and plays it after trying to move to the next slide.

   ```jsx
   <PostponedVideo src="./static/cat.gif" />
   ```

### Referencing static assets

The `static` directory will be copied to the `dist` directory upon building.

For example, to add an image that uses _static/cat.png_, use the following:

```js
<img src="./static/cat.png" alt="Cat" />
```

### Customizing the theme

The available themes are listed in the `mdx-deck` docs:

[https://github.com/jxnblk/mdx-deck/blob/master/docs/themes.md](https://github.com/jxnblk/mdx-deck/blob/master/docs/themes.md)

To use a different theme, change the name of the imported theme in `theme.js`:

```js
import { future as theme } from 'mdx-deck/themes';
```

### Code highlighting

By default, Typescript and Javascript is highlighted.

To add syntax highlighting for other languages, take a look at this section in `mdx-deck` docs:

[https://github.com/jxnblk/mdx-deck/blob/master/docs/theming.md#syntax-highlighting](https://github.com/jxnblk/mdx-deck/blob/master/docs/theming.md#syntax-highlighting)

### Slide layouts

There are multiple slide layouts provided by `mdx-deck`.

The list is available here:

[https://github.com/jxnblk/mdx-deck/blob/master/docs/layouts.md](https://github.com/jxnblk/mdx-deck/blob/master/docs/layouts.md)

## Presentation controls

Move to the next/previous slide by using the arrows on the keyboard.

You can alternatively use `PageUp` / `PageDown`.

`Alt + P` for presenter mode. You can duplicate the window to have one for the
presenter and one for the audience. The content will be in sync.

`Alt + O` for slides overview.

## Exporting

To build the presentation deck as static HTML:

```sh
npm run build
```

To export a PDF:

```sh
npm run pdf
```

To export an image of the title slide:

```sh
npm run image
```

## Publishing to GitHub Pages

To publish the slides to GitHub Pages:

```sh
npm run build
npm run publish:deck
```

Check the settings of the repository for a URL to the exported deck.

## More information

For more documentation see the [mdx-deck][] repo.

[mdx-deck]: https://github.com/jxnblk/mdx-deck

## Author

This template has been created by [Grzegorz Rozdzialik](https://github.com/Gelio).
