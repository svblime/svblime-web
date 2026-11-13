/* @ds-bundle: {"format":4,"namespace":"SVBLIMEDesignSystem_fe43f6","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"FounderCard","sourcePath":"components/content/FounderCard.jsx"},{"name":"PillarCard","sourcePath":"components/content/PillarCard.jsx"},{"name":"QuoteBlock","sourcePath":"components/content/QuoteBlock.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"SpectrumBar","sourcePath":"components/core/SpectrumBar.jsx"}],"sourceHashes":{"components/content/Card.jsx":"dc9a40e4e3d9","components/content/FounderCard.jsx":"02cc1c6c48a3","components/content/PillarCard.jsx":"7b5711fec326","components/content/QuoteBlock.jsx":"5889c7e48f81","components/content/StatBlock.jsx":"4f369dcc58f6","components/core/Badge.jsx":"1566e9973984","components/core/Button.jsx":"c100444c646f","components/core/Eyebrow.jsx":"2e3e9f72364a","components/core/SpectrumBar.jsx":"a6051be3ffdb","ui_kits/website/Site.jsx":"627a82c3b665","ui_kits/website/doc-page.js":"5957844bb066","ui_kits/website/standalone-Site.jsx":"ca07ba45f371"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SVBLIMEDesignSystem_fe43f6 = window.SVBLIMEDesignSystem_fe43f6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface card — near-black surface, hairline border, tight radius.
 * Elevation reads through surface + border, not heavy shadow.
 * hover adds a subtle lift + accent border when interactive.
 */
