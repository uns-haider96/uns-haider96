// Single source of truth for the person-level content on the site.
// Every statement here is taken from the CVs or the public GitHub repositories;
// where the two disagree, the repository's reported numbers are used.

export const profile = {
  name: "Muhammad Uns Haider Shah",
  shortName: "Uns Haider Shah",
  headline: "Mechanical Engineer · Scientific Machine Learning · Computational Fluid Dynamics",
  subheadline:
    "Surrogate modeling and Bayesian optimization for aerodynamic design, and machine learning for the diagnostics and prognostics of rotating machinery and propulsion systems.",
  statement: [
    "I build data-driven models for physical systems, at the point where high-fidelity simulation meets machine learning. My published work pairs RANS CFD with a Gaussian-process surrogate and Bayesian optimization to redesign a blended-wing-body UAV, which was then built in carbon fibre and tested in a wind tunnel.",
    "My recent independent work asks a harder question: not how accurately a surrogate reproduces a flow field, but whether the design it recommends, and the uncertainty it reports, can be trusted.",
  ],
  seeking:
    "Seeking a fully funded, thesis-based graduate position (MS / MASc) in mechanical or aerospace engineering beginning Fall 2027.",
  location: "Islamabad, Pakistan",
  email: "shahuns963@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-uns-haider-shah/",
  github: "https://github.com/uns-haider96",
  cvPath: "/cv/Muhammad_Uns_Haider_Shah_CV.pdf",
};

export const researchInterests = [
  {
    title: "Surrogate modeling & design optimization",
    body: "Gaussian-process and neural surrogates trained on CFD data, Bayesian optimization, design of experiments and gradient-based search through differentiable surrogates for aerodynamic shape design.",
    keywords: ["Gaussian processes", "Bayesian optimization", "DOE", "automatic differentiation"],
  },
  {
    title: "Trustworthy uncertainty in data-driven models",
    body: "When a surrogate's predicted uncertainty is a usable stopping signal, and when it is not: calibration, extrapolation, stability of optima under resampling, and failure at changes of flow regime.",
    keywords: ["uncertainty quantification", "calibration", "extrapolation"],
  },
  {
    title: "Scientific ML for flow-field prediction",
    body: "Reduced-order modeling, physics-informed neural networks and neural operators for fluid mechanics, currently being studied through a research cohort and not yet applied in a released project.",
    keywords: ["POD / DMD", "PINNs", "FNO / DeepONet"],
  },
  {
    title: "Diagnostics & prognostics",
    body: "Vibration-based fault diagnosis for rotating machinery and remaining-useful-life prediction for gas-turbine engines, including the gap between benchmark accuracy and performance under changed operating conditions.",
    keywords: ["fault diagnosis", "RUL prediction", "health monitoring"],
  },
];

export const publication = {
  title:
    "Design and Optimization of a Blended-Wing-Body UAV using AI-Driven Surrogate Modeling and CFD Analysis",
  authors: [
    "M. S. Naseem",
    "M. U. H. Shah",
    "M. N. U. Hassan",
    "R. Zubair",
    "A. Afzal",
    "S. Afzal",
    "M. Naseem",
  ],
  self: "M. U. H. Shah",
  venue: "Proceedings of the Institution of Mechanical Engineers, Part G: Journal of Aerospace Engineering",
  publisher: "SAGE / IMechE",
  year: 2026,
  status: "Published OnlineFirst, 28 April 2026",
  doi: "10.1177/09544100261447561",
  repo: "https://github.com/uns-haider96/AI-Driven-BWB-UAV-CFD-Optimization",
  contribution: [
    "Developed the machine-learning surrogate and optimization pipeline end to end: a Gaussian Process Regression surrogate with Expected-Improvement Bayesian optimization over DOE-structured RANS CFD data, optimizing wing planform, airfoil, winglet and twist. The surrogate's uncertainty estimates drove adaptive sampling of the design space.",
    "Conducted the 3D Reynolds-averaged Navier–Stokes CFD (ANSYS Fluent) that generated the aerodynamic training data and verified the optimized configuration.",
    "The wider team project also spanned CAD geometry development, finite-element analysis, carbon-fibre composite prototyping and wind-tunnel testing.",
  ],
  bibtex: `@article{naseem2026bwb,
  title     = {Design and optimization of a blended wing body UAV using AI-driven surrogate modeling and CFD analysis},
  author    = {Naseem, Muhammad Shoaib and Shah, Muhammad Uns Haider and Hassan, Muhammad Nasih Ul and Zubair, Rimsha and Afzal, Ayman and Afzal, Shakeel and Naseem, Mujahid},
  journal   = {Proceedings of the Institution of Mechanical Engineers, Part G: Journal of Aerospace Engineering},
  year      = {2026},
  doi       = {10.1177/09544100261447561},
  publisher = {SAGE}
}`,
};

export const presentation = {
  title: "Oral presentation, IBCAST 2025",
  venue:
    "22nd International Bhurban Conference on Applied Sciences & Technology, Fluid Dynamics track",
  date: "19–22 Aug 2025",
  body: "Presented the blended-wing-body UAV optimization work; camera-ready paper submitted to the proceedings (IEEE Xplore), awaiting publication.",
  slides:
    "https://github.com/uns-haider96/AI-Driven-BWB-UAV-CFD-Optimization/tree/main/docs/conference",
};

