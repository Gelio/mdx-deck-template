import { themes } from "mdx-deck";

export const theme = {
  ...themes.prism,
  styles: {
    img: {
      // NOTE: overrides default mdx-deck styles
      // that stretch the image to 100vw and 100vh.
      width: "auto",
      objectFit: "contain",
      height: "auto",
    },
  },
};