function Card({
  children,
  interactive = false,
  accent = "blue",
  padding = "var(--space-6)",
  style = {},
  ...rest
}) {
  const signals = {
    blue: "var(--svb-blue)",
    amber: "var(--svb-amber)",
    violet: "var(--svb-violet)"
  };
  const a = signals[accent] || signals.blue;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: hover ? "var(--surface-raised)" : "var(--surface-card)",
      border: "1px solid " + (hover ? a : "var(--border-default)"),
      borderRadius: "var(--radius-md)",
      padding,
      transition: "background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
      transform: hover ? "translateY(-2px)" : "none",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/FounderCard.jsx
try { (() => {
/**
 * Founder / partner credential card. Photo slot + name + role + disciplines.
 * Founders are living credentials of the brand — never separate sub-brands.
 */
function FounderCard({
  name,
  role,
  disciplines = [],
  accent = "blue",
  photo = null,
  grayscale = false,
  initials = "",
  style = {}
}) {
  const signals = {
    blue: "var(--svb-blue)",
    amber: "var(--svb-amber)",
    violet: "var(--svb-violet)"
  };
  const a = signals[accent] || signals.blue;
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    style: {
      padding: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/5",
      background: "var(--surface-input)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: grayscale ? "grayscale(1) contrast(1.05)" : "none"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "48px",
      color: "var(--border-strong)"
    }
  }, initials || (name || "").slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "4px",
      background: a
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "20px",
      color: "var(--svb-white)",
      margin: 0,
      letterSpacing: "-0.01em"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: a
    }
  }, role), disciplines.length > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: "13px",
      lineHeight: 1.55,
      color: "var(--text-body)"
    }
  }, disciplines.join(" · "))));
}
Object.assign(__ds_scope, { FounderCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FounderCard.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
/**
 * Big-number stat / credential figure. Borscha numeral + label.
 */
function StatBlock({
  value,
  label,
  accent = "white",
  align = "left",
  style = {}
}) {
  const signals = {
    blue: "var(--svb-blue)",
    amber: "var(--svb-amber)",
    violet: "var(--svb-violet)",
    white: "var(--svb-white)"
  };
  const a = signals[accent] || signals.white;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      textAlign: align,
      alignItems: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "56px",
      lineHeight: 0.95,
      color: a,
      letterSpacing: "-0.02em"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      maxWidth: "22ch"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pillar tag / status badge. Subtle accent fill + label.
 * tone: blue | amber | violet | neutral | outline
 */
function Badge({
  children,
  tone = "neutral",
  mono = true,
  style = {},
  ...rest
}) {
  const tones = {
    blue: {
      bg: "var(--svb-blue-soft)",
      fg: "var(--svb-blue)",
      bd: "rgba(78,169,255,.35)"
    },
    amber: {
      bg: "var(--svb-amber-soft)",
      fg: "var(--svb-amber)",
      bd: "rgba(255,205,89,.4)"
    },
    violet: {
      bg: "var(--svb-violet-soft)",
      fg: "#B583FF",
      bd: "rgba(143,0,255,.45)"
    },
    neutral: {
      bg: "var(--surface-input)",
      fg: "var(--text-body)",
      bd: "var(--border-default)"
    },
    outline: {
      bg: "transparent",
      fg: "var(--text-meta)",
      bd: "var(--border-default)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 10px",
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontSize: mono ? "11px" : "12px",
      fontWeight: 500,
      letterSpacing: mono ? "0.1em" : "0.01em",
      textTransform: mono ? "uppercase" : "none",
      color: t.fg,
      background: t.bg,
      border: "1px solid " + t.bd,
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.2,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SVBLIME Button — clear, confident, precise.
 * variant: primary | secondary | ghost | signal
 * size: sm | md | lg
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  signal = "blue",
  disabled = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  style = {},
  ...rest
}) {
  const signals = {
    blue: "var(--svb-blue)",
    amber: "var(--svb-amber)",
    violet: "var(--svb-violet)"
  };
  const accent = signals[signal] || signals.blue;
  const sizes = {
    sm: {
      padding: "8px 14px",
      font: "13px",
      gap: "7px"
    },
    md: {
      padding: "11px 20px",
      font: "14px",
      gap: "9px"
    },
    lg: {
      padding: "15px 28px",
      font: "16px",
      gap: "11px"
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontFamily: "var(--font-sans)",
    fontSize: s.font,
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "0.01em",
    borderRadius: "var(--radius-sm)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
    whiteSpace: "nowrap",
    ...style
  };
  const variants = {
    primary: {
      background: accent,
      color: "#000",
      borderColor: accent
    },
    secondary: {
      background: "transparent",
      color: "var(--svb-white)",
      borderColor: "var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      borderColor: "transparent"
    },
    signal: {
      background: "transparent",
      color: accent,
      borderColor: accent
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...(variants[variant] || variants.primary)
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "translateY(1px)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "translateY(0)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translateY(0)";
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mono technical eyebrow / kicker — timecode-style label above headings.
 * Optional leading spectrum tick.
 */
function Eyebrow({
  children,
  tick = true,
  tickColor = "var(--svb-blue)",
  color = "var(--text-meta)",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      ...style
    }
  }, rest), tick && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "18px",
      height: "3px",
      background: tickColor,
      borderRadius: "1px",
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/PillarCard.jsx
try { (() => {
/**
 * One of SVBLIME's four service pillars.
 * number "01".."04", title, description, accent + optional icon.
 */
function PillarCard({
  number = "01",
  title,
  description,
  accent = "blue",
  icon = null,
  style = {}
}) {
  const signals = {
    blue: "var(--svb-blue)",
    amber: "var(--svb-amber)",
    violet: "var(--svb-violet)",
    white: "var(--svb-white)"
  };
  const a = signals[accent] || signals.blue;
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    accent: accent === "white" ? "blue" : accent,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      minHeight: "220px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tick: true,
    tickColor: a,
    color: "var(--text-meta)"
  }, "Pilar " + number), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: a,
      display: "inline-flex"
    }
  }, icon)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "26px",
      color: "var(--svb-white)",
      lineHeight: 1.1,
      letterSpacing: "-0.01em",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "15px",
      lineHeight: 1.6,
      color: "var(--text-body)"
    }
  }, description));
}
Object.assign(__ds_scope, { PillarCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PillarCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SpectrumBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The signature 3-tramo spectrum bar (blue · amber · violet).
 * Divider / signature accent derived from the logo mark.
 * orientation: horizontal | vertical
 */
function SpectrumBar({
  thickness = 4,
  length = "100%",
  orientation = "horizontal",
  radius = 0,
  style = {},
  ...rest
}) {
  const horizontal = orientation === "horizontal";
  const grad = horizontal ? "90deg" : "180deg";
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    style: {
      width: horizontal ? length : thickness + "px",
      height: horizontal ? thickness + "px" : length,
      background: "linear-gradient(" + grad + ", var(--svb-blue) 0 33.33%, var(--svb-amber) 33.33% 66.66%, var(--svb-violet) 66.66% 100%)",
      borderRadius: radius + "px",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { SpectrumBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SpectrumBar.jsx", error: String((e && e.message) || e) }); }

// components/content/QuoteBlock.jsx
try { (() => {
/**
 * Large brand statement / "frase madre" block. Borscha display quote
 * with a leading spectrum accent.
 */
function QuoteBlock({
  children,
  cite = null,
  size = "lg",
  align = "left",
  style = {}
}) {
  const sizes = {
    md: "28px",
    lg: "40px",
    xl: "56px"
  };
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SpectrumBar, {
    thickness: 5,
    length: "72px",
    radius: 2
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: sizes[size] || sizes.lg,
      lineHeight: 1.08,
      letterSpacing: "-0.02em",
      color: "var(--svb-white)",
      maxWidth: "18ch"
    }
  }, children), cite && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, cite));
}
Object.assign(__ds_scope, { QuoteBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/QuoteBlock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
/* global React */
const {
  useState
} = React;
const NS = window.SVBLIMEDesignSystem_fe43f6;
const {
  Button,
  Badge,
  Eyebrow,
  SpectrumBar,
  PillarCard,
  QuoteBlock,
  FounderCard,
  StatBlock,
  Card
} = NS;

/* ---- shared stage-light background (on-brand: colored beams over black) ---- */
const stage = (a = "78,169,255", b = "143,0,255") => ({
  background: "radial-gradient(120% 90% at 15% -10%, rgba(" + a + ",0.20), transparent 55%)," + "radial-gradient(120% 90% at 90% 0%, rgba(" + b + ",0.18), transparent 55%)," + "var(--bg-stage)"
});
const LOGO = "../../assets/svblime-logo-white-transparent.png";

/* ============================ Header ============================ */
function Header({
  onCta
}) {
  const links = [["Agencia", "#agencia"], ["Pilares", "#pilares"], ["Trabajo", "#trabajo"], ["Equipo", "#equipo"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px clamp(20px,5vw,56px)",
      background: "rgba(8,8,10,0.72)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "SVBLIME",
    style: {
      height: "20px",
      width: "auto"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "28px",
      alignItems: "center"
    },
    className: "svb-nav"
  }, links.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-body)",
      letterSpacing: "0.01em"
    }
  }, label))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCta,
    "aria-label": "Hablemos",
    title: "Hablemos",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      padding: 0,
      background: "transparent",
      color: "var(--svb-blue)",
      border: "1px solid var(--svb-blue)",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 11h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 11v-1a9 9 0 0 1 18 0v1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 16v2a4 4 0 0 1-4 4h-5"
  }))));
}

