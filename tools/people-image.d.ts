// Hand-written because the pipeline is plain ESM JavaScript: it is a CLI first, and
// keeping it .mjs is what lets both the CLI and the admin route import the same code
// rather than the logic existing twice.
export declare const SIZE: number;
export declare function processPhoto(slug: string, input: string | Buffer): Promise<string>;
