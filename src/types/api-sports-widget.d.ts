/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "api-sports-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "data-type"?: string;
        "data-key"?: string;
        "data-sport"?: string;
        "data-theme"?: string;
        "data-lang"?: string;
        "data-team-id"?: string | number;
        "data-show-errors"?: "true" | "false";
        "data-target"?: string;
      };
    }
  }
}

export {};
