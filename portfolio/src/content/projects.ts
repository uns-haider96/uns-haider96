// Case-study content. Numbers are copied from each repository's README / results
// files; figures are the repositories' own published images (see public/figures).

export type FigureData = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Path of the original file in the GitHub repository, for attribution. */
  source?: string;
  /** How a card thumbnail fills its frame: photos crop, plots letterbox. */
  fit?: "cover" | "contain";
};

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; figure: FigureData; size?: "wide" | "normal" | "narrow" }
  | { type: "figures"; figures: FigureData[]; columns?: 2 | 3 }
  | {
      type: "table";
      caption: string;
      head: string[];
      rows: string[][];
      /** Index of a row to emphasise (e.g. the final model). */
      highlightRow?: number;
      note?: string;
    }
  | { type: "callout"; title: string; text: string }
  | { type: "flow"; steps: string[] };

export type Section = { id: string; title: string; blocks: Block[] };

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  kind: string;
  period: string;
  domain: "aero" | "prognostics" | "thermal";
  summary: string;
  question?: string;
  tags: string[];
  repo?: string;
  links?: { label: string; href: string }[];
  cover?: FigureData;
  stats: { value: string; label: string }[];
  role: string;
  sections: Section[];
  limitations?: string[];
};

const AIRFRANS = "https://github.com/uns-haider96/airfrans-surrogate-optimization";
const BWB = "https://github.com/uns-haider96/AI-Driven-BWB-UAV-CFD-Optimization";
const CMAPSS = "https://github.com/uns-haider96/turbofan-rul-prediction-nasa-cmapss";
const CWRU = "https://github.com/uns-haider96/bearing-fault-detection";