export const education = {
  degree: "B.Sc. Mechanical Engineering",
  institution: "COMSATS University Islamabad, Wah Campus",
  location: "Pakistan",
  period: "Sep 2021 – Jul 2025",
  note: "HEC- and PEC-recognized programme",
  finalYearProject:
    "Final-year design project: AI-driven surrogate optimization of a blended-wing-body UAV, published in IMechE Part G and presented at IBCAST 2025.",
  coursework: [
    { name: "Computational Fluid Dynamics", grade: "A–" },
    { name: "Heat & Mass Transfer", grade: "A–" },
    { name: "CAD/CAM", grade: "A–" },
    { name: "Instrumentation & Measurement", grade: "A–" },
    { name: "Maintenance Engineering", grade: "A" },
    { name: "Mechanisms & Mechanical Vibrations Lab", grade: "A" },
    { name: "Numerical Computations", grade: "B+" },
    { name: "Fluid Mechanics I & II" },
    { name: "Thermodynamics I & II" },
    { name: "Finite Element Analysis" },
    { name: "Mechanical Vibrations" },
    { name: "Control Engineering" },
    { name: "Machine Design" },
    { name: "IC Engines" },
  ],
};

export const training = [
  {
    title: "Machine Learning and AI for Fluid Dynamics",
    org: "FlowThermoLab · certification cohort led by Prof. Ricardo Vinuesa",
    period: "Jun 2026 – present",
    body: "Machine learning and deep learning for fluid mechanics: turbulence prediction, reduced-order modeling (POD/DMD, autoencoders), flow control and optimization, transformers for flow fields, physics-informed neural networks and neural operators (FNO, DeepONet), implemented in Python and PyTorch.",
  },
  {
    title: "Professional Data Analytics Certification",
    org: "Institute of Emerging Careers",
    period: "Nov 2025 – May 2026",
    body: "Applied data analysis with Excel, SQL, Power BI and Python.",
  },
];

export const experience = [
  {
    role: "Management Trainee Officer (Engineering)",
    org: "DYNTEK Engineering (Pvt) Ltd",
    location: "Islamabad",
    period: "Aug 2026 – present",
    points: [
      "Computational design and analysis for aerospace systems, spanning CAD geometry development, CAE and finite-element analysis, and CFD simulation.",
      "Applying scientific machine learning and surrogate modeling to simulation-based design, prediction and design-space exploration.",
    ],
  },
  {
    role: "CMMS Engineer, Asset Reliability & Predictive Maintenance",
    org: "Invotyx (ADNOC Programme)",
    location: "Islamabad",
    period: "Jan 2026 – Aug 2026",
    points: [
      "Built and validated ISO 14224-compliant asset hierarchies and SAP PM master data for rotating and static equipment, supporting reliability-centred and predictive-maintenance workflows.",
      "Extracted technical attributes from P&IDs and vendor datasheets; enforced CMMS data-governance rules across live multi-discipline asset registers.",
    ],
  },
  {
    role: "Aerospace B1 Engineering Intern, Line Maintenance",
    org: "Pakistan International Airlines (PIA)",
    location: "Islamabad",
    period: "Jul 2024 – Aug 2024",
    points: [
      "Performed transit, daily and cabin checks across ATR-42/72, A320 and B-777 fleets under licensed B1 engineers; studied AMM, MEL and TechLog systems and glass-cockpit avionics.",
    ],
  },
];

export const skills = [
  {
    group: "Scientific ML & surrogate modeling",
    items: [
      "Gaussian Process Regression",
      "Bayesian optimization (Expected Improvement)",
      "Design of Experiments / Latin hypercube",
      "Uncertainty quantification & calibration",
      "Neural ensembles",
      "Automatic differentiation for design sensitivities",
      "PINNs & neural operators (in development)",
    ],
  },
  {
    group: "Computational & CAE",
    items: [
      "ANSYS Fluent (3D RANS, k-ω SST)",
      "ANSYS Mechanical (FEA)",
      "SolidWorks",
      "AutoCAD",
    ],
  },
  {
    group: "Programming & machine learning",
    items: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "NumPy · pandas",
      "Matplotlib · Seaborn",
      "Random Forests · K-Means · PCA",
      "Cross-validation & model evaluation",
    ],
  },
  {
    group: "Signals, prognostics & reliability",
    items: [
      "Vibration time-domain health indicators",
      "Degradation feature engineering",
      "RUL regression",
      "ISO 14224 taxonomy",
      "SAP PM master data",
    ],
  },
  {
    group: "Experimental & fabrication",
    items: [
      "Carbon-fibre / epoxy composite layup",
      "Vacuum-bag resin infusion",
      "3D-printed mould tooling",
      "Wind-tunnel testing",
      "Heat-exchanger design & testing",
    ],
  },
  {
    group: "Data & tools",
    items: ["Git / GitHub", "LaTeX", "SQL (MySQL)", "Power BI (DAX)", "Arduino (C++)"],
  },
];

export const leadership = {
  role: "Planning Head & Treasurer",
  org: "ASME COMSATS Wah Student Section",
  period: "Jul 2023 – Sep 2025",
  points: [
    "Part of the leadership team of a 100+ member section: ran an annual programme of workshops, seminars and inter-university competitions, and owned the budget and financial reporting.",
    "Voted Best Member of the Year, 2023–24.",
  ],
};

export const affiliations = [
  "Member (Early Career), ASME, 2026 – present",
  "Student member 2023–2025 of AIAA, Royal Aeronautical Society (RAeS), IMechE, ASME and ASEE",
  "Registered Engineer, Pakistan Engineering Council (PEC)",
];
