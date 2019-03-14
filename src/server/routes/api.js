import path from 'path';
import fs from 'fs';

import express from 'express';
import globby from 'globby';
import apicache from 'apicache';
import hastebin from 'hastebin-gen';
import uniq from 'lodash/uniq';

import * as Paths from '../../../config/paths';

const router = express.Router();
const cache = apicache.middleware;

const TASK_LOG_NAME_RE = /(.+?)(?:\s(.+))?\.task\.out\.log/;
const DIFF_STAT_CHANGE_RE = /\s*(.+?)\s+\|\s+(?:(\d+)\s+(\+*)(-*)|(.+))/;
const DIFF_STAT_SUMMARY_RE = /(\d+)\s+files?\s+changed,\s+(\d+)\s+insertions?\(\+\),\s+(\d+)\s+deletions\(-\)/;
const DIFF_FILE_RE = file => new RegExp(`^diff\\s+--git\\s+a\\/(${file})\\s+b\\/(${file})(?:\\n.*?)+(?=^diff|$)`, 'm');

const parseTaskLogName = (name) => {
  const match = name.match(TASK_LOG_NAME_RE);
  return {
    tool: match[1],
    setting: match[2] || '',
  };
};

const parseDiffstatChange = (line) => {
  const match = line.match(DIFF_STAT_CHANGE_RE);
  return {
    file: match[1],
    total: +(match[2] || 0),
    add: match[3],
    remove: match[4],
    bin: match[5],
  };
};

const parseDiffstatSummary = (line) => {
  const match = line.match(DIFF_STAT_SUMMARY_RE);
  return match
    ? {
      files: +match[1],
      insertions: +match[2],
      deletions: +match[2],
    }
    : {
      files: 0,
      insertions: 0,
      deletions: 0,
    };
};

const parseDiffFile = (diff, file) => {
  const match = diff.match(DIFF_FILE_RE(file));
  return {
    file: match[1],
    diff: match[0],
  };
};

router.get('/tools', cache('60 minutes'), async (req, res) => {
  const logs = await globby(['*.task.out.log'], {
    cwd: Paths.DATA_DIR_PATH,
  });

  const parsed = logs.map(parseTaskLogName);
  const tools = parsed.map(e => e.tool);
  res.json(uniq(tools).sort());
});

router.get('/settings/:tool', cache('60 minutes'), async (req, res) => {
  const logs = await globby(['*.task.out.log'], {
    cwd: Paths.DATA_DIR_PATH,
  });

  const parsed = logs.map(parseTaskLogName);
  const filtered = parsed.filter(e => e.tool === req.params.tool);
  const settings = filtered.map(e => e.setting);
  res.json(uniq(settings).sort());
});

router.get('/summaries/:tool', cache('60 minutes'), async (req, res) => {
  const logs = await globby(['*.task.out.log'], {
    cwd: Paths.DATA_DIR_PATH,
  });

  const parsed = logs.map(parseTaskLogName);
  const filtered = parsed.filter(e => e.tool === req.params.tool);

  const summaries = await Promise.all(filtered.map(async ({ setting }) => {
    const combo = `${req.params.tool}${setting ? ` ${setting}` : ''}`;
    const filepath = path.join(Paths.DATA_DIR_PATH, `${combo}.git.diffstat.out.log`);
    const diffstat = fs.readFileSync(filepath, 'utf-8');

    const lines = diffstat.trim().split('\n');
    const summary = parseDiffstatSummary(lines[lines.length - 1]);

    return {
      setting,
      summary,
    };
  }));

  res.json(summaries.sort((a, b) => (a.setting < b.setting ? -1 : 1)));
});

router.get('/diffstat/:tool/:setting?', async (req, res) => {
  const combo = `${req.params.tool}${req.params.setting ? ` ${req.params.setting}` : ''}`;
  const filepath = path.join(Paths.DATA_DIR_PATH, `${combo}.git.diffstat.out.log`);
  const diffstat = fs.readFileSync(filepath, 'utf-8');

  const lines = diffstat.trim().split('\n');
  const changes = lines.slice(0, -1).map(parseDiffstatChange);
  const sorted = changes.sort((a, b) => (a.total > b.total ? -1 : 1));

  res.json({ changes: sorted });
});

router.get('/diff/:tool/:setting?', async (req, res) => {
  const combo = `${req.params.tool}${req.params.setting ? ` ${req.params.setting}` : ''}`;
  const filepath = path.join(Paths.DATA_DIR_PATH, `${combo}.git.diff.out.log`);
  const diff = fs.readFileSync(filepath, 'utf-8');

  const changes = parseDiffFile(diff, req.query.file);
  const link = await hastebin(changes.diff.slice(0, 400000), 'diff');

  res.redirect(link);
});

export default router;
