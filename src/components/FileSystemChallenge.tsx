import { useEffect, useMemo, useRef, useState } from 'react';

type TestCase = {
  name: string;
  operations: [method: string, args: unknown[]][];
  expected: unknown[];
};

type TestResult = {
  name: string;
  passed: boolean;
  duration: number;
  expected?: unknown[];
  actual?: unknown[];
  error?: string;
};

const STARTER_CODE = `class FileSystem {
  constructor() {
    // Store files in memory. You may change this data structure.
    this.files = new Map();
  }

  createFile(path, size) {
    // Return false when the path already exists.
  }

  getFileSize(path) {
    // Return null when the file does not exist.
  }

  deleteFile(path) {
    // Delete a file and return its size, or null.
  }

  copyFile(source, destination) {
    // Copy an existing file to a new path.
  }

  findFiles(prefix, suffix) {
    // Return ["path(size)"] sorted by size DESC, then path ASC.
  }
}`;

const SOLUTION_CODE = `class FileSystem {
  constructor() {
    this.files = new Map();
  }

  createFile(path, size) {
    if (this.files.has(path)) return false;
    this.files.set(path, size);
    return true;
  }

  getFileSize(path) {
    return this.files.get(path) ?? null;
  }

  deleteFile(path) {
    const size = this.getFileSize(path);
    if (size === null) return null;
    this.files.delete(path);
    return size;
  }

  copyFile(source, destination) {
    if (!this.files.has(source) || this.files.has(destination)) return false;
    this.files.set(destination, this.files.get(source));
    return true;
  }

  findFiles(prefix, suffix) {
    return [...this.files]
      .filter(([path]) => path.startsWith(prefix) && path.endsWith(suffix))
      .sort(([pathA, sizeA], [pathB, sizeB]) => sizeB - sizeA || pathA.localeCompare(pathB))
      .map(([path, size]) => \`\${path}(\${size})\`);
  }
}`;

const TESTS: TestCase[] = [
  { name: 'creates and reads files', operations: [['createFile', ['/notes.txt', 120]], ['getFileSize', ['/notes.txt']], ['getFileSize', ['/missing.txt']]], expected: [true, 120, null] },
  { name: 'rejects duplicate paths', operations: [['createFile', ['/app.js', 42]], ['createFile', ['/app.js', 99]], ['getFileSize', ['/app.js']]], expected: [true, false, 42] },
  { name: 'supports zero-byte files', operations: [['createFile', ['/empty', 0]], ['getFileSize', ['/empty']], ['deleteFile', ['/empty']], ['getFileSize', ['/empty']]], expected: [true, 0, 0, null] },
  { name: 'deletes existing files', operations: [['createFile', ['/tmp/cache', 512]], ['deleteFile', ['/tmp/cache']], ['deleteFile', ['/tmp/cache']]], expected: [true, 512, null] },
  { name: 'copies files safely', operations: [['createFile', ['/a.txt', 8]], ['copyFile', ['/a.txt', '/b.txt']], ['copyFile', ['/a.txt', '/b.txt']], ['getFileSize', ['/b.txt']]], expected: [true, true, false, 8] },
  { name: 'rejects a missing copy source', operations: [['copyFile', ['/ghost', '/copy']], ['getFileSize', ['/copy']]], expected: [false, null] },
  { name: 'filters and sorts search results', operations: [['createFile', ['/docs/b.md', 20]], ['createFile', ['/docs/a.md', 20]], ['createFile', ['/docs/c.md', 40]], ['createFile', ['/img/c.png', 90]], ['findFiles', ['/docs/', '.md']]], expected: [true, true, true, true, ['/docs/c.md(40)', '/docs/a.md(20)', '/docs/b.md(20)']] },
  { name: 'returns an empty search result', operations: [['createFile', ['/notes.txt', 10]], ['findFiles', ['/docs/', '.md']]], expected: [true, []] },
];

