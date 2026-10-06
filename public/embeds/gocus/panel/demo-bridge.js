// Read-only bridge for the Gocus portfolio demo. The panel's dev web bridge calls window.__gocusDemo(route, payload)
// instead of POSTing to the local Git server; answers come from demo-data.json, recorded by record.cjs.
(() => {
  let dataPromise;
  const load = () => (dataPromise ||= fetch('./demo-data.json').then((r) => r.json()));
  const readOnly = { ok: false, reason: 'action_failed', error: 'Demo snapshot: Git actions are disabled here.' };
  let preferences = {
    graphStyle: 'solid',
    workspaceOpenTargets: ['vscode', 'cursor', 'codex', 'antigravity', 'antigravityApp', 'finder', 'terminal', 'xcode'],
    showMenuBarIcon: true, showDockIcon: false, launchAtLogin: false,
    autoUpdateChannel: 'stable', autoUpdateChecks: true, autoUpdateInstall: false,
    createMergeCommit: true, autoRefreshInterval: 'off', realtimeGitRefresh: true, promptLanguage: 'en',
  };
  let target = 'vscode';

  function snapshotFor(data, view = { mode: 'all' }) {
    if (view.mode === 'current') return data.current;
    if (view.mode === 'branch') {
      if (data.branches[view.branch]) return data.branches[view.branch];
      // Unrecorded branch: show the recorded history filtered to commits on that branch.
      const commits = data.allCommits.filter((c) => (c.containedBranches || []).includes(view.branch)).slice(0, 300);
      return { ...data.snapshot, view, commits, commitPage: { ...data.snapshot.commitPage, hasMore: false } };
    }
    return data.snapshot;
  }

  function page(data, view, skip) {
    const base = snapshotFor(data, view);
    if (view?.mode && view.mode !== 'all') return { ...base, commits: [], commitPage: { ...base.commitPage, hasMore: false } };
    const commits = data.allCommits.slice(skip, skip + 300);
    return { ...base, commits, commitPage: { ...base.commitPage, skip, hasMore: skip + 300 < data.allCommits.length } };
  }

  function search(data, query, view) {
    const q = String(query || '').trim().toLowerCase();
    const hay = (c) => [c.title, c.message, c.fullHash, c.author, ...(c.refs || []).map((r) => r.name || r), ...(c.containedBranches || [])]
      .join(' ').toLowerCase();
    const pool = view?.mode === 'all' || !view ? data.allCommits : snapshotFor(data, view).commits;
    const commits = q ? pool.filter((c) => hay(c).includes(q)) : [];
    return { ok: true, query, view: view || { mode: 'all' }, commits: commits.slice(0, 300), totalMatches: commits.length, scannedCommits: pool.length, hasMore: false };
  }

  window.__gocusDemo = async (route, payload = {}) => {
    const data = await load();
    const view = payload.view || { mode: 'all' };
    switch (route) {
      case 'openRepository': case 'refresh': case 'getSnapshot': case 'switchRepository':
        return { ok: true, snapshot: snapshotFor(data, view) };
      case 'loadMoreCommits':
        return { ok: true, snapshot: page(data, view, payload.skip || 0) };
      case 'loadCommitsAround': {
        const s = snapshotFor(data, view);
        const i = Math.max(0, s.commits.findIndex((c) => c.fullHash === payload.commitHash));
        return { ok: true, snapshot: s, targetHash: payload.commitHash, targetIndex: i, pageStartIndex: 0, pageSize: s.commits.length };
      }
      case 'searchCommits': return search(data, payload.query, view);
      case 'getRecentRepositories':
        return [{ path: data.snapshot.repoPath, name: data.snapshot.repoName, repositoryKey: data.snapshot.repositoryKey }];
      case 'removeRecentRepository': return [];
      case 'getAvailableWorkspaceTargets': return preferences.workspaceOpenTargets;
      case 'getActiveWorkspaceTarget': return target;
      case 'setActiveWorkspaceTarget': target = payload.target; return target;
      case 'getAppInfo': return { version: '0.1.12', updateChannel: 'stable' };
      case 'getPreferences': return preferences;
      case 'savePreferences': preferences = { ...preferences, ...payload.preferences }; return { ok: true };
      case 'checkForUpdates': return { ok: true, message: 'Gocus 0.1.12 is the latest release.' };
      case 'openWorkspace': case 'openWorkspaceFile': case 'openRepositoryRemote':
        return { ok: true, message: 'Demo snapshot: opening apps is disabled here.' };
      default:
        return readOnly; // createBranch, merge, checkout, push, pull, fetch, cleanup, initialize…
    }
  };
})();