/* ============================ Hero ============================ */
function Hero({
  onCta
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      ...stage(),
      padding: "clamp(72px,12vw,150px) clamp(20px,5vw,56px) clamp(56px,8vw,110px)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "AGENCIA CREATIVA DE EXPERIENCIAS VISUALES"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(42px,8vw,104px)",
      lineHeight: 0.98,
      letterSpacing: "-0.03em",
      margin: "26px 0 0",
      maxWidth: "16ch"
    }
  }, "Cerramos la distancia entre imaginarlo y vivirlo."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: "52ch",
      margin: "28px 0 0",
      fontSize: "clamp(16px,2vw,20px)",
      lineHeight: 1.6,
      color: "var(--text-body)"
    }
  }, "Integramos direcci\xF3n creativa, experiencias visuales, producci\xF3n y branding de eventos."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      marginTop: "36px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    signal: "blue",
    size: "lg",
    onClick: onCta,
    style: {
      display: "none"
    }
  }, "Iniciar un proyecto"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => {
      window.location.hash = "#trabajo";
    },
    style: {
      display: "none"
    }
  }, "Ver trabajo")), /*#__PURE__*/React.createElement(SpectrumBar, {
    thickness: 4,
    length: "min(420px,80%)",
    radius: 2,
    style: {
      marginTop: "56px"
    }
  })));
}

/* ============================ Pilares ============================ */
function Pilares() {
  const pillars = [["01", "blue", "Dirección Creativa", "Concepto, narrativa, dirección de arte y el sentido del proyecto. Donde una intención se vuelve visión ejecutable."], ["02", "amber", "Experiencias Visuales", "Luz, pantallas, contenido, motion, programación, previsualización y operación en vivo."], ["03", "violet", "Producción de Eventos", "Planificación, coordinación, gestión de proveedores y ejecución en terreno bajo control."], ["04", "blue", "Branding de Eventos", "Identidad, mensaje, sistema visual y puntos de contacto — coherentes antes, durante y después."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "pilares",
    style: {
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "48px",
      maxWidth: "60ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-amber)"
  }, "Cuatro pilares \xB7 una sola direcci\xF3n"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
      margin: 0
    }
  }, "El poder de un equipo conectado."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "17px",
      lineHeight: 1.6,
      color: "var(--text-body)"
    }
  }, "Cuatro pilares, una sola misi\xF3n: hacer que tu idea cobre vida. Elige uno, comb\xEDnalos o d\xE9jalo todo en nuestras manos.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "16px"
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(PillarCard, {
    key: p[0],
    number: p[0],
    accent: p[1],
    title: p[2],
    description: p[3]
  })))));
}

