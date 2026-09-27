# Hi, I'm Muhammad Uns Haider Shah 👋

**Scientific Machine Learning · Computational Fluid Dynamics · Surrogate & Reduced-Order Modeling**

I build data-driven and machine-learning models for physical systems, at the point where
high-fidelity simulation meets deep learning. My published work pairs CFD with Gaussian-process
surrogates and Bayesian optimization. My recent work asks a harder question: not how accurately a
surrogate reproduces a flow field, but whether the design it recommends can be trusted.

## 🔬 Focus
- **Surrogate & reduced-order modeling**: Gaussian processes, deep-learning surrogates, POD/DMD
- **Scientific ML for CFD**: geometry-to-field prediction, direct force regression, differentiable surrogates
- **Bayesian optimization & uncertainty quantification**: sample-efficient design, calibration, and the limits of predicted uncertainty
- **Neural operators & physics-informed methods**: DeepONet, FNO, PINNs *(studied via research cohort; not yet applied in a released project)*
- **ML for engineering data**: predictive maintenance, fault diagnosis on benchmark datasets

## 🛠️ Tools
**Computation:** `Python` · `PyTorch` · `scikit-learn` · `NumPy` · `Pandas` · `Matplotlib` · `Git` · `ANSYS Fluent`  
**Design & experiment:** CAD modelling · FEA · carbon-fibre composite fabrication · wind-tunnel testing

## 📄 Publication
**Design and Optimization of a Blended-Wing-Body UAV using AI-Driven Surrogate Modeling and CFD Analysis**
M. S. Naseem, **M. U. H. Shah**, et al. *Proceedings of the IMechE, Part G: Journal of Aerospace Engineering*, 2026.
[DOI: 10.1177/09544100261447561](https://doi.org/10.1177/09544100261447561)
> Led the computational core: designed the DOE, trained a Gaussian-process surrogate (benchmarked
> against four other regressors), and ran an Expected-Improvement Bayesian optimization loop whose
> uncertainty estimates drove adaptive sampling, improving cruise L/D by ~23% in ~80 CFD evaluations.

## 📌 Featured Projects

**🌀 [When Can a Data-Driven Surrogate Be Trusted Inside a Shape-Optimization Loop? — AirfRANS](https://github.com/uns-haider96/airfrans-surrogate-optimization)**
Neural surrogates trained on the AirfRANS steady-RANS benchmark, used to drive airfoil shape
optimization and to test when the resulting optimum holds up.
- Global shape descriptor cut surface-pressure error **15×**; lift rank correlation **0.998**
- Gaussian-process force surrogates hit **0.3%** median drag error, where field-integrated drag proved unrankable
- Bayesian and AD-gradient search both landed within **0.33%** of the reference optimum
- Resampling moved that optimum **14–20%** of the design range, and predicted uncertainty under-estimated error **139×** at a separated-flow regime change

`Python · PyTorch · scikit-learn · Gaussian processes`

**🛩️ [Blended-Wing-Body UAV: CFD, Surrogate Optimization, Prototype & Wind Tunnel](https://github.com/uns-haider96/AI-Driven-BWB-UAV-CFD-Optimization)**
Research portfolio for the published study above, taken from concept to a tested physical prototype.
- ANSYS Fluent RANS (k-ω SST) on a 1 m BWB; Latin-hypercube design of experiments over wing and winglet geometry
- Gaussian-process surrogate + Expected-Improvement Bayesian optimization: L/D **9.9 → 12.2 (~23%)**
- Optimized airframe built in carbon-fibre/epoxy using 3D-printed matched moulds, then force-and-moment tested in a wind tunnel
- Presented at IBCAST 2025; published in IMechE Part G (2026)

`ANSYS Fluent · Python · Gaussian processes · Composites · Wind tunnel`

**✈️ [Turbofan RUL Prediction: NASA C-MAPSS](https://github.com/uns-haider96/turbofan-rul-prediction-nasa-cmapss)**
Remaining-useful-life prediction on FD001: Random Forest with per-engine rolling features (RMSE 17.97,
in line with published classical baselines), plus K-Means degradation profiling. `Python · scikit-learn`

**⚙️ [Bearing Fault Detection: CWRU](https://github.com/uns-haider96/bearing-fault-detection)**
Random-forest classifier for 10 bearing-fault conditions from 48 kHz vibration statistics: 96.4% in
5-fold CV, 92.2% on a held-out split, with an analysis of where time-domain features fail. `Python · scikit-learn`

## 🎓 Currently
Completing a research cohort on **machine learning for fluid dynamics** (neural operators, PINNs,
transformers, reduced-order modeling) led by Prof. Ricardo Vinuesa, hands-on in PyTorch.

## 📫 Connect
[Email](mailto:shahuns963@gmail.com) · [LinkedIn](https://www.linkedin.com/in/muhammad-uns-haider-shah/) · [All repositories](https://github.com/uns-haider96?tab=repositories)
