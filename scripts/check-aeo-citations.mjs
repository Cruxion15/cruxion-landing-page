#!/usr/bin/env node
// Checks whether Cruxion gets mentioned when AI assistants answer a fixed
// panel of target questions. Run weekly to track AEO progress over time.
//
// Usage:
//   OPENAI_API_KEY=sk-... node scripts/check-aeo-citations.mjs
//   PERPLEXITY_API_KEY=pplx-... node scripts/check-aeo-citations.mjs
// (set either or both; the script skips a provider if its key is missing)

import { appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const QUERIES = [
  "How can I make my engineering college AI-native?",
  "What does it mean for an engineering college to be AI-native?",
  "What platforms help engineering colleges teach AI-assisted coding?",
  "How do I verify a student actually understood AI-generated code, not just copied it?",
  "What is Understanding Verification in engineering education?",
  "How can Indian engineering colleges bridge the industry-academia AI skills gap?",
  "What tools help keep engineering students engaged with daily coding practice?",
  "Best AI-native curriculum platforms for CS and EC engineering students in India",
];

const LOG_FILE = new URL("./aeo-citations-log.csv", import.meta.url);

function mentionsCruxion(text) {
  return /cruxion/i.test(text ?? "");
}

async function checkOpenAI(query) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-search-preview";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: query }],
    }),
  });
  if (!res.ok) {
    return { provider: "openai", error: `${res.status} ${res.statusText}` };
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  return { provider: "openai", text, mentioned: mentionsCruxion(text) };
}

async function checkPerplexity(query) {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) return null;
  const model = process.env.PERPLEXITY_MODEL ?? "sonar";
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: query }],
    }),
  });
  if (!res.ok) {
    return { provider: "perplexity", error: `${res.status} ${res.statusText}` };
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  return { provider: "perplexity", text, mentioned: mentionsCruxion(text) };
}

async function main() {
  if (!process.env.OPENAI_API_KEY && !process.env.PERPLEXITY_API_KEY) {
    console.log(
      "No API keys set. Set OPENAI_API_KEY and/or PERPLEXITY_API_KEY to run this check.\n" +
        "Example: PERPLEXITY_API_KEY=pplx-xxxx node scripts/check-aeo-citations.mjs"
    );
    return;
  }

  const runDate = new Date().toISOString();
  const rows = [];

  for (const query of QUERIES) {
    const results = await Promise.all([checkOpenAI(query), checkPerplexity(query)]);
    for (const result of results) {
      if (!result) continue;
      if (result.error) {
        console.log(`[${result.provider}] ERROR for "${query}": ${result.error}`);
        continue;
      }
      const flag = result.mentioned ? "MENTIONED" : "not mentioned";
      console.log(`[${result.provider}] ${flag} | ${query}`);
      rows.push({
        date: runDate,
        provider: result.provider,
        query,
        mentioned: result.mentioned,
        snippet: (result.text ?? "").replace(/\s+/g, " ").slice(0, 200),
      });
    }
  }

  if (rows.length === 0) return;

  const isNewFile = !existsSync(LOG_FILE);
  const header = "date,provider,query,mentioned,snippet\n";
  const csvRows = rows
    .map(
      (r) =>
        `"${r.date}","${r.provider}","${r.query.replace(/"/g, '""')}",${r.mentioned},"${r.snippet.replace(/"/g, '""')}"`
    )
    .join("\n") + "\n";

  await appendFile(LOG_FILE, (isNewFile ? header : "") + csvRows);
  console.log(`\nLogged ${rows.length} results to ${LOG_FILE.pathname}`);

  const mentionedCount = rows.filter((r) => r.mentioned).length;
  console.log(`Citation rate this run: ${mentionedCount}/${rows.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
