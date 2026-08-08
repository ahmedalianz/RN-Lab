import {
  labDomains,
  type ExperimentStatus,
} from '../data/catalog';
import {categoryColors} from '../theme';

export type ExperimentFilterId = 'all' | 'javascript' | 'react' | 'native';

export type ExperimentListRow = {
  id: string;
  category: string;
  title: string;
  description: string;
  accent: string;
  status: ExperimentStatus;
  footer: string;
  route: string;
  filter: ExperimentFilterId;
};

export const EXPERIMENT_FILTERS: Array<{
  id: ExperimentFilterId;
  label: string;
}> = [
  {id: 'all', label: 'ALL'},
  {id: 'javascript', label: 'JAVASCRIPT'},
  {id: 'react', label: 'REACT'},
  {id: 'native', label: 'NATIVE'},
];

/** Builds the curated experiments list shown on ExperimentsScreen. */
export function buildExperimentRows(): ExperimentListRow[] {
  const rows: ExperimentListRow[] = [];

  const reactJs = labDomains.find(d => d.id === 'react-js');
  reactJs?.items.forEach(item => {
    const track = item.track ?? 'javascript';
    const isJavascript = track === 'javascript';
    rows.push({
      id: item.id,
      category: isJavascript ? 'JAVASCRIPT' : 'REACT',
      title: item.title,
      description: item.subtitle,
      accent: isJavascript ? categoryColors.javascript : categoryColors.react,
      status: item.status,
      footer: isJavascript ? 'Hermes • JS Runtime' : 'React • Fiber',
      route: item.route,
      filter: track,
    });
  });

  const internals = labDomains.find(d => d.id === 'rn-internals');
  internals?.items.forEach(item => {
    rows.push({
      id: item.id,
      category: 'ARCHITECTURE',
      title: item.title,
      description: item.subtitle,
      accent: categoryColors.architecture,
      status: item.status,
      footer: 'C++ • JSI',
      route: item.route,
      filter: 'native',
    });
  });

  const security = labDomains.find(d => d.id === 'security');
  security?.items
    .filter(item => item.id !== 'sec-dashboard')
    .slice(0, 3)
    .forEach(item => {
      rows.push({
        id: item.id,
        category: 'SECURITY',
        title: item.title,
        description: item.subtitle,
        accent: categoryColors.security,
        status: item.id === 'ssl-pinning' ? 'practicing' : item.status,
        footer: 'iOS • Android',
        route: item.route,
        filter: 'native',
      });
    });

  return rows.map(row => {
    if (row.id === 'ssl-pinning') {
      return {...row, status: 'practicing' as const};
    }
    if (row.id === 'fabric-playground') {
      return {...row, status: 'mastered' as const, title: 'Fabric Renderer'};
    }
    return row;
  });
}

export function filterExperimentRows(
  rows: ExperimentListRow[],
  filter: ExperimentFilterId,
  query: string,
): ExperimentListRow[] {
  const q = query.trim().toLowerCase();
  return rows.filter(row => {
    const matchesFilter = filter === 'all' || row.filter === filter;
    const matchesQuery =
      !q ||
      row.title.toLowerCase().includes(q) ||
      row.description.toLowerCase().includes(q) ||
      row.category.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });
}
