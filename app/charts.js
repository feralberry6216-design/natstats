// charts.js — hand-rolled SVG charts. No libraries: the site stays tiny
// and every chart is drawn from the figures in data.js.
'use strict';

function svgEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function niceMax(values) {
  const m = Math.max(...values);
  const pow = Math.pow(10, Math.floor(Math.log10(m)));
  return Math.ceil(m / pow) * pow;
}

// A line chart with labelled axes, drawn into an element with the given id.
function drawLineChart(id, years, values, label, unit) {
  const host = document.getElementById(id);
  if (!host) return;
  host.innerHTML = '';
  const W = 720, H = 300, padL = 52, padR = 16, padT = 36, padB = 34;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`, role: 'img',
    'aria-label': `${label}, ${years[0]} to ${years[years.length - 1]}`,
  });
  const max = niceMax(values);
  const min = Math.min(0, Math.min(...values) * 0.9);
  const x = (i) => padL + (i * (W - padL - padR)) / (years.length - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * (H - padT - padB);

  // Gridlines and y labels.
  const steps = 4;
  for (let s = 0; s <= steps; s++) {
    const v = min + ((max - min) * s) / steps;
    const gy = y(v);
    svg.appendChild(svgEl('line', { x1: padL, y1: gy, x2: W - padR, y2: gy, stroke: '#e3e6ea', 'stroke-width': 1 }));
    const t = svgEl('text', { x: padL - 8, y: gy + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#5b6470' });
    t.textContent = String(Math.round(v * 10) / 10);
    svg.appendChild(t);
  }
  // Polyline through the points.
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  svg.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: '#b45309', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }));
  // Dots and value labels on first/last points, dots elsewhere.
  values.forEach((v, i) => {
    svg.appendChild(svgEl('circle', { cx: x(i), cy: y(v), r: i === 0 || i === values.length - 1 ? 4.5 : 3, fill: '#1e3a5f' }));
    const xt = svgEl('text', { x: x(i), y: H - 10, 'text-anchor': 'middle', 'font-size': 11, fill: '#5b6470' });
    xt.textContent = String(years[i]);
    svg.appendChild(xt);
  });
  const first = svgEl('text', { x: x(0), y: y(values[0]) - 10, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: '#1e3a5f' });
  first.textContent = String(values[0]);
  const last = svgEl('text', { x: x(values.length - 1), y: y(values[values.length - 1]) - 10, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: '#1e3a5f' });
  last.textContent = String(values[values.length - 1]);
  svg.appendChild(first);
  svg.appendChild(last);
  const cap = svgEl('text', { x: padL, y: 12, 'font-size': 12, 'font-weight': 600, fill: '#334155' });
  cap.textContent = `${label} (${unit})`;
  svg.appendChild(cap);
  host.appendChild(svg);
}

// A horizontal bar chart: rows of label + bar + value.
function drawBarChart(id, rows, unit) {
  const host = document.getElementById(id);
  if (!host) return;
  host.innerHTML = '';
  const W = 720, rowH = 34, padL = 150, padR = 70, padT = 8;
  const H = padT + rows.length * rowH + 8;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Bar chart' });
  const max = Math.max(...rows.map((r) => r.value));
  rows.forEach((r, i) => {
    const cy = padT + i * rowH + rowH / 2;
    const bw = ((W - padL - padR) * r.value) / max;
    const lab = svgEl('text', { x: padL - 10, y: cy + 4, 'text-anchor': 'end', 'font-size': 12, fill: '#334155' });
    lab.textContent = r.label;
    svg.appendChild(lab);
    svg.appendChild(svgEl('rect', { x: padL, y: cy - 10, width: Math.max(bw, 2), height: 20, rx: 3, fill: '#1e3a5f' }));
    const val = svgEl('text', { x: padL + bw + 8, y: cy + 4, 'font-size': 12, 'font-weight': 700, fill: '#1e3a5f' });
    val.textContent = `${r.value}${unit ? ' ' + unit : ''}`;
    svg.appendChild(val);
  });
  host.appendChild(svg);
}
