declare module "gray-matter" {
  interface GrayMatterFile<I = { [key: string]: any }, O = I> {
    data: I;
    content: string;
    excerpt?: string;
    orig: Buffer;
    language: string;
    matter: string;
    stringify(lang: string): string;
  }

  interface GrayMatterOption<I = { [key: string]: any }, O = I> {
    parser?: (str: string) => any;
    eval?: boolean;
    excerpt?: boolean | ((file: GrayMatterFile<I, O>, options: GrayMatterOption<I, O>) => string);
    excerpt_separator?: string;
    engines?: {
      [key: string]: (str: string) => any;
    };
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter<I = { [key: string]: any }, O = I>(
    str: string,
    options?: GrayMatterOption<I, O>
  ): GrayMatterFile<I, O>;

  export = matter;
}

