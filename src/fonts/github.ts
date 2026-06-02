import { unzipSync } from "fflate";
import { ensureDir } from "jsr:@std/fs/ensure-dir";
import { dirname } from "jsr:@std/path";
import { getCachedArchivePath, readCachedFont, writeCachedFont } from "./cache.ts";
import type { GitHubReleaseFontSpec } from "./types.ts";

export async function loadGitHubReleaseFont(spec: GitHubReleaseFontSpec): Promise<ArrayBuffer> {
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

  const data = new Uint8Array(file).buffer;
  return await writeCachedFont(spec, data, getGitHubReleaseUrl(spec));
}

export function getGitHubReleaseUrl(spec: GitHubReleaseFontSpec): string {
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
