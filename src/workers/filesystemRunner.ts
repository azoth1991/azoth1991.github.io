type Operation = [method: string, args: unknown[]];

type TestCase = {
  name: string;
  operations: Operation[];
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

const scope = globalThis as unknown as {
  onmessage: ((event: MessageEvent<{ source: string; tests: TestCase[] }>) => void) | null;
  postMessage: (value: { results: TestResult[]; logs: string[] }) => void;
};

scope.onmessage = ({ data }) => {
  const logs: string[] = [];
  let omittedLogs = 0;
  const originalConsole = { log: console.log, info: console.info, warn: console.warn, error: console.error };
  const capture = (...values: unknown[]) => {
    if (logs.length < 50) logs.push(values.map(formatValue).join(' '));
    else omittedLogs += 1;
  };
  console.log = capture;
  console.info = capture;
  console.warn = capture;
  console.error = capture;

  const results: TestResult[] = [];
  try {
    const FileSystem = new Function(`"use strict";\n${data.source}\nreturn typeof FileSystem === "undefined" ? null : FileSystem;`)() as (new () => Record<string, (...args: unknown[]) => unknown>) | null;
    if (typeof FileSystem !== 'function') throw new Error('Define a FileSystem class before running the tests.');

    for (const test of data.tests) {
      const started = performance.now();
      try {
        const instance = new FileSystem();
        const actual = test.operations.map(([method, args]) => {
          if (typeof instance[method] !== 'function') throw new Error(`Missing method: ${method}()`);
          const value = instance[method](...args);
          if (value instanceof Promise) throw new Error(`${method}() must return synchronously.`);
          return value;
        });
        results.push({
          name: test.name,
          passed: isDeepEqual(actual, test.expected),
          duration: performance.now() - started,
          expected: test.expected,
          actual: makeCloneable(actual) as unknown[],
        });
      } catch (error) {
        results.push({ name: test.name, passed: false, duration: performance.now() - started, error: getMessage(error) });
      }
    }
  } catch (error) {
    results.push({ name: 'Compile solution', passed: false, duration: 0, error: getMessage(error) });
  } finally {
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  }

  const output = [...logs];
  if (omittedLogs) output.push(`… ${omittedLogs} more log lines were truncated.`);
  scope.postMessage({ results, logs: output });
};

function isDeepEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((value, index) => isDeepEqual(value, right[index]));
  }
  if (isPlainObject(left) && isPlainObject(right)) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    return leftKeys.length === rightKeys.length && leftKeys.every((key) => Object.hasOwn(right, key) && isDeepEqual(left[key], right[key]));
  }
  return false;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;
}

function makeCloneable(value: unknown, seen = new WeakSet<object>()): unknown {
  if (typeof value === 'function' || typeof value === 'symbol') return String(value);
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value !== 'object' || value === null) return value;
  if (seen.has(value)) return '[Circular]';
  seen.add(value);
  if (Array.isArray(value)) return value.map((item) => makeCloneable(item, seen));
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, makeCloneable(item, seen)]));
}

function formatValue(value: unknown) {
  if (typeof value === 'string') return value;
  try { return JSON.stringify(value); } catch { return String(value); }
}

function getMessage(error: unknown) {
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}

export {};