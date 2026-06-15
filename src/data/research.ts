// ============================================================
// RESEARCH — formal, citable work. Kept as structured data so the
// /research page reads like a clean, credible CV section.
// Edit/add entries here. `featured: true` surfaces it on the home feed.
// ============================================================

export type Research = {
  title: string;
  venue: string;        // lab, group, or publication venue
  period: string;       // e.g. "2025 — present"
  role: string;         // your contribution in one phrase
  summary: string;      // 1–3 sentences, plain language
  tags: string[];
  status?: string;      // e.g. "in progress", "published", "preprint"
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const RESEARCH: Research[] = [
  {
    title: 'Physics-based + ML prediction of protein–DNA binding affinity',
    venue: 'Yu Lab, UC Irvine',
    period: '2025 — present',
    role: 'MD simulation pipeline + binding-affinity analysis',
    summary:
      'Large-scale GROMACS pipeline running hundreds of protein–DNA sequences across replicates on UCI\u2019s HPC3 cluster, coupled with MM-GBSA energetics and machine-learning models to predict transcription-factor\u2013DNA binding free energies. Builds directly on the lab\u2019s physics-informed ML framework for Myc/Max\u2013DNA recognition.',
    tags: ['MD simulation', 'GROMACS', 'MM-GBSA', 'ML', 'HPC'],
    status: 'in progress',
    links: [
      // TODO: add when available — paper, preprint, or code
    ],
    featured: true,
  },
  {
    title: 'Neuromorphic computing from a spintronics & device-physics angle',
    venue: 'Undergraduate research, UC San Diego',
    period: '2022 — 2026',
    role: 'Spintronic oscillators & spiking-network device physics',
    summary:
      'Hardware-grounded work on neuromorphic computing \u2014 spin-torque nano-oscillators, magnetization dynamics, and how device physics constrains and enables spiking computation. A device-level perspective on a field dominated by software abstractions.',
    tags: ['neuromorphic', 'spintronics', 'device physics', 'SNN'],
    status: 'completed',
    links: [],
    featured: true,
  },
];