export default function FileSystemChallenge() {
  const [source, setSource] = useState(STARTER_CODE);
  const [results, setResults] = useState<TestResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [activePanel, setActivePanel] = useState<'tests' | 'console'>('tests');
  const runId = useRef(0);
  const workerRef = useRef<Worker | null>(null);
  const timerRef = useRef<number | null>(null);
  const lineNumbers = useMemo(() => Array.from({ length: source.split('\n').length }, (_, index) => index + 1).join('\n'), [source]);
  const passed = results.filter((result) => result.passed).length;

  function stopCurrentRun() {
    runId.current += 1;
    workerRef.current?.terminate();
    workerRef.current = null;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  }

  useEffect(() => () => {
    workerRef.current?.terminate();
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  function runTests() {
    stopCurrentRun();
    const currentRun = ++runId.current;
    setRunning(true);
    setResults([]);
    setLogs([]);
    setActivePanel('tests');

    let worker: Worker;
    try {
      worker = new Worker(new URL('../workers/filesystemRunner.ts', import.meta.url), { type: 'module' });
      workerRef.current = worker;
    } catch (error) {
      setResults([{ name: 'Runner error', passed: false, duration: 0, error: error instanceof Error ? error.message : String(error) }]);
      setRunning(false);
      return;
    }

    timerRef.current = window.setTimeout(() => {
      if (currentRun !== runId.current) return;
      worker.terminate();
      workerRef.current = null;
      timerRef.current = null;
      setResults([{ name: 'Execution timeout', passed: false, duration: 1500, error: 'Execution exceeded the 1.5s time limit.' }]);
      setRunning(false);
    }, 1500);

    worker.onmessage = (event: MessageEvent<{ results: TestResult[]; logs: string[] }>) => {
      if (currentRun !== runId.current) return;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      worker.terminate();
      workerRef.current = null;
      setResults(event.data.results);
      setLogs(event.data.logs);
      setRunning(false);
    };
    worker.onerror = (event) => {
      if (currentRun !== runId.current) return;
      event.preventDefault();
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      worker.terminate();
      workerRef.current = null;
      setResults([{ name: 'Runner error', passed: false, duration: 0, error: event.message || 'The test worker failed unexpectedly.' }]);
      setRunning(false);
    };
    worker.onmessageerror = () => {
      if (currentRun !== runId.current) return;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      worker.terminate();
      workerRef.current = null;
      setResults([{ name: 'Runner error', passed: false, duration: 0, error: 'The runner returned data that could not be read.' }]);
      setRunning(false);
    };
    worker.postMessage({ source, tests: TESTS });
  }

  return <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-solid)] shadow-2xl shadow-black/10">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">FS</span>
        <div><p className="text-sm font-semibold">In-memory File System</p><p className="text-[11px] text-[var(--muted)]">JavaScript · 1.5s limit · 128 MB</p></div>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => { stopCurrentRun(); setSource(STARTER_CODE); setResults([]); setLogs([]); }} className="rounded-xl border border-[var(--line)] px-3 py-2 text-xs font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]">Reset</button>
        <button type="button" onClick={() => { stopCurrentRun(); setSource(SOLUTION_CODE); setResults([]); setLogs([]); }} className="rounded-xl border border-[var(--line)] px-3 py-2 text-xs font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]">Load example</button>
        <button type="button" disabled={running} aria-busy={running} onClick={runTests} className="min-w-24 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{running ? 'Running…' : '▶ Run tests'}</button>
      </div>
    </div>

    <div className="grid min-h-[680px] lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="border-b border-[var(--line)] p-5 lg:border-r lg:border-b-0">
        <p className="eyebrow">Challenge</p>
        <h2 className="mt-2 text-xl font-semibold">Build a virtual file system</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Implement the five methods below. Paths are plain strings; folders do not need to be created separately.</p>
        <div className="mt-6 space-y-4 text-sm">
          <Requirement signature="createFile(path, size)" detail="Add a unique file and return a boolean." />
          <Requirement signature="getFileSize(path)" detail="Return its size or null." />
          <Requirement signature="deleteFile(path)" detail="Remove it and return its old size." />
          <Requirement signature="copyFile(source, destination)" detail="Copy without overwriting." />
          <Requirement signature="findFiles(prefix, suffix)" detail="Filter, format, and sort matches." />
        </div>
        <div className="mt-7 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-xs leading-5 text-[var(--muted)]"><strong className="text-[var(--text)]">Sandbox note</strong><br />Your code runs in a disposable Web Worker. The runner terminates infinite loops after 1.5 seconds.</div>
      </aside>

      <div className="grid min-w-0 grid-rows-[minmax(420px,1fr)_260px]">
        <section className="flex min-h-0 flex-col bg-[#0d1117]" aria-label="Code editor">
          <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 text-xs text-slate-400"><span className="text-slate-200">solution.js</span><span>JavaScript</span></div>
          <div className="grid min-h-0 flex-1 grid-cols-[48px_1fr] overflow-hidden font-mono text-[13px] leading-6">
            <pre aria-hidden="true" className="m-0 select-none overflow-hidden border-r border-white/10 bg-[#0a0e14] px-3 py-4 text-right text-slate-600">{lineNumbers}</pre>
            <textarea aria-label="JavaScript solution" value={source} onChange={(event) => setSource(event.target.value)} spellCheck={false} className="h-full min-h-[420px] w-full resize-none overflow-auto bg-transparent p-4 text-slate-200 caret-cyan-400 outline-none [tab-size:2]" />
          </div>
        </section>

        <section className="min-h-0 border-t border-[var(--line)]" aria-live="polite">
          <div className="flex h-11 items-center justify-between border-b border-[var(--line)] px-4">
            <div className="flex h-full gap-5 text-xs font-medium">
              <button type="button" onClick={() => setActivePanel('tests')} className={activePanel === 'tests' ? 'border-b-2 border-[var(--accent)] text-[var(--text)]' : 'text-[var(--muted)]'}>Test results</button>
              <button type="button" onClick={() => setActivePanel('console')} className={activePanel === 'console' ? 'border-b-2 border-[var(--accent)] text-[var(--text)]' : 'text-[var(--muted)]'}>Console {logs.length ? `(${logs.length})` : ''}</button>
            </div>
            {!!results.length && <span className={`text-xs font-semibold ${passed === results.length ? 'text-emerald-500' : 'text-rose-500'}`}>{passed}/{results.length} passed</span>}
          </div>
          <div className="h-[215px] overflow-auto p-4">
            {running && <div className="flex items-center gap-3 text-sm text-[var(--muted)]"><span className="size-4 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />Executing in sandbox…</div>}
            {!running && activePanel === 'tests' && !results.length && <p className="text-sm text-[var(--muted)]">Run the tests to validate your implementation.</p>}
            {!running && activePanel === 'tests' && <div className="space-y-2">{results.map((result, index) => <details key={`${result.name}-${index}`} className="rounded-xl border border-[var(--line)] px-3 py-2" open={!result.passed}>
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm"><span className={result.passed ? 'text-emerald-500' : 'text-rose-500'}>{result.passed ? '●' : '×'}</span><span className="font-medium">{result.name}</span><span className="ml-auto text-[11px] text-[var(--muted)]">{result.duration.toFixed(1)} ms</span></summary>
              {!result.passed && <div className="mt-2 border-t border-[var(--line)] pt-2 font-mono text-xs leading-5 text-[var(--muted)]">{result.error ? <p className="text-rose-500">{result.error}</p> : <><p>Expected: {JSON.stringify(result.expected)}</p><p>Received: {JSON.stringify(result.actual)}</p></>}</div>}
            </details>)}</div>}
            {!running && activePanel === 'console' && <pre className="m-0 whitespace-pre-wrap font-mono text-xs leading-6 text-[var(--muted)]">{logs.length ? logs.join('\n') : 'Console output will appear here.'}</pre>}
          </div>
        </section>
      </div>
    </div>
  </div>;
}

function Requirement({ signature, detail }: { signature: string; detail: string }) {
  return <div><code className="text-xs font-semibold text-[var(--accent)]">{signature}</code><p className="mt-1 text-xs leading-5 text-[var(--muted)]">{detail}</p></div>;
}