// data.js — the figures behind America in Numbers.
// Every number carries its source and year; the site prints both next to
// each figure. All figures are for the United States of America.
'use strict';

const STATS = {
  country: 'United States of America',
  updated: 'November 2026',

  // Headline indicators, 2024 unless noted.
  kpi: [
    { label: 'Population', value: '340.1M', note: '2024', source: 'U.S. Census Bureau, Vintage 2024' },
    { label: 'GDP', value: '$29.3T', note: '2024', source: 'World Bank / BEA' },
    { label: 'GDP per person', value: '$86,170', note: '2024', source: 'World Bank' },
    { label: 'Unemployment', value: '4.0%', note: '2024 avg.', source: 'Bureau of Labor Statistics' },
    { label: 'Median household income', value: '$87,460', note: '2025', source: 'U.S. Census Bureau' },
    { label: 'Life expectancy', value: '78.9 yrs', note: '2024', source: 'World Bank' },
  ],

  // Ten-year series, 2015-2024.
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  series: {
    population: {
      label: 'Population',
      unit: 'million people',
      values: [320.7, 323.1, 325.1, 326.8, 328.2, 331.5, 332.0, 333.3, 334.9, 340.1],
      source: 'U.S. Census Bureau, Vintage 2024 estimates',
      footnote: 'The 2024 jump reflects revised immigration estimates.',
    },
    gdp: {
      label: 'Gross domestic product',
      unit: '$ trillion',
      values: [18.2, 18.8, 19.5, 20.5, 21.4, 21.3, 23.6, 26.0, 27.7, 29.3],
      source: 'Bureau of Economic Analysis / World Bank',
      footnote: '',
    },
    unemployment: {
      label: 'Unemployment rate',
      unit: '% (annual average)',
      values: [5.3, 4.9, 4.4, 3.9, 3.7, 8.1, 5.4, 3.6, 3.6, 4.0],
      source: 'Bureau of Labor Statistics',
      footnote: 'The 2020 spike is the COVID-19 pandemic.',
    },
  },

  // Largest states, 2024 population in millions.
  states: [
    { name: 'California', pop: 39.4, rank: 1 },
    { name: 'Texas', pop: 31.3, rank: 2 },
    { name: 'Florida', pop: 23.4, rank: 3 },
    { name: 'New York', pop: 19.9, rank: 4 },
    { name: 'Pennsylvania', pop: 13.1, rank: 5 },
    { name: 'Illinois', pop: 12.7, rank: 6 },
    { name: 'Ohio', pop: 11.9, rank: 7 },
    { name: 'Georgia', pop: 11.1, rank: 8 },
    { name: 'North Carolina', pop: 11.0, rank: 9 },
    { name: 'Michigan', pop: 10.1, rank: 10 },
  ],
  statesSource: 'U.S. Census Bureau, 2024 population estimates',

  // Age structure, 2023.
  ageGroups: [
    { group: 'Under 18', pct: 21.9 },
    { group: '18 to 64', pct: 60.4 },
    { group: '65 and over', pct: 17.7 },
  ],
  ageSource: 'U.S. Census Bureau, 2023',

  // Economy page.
  economy: {
    gdpPerCapita: 86170,
    inflation: { value: '2.9%', year: 2024, source: 'Bureau of Labor Statistics (CPI)' },
    debt: { value: '$36.2T', year: 'Dec 2024', source: 'U.S. Department of the Treasury' },
    trade: {
      exports: '$3.24T', imports: '$4.12T', deficit: '$0.89T',
      year: 2024, source: 'Bureau of Economic Analysis (revised June 2026)',
    },
    homePrice: { value: '$419,200', year: 'Q4 2024', source: 'National Association of Realtors' },
    homeownership: { value: '65.7%', year: 'Q4 2024', source: 'U.S. Census Bureau' },
  },

  // Society page: 2023 vs 2025 comparison.
  society: {
    2023: {
      income: '$80,610', poverty: '11.1%', uninsured: '8.0%',
      education: '91.1%', medianAge: '38.9 yrs', births: '3.60M',
    },
    2025: {
      income: '$87,460', poverty: '10.2%', uninsured: '7.9%',
      education: '91.1%', medianAge: '38.9 yrs', births: '3.60M',
    },
    notes: {
      income: 'Median household income, U.S. Census Bureau',
      poverty: 'Poverty rate, U.S. Census Bureau',
      uninsured: 'Share without health insurance, U.S. Census Bureau',
      education: 'High-school diploma or higher, age 25+, American Community Survey 2023',
      medianAge: 'Median age, U.S. Census Bureau 2023',
      births: 'Births, CDC 2023',
    },
  },
};

if (typeof module !== 'undefined') module.exports = STATS;
