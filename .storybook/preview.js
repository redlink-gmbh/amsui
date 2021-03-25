import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: [
        "Documentation",
        [
          "Getting started",
          "Library development",
          "Client-side setup",
          "Backend integration",
          "Standalone usage",
        ],
        "SearchField",
        "Facets",
        "Results",
        "Overlay",
      ],
    },
  },
};