/* ============================ Trabajo ============================ */
const WORK = [{
  t: "ChysteMC · 20 años",
  v: "Teatro Coliseo",
  tags: ["Iluminación", "Visuales"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"]
}, {
  t: "La Combo Tortuga",
  v: "Movistar Arena · 13 años",
  tags: ["Diseño de luz", "Timecode"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"]
}, {
  t: "Polima & Pailita",
  v: "Movistar Arena 360",
  tags: ["Dirección creativa", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"]
}, {
  t: "Lara Project",
  v: "Lollapalooza",
  tags: ["Programación", "Sync"],
  cat: "Festival",
  beam: ["78,169,255", "255,205,89"]
}, {
  t: "Hip Hop al Parque",
  v: "+65.000 asistentes",
  tags: ["Contenido", "Luz"],
  cat: "Festival",
  beam: ["143,0,255", "255,205,89"]
}, {
  t: "Festival de Viña",
  v: "Myriam Hernández · Yandel",
  tags: ["Contenido visual", "TV"],
  cat: "TV",
  beam: ["78,169,255", "143,0,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Iluminación", "Visuales"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Diseño de luz", "Timecode"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Dirección creativa", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Contenido", "Luz"],
  cat: "Corporativo",
  beam: ["78,169,255", "255,205,89"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Branding", "Producción"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Programación", "Sync"],
  cat: "Corporativo",
  beam: ["255,205,89", "143,0,255"]
}];
function Trabajo() {
  const cats = ["Todo", "Show", "Festival", "TV", "Corporativo"];
  const [cat, setCat] = useState("Todo");
  const [page, setPage] = useState(0);
  const PER = 6;
  const shown = cat === "Todo" ? WORK : WORK.filter(w => w.cat === cat);
  const pages = Math.max(1, Math.ceil(shown.length / PER));
  React.useEffect(() => {
    setPage(0);
  }, [cat]);
  React.useEffect(() => {
    if (pages <= 1) return;
    const id = setInterval(() => setPage(p => (p + 1) % pages), 3000);
    return () => clearInterval(id);
  }, [pages]);
  const pageItems = shown.slice(page * PER, page * PER + PER);
  return /*#__PURE__*/React.createElement("section", {
    id: "trabajo",
    style: {
      ...stage("255,205,89", "143,0,255"),
      padding: "var(--section-y) clamp(20px,5vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-violet)"
  }, "Trayectoria \xB7 escenarios reales"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "Lo mejor de nuestro trabajo es verlo en acci\xF3n.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      background: cat === c ? "var(--svb-white)" : "transparent",
      color: cat === c ? "#000" : "var(--text-body)",
      border: "1px solid " + (cat === c ? "var(--svb-white)" : "var(--border-default)"),
      transition: "all var(--dur-base) var(--ease-standard)"
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: "16px"
    }
  }, pageItems.map((w, i) => /*#__PURE__*/React.createElement(Card, {
    key: page + "-" + i,
    interactive: true,
    padding: "0",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16/10",
      position: "relative",
      background: "radial-gradient(90% 120% at 20% 0%, rgba(" + w.beam[0] + ",0.55), transparent 60%)," + "radial-gradient(90% 120% at 90% 100%, rgba(" + w.beam[1] + ",0.5), transparent 60%)," + "#050506",
      display: "flex",
      alignItems: "flex-end",
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)"
    }
  }, w.cat, " \xB7 foto de show")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 22px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "20px",
      color: "var(--svb-white)",
      margin: "0 0 4px",
      letterSpacing: "-0.01em"
    }
  }, w.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: "13px",
      color: "var(--text-meta)",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.04em"
    }
  }, w.v), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap"
    }
  }, w.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "outline"
  }, t))))))), pages > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginTop: "32px"
    }
  }, Array.from({
    length: pages
  }).map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setPage(i),
    "aria-label": "Página " + (i + 1),
    style: {
      width: i === page ? "28px" : "10px",
      height: "10px",
      padding: 0,
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      border: "none",
      background: i === page ? "var(--svb-blue)" : "var(--border-strong)",
      transition: "width var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "26px",
      fontSize: "13px",
      color: "var(--text-meta)",
      maxWidth: "70ch",
      lineHeight: 1.6
    }
  }, "Referencias de la trayectoria acumulada de los socios, individualmente o en colaboraci\xF3n. Cada proyecto se presenta con su nivel exacto de participaci\xF3n.")));
}

/* ============================ Equipo ============================ */
function Equipo() {
  return /*#__PURE__*/React.createElement("section", {
    id: "equipo",
    style: {
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginBottom: "44px",
      maxWidth: "56ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tres trayectorias \xB7 una capacidad de marca"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "La experiencia nos une.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(FounderCard, {
    name: "Jaime Lagos",
    role: "Creatividad & Arte",
    accent: "blue",
    photo: "../../assets/team/jaime-lagos.png",
    disciplines: ["Dirección de arte", "Contenido visual", "3D"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Luis Ulloa",
    role: "Producci\xF3n",
    accent: "amber",
    photo: "../../assets/team/luis-ulloa.png",
    disciplines: ["Producción general", "Coordinación", "Terreno"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Elvis Coloma",
    role: "Iluminaci\xF3n & Tech",
    accent: "violet",
    photo: "../../assets/team/elvis-coloma.png",
    disciplines: ["Diseño de luz", "Programación", "Escénica"]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "none",
      gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
      gap: "24px",
      marginTop: "64px",
      paddingTop: "48px",
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "+10",
    label: "A\xF1os en escenarios en vivo",
    accent: "blue"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "04",
    label: "Pilares bajo una direcci\xF3n",
    accent: "amber"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "03",
    label: "Socios fundadores",
    accent: "violet"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "65K",
    label: "M\xE1x. asistentes en un show",
    accent: "white"
  }))));
}

