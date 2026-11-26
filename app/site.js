// site.js — page behaviour for America in Numbers.
// Every control on the site is wired here: metric toggles, the sortable
// states table, the text filter, and the year switch on the Society page.
'use strict';

function $(id) { return document.getElementById(id); }

function fmtMoneyT(v) { return '$' + v.toFixed(1) + 'T'; }

// ---- Overview page: KPI cards + metric toggle chart ----
function initOverview() {
  const grid = $('kpi-grid');
  if (!grid) return;
  for (const k of STATS.kpi) {
    const card = document.createElement('article');
    card.className = 'kpi';
    card.innerHTML =
      `<div class="kpi-value">${k.value}</div>` +
      `<div class="kpi-label">${k.label}</div>` +
      `<div class="kpi-note">${k.note} · ${k.source}</div>`;
    grid.appendChild(card);
  }
  let metric = 'population';
  const buttons = document.querySelectorAll('[data-metric]');
  function render() {
    const s = STATS.series[metric];
    drawLineChart('trend-chart', STATS.years, s.values, s.label, s.unit);
    const foot = $('trend-footnote');
    if (foot) foot.textContent = `Source: ${s.source}. ${s.footnote}`;
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.metric === metric));
  }
  buttons.forEach((b) => b.addEventListener('click', () => { metric = b.dataset.metric; render(); }));
  render();
}

// ---- Population page: sortable states table + filter + age bars ----
let sortKey = 'rank';
let sortDir = 1;

function renderStates(filterText) {
  const body = $('states-body');
  if (!body) return;
  const q = (filterText || '').trim().toLowerCase();
  const rows = STATS.states
    .filter((s) => !q || s.name.toLowerCase().includes(q))
    .slice()
    .sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0) * sortDir);
  body.innerHTML = '';
  for (const s of rows) {
    const tr = document.createElement('tr');
    const share = ((s.pop / 340.1) * 100).toFixed(1);
    tr.innerHTML = `<td>${s.rank}</td><td>${s.name}</td><td class="num">${s.pop.toFixed(1)}</td><td class="num">${share}%</td>`;
    body.appendChild(tr);
  }
  const empty = $('states-empty');
  if (empty) empty.hidden = rows.length > 0;
  const count = $('states-count');
  if (count) count.textContent = rows.length === STATS.states.length
    ? `Showing all ${rows.length} largest states`
    : `Showing ${rows.length} of ${STATS.states.length} states`;
}

function initPopulation() {
  if (!$('states-body')) return;
  drawBarChart('age-chart', STATS.ageGroups.map((g) => ({ label: g.group, value: g.pct })), '%');
  drawLineChart('pop-chart', STATS.years, STATS.series.population.values, 'Population', 'million people');
  const filter = $('state-filter');
  if (filter) filter.addEventListener('input', () => renderStates(filter.value));
  document.querySelectorAll('#states-table th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortDir *= -1; else { sortKey = key; sortDir = 1; }
      document.querySelectorAll('#states-table th').forEach((h) => h.removeAttribute('aria-sort'));
      th.setAttribute('aria-sort', sortDir === 1 ? 'ascending' : 'descending');
      renderStates(filter ? filter.value : '');
    });
  });
  renderStates('');
}

// ---- Economy page: GDP total / per-person toggle ----
function initEconomy() {
  const host = $('gdp-chart');
  if (!host) return;
  let mode = 'total';
  const buttons = document.querySelectorAll('[data-gdp-mode]');
  function render() {
    if (mode === 'total') {
      drawLineChart('gdp-chart', STATS.years, STATS.series.gdp.values, 'Gross domestic product', '$ trillion');
    } else {
      const perPerson = STATS.series.gdp.values.map((g, i) =>
        Math.round((g * 1000) / STATS.series.population.values[i] * 1000));
      drawLineChart('gdp-chart', STATS.years, perPerson, 'GDP per person', '$');
    }
    const cap = $('gdp-caption');
    if (cap) cap.textContent = mode === 'total'
      ? 'Total GDP, $ trillion. Source: Bureau of Economic Analysis / World Bank.'
      : 'GDP divided by population, $. Computed from the GDP and population series above.';
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.gdpMode === mode));
  }
  buttons.forEach((b) => b.addEventListener('click', () => { mode = b.dataset.gdpMode; render(); }));
  render();
}

// ---- Society page: 2023 vs 2025 toggle ----
function initSociety() {
  const grid = $('society-grid');
  if (!grid) return;
  let year = '2025';
  const buttons = document.querySelectorAll('[data-year]');
  function render() {
    const d = STATS.society[year];
    const n = STATS.society.notes;
    const cards = [
      ['Median household income', d.income, n.income],
      ['Poverty rate', d.poverty, n.poverty],
      ['Without health insurance', d.uninsured, n.uninsured],
      ['High-school diploma or higher', d.education, n.education],
      ['Median age', d.medianAge, n.medianAge],
      ['Births per year', d.births, n.births],
    ];
    grid.innerHTML = '';
    for (const [label, value, note] of cards) {
      const card = document.createElement('article');
      card.className = 'kpi';
      card.innerHTML =
        `<div class="kpi-value">${value}</div>` +
        `<div class="kpi-label">${label}</div>` +
        `<div class="kpi-note">${year} · ${note}</div>`;
      grid.appendChild(card);
    }
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.year === year));
  }
  buttons.forEach((b) => b.addEventListener('click', () => { year = b.dataset.year; render(); }));
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initOverview();
  initPopulation();
  initEconomy();
  initSociety();
});