export const projects: Project[] = [
  // ---------------------------------------------------------------- AirfRANS
  {
    slug: "airfrans-surrogate-trust",
    title: "When Can a Data-Driven Surrogate Be Trusted Inside a Shape-Optimization Loop?",
    shortTitle: "Surrogate-based airfoil shape optimization (AirfRANS)",
    kind: "Independent research",
    period: "Aug – Sep 2026",
    domain: "aero",
    summary:
      "Neural and Gaussian-process surrogates trained on the AirfRANS steady-RANS benchmark, used to drive airfoil shape optimization and to test when the resulting optimum, and the surrogate's own uncertainty, can be trusted.",
    question:
      "Field error is not what decides whether a surrogate is useful for design. What matters is whether it orders candidate designs correctly, and whether the optimum it proposes is real.",
    tags: ["Python", "PyTorch", "scikit-learn", "Gaussian processes", "RANS data", "Bayesian optimization", "Autodiff"],
    repo: AIRFRANS,
    links: [
      { label: "Full technical write-up", href: `${AIRFRANS}/blob/main/writeup/writeup.md` },
      { label: "Notebooks", href: `${AIRFRANS}/tree/main/notebooks` },
    ],
    cover: {
      src: "/figures/airfrans/phase1_example_fields.png",
      width: 2700,
      height: 1500,
      alt: "True, predicted and absolute-error fields of velocity magnitude, pressure coefficient and turbulent viscosity around a NACA airfoil",
      caption:
        "True (left), predicted (centre) and absolute error (right) for |U|/u∞, Cp and ν_t/ν on a held-out test case (AoA 1.3°, Re 2.05 M), from the baseline pointwise MLP.",
      source: "figures/phase1_example_fields.png",
    },
    stats: [
      { value: "15×", label: "lower surface-pressure error from a global shape descriptor" },
      { value: "0.3 %", label: "median drag error, direct GP force surrogate" },
      { value: "0.33 %", label: "BO and AD-gradient search vs. reference optimum" },
      { value: "139×", label: "error vs. predicted σ at a likely flow-regime change" },
    ],
    role: "Sole author: data pipeline, all models, optimization and the trust study.",
    sections: [
      {
        id: "problem",
        title: "Problem",
        blocks: [
          {
            type: "p",
            text: "AirfRANS is published as a flow-field prediction benchmark. This project re-asks it as a design problem, with three questions:",
          },
          {
            type: "list",
            items: [
              "What must a surrogate be given in order to rank airfoil designs, rather than merely fit flow fields?",
              "Which aerodynamic quantities can a surrogate of this kind rank reliably, and which can it not?",
              "When the surrogate proposes an optimum, how far can that optimum be trusted without new high-fidelity simulation?",
            ],
          },
        ],
      },
      {
        id: "data",
        title: "Data & method",
        blocks: [
          {
            type: "p",
            text: "The AirfRANS scarce task: 200 two-dimensional, steady, incompressible RANS simulations (k-ω SST, OpenFOAM) over NACA 4- and 5-digit airfoils at Re 2–6 million and −5° to 15° incidence, about 180,000 mesh nodes per case. Training cases are split 160 / 40 for training and validation; the 200 shared test cases stay untouched until final evaluation.",
          },
          {
            type: "table",
            caption: "Work phases (one notebook each, run on Google Colab)",
            head: ["Phase", "Content"],
            rows: [
              ["0", "Data pipeline; pressure-force integration validated against the library's reference implementation"],
              ["1", "Pointwise MLP predicting four flow fields at each mesh node"],
              ["1b", "Same model plus a 13-number global shape descriptor per node"],
              ["2", "Aerodynamic evaluation: Cp, lift and drag including skin friction, rank correlation, boundary layers"],
              ["2b", "Direct force surrogates (neural ensemble and Gaussian process) from shape and condition to lift and drag"],
              ["3", "Shape optimization: Bayesian optimization, random-search control, and AD-gradient search"],
              ["4", "Trust study: resampling stability, controlled extrapolation, documented failure regime"],
            ],
          },
        ],
      },
      {
        id: "shape",
        title: "Shape information lets a surrogate rank designs",
        blocks: [
          {
            type: "p",
            text: "Both models are trained identically on the same 160 cases; the only difference is that the second also receives a description of the whole airfoil at each node. A pointwise model sees each node in isolation, but surface pressure depends on the entire airfoil, so without global shape information the model memorises the training airfoils.",
          },
          {
            type: "table",
            caption: "Field surrogates on the 200-case test set",
            head: ["Metric", "Pointwise MLP", "Shape-aware MLP"],
            rows: [
              ["Volume field MSE (normalised)", "0.252", "0.056"],
              ["Surface pressure MSE (normalised)", "0.967", "0.063"],
              ["Pressure lift RMSE", "0.115", "0.040"],
              ["Lift rank correlation", "0.984", "0.998"],
              ["Lift ordering, comparable pairs", "0.902", "0.971"],
            ],
          },
          {
            type: "figure",
            size: "narrow",
            figure: {
              src: "/figures/airfrans/phase1b_example_cp_vs_phase1.png",
              width: 1066,
              height: 723,
              alt: "Surface pressure coefficient along the chord: true, pointwise and shape-aware predictions",
              caption:
                "Surface Cp on a held-out 5-digit airfoil (AoA 1.3°, Re 2.05 M): the shape-aware model (orange) follows the CFD solution (black) far more closely than the pointwise model (dashed).",
              source: "figures/phase1b_example_cp_vs_phase1.png",
            },
          },
        ],
      },
      {
        id: "drag",
        title: "Field surrogates predict lift, and cannot rank drag",
        blocks: [
          {
            type: "p",
            text: "Integrating predicted fields to forces gives a median lift error of 2.6 % but a median drag error of 1715 %, with a drag rank correlation of 0.075. The cause is physical: viscous drag is 68 % of total drag and depends on the velocity gradient across a first cell about 2 µm thick, which a smooth network cannot resolve. Enforcing exact no-slip at the wall changed nothing. Pressure drag fails separately, as a small residual of large, nearly cancelling forces. Every model in the published benchmark also fails to rank drag, although the size of the drag error here is four to five times larger than theirs.",
          },
          {
            type: "figure",
            size: "wide",
            figure: {
              src: "/figures/airfrans/phase2_surface_cp_cf.png",
              width: 2234,
              height: 740,
              alt: "Surface pressure coefficient and skin-friction coefficient: true versus predicted",
              caption:
                "Surface Cp (left) is reproduced closely by the shape-aware model, while skin friction Cf (right) is wrong by an order of magnitude: the near-wall gradient that sets viscous drag is not resolved.",
              source: "figures/phase2_surface_cp_cf.png",
            },
          },
          {
            type: "p",
            text: "Regressing lift and log-drag directly from shape, incidence and Reynolds number bypasses the near-wall problem entirely.",
          },
          {
            type: "table",
            caption: "Direct force surrogates, 200 test cases",
            head: ["Metric", "Field model", "NN ensemble", "Gaussian process"],
            rows: [
              ["Drag relative error (median)", "1715 %", "0.8 %", "0.3 %"],
              ["Drag rank correlation", "0.075", "0.998", "0.999"],
              ["L/D rank correlation", "0.883", "0.997", "0.999"],
              ["Drag ordering, distinguishable pairs", "0.66", "0.995", "1.000"],
              ["Log-drag within ±2σ of predicted uncertainty", "–", "55 %", "91 %"],
            ],
            note: "The Gaussian process is both more accurate and better calibrated; the ensemble's spread under-estimates its own error.",
          },
          {
            type: "figure",
            size: "normal",
            figure: {
              src: "/figures/airfrans/phase2b_parity_direct.png",
              width: 1858,
              height: 1859,
              alt: "Parity plots of predicted versus true lift, drag and lift-to-drag for three surrogate types",
              caption:
                "Parity plots for CL, CD and L/D, coloured by angle of attack. Top: field-integrated shape-aware MLP. Middle: direct NN ensemble. Bottom: direct Gaussian process.",
              source: "figures/phase2b_parity_direct.png",
            },
          },
        ],
      },
      {
        id: "optimization",
        title: "Shape optimization",
        blocks: [
          {
            type: "p",
            text: "Two problems over NACA camber, camber position and thickness at Re = 4 × 10⁶ and α = 4°, with thickness constrained to ≥ 12 %: maximise L/D, and minimise drag at fixed lift. Gradients for the gradient-based search come from automatic differentiation through the network and the camber-line formula, with no adjoint solver and no finite differences; they agree with central finite differences to seven decimal places.",
          },
          {
            type: "table",
            caption: "Problem 1, maximise L/D",
            head: ["Method", "Surrogate evaluations", "Best L/D", "vs. 200,000-point reference"],
            rows: [
              ["Bayesian optimization", "50", "91.73", "−0.03 %"],
              ["Random search (same budget)", "50", "88.89", "+3.07 %"],
              ["Gradient-based, 20 starts", "176 (8.8 per start)", "92.01", "−0.33 %"],
            ],
          },
          {
            type: "figure",
            size: "wide",
            figure: {
              src: "/figures/airfrans/phase3_convergence.png",
              width: 2532,
              height: 656,
              alt: "Convergence of Bayesian optimization versus random search, and multi-start spread of gradient-based search",
              caption:
                "Left and centre: Bayesian optimization against a random-search control for both problems, with the dense-sample reference dashed. Right: one of 20 gradient-based starts converged to L/D ≈ 76 instead of ≈ 92, so restarts are necessary.",
              source: "figures/phase3_convergence.png",
            },
          },
          {
            type: "figures",
            columns: 2,
            figures: [
              {
                src: "/figures/airfrans/phase3_design_space.png",
                width: 2055,
                height: 814,
                alt: "Design-space slice of predicted L/D and GP uncertainty with training designs and optima",
                caption:
                  "Design-space slice: ensemble-predicted L/D (left) and GP uncertainty in log CD (right), with training designs and both optima on the 12 % thickness constraint.",
                source: "figures/phase3_design_space.png",
              },
              {
                src: "/figures/airfrans/phase3_optimised_shapes.png",
                width: 1635,
                height: 312,
                alt: "Optimised airfoil shapes compared with the NACA 2412 reference",
                caption: "Optimised sections for both problems against a NACA 2412 reference.",
                source: "figures/phase3_optimised_shapes.png",
              },
            ],
          },
        ],
      },
      {
        id: "trust",
        title: "How far can the optimum be trusted?",
        blocks: [
          {
            type: "p",
            text: "Retraining the surrogate on eight random 80 % subsets and repeating the optimization moves the optimal design by roughly 14–20 % of the design range, and thickness sat on its 12 % bound in every run. Each retrained surrogate rates its own optimum at L/D 93.8 ± 1.6, but rating one fixed design the retrained surrogates give 91.9 ± 4.2, from 83.6 to 96.0, while the optimizers compete over differences of 0.3 %. The surrogate identifies a family of candidate designs, not a unique optimum.",
          },
          {
            type: "table",
            caption: "Controlled extrapolation: drag error as the training band is narrowed",
            head: ["Band narrowed in", "Inside", "Near outside", "Far outside", "Error / predicted σ (far)"],
            rows: [
              ["Reynolds number", "0.8 %", "1.3 %", "2.4 %", "0.89"],
              ["Angle of attack", "0.3 %", "0.5 %", "4.0 %", "1.60"],
            ],
          },
          {
            type: "figure",
            size: "wide",
            figure: {
              src: "/figures/airfrans/phase4_controlled_extrapolation.png",
              width: 2083,
              height: 675,
              alt: "Bar charts of actual drag error and predicted uncertainty inside and outside the training band",
              caption:
                "Actual CD error (blue) and predicted standard deviation (orange). For angle of attack they grow together, so predicted uncertainty is a usable stopping signal; for Reynolds number the error triples while the predicted uncertainty stays flat.",
              source: "figures/phase4_controlled_extrapolation.png",
            },
          },
          {
            type: "callout",
            title: "The decisive exception",
            text: "The worst-predicted unseen case, a validation case, is a 5.2 %-thick airfoil at −4.4° whose velocity field shows a low-speed region along the whole lower surface, consistent with separation. Its drag is 4.1× the training median and 93 % pressure drag; the surrogate under-predicts it by 80 %, an error 139× its predicted uncertainty. Only six other cases among the 200 simulations are thinner than 8 % at negative incidence. A surrogate's confidence bounds part of its interpolation error; it cannot see a change of flow regime, because the inputs look ordinary.",
          },
          {
            type: "figure",
            size: "wide",
            figure: {
              src: "/figures/airfrans/phase4_failure_case.png",
              width: 2209,
              height: 1096,
              alt: "Velocity and pressure fields for the worst-predicted case and a well-predicted case",
              caption:
                "Left: the failure case (α −4.4°, 5.2 % thickness) with a low-speed region along the lower surface, consistent with separation. Right: a well-predicted case (α −0.9°, 19.8 % thickness) for comparison.",
              source: "figures/phase4_failure_case.png",
            },
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        blocks: [
          {
            type: "p",
            text: "A cheap data-driven surrogate narrows a design space quickly; it cannot certify the result. Surrogate-to-surrogate disagreement and the movement of the optimum under resampling both exceed the gains the optimizer is chasing, predicted confidence tracks extrapolation in incidence but not in Reynolds number, and confidence collapses where the flow physics changes rather than where the inputs become unusual. The defensible use is mixed-fidelity: surrogate-based exploration to identify a family of candidates, followed by high-fidelity verification, with adjoint methods as the right tool for high-dimensional gradient refinement.",
          },
        ],
      },
    ],
    limitations: [
      "Incompressible, subsonic flow at Re of a few million; much benchmark shape-optimization work is transonic.",
      "Three design variables; surrogate-based optimization degrades as dimension grows.",
      "Direct force surrogates apply only to NACA 4- and 5-digit airfoils at the trained conditions.",
      "No new CFD was run to verify the optima.",
      "Single training runs, whereas published baselines report five-run means.",
      "88 of 496 cases in the benchmark's reynolds / aoa splits overlapped this model's training set and were removed before evaluation.",
    ],
  },

  // ---------------------------------------------------------------- BWB UAV
  {
    slug: "bwb-uav-surrogate-optimization",
    title: "Blended-Wing-Body UAV: CFD, Surrogate-Based Optimization, Composite Prototype & Wind Tunnel",
    shortTitle: "Blended-wing-body UAV optimization",
    kind: "Final-year design project · peer-reviewed publication",
    period: "2024 – 2025",
    domain: "aero",
    summary:
      "A 1 m blended-wing-body UAV taken from concept to a tested physical prototype: RANS CFD, a Latin-hypercube design of experiments, a Gaussian-process surrogate with Expected-Improvement Bayesian optimization, carbon-fibre fabrication in 3D-printed moulds, and wind-tunnel force-and-moment testing.",
    tags: ["ANSYS Fluent", "k-ω SST", "Latin hypercube", "Gaussian processes", "Bayesian optimization", "CFRP", "Wind tunnel"],
    repo: BWB,
    links: [
      { label: "DOI 10.1177/09544100261447561", href: "https://doi.org/10.1177/09544100261447561" },
      { label: "IBCAST 2025 slides", href: `${BWB}/tree/main/docs/conference` },
      { label: "Methodology notes", href: `${BWB}/tree/main/methodology` },
    ],
    cover: {
      src: "/figures/bwb/07-carbon-fiber-composite-airframe-and-winglet.jpg",
      width: 1800,
      height: 810,
      alt: "Carbon-fibre composite blended-wing-body airframe half and winglet",
      caption: "Carbon-fibre / epoxy airframe half and winglet after demoulding.",
      source: "assets/figures/manufacturing/07-carbon-fiber-composite-airframe-and-winglet.jpg",
      fit: "cover",
    },
    stats: [
      { value: "9.9 → 12.2", label: "cruise L/D, baseline to optimized" },
      { value: "~23 %", label: "improvement in lift-to-drag ratio" },
      { value: "~80", label: "CFD evaluations in the optimization" },
      { value: "1.29 M", label: "cells, documented Fluent mesh" },
    ],
    role: "Developed the GP surrogate and Bayesian-optimization pipeline end to end and ran the 3D RANS CFD that generated its training data; the wider team covered CAD, FEA, composite prototyping and wind-tunnel testing.",
    sections: [
      {
        id: "objective",
        title: "Objective",
        blocks: [
          {
            type: "p",
            text: "Improve the aerodynamic efficiency, and so the endurance potential, of a small BWB UAV operating under low-power propulsion constraints, using high-fidelity CFD only where it is needed and a surrogate everywhere else.",
          },
          {
            type: "flow",
            steps: [
              "CAD geometry",
              "RANS CFD",
              "Latin-hypercube DOE",
              "GP surrogate",
              "Bayesian optimization",
              "Optimized geometry",
              "Composite manufacture",
              "Wind-tunnel test",
            ],
          },
          {
            type: "figure",
            size: "narrow",
            figure: {
              src: "/figures/bwb/final-bwb-uav-cad-model.png",
              width: 553,
              height: 332,
              alt: "CAD model of the final blended-wing-body UAV half-span",
              caption: "Final BWB UAV geometry (half-span CAD model).",
              source: "assets/figures/cad/final-bwb-uav-cad-model.png",
            },
          },
          {
            type: "table",
            caption: "Final configuration",
            head: ["Parameter", "Value"],
            rows: [
              ["Wingspan", "1.0 m"],
              ["Root / tip chord", "0.30 m / 0.15 m"],
              ["Aspect ratio", "≈ 7"],
              ["Winglet root / tip chord", "0.11 m / 0.05 m"],
              ["Airfoils (centre / mid / wing)", "Selig S1223 / NACA 1408 / NACA 0012"],
            ],
          },
        ],
      },
      {
        id: "cfd",
        title: "CFD methodology",
        blocks: [
          {
            type: "p",
            text: "3D external-flow simulations in ANSYS Fluent: steady, pressure-based solver with the SST k-ω turbulence model, pressure-farfield boundaries and local mesh refinement around the body and wake. The documented Fluent report is a Mach 0.7 case used for high-speed flow visualisation; it is not the low-speed endurance condition at which L/D was optimized.",
          },
          {
            type: "table",
            caption: "Mesh statistics, documented Fluent case",
            head: ["Quantity", "Value"],
            rows: [
              ["Cells", "1,291,222"],
              ["Faces", "5,568,328"],
              ["Nodes", "3,118,737"],
              ["Minimum orthogonal quality", "0.0508"],
              ["Maximum aspect ratio", "264.6"],
            ],
          },
          {
            type: "figures",
            columns: 2,
            figures: [
              {
                src: "/figures/bwb/volume-mesh.png",
                width: 746,
                height: 335,
                alt: "Volume mesh around the UAV",
                caption: "Volume mesh with refinement around the body and wake.",
                source: "assets/figures/cfd/mesh/volume-mesh.png",
              },
              {
                src: "/figures/bwb/wing-surface-mesh.png",
                width: 690,
                height: 353,
                alt: "Surface mesh on the wing",
                caption: "Wing surface mesh.",
                source: "assets/figures/cfd/mesh/wing-surface-mesh.png",
              },
              {
                src: "/figures/bwb/static-pressure-upper-surface.png",
                width: 652,
                height: 355,
                alt: "Static pressure contour on the upper surface",
                caption: "Static pressure, upper surface.",
                source: "assets/figures/cfd/pressure/static-pressure-upper-surface.png",
              },
              {
                src: "/figures/bwb/static-pressure-lower-surface.png",
                width: 651,
                height: 354,
                alt: "Static pressure contour on the lower surface",
                caption: "Static pressure, lower surface.",
                source: "assets/figures/cfd/pressure/static-pressure-lower-surface.png",
              },
            ],
          },
          {
            type: "figures",
            columns: 3,
            figures: [
              {
                src: "/figures/bwb/mach-contour-root-section.png",
                width: 649,
                height: 353,
                alt: "Mach number contour at the root section",
                caption: "Mach contour, root section.",
                source: "assets/figures/cfd/mach-contours/mach-contour-root-section.png",
              },
              {
                src: "/figures/bwb/mach-contour-mid-section.png",
                width: 652,
                height: 352,
                alt: "Mach number contour at the mid section",
                caption: "Mach contour, mid-span.",
                source: "assets/figures/cfd/mach-contours/mach-contour-mid-section.png",
              },
              {
                src: "/figures/bwb/mach-contour-tip-section.png",
                width: 649,
                height: 350,
                alt: "Mach number contour at the tip section",
                caption: "Mach contour, tip section.",
                source: "assets/figures/cfd/mach-contours/mach-contour-tip-section.png",
              },
            ],
          },
          {
            type: "p",
            text: "The root section, where body and lifting surface blend, shows the strongest three-dimensional flow interaction, an important design region for BWB aircraft.",
          },
        ],
      },
      {
        id: "doe",
        title: "Design-space sampling",
        blocks: [
          {
            type: "p",
            text: "Latin hypercube sampling spread candidate geometries across root and tip chord, sweep, taper ratio, twist, and winglet cant, sweep and chords. The correlation analysis shows mostly weak pairwise correlation between sampled variables, supporting the space-filling behaviour of the sample used to train the surrogate.",
          },
          {
            type: "figures",
            columns: 2,
            figures: [
              {
                src: "/figures/bwb/lhs-parameter-histograms.png",
                width: 1839,
                height: 2048,
                alt: "Histograms of Latin hypercube sampled design parameters",
                caption: "Distributions of the Latin-hypercube-sampled design parameters.",
                source: "assets/figures/design-space/lhs-parameter-histograms.png",
              },
              {
                src: "/figures/bwb/correlation-coefficient-heatmap.png",
                width: 1922,
                height: 1712,
                alt: "Correlation coefficient heatmap of sampled design parameters",
                caption: "Pairwise correlation coefficients between sampled parameters.",
                source: "assets/figures/design-space/correlation-coefficient-heatmap.png",
              },
            ],
          },
        ],
      },
      {
        id: "optimization",
        title: "Surrogate model & Bayesian optimization",
        blocks: [
          {
            type: "p",
            text: "Several regressors were benchmarked as candidate surrogates (multiple linear, support-vector, random-forest, k-nearest-neighbour and MLP regression). Gaussian Process Regression was selected because it returns a predictive uncertainty as well as a mean, which the Expected-Improvement acquisition needs.",
          },
          {
            type: "list",
            items: [
              "Generate initial candidates by Latin hypercube sampling and evaluate them with CFD.",
              "Train the GP surrogate on the CFD results.",
              "Select the next candidate by maximising Expected Improvement, balancing exploration against exploitation.",
              "Evaluate the selected candidate with high-fidelity CFD, update the surrogate, and repeat until the improvement converges.",
            ],
          },
          {
            type: "figure",
            size: "narrow",
            figure: {
              src: "/figures/bwb/bayesian-optimization-convergence.png",
              width: 602,
              height: 340,
              alt: "Best observed lift-to-drag ratio and Expected Improvement against iteration",
              caption:
                "Best observed L/D (blue) rises from ≈ 9.9 to ≈ 12.2 while the Expected-Improvement criterion (red, log scale) falls as the optimizer converges.",
              source: "assets/figures/optimization/bayesian-optimization-convergence.png",
            },
          },
          {
            type: "table",
            caption: "Baseline vs. optimized design",
            head: ["Parameter / metric", "Baseline", "Optimized"],
            rows: [
              ["Wing area", "0.75 m²", "0.85 m²"],
              ["Sweep angle", "30°", "28°"],
              ["Taper ratio", "0.50", "0.48"],
              ["Wing twist", "−2°", "−3°"],
              ["Winglet cant / sweep", "15° / 10°", "20° / 15°"],
              ["Lift coefficient, CL", "0.330", "0.365"],
              ["Drag coefficient, CD", "0.0335", "0.0300"],
              ["Lift-to-drag ratio, L/D", "9.9", "12.2"],
            ],
            highlightRow: 7,
          },
        ],
      },
      {
        id: "manufacturing",
        title: "Composite manufacture",
        blocks: [
          {
            type: "p",
            text: "The optimized surface was turned into matched mould tooling, 3D-printed in segments, then sanded, aligned and prepared. The airframe was laid up in carbon-fibre / epoxy (twill-weave 3K, 200 gsm) and consolidated by vacuum-bag resin infusion, then demoulded, trimmed and assembled. Structural feasibility of the composite airframe was assessed with finite-element analysis.",
          },
          {
            type: "figures",
            columns: 3,
            figures: [
              {
                src: "/figures/bwb/01-mold-3d-printing-full-view.jpg",
                width: 1054,
                height: 1400,
                alt: "Mould segment being 3D printed",
                caption: "Mould segment being 3D printed.",
                source: "assets/figures/manufacturing/01-mold-3d-printing-full-view.jpg",
              },
              {
                src: "/figures/bwb/03-assembled-3d-printed-mold-halves.jpg",
                width: 1800,
                height: 1355,
                alt: "Assembled segmented 3D-printed mould",
                caption: "Assembled segmented mould.",
                source: "assets/figures/manufacturing/03-assembled-3d-printed-mold-halves.jpg",
              },
              {
                src: "/figures/bwb/09-carbon-fiber-layup-in-mold.jpg",
                width: 1016,
                height: 675,
                alt: "Carbon-fibre layup inside the mould",
                caption: "Carbon-fibre layup in the mould.",
                source: "assets/figures/manufacturing/09-carbon-fiber-layup-in-mold.jpg",
              },
            ],
          },
        ],
      },
      {
        id: "wind-tunnel",
        title: "Wind-tunnel testing",
        blocks: [
          {
            type: "p",
            text: "The manufactured prototype was mounted in a wind tunnel and lift, drag, side force, pitch, yaw and roll were recorded across combinations of wind speed (10, 20 and 28 m/s) and angle. These results are prototype-level experimental characterisation, not a one-to-one validation of the CFD: force-balance calibration, repeatability and uncertainty bounds are not documented in the public material.",
          },
          {
            type: "figures",
            columns: 2,
            figures: [
              {
                src: "/figures/bwb/02-wind-tunnel-mounted-prototype-test-setup.png",
                width: 819,
                height: 599,
                alt: "BWB prototype mounted on a sting in the wind-tunnel test section",
                caption: "Prototype mounted in the wind-tunnel test section.",
                source: "assets/figures/wind-tunnel/02-wind-tunnel-mounted-prototype-test-setup.png",
              },
              {
                src: "/figures/bwb/01-wind-tunnel-force-and-moment-results.jpg",
                width: 1280,
                height: 905,
                alt: "Bar charts of maximum lift, drag, side force, pitch, yaw and roll across test cases",
                caption: "Maximum lift, drag, side force, pitch, yaw and roll across the test cases.",
                source: "assets/figures/wind-tunnel/01-wind-tunnel-force-and-moment-results.jpg",
              },
            ],
          },
        ],
      },
      {
        id: "dissemination",
        title: "Publication & presentation",
        blocks: [
          {
            type: "p",
            text: "Presented orally at IBCAST 2025 (Fluid Dynamics track) and published in Proceedings of the IMechE, Part G: Journal of Aerospace Engineering (SAGE, OnlineFirst 28 April 2026, DOI 10.1177/09544100261447561).",
          },
        ],
      },
    ],
    limitations: [
      "The repository is documentation-first: the original working scripts are not public; reproducibility-level pseudocode and workflow notes are provided instead.",
      "The Mach 0.7 Fluent case is a high-speed visualisation case, distinct from the low-speed endurance optimization condition.",
      "Wind-tunnel results are prototype-level characterisation without published calibration or uncertainty analysis.",
    ],
  },

  // ---------------------------------------------------------------- C-MAPSS
  {
    slug: "turbofan-rul-cmapss",
    title: "Turbofan Remaining-Useful-Life Prediction on NASA C-MAPSS",
    shortTitle: "Turbofan RUL prediction (NASA C-MAPSS)",
    kind: "Independent project",
    period: "Mar – May 2026",
    domain: "prognostics",
    summary:
      "An end-to-end prognostics pipeline on the C-MAPSS FD001 run-to-failure dataset: leakage-safe preprocessing, per-engine rolling features, Random Forest RUL regression against a linear baseline, and K-Means degradation profiling.",
    tags: ["Python", "scikit-learn", "pandas", "Random Forest", "K-Means", "PCA"],
    repo: CMAPSS,
    links: [{ label: "Notebook", href: `${CMAPSS}/blob/main/CMAPSS_Analysis.ipynb` }],
    cover: {
      src: "/figures/turbofan/plot6_predictions_vs_actual.png",
      width: 2073,
      height: 918,
      alt: "Predicted versus actual remaining useful life for linear regression and random forest",
      caption: "Predicted vs. actual RUL on the 100 FD001 test engines for both models.",
      source: "plot6_predictions_vs_actual.png",
    },
    stats: [
      { value: "17.97", label: "RMSE (cycles), Random Forest" },
      { value: "12.74", label: "MAE (cycles), Random Forest" },
      { value: "14.1 %", label: "RMSE improvement over linear baseline" },
      { value: "0.63", label: "importance of smoothed sensor 4 (raw: 0.01)" },
    ],
    role: "Sole author.",
    sections: [
      {
        id: "data",
        title: "Dataset & preprocessing",
        blocks: [
          {
            type: "p",
            text: "FD001: 100 simulated turbofan engines run to failure under one operating condition and one fault mode, with 21 sensors and 3 operational settings per cycle (20,631 training rows). Engine lifetimes range from 128 to 362 cycles (mean 206).",
          },
          {
            type: "list",
            items: [
              "Dropped 7 near-constant sensors and sensor 6 (cycle correlation r = 0.11), keeping 14.",
              "Piecewise-linear RUL target capped at 125 cycles to focus learning on the degradation zone.",
              "5-cycle rolling mean on the 7 most degrading sensors, computed within each engine to prevent cross-engine leakage.",
              "StandardScaler fitted on training data only.",
            ],
          },
          {
            type: "figure",
            size: "wide",
            figure: {
              src: "/figures/turbofan/plot2_sensor_trends.png",
              width: 1800,
              height: 1161,
              alt: "Sensor readings against cycle showing degradation trends",
              caption: "Sensor degradation trends over engine life: sensors 4, 11 and 15 rise with age; 7, 12, 20 and 21 fall.",
              source: "plot2_sensor_trends.png",
            },
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "table",
            caption: "Evaluated on the 100 FD001 test engines (last available cycle, true RUL capped at 125)",
            head: ["Model", "RMSE (cycles)", "MAE (cycles)"],
            rows: [
              ["Linear Regression (baseline)", "20.92", "16.39"],
              ["Random Forest", "17.97", "12.74"],
            ],
            highlightRow: 1,
          },
          {
            type: "table",
            caption: "In context: reported FD001 results with a similar capped RUL target",
            head: ["Method", "FD001 RMSE", "Source"],
            rows: [
              ["CNN", "18.45", "Babu et al., 2016"],
              ["This work: Random Forest + rolling features", "17.97", "—"],
              ["Deep LSTM", "16.14", "Zheng et al., 2017"],
              ["Deep CNN (time-window input)", "12.61", "Li et al., 2018"],
            ],
            highlightRow: 1,
            note: "A competitive classical baseline, in line with early deep-learning results but short of state-of-the-art sequence models. Published numbers use slightly different caps and preprocessing, so the comparison is indicative.",
          },
          {
            type: "figure",
            size: "normal",
            figure: {
              src: "/figures/turbofan/plot7_feature_importance.png",
              width: 1475,
              height: 1173,
              alt: "Random forest feature importance ranking",
              caption:
                "Random Forest feature importance. Raw sensor 4 ranks 19th (0.01); its 5-cycle rolling mean ranks 1st (0.63). Smoothing did more for accuracy than the switch from a linear to a non-linear model.",
              source: "plot7_feature_importance.png",
            },
          },
          {
            type: "p",
            text: "Linear regression over-predicts RUL near failure, telling an operator an engine is healthier than it is; the Random Forest is markedly safer in the low-RUL zone.",
          },
        ],
      },
      {
        id: "clustering",
        title: "Degradation profiles",
        blocks: [
          {
            type: "p",
            text: "Degradation profiles built from the last 20 cycles of each engine were clustered with K-Means (k = 3 from the elbow method) and projected to 2D with PCA. Two clusters have nearly identical mean lifetimes (215.2 vs. 217.9 cycles) but distinct sensor fingerprints: different degradation pathways can lead to the same total life.",
          },
          {
            type: "figure",
            size: "narrow",
            figure: {
              src: "/figures/turbofan/plot9_clusters_pca.png",
              width: 1473,
              height: 1023,
              alt: "PCA scatter of engines coloured by K-Means cluster",
              caption: "Engine degradation clusters in the first two principal components.",
              source: "plot9_clusters_pca.png",
            },
          },
        ],
      },
    ],
    limitations: [
      "Single sub-dataset (FD001: one operating condition, one fault mode); results may not transfer to FD002–FD004.",
      "Each test engine is represented by its last cycle only; no temporal model of the trajectory.",
      "Single train/test run, without cross-validation over engines or uncertainty on the RMSE.",
      "C-MAPSS is simulated data, so conclusions are methodological rather than operational.",
    ],
  },

  // ---------------------------------------------------------------- CWRU
  {
    slug: "bearing-fault-cwru",
    title: "Rolling-Bearing Fault Diagnosis from Vibration Signals (CWRU)",
    shortTitle: "Bearing fault diagnosis (CWRU)",
    kind: "Independent project",
    period: "Oct – Dec 2025",
    domain: "prognostics",
    summary:
      "A Random Forest classifier for ten bearing conditions (healthy plus ball, inner-race and outer-race faults at three defect sizes) from nine time-domain statistics of 48 kHz drive-end vibration, with an analysis of where time-domain features fail.",
    tags: ["Python", "scikit-learn", "Signal features", "Random Forest", "Condition monitoring"],
    repo: CWRU,
    links: [{ label: "Notebook", href: `${CWRU}/blob/main/bearing_fault_detection.ipynb` }],
    cover: {
      src: "/figures/bearing/rms_crest_by_class.png",
      width: 1389,
      height: 490,
      alt: "RMS and crest factor of vibration windows by bearing fault class",
      caption: "RMS (vibration energy) and crest factor (impulsiveness) by fault class.",
      source: "figures/rms_crest_by_class.png",
    },
    stats: [
      { value: "96.4 %", label: "5-fold stratified CV accuracy (± 0.8 %)" },
      { value: "92.2 %", label: "held-out test accuracy (macro F1 0.92)" },
      { value: "10", label: "bearing condition classes" },
      { value: "2,300", label: "2048-sample vibration windows" },
    ],
    role: "Sole author.",
    sections: [
      {
        id: "setup",
        title: "Data & features",
        blocks: [
          {
            type: "p",
            text: "CWRU Bearing Data Center: 2 HP motor at 1772 rpm and 1 HP load, drive-end accelerometer sampled at 48 kHz, with single-point EDM defects of 0.007″, 0.014″ and 0.021″ at three bearing locations. Each 2048-sample window (~0.04 s) is reduced to nine statistics: max, min, mean, standard deviation, RMS, skewness, excess kurtosis, crest factor and form factor.",
          },
          {
            type: "p",
            text: "A Random Forest (200 trees) was trained on a stratified 90 / 10 split and evaluated by 5-fold stratified cross-validation, per-class precision / recall / F1 and a confusion matrix.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "table",
            caption: "Accuracy",
            head: ["Evaluation", "Accuracy"],
            rows: [
              ["5-fold stratified cross-validation", "96.4 % ± 0.8 %"],
              ["Held-out test set (230 windows, 23 per class)", "92.2 % (macro F1 0.92)"],
            ],
          },
          {
            type: "figures",
            columns: 2,
            figures: [
              {
                src: "/figures/bearing/confusion_matrix.png",
                width: 998,
                height: 900,
                alt: "Confusion matrix on the held-out test set",
                caption: "Held-out confusion matrix: errors concentrate in Ball 0.007″, Ball 0.021″ and Outer race 0.014″.",
                source: "figures/confusion_matrix.png",
              },
              {
                src: "/figures/bearing/feature_importance.png",
                width: 889,
                height: 490,
                alt: "Random forest feature importance for vibration features",
                caption: "Gini importance: energy features (sd, rms) dominate.",
                source: "figures/feature_importance.png",
              },
            ],
          },
        ],
      },
      {
        id: "physics",
        title: "Where time-domain features fail",
        blocks: [
          {
            type: "p",
            text: "Healthy windows sit at an excess kurtosis near 0, as expected for near-Gaussian vibration, and several faults are strongly impulsive. But kurtosis does not rise monotonically with defect size: Ball 0.021″ and Outer race 0.014″ look almost as Gaussian as a healthy bearing. Together with Ball 0.007″, these are the classes the classifier confuses; without impulsive content the time-domain statistics carry little to separate them.",
          },
          {
            type: "figure",
            size: "wide",
            figure: {
              src: "/figures/bearing/kurtosis_by_class.png",
              width: 1289,
              height: 490,
              alt: "Box plot of excess kurtosis by bearing fault class",
              caption: "Excess kurtosis by class: impulsiveness is not monotonic in defect size.",
              source: "figures/kurtosis_by_class.png",
            },
          },
          {
            type: "callout",
            title: "A warning sign, not a finding",
            text: "The feature `mean` ranks third in importance, but vibration has no physical mean: it mostly captures each recording's DC offset. The model may partly be recognising which recording a window came from rather than the fault itself, one reason the random window-level split is optimistic.",
          },
        ],
      },
    ],
    limitations: [
      "Optimistic split: windows from one continuous recording per class are split at random, so train and test share recordings. A recording- or load-level split is the stricter test.",
      "Single load condition (1 HP) and a single drive-end sensor.",
      "Time-domain features only; classical envelope-spectrum features at BPFI / BPFO / BSF are not used.",
      "Gini importance is biased toward continuous, high-variance features.",
    ],
  },

  // ---------------------------------------------------------------- Heat exchanger
  {
    slug: "shell-and-tube-heat-exchanger",
    title: "Shell-and-Tube Heat Exchanger: Design, Fabrication & Thermal Testing",
    shortTitle: "Shell-and-tube heat exchanger",
    kind: "Undergraduate course project",
    period: "Fall 2022",
    domain: "thermal",
    summary:
      "A baffled shell-and-tube heat exchanger sized from first principles, fabricated, and tested, with the measured energy balance agreeing with the design prediction to within 5 %.",
    tags: ["LMTD method", "Dittus–Boelter", "Bell–Delaware", "Fabrication", "Experimental validation"],
    stats: [
      { value: "50 → 35 °C", label: "hot-fluid temperature drop" },
      { value: "10 → 22 °C", label: "cold-fluid temperature rise" },
      { value: "≤ 5 %", label: "energy-balance agreement with prediction" },
      { value: "7 ft", label: "unit length" },
    ],
    role: "Design calculations, fabrication and testing as part of the course project.",
    sections: [
      {
        id: "design",
        title: "Thermal design",
        blocks: [
          {
            type: "p",
            text: "The exchanger was sized from first principles rather than from a catalogue selection:",
          },
          {
            type: "list",
            items: [
              "Log-mean temperature difference (LMTD) method for the required duty.",
              "Tube-side convective coefficient from the Dittus–Boelter correlation.",
              "Shell-side coefficient by the Bell–Delaware method.",
              "Fouling factors, baffle spacing and tube count.",
            ],
          },
        ],
      },
      {
        id: "build",
        title: "Fabrication",
        blocks: [
          {
            type: "table",
            caption: "As-built unit",
            head: ["Item", "Specification"],
            rows: [
              ["Overall length", "7 ft"],
              ["Shell", "3-inch PVC"],
              ["Tube", "1.2 cm metal tube"],
              ["Shell-side flow", "Baffled"],
            ],
          },
        ],
      },
      {
        id: "test",
        title: "Experimental validation",
        blocks: [
          {
            type: "table",
            caption: "Measured temperatures",
            head: ["Stream", "Inlet", "Outlet", "Change"],
            rows: [
              ["Hot fluid", "50 °C", "35 °C", "−15 °C"],
              ["Cold fluid", "10 °C", "22 °C", "+12 °C"],
            ],
          },
          {
            type: "p",
            text: "The energy balance computed from the measured temperatures agreed with the theoretical prediction to within 5 %.",
          },
        ],
      },
    ],
    limitations: [
      "No public repository or photographs of this project are available; the values above are the recorded design and test data.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