/* ============================ Contacto ============================ */
function Contacto({
  formRef
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });
  const field = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const inputStyle = {
    width: "100%",
    padding: "13px 14px",
    background: "var(--surface-input)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-sm)",
    color: "var(--svb-white)",
    fontFamily: "var(--font-sans)",
    fontSize: "15px",
    outline: "none"
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    ref: formRef,
    style: {
      ...stage(),
      padding: "var(--section-y) clamp(20px,5vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
      gap: "clamp(40px,6vw,80px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(QuoteBlock, {
    size: "lg"
  }, "Tu idea, cuidada desde el concepto hasta la experiencia final."), /*#__PURE__*/React.createElement("div", null, sent ? /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "40px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Recibido"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "26px",
      color: "var(--svb-white)",
      margin: "16px 0 8px",
      letterSpacing: "-0.01em"
    }
  }, "Gracias por escribirnos."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-body)",
      lineHeight: 1.6
    }
  }, "Revisamos la idea general y te proponemos una bajada clara y realista.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "svb-eyebrow",
    style: {
      display: "block",
      marginBottom: "8px"
    }
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    value: form.nombre,
    onChange: e => field("nombre", e.target.value),
    placeholder: "Tu nombre",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "svb-eyebrow",
    style: {
      display: "block",
      marginBottom: "8px"
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    type: "email",
    value: form.email,
    onChange: e => field("email", e.target.value),
    placeholder: "tu@correo.com",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "svb-eyebrow",
    style: {
      display: "block",
      marginBottom: "8px"
    }
  }, "Cu\xE9ntanos la idea"), /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...inputStyle,
      resize: "vertical",
      minHeight: "96px"
    },
    value: form.mensaje,
    onChange: e => field("mensaje", e.target.value),
    placeholder: "Objetivo del evento, p\xFAblico, lugar, fecha\u2026"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    signal: "blue",
    size: "lg",
    style: {
      marginTop: "6px",
      alignSelf: "flex-start"
    }
  }, "Enviar")))));
}

/* ============================ Footer ============================ */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--bg-stage)",
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(SpectrumBar, {
    thickness: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "48px clamp(20px,5vw,56px)",
      display: "flex",
      flexWrap: "wrap",
      gap: "28px",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "SVBLIME",
    style: {
      height: "22px",
      width: "auto"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.06em",
      color: "var(--text-meta)"
    }
  }, "Creatividad, producci\xF3n y tecnolog\xEDa bajo una sola direcci\xF3n \xB7 Chile \xB7 2026")));
}

/* ============================ Site ============================ */
function Site() {
  const goContact = () => {
    window.location.hash = "#contacto";
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-page)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    onCta: goContact
  }), /*#__PURE__*/React.createElement(Hero, {
    onCta: goContact
  }), /*#__PURE__*/React.createElement("section", {
    id: "agencia",
    style: {
      padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)",
      background: "var(--bg-page)",
      borderTop: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "clamp(32px,5vw,72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "SER SVBLIME"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(24px,3vw,34px)",
      color: "var(--svb-white)",
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
      margin: 0
    }
  }, "M\xE1s que luces, pantallas o producci\xF3n, hacemos realidad las ideas que merecen ser recordadas."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "20px",
      fontSize: "16px",
      lineHeight: 1.7,
      color: "var(--text-body)",
      maxWidth: "60ch"
    }
  }, "Somos una agencia premium de producci\xF3n creativa y experiencias visuales.", /*#__PURE__*/React.createElement("br", null), "Transformamos ideas en experiencias que inspiran, conectan e impactan.")))), /*#__PURE__*/React.createElement(Pilares, null), /*#__PURE__*/React.createElement(Trabajo, null), /*#__PURE__*/React.createElement(Equipo, null), /*#__PURE__*/React.createElement(Contacto, null), /*#__PURE__*/React.createElement(Footer, null));
}
window.Site = Site;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * On screen the document renders as a single continuous sheet on a desk
 * background (Google Docs' pageless view): you scroll one tall page card.
 * There is no manual page-splitting — write the whole document as normal
 * flow inside <doc-page> and the browser's print engine paginates it at
 * export.
 *
 * At print the component injects `@page { size: …; margin: 0 }` (which
 * leaves Chrome no margin box to draw its date/URL/page-count header in)
 * and moves the visual margin onto the sheet's own padding, so the printed
 * page has the same inset you see on screen. Standard break-hygiene rules
 * (`break-inside: avoid` on figures, code blocks, images and table rows;
 * `orphans/widows: 3`) are applied so paragraphs and groups split cleanly.
 * On screen and at print, headings default to `text-wrap: balance` and
 * body text (p, li, blockquote, figcaption) to `text-wrap: pretty`, so
 * the document avoids widowed/orphaned words; the defaults have zero
 * specificity, so any text-wrap you declare on those elements wins.
 * The component also marks the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page size="letter" margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 *
 * Attributes:
 *   size    — letter | a4 | legal (default letter)
 *   orientation — portrait (default) | landscape. For documents built to
 *           export, always set it explicitly. landscape swaps the named
 *           size's dimensions (letter landscape prints 11in × 8.5in).
 *   width / height — explicit CSS lengths, override `size` and
 *           `orientation`
 *   margin  — printable inset on every page (default 0.75in); margin="0"
 *           makes pages full-bleed (content then owns its own insets)
 *
 * Running header/footer (optional): give an element `slot="header"` or
 * `slot="footer"` and it repeats on every printed page via
 * `position: fixed`. To keep body text from sliding under it, the
 * component prints inside a single-cell table whose <thead>/<tfoot> are
 * spacers sized to the header/footer height — browsers repeat thead/tfoot
 * on every page, so each sheet's content starts below the header and ends
 * above the footer. On screen the header/footer render once at the
 * top/bottom of the sheet.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks: `break-before: page` on an element that must start
 *   a new page (a chapter, an appendix). Add your own kept-together
 *   blocks (callouts, stat tiles, cards) to a `break-inside: avoid`
 *   rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #ece8dd;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 14px rgba(20, 20, 19, 0.12);
      border-radius: 2px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      if (!document.querySelector('doc-page')) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><slot></slot></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      this._vars.textContent = ':host{' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      tag.textContent = '@page { size: ' + this.pageWidth + ' ' + this.pageHeight + '; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/website/standalone-Site.jsx
try { (() => {
/* global React */
const {
  useState
} = React;
const NS = window.SVBLIMEDesignSystem_fe43f6;
const {
  Button,
  Badge,
  Eyebrow,
  SpectrumBar,
  PillarCard,
  QuoteBlock,
  FounderCard,
  StatBlock,
  Card
} = NS;

/* ---- shared stage-light background (on-brand: colored beams over black) ---- */
const stage = (a = "78,169,255", b = "143,0,255") => ({
  background: "radial-gradient(120% 90% at 15% -10%, rgba(" + a + ",0.20), transparent 55%)," + "radial-gradient(120% 90% at 90% 0%, rgba(" + b + ",0.18), transparent 55%)," + "var(--bg-stage)"
});
const LOGO = window.__resources.logo;

/* ============================ Header ============================ */
function Header({
  onCta
}) {
  const links = [["Agencia", "#agencia"], ["Pilares", "#pilares"], ["Trabajo", "#trabajo"], ["Equipo", "#equipo"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px clamp(20px,5vw,56px)",
      background: "rgba(8,8,10,0.72)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "SVBLIME",
    style: {
      height: "20px",
      width: "auto"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "28px",
      alignItems: "center"
    },
    className: "svb-nav"
  }, links.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-body)",
      letterSpacing: "0.01em"
    }
  }, label))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "signal",
    signal: "blue",
    onClick: onCta
  }, "Hablemos"));
}

