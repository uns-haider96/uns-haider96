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
`Python` · `PyTorch` · `scikit-learn` · `NumPy` · `Pandas` · `Matplotlib` · `Git` · `ANSYS Fluent`

## 📄 Publication
**Design and Optimization of a Blended-Wing-Body UAV using AI-Driven Surrogate Modeling and CFD Analysis**
M. S. Naseem, **M. U. H. Shah**, et al. *Proceedings of the IMechE, Part G: Journal of Aerospace Engineering*, 2026.
[DOI: 10.1177/09544100261447561](https://doi.org/10.1177/09544100261447561)
> Led the computational core: designed the DOE, trained a Gaussian-process surrogate (benchmarked
> against four other regressors), and ran an Expected-Improvement Bayesian optimization loop whose
> uncertainty estimates drove adaptive sampling, improving cruise L/D by ~23% in ~80 CFD evaluations.

## 📌 Featured Projects

**🌀 [When Can a Data-Driven Surrogate Be Trusted Inside a Shape-Optimization Loop? — AirfRANS](https://github.com/uns-haider96/airfrans-surrogate-optimization)**
Neural surrogates trained on the AirfRANS steady-RANS benchmark (200-case *scarce* split), used to
drive airfoil shape optimization, with an explicit study of when the resulting optimum holds up.
- **Shape information is what lets a surrogate rank designs.** Adding a 13-number global shape
  descriptor to a pointwise MLP cut surface-pressure error 15× (MSE 0.967 → 0.063) and raised lift
  rank correlation to 0.998.
- **Drag cannot be recovered from predicted fields.** 68% of drag is viscous, set by the velocity
  gradient across a ~2 µm first cell; median drag error 1715%, rank correlation 0.075. Every
  published model on this benchmark fails the same way. Regressing forces directly instead, a
  Gaussian process reaches 0.3% median drag error and 0.999 rank correlation.
- **Both search strategies find the surrogate's optimum.** Bayesian optimization (50 evaluations)
  and gradient-based search via automatic differentiation through the network and the camber-line
  parameterization both land within 0.33% of a 200,000-point reference; AD sensitivities match
  central finite differences to seven decimals.
- **The optimum's performance is robust; its location is not.** Retraining on 80% subsets holds L/D
  at 93.8 ± 1.6 but moves the optimum 14–20% of the design range. At a separated-flow case the
  surrogate under-predicts drag by 80% while reporting high confidence — 139× its own predicted
  uncertainty.
- Also found and removed 88 leaked cases in the benchmark's own published evaluation splits.

`Python · PyTorch · scikit-learn · Gaussian processes · automatic differentiation`

**✈️ [Turbofan RUL Prediction: NASA C-MAPSS](https://github.com/uns-haider96/turbofan-rul-prediction-nasa-cmapss)**
ML pipeline for remaining-useful-life prediction (RMSE 17.97 on FD001); leakage-safe rolling-window
features, K-Means degradation profiling. `Python · scikit-learn`

**⚙️ [Bearing Fault Detection: CWRU](https://github.com/uns-haider96/bearing-fault-detection)**
End-to-end classifier for 10 bearing-fault conditions from 48 kHz vibration signals; ~97% accuracy
under stratified 5-fold CV. `Python · scikit-learn`

**🛩️ [BWB UAV: CFD + Surrogate Optimization](https://github.com/uns-haider96/AI-Driven-BWB-UAV-CFD-Optimization)**
Research portfolio for the published study above: CFD, Gaussian-process surrogate, Bayesian
optimization, FEA, and wind-tunnel validation of a blended-wing-body UAV.

## 🎓 Currently
Completing a research cohort on **machine learning for fluid dynamics** (neural operators, PINNs,
transformers, reduced-order modeling) led by Prof. Ricardo Vinuesa, hands-on in PyTorch.

## 📫 Connect
[Email](mailto:shahuns963@gmail.com) · [LinkedIn](https://www.linkedin.com/in/muhammad-uns-haider-shah/) · [All repositories](https://github.com/uns-haider96?tab=repositories)
