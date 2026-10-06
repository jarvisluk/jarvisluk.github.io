// Record a read-only Git snapshot of a repository for the Gocus portfolio demo.
// Usage: node record.cjs <gocus-checkout> <repository> <out.json>
// Uses Gocus's own read functions (git log/status/worktree list); nothing in the repository is changed.
const path = require('node:path');
const fs = require('node:fs');
const [gocus, repo, out] = process.argv.slice(2);
const git = require(path.join(gocus, 'electron/lib/git.cjs'));
const view = (v) => git.normalizeView(v);
const strip = (s) => ({ ...s, lastFetchedAt: null });
(async () => {
  const all = [];
  let skip = 0, first;
  for (;;) {
    const s = await git.readGitSnapshot(repo, view({ mode: 'all' }), { skip });
    if (!first) first = s;
    all.push(...s.commits);
    if (!s.commitPage?.hasMore || skip > 2000) break;
    skip += s.commits.length;
  }
  const current = await git.readGitSnapshot(repo, view({ mode: 'current' }));
  const local = first.branches.filter((b) => b.type === 'local').map((b) => b.name);
  const picks = ['main', 'develop'].filter((n) => local.includes(n));
  const branches = {};
  for (const name of picks) {
    try { branches[name] = strip(await git.readGitSnapshot(repo, view({ mode: 'branch', branch: name }))); } catch {}
  }
  const data = {
    recordedAt: new Date().toISOString(),
    snapshot: strip(first),
    allCommits: all,
    current: strip(current),
    branches,
  };
  fs.writeFileSync(out, JSON.stringify(data));
  console.log('commits', all.length, 'branch views', Object.keys(branches).join(', '), 'bytes', fs.statSync(out).size);
})();