/* ============================ Hero ============================ */
function Hero({
  onCta
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      ...stage(),
      padding: "clamp(72px,12vw,150px) clamp(20px,5vw,56px) clamp(56px,8vw,110px)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Agencia creativa de experiencias en vivo"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(42px,8vw,104px)",
      lineHeight: 0.98,
      letterSpacing: "-0.03em",
      margin: "26px 0 0",
      maxWidth: "16ch"
    }
  }, "Cerramos la distancia entre imaginarlo y vivirlo."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: "52ch",
      margin: "28px 0 0",
      fontSize: "clamp(16px,2vw,20px)",
      lineHeight: 1.6,
      color: "var(--text-body)"
    }
  }, "Integramos direcci\xF3n creativa, experiencias visuales, producci\xF3n y branding de eventos bajo una sola mirada \u2014 para que tu idea llegue completa al p\xFAblico."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      marginTop: "36px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    signal: "blue",
    size: "lg",
    onClick: onCta
  }, "Iniciar un proyecto"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => {
      window.location.hash = "#trabajo";
    }
  }, "Ver trabajo")), /*#__PURE__*/React.createElement(SpectrumBar, {
    thickness: 4,
    length: "min(420px,80%)",
    radius: 2,
    style: {
      marginTop: "56px"
    }
  })));
}

/* ============================ Pilares ============================ */
function Pilares() {
  const pillars = [["01", "blue", "Dirección Creativa", "Concepto, narrativa, dirección de arte y el sentido del proyecto. Donde una intención se vuelve visión ejecutable."], ["02", "amber", "Experiencias Visuales", "Luz, pantallas, contenido, motion, programación, previsualización y operación en vivo."], ["03", "violet", "Producción de Eventos", "Planificación, coordinación, gestión de proveedores y ejecución en terreno bajo control."], ["04", "blue", "Branding de Eventos", "Identidad, mensaje, sistema visual y puntos de contacto — coherentes antes, durante y después."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "pilares",
    style: {
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "48px",
      maxWidth: "60ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-amber)"
  }, "Cuatro pilares \xB7 una sola direcci\xF3n"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
      margin: 0
    }
  }, "El poder de un equipo conectado."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "17px",
      lineHeight: 1.6,
      color: "var(--text-body)"
    }
  }, "Cuatro pilares, una sola misi\xF3n: hacer que tu idea cobre vida. Elige uno, comb\xEDnalos o d\xE9jalo todo en nuestras manos.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "16px"
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(PillarCard, {
    key: p[0],
    number: p[0],
    accent: p[1],
    title: p[2],
    description: p[3]
  })))));
}

