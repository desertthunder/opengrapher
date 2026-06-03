import { unzipSync } from "fflate";
import { ensureDir } from "jsr:@std/fs@1.0.24/ensure-dir";
import { dirname } from "jsr:@std/path@1.1.5/dirname";
import { getCachedArchivePath, readCachedFont, writeCachedFont } from "./cache.ts";
import type {
  FontPreset,
  FontSourceSpec,
  FontSpec,
  GitHubReleaseFontSpec,
  ResolvedFont,
} from "./types.ts";

export async function resolveFonts(preset: FontPreset): Promise<ResolvedFont[]> {
  return await Promise.all(preset.fonts.map(resolveFont));
}

async function resolveFont(spec: FontSpec): Promise<ResolvedFont> {
  const data = spec.provider === "fontsource"
    ? await loadFontsourceFont(spec)
    : await loadGitHubReleaseFont(spec);

  return { name: spec.family, data, weight: spec.weight, style: spec.style };
}

async function loadFontsourceFont(spec: FontSourceSpec): Promise<ArrayBuffer> {
  const cached = await readCachedFont(spec);
  if (cached) return cached;

  const url = getFontsourceUrl(spec);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${spec.family} from Fontsource: ${url} (${response.status})`);
  }

  return await writeCachedFont(spec, await response.arrayBuffer(), url);
}

function getFontsourceUrl(spec: FontSourceSpec): string {
  return `https://cdn.jsdelivr.net/npm/${spec.package}@${spec.version}/files/${spec.file}`;
}

async function loadGitHubReleaseFont(spec: GitHubReleaseFontSpec): Promise<ArrayBuffer> {
  const cached = await readCachedFont(spec);
  if (cached) return cached;

  const archive = await readOrFetchArchive(spec);
  const files = unzipSync(new Uint8Array(archive));
  const file = files[spec.path];

  if (!file) {
    const matches = Object.keys(files).filter((path) =>
      path.endsWith(spec.path.split("/").at(-1) ?? spec.path)
    );
    const hint = matches.length > 0 ? ` Did you mean one of: ${matches.join(", ")}?` : "";
    throw new Error(`Could not find ${spec.path} in ${spec.asset}.${hint}`);
  }

  return await writeCachedFont(spec, new Uint8Array(file).buffer, getGitHubReleaseUrl(spec));
}

function getGitHubReleaseUrl(spec: GitHubReleaseFontSpec): string {
  return `https://github.com/${spec.owner}/${spec.repo}/releases/download/${spec.version}/${spec.asset}`;
}

async function readOrFetchArchive(spec: GitHubReleaseFontSpec): Promise<ArrayBuffer> {
  const archivePath = await getCachedArchivePath(spec.provider, spec.version, spec.asset);

  try {
    const cached = await Deno.readFile(archivePath);
    return cached.buffer.slice(cached.byteOffset, cached.byteOffset + cached.byteLength);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) throw error;
  }

  const url = getGitHubReleaseUrl(spec);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch GitHub release asset: ${url} (${response.status})`);
  }

  const data = await response.arrayBuffer();
  await ensureDir(dirname(archivePath));
  await Deno.writeFile(archivePath, new Uint8Array(data));

  return data;
}
