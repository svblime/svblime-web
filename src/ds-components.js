/* @ds-bundle: {"format":4,"namespace":"SVBLIMEDesignSystem_fe43f6","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"FounderCard","sourcePath":"components/content/FounderCard.jsx"},{"name":"ServiceCard","sourcePath":"components/content/ServiceCard.jsx"},{"name":"QuoteBlock","sourcePath":"components/content/QuoteBlock.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"SpectrumBar","sourcePath":"components/core/SpectrumBar.jsx"}],"sourceHashes":{"SVBLIME-web-optimizado/site.js":"dc4506be8f1d","components/content/Card.jsx":"c7d5e7ecb622","components/content/FounderCard.jsx":"a8ac1aa6f918","components/content/ServiceCard.jsx":"0bb0b20bced2","components/content/QuoteBlock.jsx":"5889c7e48f81","components/content/StatBlock.jsx":"4f369dcc58f6","components/core/Badge.jsx":"1566e9973984","components/core/Button.jsx":"c100444c646f","components/core/Eyebrow.jsx":"2e3e9f72364a","components/core/SpectrumBar.jsx":"a6051be3ffdb","deck-stage.js":"f3d3d0a662c0","ui_kits/casi-ultimo-elvis/SiteCasiUltimoElvis.jsx":"941027b69865","ui_kits/casi-ultimo-elvis/doc-page.js":"5957844bb066","ui_kits/casi-ultimo-elvis/standalone-Site.jsx":"e73745017898","ui_kits/web-seo/SiteSeo.jsx":"806939ee8873","ui_kits/website/Site.jsx":"3ae4fcdb4643","ui_kits/website/doc-page.js":"5957844bb066","ui_kits/website/standalone-Site.jsx":"ca07ba45f371"},"inlinedExternals":[],"unexposedExports":[]} */

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
    violet: "var(--svb-violet)",
    gray: "#B6B6B8"
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
  hoverPhotos = [],
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
  // On hover: cycle hoverPhotos (2s each), then return to the portrait, and repeat.
  const slides = photo ? [photo, ...hoverPhotos] : hoverPhotos;
  const [idx, setIdx] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    if (!hover || hoverPhotos.length === 0) {
      setIdx(0);
      return;
    }
    setIdx(1);
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 2000);
    return () => clearInterval(t);
  }, [hover, hoverPhotos.length, slides.length]);
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    style: {
      padding: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      aspectRatio: "4/5",
      background: "var(--surface-input)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, slides.length > 0 ? slides.map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: src,
    alt: name,
    loading: "lazy",
    decoding: "async",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: grayscale || i > 0 ? "grayscale(1) contrast(1.05)" : "none",
      opacity: i === idx ? 1 : 0,
      transition: "opacity 600ms var(--ease-standard)"
    }
  })) : /*#__PURE__*/React.createElement("span", {
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
      background: a,
      zIndex: 1
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

// components/content/ServiceCard.jsx
try { (() => {
/**
 * One of SVBLIME's four service pillars.
 * number "01".."04", title, description, accent + optional icon.
 */
function ServiceCard({
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
    white: "var(--svb-white)",
    gray: "#B6B6B8"
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
  }, "      ", /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tick: true,
    tickColor: a,
    color: "var(--text-meta)"
  }, number ? "Pilar " + number : ""), icon && /*#__PURE__*/React.createElement("span", {
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
      margin: 0,
      minHeight: "2.2em",
      display: "flex",
      alignItems: "flex-start"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "15px",
      lineHeight: 1.6,
      color: "var(--text-body)",
      marginTop: "auto"
    }
  }, description));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceCard.jsx", error: String((e && e.message) || e) }); }

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
__ds_ns.Card = __ds_scope.Card;
__ds_ns.FounderCard = __ds_scope.FounderCard;
__ds_ns.ServiceCard = __ds_scope.ServiceCard;
__ds_ns.QuoteBlock = __ds_scope.QuoteBlock;
__ds_ns.StatBlock = __ds_scope.StatBlock;
__ds_ns.Badge = __ds_scope.Badge;
__ds_ns.Button = __ds_scope.Button;
__ds_ns.Eyebrow = __ds_scope.Eyebrow;
__ds_ns.SpectrumBar = __ds_scope.SpectrumBar;
})();