/* ============================ Trabajo ============================ */
const WORK = [{
  t: "ChysteMC · 20 años",
  v: "Teatro Coliseo",
  tags: ["Iluminación", "Visuales"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"]
}, {
  t: "La Combo Tortuga",
  v: "Movistar Arena · 13 años",
  tags: ["Diseño de luz", "Timecode"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"]
}, {
  t: "Polima & Pailita",
  v: "Movistar Arena 360",
  tags: ["Dirección creativa", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"]
}, {
  t: "Lara Project",
  v: "Lollapalooza",
  tags: ["Programación", "Sync"],
  cat: "Festival",
  beam: ["78,169,255", "255,205,89"]
}, {
  t: "Hip Hop al Parque",
  v: "+65.000 asistentes",
  tags: ["Contenido", "Luz"],
  cat: "Festival",
  beam: ["143,0,255", "255,205,89"]
}, {
  t: "Festival de Viña",
  v: "Myriam Hernández · Yandel",
  tags: ["Contenido visual", "TV"],
  cat: "TV",
  beam: ["78,169,255", "143,0,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Iluminación", "Visuales"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Diseño de luz", "Timecode"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Dirección creativa", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Contenido", "Luz"],
  cat: "Corporativo",
  beam: ["78,169,255", "255,205,89"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Branding", "Producción"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"]
}, {
  t: "Evento por confirmar",
  v: "Información por agregar",
  tags: ["Programación", "Sync"],
  cat: "Corporativo",
  beam: ["255,205,89", "143,0,255"]
}];
function Trabajo() {
  const cats = ["Todo", "Show", "Festival", "TV", "Corporativo"];
  const [cat, setCat] = useState("Todo");
  const [page, setPage] = useState(0);
  const PER = 6;
  const shown = cat === "Todo" ? WORK : WORK.filter(w => w.cat === cat);
  const pages = Math.max(1, Math.ceil(shown.length / PER));
  React.useEffect(() => {
    setPage(0);
  }, [cat]);
  React.useEffect(() => {
    if (pages <= 1) return;
    const id = setInterval(() => setPage(p => (p + 1) % pages), 3000);
    return () => clearInterval(id);
  }, [pages]);
  const pageItems = shown.slice(page * PER, page * PER + PER);
  return /*#__PURE__*/React.createElement("section", {
    id: "trabajo",
    style: {
      ...stage("255,205,89", "143,0,255"),
      padding: "var(--section-y) clamp(20px,5vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-violet)"
  }, "Trayectoria \xB7 escenarios reales"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "Lo mejor de nuestro trabajo es verlo en acci\xF3n.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      background: cat === c ? "var(--svb-white)" : "transparent",
      color: cat === c ? "#000" : "var(--text-body)",
      border: "1px solid " + (cat === c ? "var(--svb-white)" : "var(--border-default)"),
      transition: "all var(--dur-base) var(--ease-standard)"
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: "16px"
    }
  }, pageItems.map((w, i) => /*#__PURE__*/React.createElement(Card, {
    key: page + "-" + i,
    interactive: true,
    padding: "0",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16/10",
      position: "relative",
      background: "radial-gradient(90% 120% at 20% 0%, rgba(" + w.beam[0] + ",0.55), transparent 60%)," + "radial-gradient(90% 120% at 90% 100%, rgba(" + w.beam[1] + ",0.5), transparent 60%)," + "#050506",
      display: "flex",
      alignItems: "flex-end",
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)"
    }
  }, w.cat, " \xB7 foto de show")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 22px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "20px",
      color: "var(--svb-white)",
      margin: "0 0 4px",
      letterSpacing: "-0.01em"
    }
  }, w.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: "13px",
      color: "var(--text-meta)",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.04em"
    }
  }, w.v), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap"
    }
  }, w.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "outline"
  }, t))))))), pages > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginTop: "32px"
    }
  }, Array.from({
    length: pages
  }).map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setPage(i),
    "aria-label": "Página " + (i + 1),
    style: {
      width: i === page ? "28px" : "10px",
      height: "10px",
      padding: 0,
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      border: "none",
      background: i === page ? "var(--svb-blue)" : "var(--border-strong)",
      transition: "width var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "26px",
      fontSize: "13px",
      color: "var(--text-meta)",
      maxWidth: "70ch",
      lineHeight: 1.6
    }
  }, "Referencias de la trayectoria acumulada de los socios, individualmente o en colaboraci\xF3n. Cada proyecto se presenta con su nivel exacto de participaci\xF3n.")));
}

