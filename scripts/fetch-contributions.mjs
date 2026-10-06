// Refreshes src/githubContributions.json before each build. A failed fetch keeps the previous snapshot.
import { writeFile } from 'node:fs/promises';
const user = 'jarvisluk';
const file = new URL('../src/githubContributions.json', import.meta.url);
try {
 const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: AbortSignal.timeout(15000) });
 if (!res.ok) throw new Error(`HTTP ${res.status}`);
 const data = await res.json();
 const days = data.contributions;
 const snapshot = { user, total: data.total.lastYear, from: days[0].date, to: days.at(-1).date, counts: days.map(d => d.count), levels: days.map(d => d.level).join('') };
 await writeFile(file, JSON.stringify(snapshot) + '\n');
 console.log(`contributions: ${snapshot.total} from ${snapshot.from} to ${snapshot.to}`);
} catch (error) {
 console.warn(`contributions: kept previous snapshot (${error.message})`);
}
