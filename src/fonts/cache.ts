import { ensureDir } from "jsr:@std/fs/ensure-dir";
import { dirname } from "jsr:@std/path/dirname";
import { join } from "jsr:@std/path/join";
import type { CachedFontMetadata, FontSpec } from "./types.ts";

const CACHE_ROOT = ".cache/opengrapher/fonts";

export async function resolveFontCacheDir(): Promise<string> {
  const projectCache = join(Deno.cwd(), CACHE_ROOT);
  await ensureDir(projectCache);
  return projectCache;
}

export async function readCachedFont(spec: FontSpec): Promise<ArrayBuffer | undefined> {
  const fontPath = await getCachedFontPath(spec);

  try {
    const data = await Deno.readFile(fontPath);
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return undefined;
    throw error;
  }
}

export async function writeCachedFont(
  spec: FontSpec,
  data: ArrayBuffer,
  sourceUrl: string,
): Promise<ArrayBuffer> {
  const fontPath = await getCachedFontPath(spec);
  await ensureDir(dirname(fontPath));
  await Deno.writeFile(fontPath, new Uint8Array(data));

  const metadata: CachedFontMetadata = {
    family: spec.family,
    style: spec.style,
    weight: spec.weight,
    provider: spec.provider,
    version: spec.version,
    sourceUrl,
    path: fontPath,
    checksum: await checksum(data),
  };

  await Deno.writeTextFile(`${fontPath}.json`, `${JSON.stringify(metadata, null, 2)}\n`);

  return data;
}

export async function getCachedFontPath(spec: FontSpec): Promise<string> {
  const cacheDir = await resolveFontCacheDir();
  const file = spec.provider === "fontsource" ? spec.file : spec.path;
  const extension = file.split(".").at(-1) ?? "font";
  const filename = basename(file).replace(new RegExp(`\\.${extension}$`), "");
  const name = [spec.provider, spec.family, spec.version, spec.weight, spec.style, filename]
    .map(slugify)
    .join("-");

  return join(cacheDir, spec.provider, spec.version, `${name}.${extension}`);
}

export async function getCachedArchivePath(
  provider: string,
  version: string,
  asset: string,
): Promise<string> {
  const cacheDir = await resolveFontCacheDir();
  return join(cacheDir, provider, version, slugify(asset));
}

async function checksum(data: ArrayBuffer): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function basename(path: string): string {
  return path.split("/").at(-1) ?? path;
}

function slugify(value: string | number): string {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");
}