/* ============================ Equipo ============================ */
function Equipo() {
  return /*#__PURE__*/React.createElement("section", {
    id: "equipo",
    style: {
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginBottom: "44px",
      maxWidth: "56ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tres trayectorias \xB7 una capacidad de marca"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "La experiencia nos une.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(FounderCard, {
    name: "Jaime Lagos",
    role: "Creatividad & Arte",
    accent: "blue",
    photo: window.__resources.jaime,
    disciplines: ["Dirección de arte", "Contenido visual", "3D"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Luis Ulloa",
    role: "Producci\xF3n",
    accent: "amber",
    photo: window.__resources.luis,
    disciplines: ["Producción general", "Coordinación", "Terreno"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Elvis Coloma",
    role: "Iluminaci\xF3n & Tech",
    accent: "violet",
    photo: window.__resources.elvis,
    disciplines: ["Diseño de luz", "Programación", "Escénica"]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
      gap: "24px",
      marginTop: "64px",
      paddingTop: "48px",
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "+10",
    label: "A\xF1os en escenarios en vivo",
    accent: "blue"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "04",
    label: "Pilares bajo una direcci\xF3n",
    accent: "amber"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "03",
    label: "Socios fundadores",
    accent: "violet"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "65K",
    label: "M\xE1x. asistentes en un show",
    accent: "white"
  }))));
}

/* ============================ Contacto ============================ */
function Contacto({
  formRef
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });
  const field = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const inputStyle = {
    width: "100%",
    padding: "13px 14px",
    background: "var(--surface-input)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-sm)",
    color: "var(--svb-white)",
    fontFamily: "var(--font-sans)",
    fontSize: "15px",
    outline: "none"
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contacto",
    ref: formRef,
    style: {
      ...stage(),
      padding: "var(--section-y) clamp(20px,5vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
      gap: "clamp(40px,6vw,80px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(QuoteBlock, {
    size: "lg",
    cite: "Promesa \xB7 versi\xF3n corta"
  }, "Tu idea, cuidada desde el concepto hasta la experiencia final."), /*#__PURE__*/React.createElement("div", null, sent ? /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "40px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Recibido"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "26px",
      color: "var(--svb-white)",
      margin: "16px 0 8px",
      letterSpacing: "-0.01em"
    }
  }, "Gracias por escribirnos."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-body)",
      lineHeight: 1.6
    }
  }, "Revisamos la idea general y te proponemos una bajada clara y realista.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "svb-eyebrow",
    style: {
      display: "block",
      marginBottom: "8px"
    }
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    value: form.nombre,
    onChange: e => field("nombre", e.target.value),
    placeholder: "Tu nombre",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "svb-eyebrow",
    style: {
      display: "block",
      marginBottom: "8px"
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    type: "email",
    value: form.email,
    onChange: e => field("email", e.target.value),
    placeholder: "tu@correo.com",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "svb-eyebrow",
    style: {
      display: "block",
      marginBottom: "8px"
    }
  }, "Cu\xE9ntanos la idea"), /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...inputStyle,
      resize: "vertical",
      minHeight: "96px"
    },
    value: form.mensaje,
    onChange: e => field("mensaje", e.target.value),
    placeholder: "Objetivo del evento, p\xFAblico, lugar, fecha\u2026"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    signal: "blue",
    size: "lg",
    style: {
      marginTop: "6px",
      alignSelf: "flex-start"
    }
  }, "Enviar")))));
}

/* ============================ Footer ============================ */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--bg-stage)",
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(SpectrumBar, {
    thickness: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "48px clamp(20px,5vw,56px)",
      display: "flex",
      flexWrap: "wrap",
      gap: "28px",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "SVBLIME",
    style: {
      height: "22px",
      width: "auto"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.06em",
      color: "var(--text-meta)"
    }
  }, "Creatividad, producci\xF3n y tecnolog\xEDa bajo una sola direcci\xF3n \xB7 Chile \xB7 2026")));
}

/* ============================ Site ============================ */
function Site() {
  const goContact = () => {
    window.location.hash = "#contacto";
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-page)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    onCta: goContact
  }), /*#__PURE__*/React.createElement(Hero, {
    onCta: goContact
  }), /*#__PURE__*/React.createElement("section", {
    id: "agencia",
    style: {
      padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)",
      background: "var(--bg-page)",
      borderTop: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "clamp(32px,5vw,72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Qu\xE9 vendemos"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(24px,3vw,34px)",
      color: "var(--svb-white)",
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
      margin: 0
    }
  }, "M\xE1s que luces, pantallas o producci\xF3n, hacemos realidad las ideas que merecen ser recordadas."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "20px",
      fontSize: "16px",
      lineHeight: 1.7,
      color: "var(--text-body)",
      maxWidth: "60ch"
    }
  }, "Somos una agencia premium de producci\xF3n creativa y experiencias visuales.", /*#__PURE__*/React.createElement("br", null), "Transformamos ideas en experiencias que inspiran, conectan e impactan.")))), /*#__PURE__*/React.createElement(Pilares, null), /*#__PURE__*/React.createElement(Trabajo, null), /*#__PURE__*/React.createElement(Equipo, null), /*#__PURE__*/React.createElement(Contacto, null), /*#__PURE__*/React.createElement(Footer, null));
}
window.Site = Site;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/standalone-Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.FounderCard = __ds_scope.FounderCard;

__ds_ns.PillarCard = __ds_scope.PillarCard;

__ds_ns.QuoteBlock = __ds_scope.QuoteBlock;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SpectrumBar = __ds_scope.SpectrumBar;

})();
