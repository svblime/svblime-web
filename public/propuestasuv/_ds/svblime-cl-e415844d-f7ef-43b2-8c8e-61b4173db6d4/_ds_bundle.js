/* @ds-bundle: {"format":4,"namespace":"SVBLIMEDesignSystem_fe43f6","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"FounderCard","sourcePath":"components/content/FounderCard.jsx"},{"name":"PillarCard","sourcePath":"components/content/PillarCard.jsx"},{"name":"QuoteBlock","sourcePath":"components/content/QuoteBlock.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"SpectrumBar","sourcePath":"components/core/SpectrumBar.jsx"}],"sourceHashes":{"SVBLIME-web-optimizado/site.js":"c29a0b5a5454","components/content/Card.jsx":"c7d5e7ecb622","components/content/FounderCard.jsx":"a8ac1aa6f918","components/content/PillarCard.jsx":"0bb0b20bced2","components/content/QuoteBlock.jsx":"5889c7e48f81","components/content/StatBlock.jsx":"4f369dcc58f6","components/core/Badge.jsx":"1566e9973984","components/core/Button.jsx":"c100444c646f","components/core/Eyebrow.jsx":"2e3e9f72364a","components/core/SpectrumBar.jsx":"a6051be3ffdb","deck-stage.js":"f3d3d0a662c0","ui_kits/casi-ultimo-elvis/SiteCasiUltimoElvis.jsx":"941027b69865","ui_kits/casi-ultimo-elvis/doc-page.js":"5957844bb066","ui_kits/casi-ultimo-elvis/standalone-Site.jsx":"e73745017898","ui_kits/website/Site.jsx":"f11952c183c9","ui_kits/website/doc-page.js":"5957844bb066","ui_kits/website/standalone-Site.jsx":"ca07ba45f371"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SVBLIMEDesignSystem_fe43f6 = window.SVBLIMEDesignSystem_fe43f6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// SVBLIME-web-optimizado/site.js
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
const LOGO = "assets/svblime-logo-white-transparent.png";
const LOGO_MONO_WHITE = "assets/svblime-mono-blanco.png";
const LOGO_MONO_BLACK = "assets/svblime-mono.png";
const LOGO_NEG = "assets/svblime-negativo.png";

/* ============================ Loading screen (logo flash + intro) ============================ */
function LoadingScreen({
  onDone
}) {
  const frames = [{
    bg: "#FFFFFF",
    src: LOGO_MONO_BLACK
  },
  // fondo blanco · letras negras (sin color)
  {
    bg: "#4EA9FF",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · azul
  {
    bg: "#FFCD59",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · ámbar
  {
    bg: "#8F00FF",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · violeta
  {
    bg: "#000000",
    src: LOGO_NEG
  } // principal · negro + letras blancas con color
  ];
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState("flash"); // flash → out

  React.useEffect(() => {
    if (phase !== "flash") return;
    const last = frames.length - 1;
    const holds = i === last ? 420 : 130;
    const t = setTimeout(() => {
      if (i < last) setI(i + 1);else {
        setPhase("out");
        setTimeout(onDone, 700);
      }
    }, holds);
    return () => clearTimeout(t);
  }, [i, phase]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      overflow: "hidden",
      background: "#000",
      opacity: phase === "out" ? 0 : 1,
      pointerEvents: phase === "out" ? "none" : "auto",
      transition: "opacity 700ms var(--ease-standard)"
    }
  }, frames.map((f, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      position: "absolute",
      inset: 0,
      background: f.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: phase === "flash" && idx === i || phase !== "flash" && idx === frames.length - 1 ? 1 : 0,
      transition: "opacity 100ms var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: f.src,
    alt: "SVBLIME",
    style: {
      width: "min(46vw, 520px)",
      height: "auto"
    }
  }))));
}

/* ============================ Header ============================ */
function Header({
  onCta
}) {
  const links = [["SVBLIME", "#agencia"], ["Servicios", "#pilares"], ["Portafolio", "#lineup"], ["Galeria", "#trabajo"], ["Equipo", "#equipo"]];
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(t);
  }, [open]);
  const [reveal, setReveal] = useState(0); // hidden until the centered SVBLIME logo appears
  React.useEffect(() => {
    const show = () => setReveal(1);
    window.addEventListener("svb-reveal-ui", show);
    return () => window.removeEventListener("svb-reveal-ui", show);
  }, []);
  const bar = {
    display: "block",
    width: "34px",
    height: "6px",
    transition: "transform 500ms var(--ease-out), opacity 500ms var(--ease-standard)"
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px clamp(20px,5vw,56px)",
      background: "rgba(8,8,10,0.5)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-soft)",
      pointerEvents: "none",
      gap: "clamp(16px,2vw,28px)",
      opacity: reveal,
      transform: "translateY(" + -12 * (1 - reveal) + "px)",
      visibility: reveal < 0.02 ? "hidden" : "visible",
      transition: "opacity 500ms var(--ease-standard), transform 500ms var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-label": open ? "Cerrar menú" : "Abrir menú",
    "aria-expanded": open,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: 0,
      border: "none",
      flex: "none",
      background: "transparent",
      cursor: "pointer",
      pointerEvents: "auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-blue)",
      transform: open ? "translateY(10px) rotate(45deg)" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-amber)",
      opacity: open ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-violet)",
      transform: open ? "translateY(-10px) rotate(-45deg)" : "none"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "svb-nav",
    "data-open": open ? "true" : "false",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(14px,2vw,26px)",
      marginRight: "auto",
      maxWidth: open ? "600px" : "0px",
      opacity: open ? 1 : 0,
      overflow: "hidden",
      pointerEvents: open ? "auto" : "none",
      transition: "max-width 900ms var(--ease-out) " + (open ? "0ms" : "260ms") + ", opacity 700ms var(--ease-standard) " + (open ? "0ms" : "200ms")
    }
  }, links.map(([label, href], i) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    className: "svb-navlink",
    onClick: () => setOpen(false),
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-body)",
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
      pointerEvents: "auto",
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-8px)",
      transition: "opacity 600ms var(--ease-standard) " + (open ? 180 + i * 110 + "ms" : (links.length - 1 - i) * 90 + "ms") + ", transform 600ms var(--ease-out) " + (open ? 180 + i * 110 + "ms" : (links.length - 1 - i) * 90 + "ms")
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
      pointerEvents: "auto",
      background: "transparent",
      color: "var(--svb-white)",
      border: "1px solid var(--border-strong)",
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

/* ============================ Hero (autoplay video → text → scroll) ============================ */
const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// Photos + videos from the "Fotos" section, used for the hidden gallery above SVBLIME.
const GALLERY_META = {
  hip_hop_al_parque_colombia: {
    t: "Hip Hop al Parque · Colombia",
    tags: ["Contenido", "Luz"]
  },
  festival_de_vina: {
    t: "Festival de Viña",
    tags: ["Iluminación", "TV"]
  },
  polima_pailita_movistar_arena: {
    t: "Polima & Pailita · Movistar Arena",
    tags: ["Dirección creativa", "Iluminación"]
  },
  meeting_empresa_icare: {
    t: "Meeting Empresa · Icare",
    tags: ["Pantalla", "Producción técnica"]
  },
  tecate_pal_norte_mexico: {
    t: "Tecate Pa'l Norte · México",
    tags: ["Iluminación"]
  },
  chystemc_teatro_coliseo: {
    t: "ChysteMC · 20 años",
    tags: ["Iluminación", "Visuales"]
  },
  lollapalooza_lara_project: {
    t: "Lollapalooza · Lara Project",
    tags: ["Programación", "Código de tiempo"]
  },
  breast_cancer_summit: {
    t: "Breast Cancer Summit",
    tags: ["Media Server", "Operación"]
  },
  blue_label: {
    t: "Branding Blue Label",
    tags: ["Pantalla", "Operación"]
  },
  lanzamiento_de_marca: {
    t: "Lanzamiento de Marca",
    tags: ["Contenido visual", "Producción técnica"]
  },
  dvd_en_vivo_lct: {
    t: "DVD En Vivo · La Combo Tortuga",
    tags: ["Diseño", "Iluminación", "Programación"]
  },
  facebrooklyn_teatro_coliseo: {
    t: "FaceBrooklyn · Teatro Coliseo",
    tags: ["Programación", "Operación en vivo"]
  },
  pablito_pesadilla_quinta_vergara: {
    t: "Pablito Pesadilla · Quinta Vergara",
    tags: ["Iluminación"]
  },
  cuenta_publica_municipalidades: {
    t: "Cuenta Pública · Municipalidades",
    tags: ["Operación visuales", "Producción técnica"]
  },
  videoclip_3am_lct: {
    t: "Video clip 3am · La Combo Tortuga",
    tags: ["Diseño", "Código de tiempo"]
  },
  stand_chevrolet: {
    t: "Branding Chevrolet",
    tags: ["Pantalla", "Contenido visual"]
  },
  yandel_sinfonico_vina: {
    t: "Yandel Sinfónico · Viña 2025",
    tags: ["Operación", "Diseño", "Contenido"]
  },
  festival_televisado_olmue: {
    t: "Festival Televisado · LCT Huaso de Olmué",
    tags: ["Programación de iluminación"]
  },
  huaso_olmue_garras_de_amor: {
    t: "Festival del Huaso de Olmué · Garras de Amor",
    tags: ["Operación en vivo"]
  },
  produccion_tecnica_videoclip: {
    t: "Video Clip · Me Sostendrás",
    tags: ["Diseño", "Operación"]
  },
  final_rojo_tvn: {
    t: "Final ROJO TVN",
    tags: ["Programación", "Iluminación"]
  },
  videoclip_en_vivo_lct: {
    t: "Video clip en vivo · LCT",
    tags: ["Iluminación", "Videoclip"]
  },
  videoclip_me_sobrabas_tu_lct: {
    t: "Video clip LCT · Me Sobrabas Tú",
    tags: ["Iluminación", "Videoclip"]
  },
  alanis_lago_huaso_olmue: {
    t: "Alanis Lago en vivo · Olmué",
    tags: ["Dirección creativa"]
  },
  entremares_arena_monticello: {
    t: "Entremares · Arena Monticello",
    tags: ["Dirección de iluminación"]
  },
  movistar_arena_lct: {
    t: "Movistar Arena · LCT 13 años",
    tags: ["Programación", "Código de tiempo"]
  },
  evento_ciberseguridad: {
    t: "Evento Empresa · Ciberseguridad",
    tags: ["Producción", "Contenido"]
  },
  activaciones_empresas: {
    t: "Activaciones de empresas",
    tags: ["Media Server", "Visuales"]
  },
  junta_doctores_armonic: {
    t: "Evento Doctores · Armonic",
    tags: ["Contenido", "Producción"]
  },
  walmart_chile: {
    t: "Walmart Chile · Media Server",
    tags: ["Producción técnica"]
  },
  fiesta_fin_ano_mercado_libre: {
    t: "Fiesta Fin de Año · Mercado Libre",
    tags: ["Pantallas", "Iluminación"]
  },
  colombia_travel: {
    t: "Colombia Travel",
    tags: ["Punto de encuentro", "Branding"]
  },
  eaton_tech_day: {
    t: "Branding Empresa · Eaton Tech Day",
    tags: ["Branding", "Contenido"]
  },
  evento_anual_worktech: {
    t: "Evento anual · Worktech",
    tags: ["Branding", "Producción técnica"]
  },
  charla_santo_tomas: {
    t: "Charla Santo Tomás",
    tags: ["Contenido", "Branding"]
  },
  capacitacion_astara: {
    t: "Capacitación Empresa · Astara",
    tags: ["Producción técnica", "Contenido"]
  },
  iluminacion_visuales_pailita: {
    t: "Iluminación y Visuales · Pailita",
    tags: ["Diseño", "Programación"]
  },
  festival_la_pampilla: {
    t: "Festival La Pampilla · Pablito Pesadilla",
    tags: ["Iluminación", "+100.000 personas"]
  },
  teleton_2025_gino_mella: {
    t: "Teletón 2025 · Gino Mella",
    tags: ["Dirección creativa", "Contenido"]
  },
  direccion_videoclip_dulsonico: {
    t: "Dirección Video Clip · Dulsónico",
    tags: ["Dirección de arte", "Edición"]
  },
  movistar_empresas_hispam: {
    t: "Movistar Empresas · HISPAM Digital Forum",
    tags: ["Contenido", "3D"]
  },
  banco_bci: {
    t: "Banco BCI",
    tags: ["Código de tiempo", "Iluminación"]
  }
};
const metaFor = base => GALLERY_META[base.replace(/-.*/, "").replace(/video$/, "")] || GALLERY_META[base.split("-")[0]] || {
  t: "SVBLIME",
  tags: []
};
const GALLERY_PHOTOS = ["hip_hop_al_parque_colombia-1", "festival_de_vina-1", "polima_pailita_movistar_arena-1", "meeting_empresa_icare-2", "tecate_pal_norte_mexico-1", "chystemc_teatro_coliseo-2", "lollapalooza_lara_project-1", "breast_cancer_summit-1", "blue_label-1", "lanzamiento_de_marca-2", "dvd_en_vivo_lct-1", "facebrooklyn_teatro_coliseo-1", "pablito_pesadilla_quinta_vergara-1", "cuenta_publica_municipalidades-1", "hip_hop_al_parque_colombia-3", "polima_pailita_movistar_arena-3", "tecate_pal_norte_mexico-3", "meeting_empresa_icare-1", "festival_de_vina-2", "chystemc_teatro_coliseo-1", "lollapalooza_lara_project-3", "breast_cancer_summit-2", "blue_label-3", "lanzamiento_de_marca-1", "dvd_en_vivo_lct-3", "facebrooklyn_teatro_coliseo-2", "pablito_pesadilla_quinta_vergara-2", "cuenta_publica_municipalidades-3", "stand_chevrolet-1", "hip_hop_al_parque_colombia-2", "festival_de_vina-3", "polima_pailita_movistar_arena-2", "tecate_pal_norte_mexico-2", "meeting_empresa_icare-3", "chystemc_teatro_coliseo-3", "entremares_arena_monticello-1", "movistar_arena_lct-1", "evento_ciberseguridad-1", "activaciones_empresas-1", "junta_doctores_armonic-1", "walmart_chile-1", "fiesta_fin_ano_mercado_libre-1", "colombia_travel-1", "eaton_tech_day-1", "evento_anual_worktech-1", "charla_santo_tomas-1", "capacitacion_astara-1", "entremares_arena_monticello-2", "movistar_arena_lct-2", "evento_ciberseguridad-2", "activaciones_empresas-2", "junta_doctores_armonic-2", "walmart_chile-2", "fiesta_fin_ano_mercado_libre-2", "colombia_travel-2", "eaton_tech_day-2", "evento_anual_worktech-2", "charla_santo_tomas-2", "capacitacion_astara-2", "iluminacion_visuales_pailita-1", "festival_la_pampilla-1", "iluminacion_visuales_pailita-3", "festival_la_pampilla-2", "iluminacion_visuales_pailita-2", "festival_la_pampilla-3"].map(n => ({
  type: "img",
  src: "work/min/" + (/\.(png|jpg)$/.test(n) ? n : n + ".jpg"),
  meta: metaFor(n.replace(/\.(png|jpg)$/, ""))
}));
const GALLERY_VIDEOS = ["yandel_sinfonico_vina-video", "stand_chevrolet-video", "festival_de_vina-video", "videoclip_3am_lct-video", "festival_televisado_olmue-video", "huaso_olmue_garras_de_amor-video", "produccion_tecnica_videoclip-video", "final_rojo_tvn-video", "videoclip_en_vivo_lct-video", "videoclip_me_sobrabas_tu_lct-video", "alanis_lago_huaso_olmue-video", "teleton_2025_gino_mella-video", "direccion_videoclip_dulsonico-video", "movistar_empresas_hispam-video", "banco_bci-video", "banco_bci-video-2", "dvd_en_vivo_lct-video"].map(n => ({
  type: "video",
  src: "work/" + n + ".mp4",
  meta: metaFor(n)
}));
const FEATURED = ["blue_label", "banco_bci", "stand_chevrolet", "meeting_empresa_icare", "lanzamiento_de_marca", "junta_doctores_armonic", "yandel_sinfonico_vina", "produccion_tecnica_videoclip", "final_rojo_tvn", "teleton_2025_gino_mella", "videoclip_3am_lct", "festival_de_vina", "festival_la_pampilla", "iluminacion_visuales_pailita", "movistar_arena_lct", "dvd_en_vivo_lct", "tecate_pal_norte_mexico", "hip_hop_al_parque_colombia"];
const isFeatured = src => {
  const f = src.split("/").pop().replace(/\.(png|jpg|mp4)$/, "");
  const k = f.replace(/-.*/, "");
  return FEATURED.indexOf(k) >= 0 || FEATURED.indexOf(f.replace(/-video.*$/, "")) >= 0;
};
const hashStr = s => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000;
  return h;
};
const isBig = src => isFeatured(src) || hashStr(src) % 100 < 62;
// Interleave media and split into 3 rows for the horizontal marquee.
const GALLERY_MEDIA = (() => {
  const out = [],
    p = [...GALLERY_PHOTOS],
    v = [...GALLERY_VIDEOS];
  let vi = 0;
  p.forEach((item, i) => {
    out.push(item);
    if ((i + 1) % 9 === 0 && vi < v.length) out.push(v[vi++]);
  });
  while (vi < v.length) out.push(v[vi++]);
  return out;
})();
const GALLERY_ROWS = (() => {
  const rows = [[], [], []];
  GALLERY_MEDIA.forEach((m, i) => rows[i % rows.length].push(m));
  return rows;
})();
function Hero() {
  const videoRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [videoDone, setVideoDone] = React.useState(false);
  const [nearEnd, setNearEnd] = React.useState(0); // 0→1 over the last ~2.2s of the clip
  const [logoIn, setLogoIn] = React.useState(false); // "Bienvenidos a" revealed
  const [logoMark, setLogoMark] = React.useState(false); // the logo itself, a beat later
  const logoScreenRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const rowRefs = React.useRef([]); // outer track per row (transformed)
  const rowSeqRefs = React.useRef([]); // first sequence per row (for width measure)
  const offsetRef = React.useRef(0); // accumulated up-scroll → photos slide right
  const introSeenRef = React.useRef(false); // once the intro is scrolled past, the logo never returns

  // Download the whole clip as a Blob URL for smooth playback, then autoplay it.
  React.useEffect(() => {
    let url;
    let cancelled = false;
    fetch("intro_svblime.mp4").then(r => r.blob()).then(b => {
      if (cancelled) return;
      url = URL.createObjectURL(b);
      const v = videoRef.current;
      if (v) {
        v.src = url;
        v.load();
        setReady(true);
        v.playbackRate = 0.75;
        const p = v.play();
        if (p) p.catch(() => {});
      }
    }).catch(() => {
      setReady(true);
    });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  // Lock page scroll until the centered logo is shown; release afterward.
  React.useEffect(() => {
    if (!logoIn) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [logoIn]);

  // End of intro: fade out BOTH the video and the text, then bring in the color logo + UI.
  const finishIntro = () => {
    setNearEnd(1);
    setVideoDone(true);
    window.setTimeout(() => {
      setLogoIn(true);
      window.setTimeout(() => setLogoMark(true), 240);
      window.dispatchEvent(new Event("svb-reveal-ui"));
    }, 700);
  };
  const onVideoEnd = finishIntro;
  const skip = () => {
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
      } catch (e) {}
    }
    finishIntro();
  };

  // Logo fade (on scroll toward SVBLIME) + wheel-driven gallery.
  // At the very top: scrolling UP slides all photos/videos to the right (looping);
  // scrolling DOWN lets the page descend normally.
  React.useEffect(() => {
    if (!logoIn) return;
    let raf = 0;
    const speeds = [0.62, 0.86, 1.12];
    const applyRows = () => {
      rowRefs.current.forEach((track, i) => {
        const seq = rowSeqRefs.current[i];
        if (!track || !seq) return;
        const w = seq.offsetWidth || 1;
        const x = -w + (offsetRef.current * speeds[i] % w + w) % w; // right-moving loop
        track.style.transform = "translate3d(" + x + "px,0,0)";
      });
    };
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (y > vh * 0.35) introSeenRef.current = true;
      const logoEl = logoScreenRef.current;
      if (logoEl) {
        const o = introSeenRef.current ? 0 : Math.max(0, 1 - Math.min(1, y / (vh * 0.4)));
        logoEl.style.opacity = String(o);
        logoEl.style.visibility = o <= 0.001 ? "hidden" : "visible";
      }
      const gal = galleryRef.current;
      if (gal) gal.style.opacity = String(introSeenRef.current ? 1 : Math.min(1, y / (vh * 0.35)));
      applyRows();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onWheel = e => {
      // Only trap upward wheel at the very top, after the intro — that's the gallery zone.
      if (introSeenRef.current && window.scrollY <= 1 && e.deltaY < 0) {
        e.preventDefault();
        offsetRef.current += -e.deltaY;
        if (!raf) raf = requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, {
      passive: false
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [logoIn]);

  // Mobile: the top gallery can't be wheel-driven, so it drifts left on its own (3 speeds).
  React.useEffect(() => {
    if (!logoIn) return;
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 860px)").matches) return;
    let raf = 0,
      last = 0;
    const speeds = [0.62, 0.86, 1.12];
    const tick = now => {
      if (!last) last = now;
      const dt = Math.min(60, now - last);
      last = now;
      offsetRef.current -= dt * 0.045;
      rowRefs.current.forEach((track, i) => {
        const seq = rowSeqRefs.current[i];
        if (!track || !seq) return;
        const w = seq.offsetWidth || 1;
        const x = -w + (offsetRef.current * speeds[i] % w + w) % w;
        track.style.transform = "translate3d(" + x + "px,0,0)";
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [logoIn]);
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || videoDone) return;
    const lead = 3.0;
    const t = Math.min(1, Math.max(0, (v.currentTime - (v.duration - lead)) / lead));
    setNearEnd(t);
  };
  const introReveal = smoothstep(0.06, 0.5, nearEnd);
  const textVis = videoDone ? 0 : introReveal; // fades in on the tail, out when the clip ends
  const videoOpacity = ready ? videoDone ? 0 : 1 - smoothstep(0.55, 1, nearEnd) : 0;
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: "relative",
      height: "100vh",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      width: "100%",
      overflow: "hidden",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    muted: true,
    playsInline: true,
    preload: "auto",
    onEnded: onVideoEnd,
    onTimeUpdate: onTimeUpdate,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: videoOpacity,
      transition: "opacity 700ms var(--ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: ready ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-stage)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, "Cargando")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 45%, transparent 80%)",
      opacity: textVis,
      transition: "opacity 500ms linear",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "clamp(40px,7vw,110px) clamp(20px,5vw,56px) clamp(56px,9vw,120px)",
      pointerEvents: "none",
      opacity: textVis,
      transition: "opacity 700ms var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(42px,8vw,104px)",
      lineHeight: 0.98,
      letterSpacing: "-0.03em",
      margin: 0,
      maxWidth: "16ch",
      display: "flex",
      flexWrap: "wrap"
    }
  }, "Cerramos la distancia entre imaginarlo y vivirlo.".split(" ").map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginRight: "0.28em",
      opacity: textVis,
      transition: "opacity 600ms var(--ease-standard) " + i * 80 + "ms",
      display: "inline-block"
    }
  }, w))))), logoIn && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      background: "#000"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    ref: galleryRef,
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "clamp(10px,1.6vw,22px)",
      opacity: 0,
      willChange: "opacity",
      transition: "opacity 500ms linear"
    }
  }, GALLERY_ROWS.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      position: "relative",
      height: "clamp(150px,26vh,300px)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: el => {
      rowRefs.current[ri] = el;
    },
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      display: "flex",
      willChange: "transform"
    }
  }, [0, 1].map(copy => /*#__PURE__*/React.createElement("div", {
    key: copy,
    ref: copy === 0 ? el => {
      rowSeqRefs.current[ri] = el;
    } : null,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(10px,1.6vw,22px)",
      paddingRight: "clamp(10px,1.6vw,22px)"
    }
  }, row.map((m, ii) => /*#__PURE__*/React.createElement("div", {
    key: copy + "-" + ii,
    className: "svb-gitem",
    style: {
      position: "relative",
      alignSelf: "center",
      height: isBig(m.src) ? "100%" : "62%",
      aspectRatio: m.type === "video" ? "16 / 9" : ii % 3 === 0 ? "3 / 4" : ii % 3 === 1 ? "1 / 1" : "4 / 3",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      background: "#111",
      flex: "none"
    }
  }, m.type === "video" ? /*#__PURE__*/React.createElement("video", {
    src: m.src,
    muted: true,
    loop: true,
    playsInline: true,
    autoPlay: true,
    preload: "metadata",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      opacity: 0.9
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: m.src,
    alt: "",
    loading: "lazy",
    decoding: "async",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "svb-gcap",
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      gap: "8px",
      padding: "clamp(10px,1.2vw,16px)",
      background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(13px,1.15vw,17px)",
      lineHeight: 1.12,
      letterSpacing: "-0.01em"
    }
  }, m.meta.t), /*#__PURE__*/React.createElement("div", {
    className: "svb-gtags",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px"
    }
  }, m.meta.tags.map(tg => /*#__PURE__*/React.createElement("span", {
    key: tg,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "9px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.82)",
      border: "1px solid rgba(255,255,255,0.28)",
      borderRadius: "999px",
      padding: "3px 8px"
    }
  }, tg)))))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(130% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.7) 100%)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    ref: logoScreenRef,
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "clamp(14px,2.4vw,28px)",
      padding: "0 clamp(20px,5vw,56px)",
      background: "#000",
      pointerEvents: "none",
      opacity: logoIn ? 1 : 0,
      transition: "opacity 140ms linear"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.1vw,13px)",
      letterSpacing: "0.34em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.72)",
      opacity: logoIn ? 1 : 0,
      transform: logoIn ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 700ms var(--ease-standard) 250ms, transform 700ms var(--ease-out) 250ms"
    }
  }, "Bienvenidos a"), /*#__PURE__*/React.createElement("img", {
    src: LOGO_NEG,
    alt: "SVBLIME",
    style: {
      width: "min(46vw, 520px)",
      height: "auto",
      opacity: logoMark ? 1 : 0,
      transform: logoMark ? "scale(1)" : "scale(0.86)",
      transition: "opacity 900ms var(--ease-standard), transform 1150ms cubic-bezier(0.16,1,0.3,1)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: "34px",
      transform: "translateX(-50%)",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      opacity: logoIn ? 1 : 0,
      transition: "opacity 600ms var(--ease-standard) 400ms",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      pointerEvents: "none"
    }
  }, "Scroll", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: "1px",
      height: "34px",
      background: "linear-gradient(rgba(255,255,255,0.7), transparent)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: skip,
    style: {
      position: "absolute",
      right: "clamp(20px,5vw,56px)",
      bottom: "34px",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: "var(--radius-sm)",
      padding: "8px 14px",
      cursor: "pointer",
      opacity: videoDone ? 0 : 1,
      pointerEvents: videoDone ? "none" : "auto",
      transition: "opacity 400ms var(--ease-standard)"
    }
  }, "Saltar intro")));
}

/* ============================ Pilares ============================ */
function Pilares() {
  const pillars = [["", "gray", "Dirección Creativa", "Concepto, narrativa, dirección de arte y el sentido del proyecto. Donde una intención se vuelve visión ejecutable."], ["", "amber", "Experiencias Visuales", "Luz, pantallas, contenido, motion, programación, previsualización y operación en vivo."], ["", "violet", "Producción de Eventos", "Planificación, coordinación, gestión de proveedores y ejecución en terreno, todo bajo control."], ["", "blue", "Branding de Eventos", "Identidad, mensaje, sistema visual y puntos de contacto, coherentes antes, durante y después."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "pilares",
    style: {
      position: "relative",
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "48px",
      maxWidth: "60ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-amber)",
    style: {
      display: "none"
    }
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
      color: "var(--text-body)",
      maxWidth: "none",
      width: "max-content",
      whiteSpace: "nowrap"
    }
  }, "Cuatro formas de trabajar, una sola misi\xF3n: ", /*#__PURE__*/React.createElement("em", null, "hacer que tu idea cobre vida."))), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "16px"
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(PillarCard, {
    key: p[2],
    number: p[0],
    accent: p[1],
    title: p[2],
    description: p[3]
  })))), /*#__PURE__*/React.createElement(SpectrumBar, {
    thickness: 4,
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      display: "none"
    }
  }));
}

/* ============================ Line Up (festival poster) ============================ */
const LINEUP_DAYS = [{
  day: "01",
  label: "Día 01 · Marcas",
  tint: "78,169,255",
  headliners: ["Claro", "Entel", "Copec", "Chevrolet", "TVN"],
  main: ["Johnnie Walker Blue Label", "Caja Los Andes", "Carolina Herrera 212", "Muni. de Vitacura", "Muni. de Pudahuel", "Muni. de Pedro Aguirre Cerda", "Lotus"],
  support: ["INACAP", "IP Chile", "Hilaria", "Provetec", "Muno BX", "Axon Pharma", "Armonic", "Breast Cancer"]
}, {
  day: "02",
  label: "Día 02 · Festivales",
  tint: "255,205,89",
  headliners: ["Festival de Viña", "Lollapalooza", "Billboard"],
  main: ["Tecate Pa'l Norte", "Coca Cola Flow Fest", "Ultra Festival", "Huaso de Olmué", "Festival La Pampilla"],
  support: ["Crush Power Music", "Premios Pulsar", "Resistence", "Rock Out", "Knock Fest"]
}, {
  day: "03",
  label: "Día 03 · Artistas",
  tint: "143,0,255",
  headliners: ["Yandel", "Carin León", "Myriam Hernández", "The Wailers"],
  main: ["Onyx", "P.O.D.", "Nanpa Básico", "Floyymenor", "Polimá Westcoast", "Pailita", "Zúmbale Primo", "La Combo Tortuga", "Pablito Pesadilla", "Alanis Lagos", "Pablo Chillee", "Lara Project"],
  support: ["Marcianeke", "ChysteMC", "Jere Klein", "Gino Mella", "Harry Nach", "Julianno Sosa", "Jordan 23", "Kidd Tetón", "Ithan NY", "FaceBrooklyn", "Garras de Amor", "Akrilla", "Saturno", "Bubaseta", "Shamanes Crew", "King Savage"]
}];
function LineUp() {
  const DOT = "rgba(255,255,255,0.55)";
  const sep = () => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: "6px",
      height: "6px",
      margin: "0 clamp(8px,1.3vw,16px)",
      transform: "translateY(-4px) rotate(45deg)",
      background: DOT
    }
  });
  const row = (items, cls) => /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      rowGap: "4px"
    }
  }, items.map((name, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: name + i
  }, i > 0 && sep(), /*#__PURE__*/React.createElement("span", {
    className: "svb-name"
  }, name))));
  const dayDivider = (day, label, color) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      margin: "clamp(30px,4.5vw,56px) 0 clamp(18px,2.6vw,32px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: "1px",
      flex: "1 1 0",
      maxWidth: "clamp(40px,12vw,160px)",
      background: "linear-gradient(90deg, transparent, " + color + ")"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.4vw,13px)",
      letterSpacing: "0.26em",
      textTransform: "uppercase",
      color: "var(--text-body)",
      WebkitTextFillColor: "var(--text-body)",
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: "1px",
      flex: "1 1 0",
      maxWidth: "clamp(40px,12vw,160px)",
      background: "linear-gradient(90deg, " + color + ", transparent)"
    }
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "lineup",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "radial-gradient(120% 80% at 50% -10%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(90% 90% at 8% 108%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(90% 90% at 92% 108%, rgba(255,205,89,0.06), transparent 55%), var(--bg-stage)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)",
      display: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      maxWidth: "1000px",
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.4vw,13px)",
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      display: "none"
    }
  }, "SVBLIME presenta"), /*#__PURE__*/React.createElement("img", {
    className: "svb-fest-lockup",
    src: "assets/svblime-fest-lockup.png",
    alt: "SVBLIME Fest",
    style: {
      display: "block",
      width: "min(760px,82vw)",
      height: "auto",
      margin: "clamp(10px,1.6vw,20px) auto 0"
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "svb-lu-sub",
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: "20px",
      letterSpacing: "0.01em",
      color: "var(--text-body)",
      margin: "clamp(2px,0.5vw,8px) auto 0",
      maxWidth: "44ch",
      textAlign: "center"
    }
  }, "Marcas, corporaciones y artistas que han confiado."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "14px",
      margin: "clamp(16px,2.4vw,28px) auto 0",
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-blue)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-amber)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-violet)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "svb-grad"
  }, LINEUP_DAYS.map(d => {
    const color = "rgb(" + d.tint + ")";
    return /*#__PURE__*/React.createElement("div", {
      key: d.day
    }, dayDivider(d.day, d.label.split("·")[1] ? d.label.split("·")[1].trim() : d.label, color), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "clamp(10px,1.5vw,18px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "svb-lu-head",
      style: {
        fontFamily: "var(--font-display)",
        color: "var(--svb-white)",
        fontSize: "clamp(19px,3.6vw,44px)",
        lineHeight: 1.0,
        letterSpacing: "-0.02em"
      }
    }, row(d.headliners)), /*#__PURE__*/React.createElement("div", {
      className: "svb-lu-main",
      style: {
        fontFamily: "var(--font-display)",
        color: "var(--svb-white)",
        fontSize: "clamp(13px,2.1vw,27px)",
        lineHeight: 1.08,
        letterSpacing: "-0.01em"
      }
    }, row(d.main)), /*#__PURE__*/React.createElement("div", {
      className: "svb-lu-sup",
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        color: "var(--text-body)",
        fontSize: "clamp(11px,1.3vw,15px)",
        letterSpacing: "0.02em"
      }
    }, row(d.support))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(40px,6vw,72px)",
      paddingTop: "clamp(28px,4vw,44px)",
      borderTop: "1px solid var(--border-default)",
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(28px,5vw,56px)",
      letterSpacing: "-0.02em",
      color: "var(--svb-white)"
    }
  }, "SVBLIME.CL"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.3vw,12px)",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      margin: "16px auto 0",
      maxWidth: "60ch",
      lineHeight: 1.7
    }
  }, "Trayectoria acumulada de los socios \xB7 participaci\xF3n por proyecto (visuales \xB7 iluminaci\xF3n \xB7 producci\xF3n \xB7 contenido)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(48px,7vw,88px)",
      overflow: "hidden",
      position: "relative",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "max-content",
      animation: "svbMarquee 34s linear infinite"
    }
  }, [0, 1].map(rep => /*#__PURE__*/React.createElement("div", {
    key: rep,
    "aria-hidden": rep === 1,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(40px,6vw,88px)",
      padding: "0 clamp(20px,3vw,44px)"
    }
  }, ["rock-out", "claro", "muno-bx", "premios-pulsar", "flow-fest", "pailita", "vitacura", "pod", "lollapalooza", "knotfest", "carolina-herrera", "copec", "pedro-aguirre-cerda", "wailers", "pudahuel", "shishi-gang", "tecate", "stellantis", "myriam-hernandez", "akriila", "axon-pharma", "jere-klein", "billboard", "chystemc", "combo-tortuga", "provetec", "resistance", "ultra", "carin-leon", "tvn", "nanpa-basico", "blue-label", "hilaria", "polima-westcoast", "inacap", "ipchile", "lotus", "breast-cancer", "vina-fest", "shamanes", "garras-amor", "crush-music", "chevrolet", "onyx", "caja-los-andes", "huaso-olmue", "alanys-lagos", "lara-project", "armonic", "yandel-artist", "facebrooklyn", "zumbale-primo", "entel"].map((b, bi) => /*#__PURE__*/React.createElement("span", {
    key: b,
    className: "svb-brand",
    style: {
      ["--m"]: "url(brands/" + b + ".png)",
      ["--c"]: ["var(--svb-blue)", "var(--svb-amber)", "var(--svb-violet)"][bi % 3]
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "brands/" + b + ".png",
    alt: b,
    loading: "lazy",
    decoding: "async",
    style: {
      height: "calc(clamp(22px,2.4vw,30px) * " + ({
        "carolina-herrera": 1.75,
        "vitacura": 1.9,
        "armonic": 2.0,
        "chevrolet": 1.75,
        "blue-label": 1.55,
        "hilaria": 1.9,
        "pudahuel": 1.25,
        "claro": 1.3,
        "provetec": 1.55,
        "onyx": 1.5,
        "pod": 1.2,
        "chystemc": 1.7,
        "tecate": 1.7,
        "huaso-olmue": 1.6,
        "myriam-hernandez": 1.1,
        "flow-fest": 1.5,
        "jere-klein": 1.1,
        "wailers": 1.3,
        "zumbale-primo": 1.15,
        "polima-westcoast": 1.4,
        "lara-project": 1.35,
        "nanpa-basico": 1.3,
        "alanys-lagos": 1.3,
        "yandel-artist": 1.4,
        "pailita": 1.15,
        "shamanes": 1.15,
        "premios-pulsar": 1.45,
        "rock-out": 1.05,
        "knotfest": 1.1,
        "vina-fest": 1.2,
        "shishi-gang": 1.6,
        "garras-amor": 1.0,
        "combo-tortuga": 1.3,
        "crush-music": 1.4
      }[b] || 1) + ")",
      width: "auto",
      objectFit: "contain",
      opacity: 0.8,
      display: "block"
    }
  })))))), /*#__PURE__*/React.createElement("style", null, "@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}")));
}
function WorkCard({
  w
}) {
  const photos = w.photos || [];
  const videos = w.videos || (w.video ? [w.video] : []);
  const slides = [...videos.map((_, i) => "__video" + i + "__"), ...photos];
  const [idx, setIdx] = React.useState(0);
  const videoRef = React.useRef(null);
  const vIdx = idx < videos.length ? idx : -1;

  // Rotate through video (played full) then photos every 2s. Lazy-load images so the grid stays fluid.
  React.useEffect(() => {
    const cur = slides[idx];
    if (typeof cur === "string" && cur.indexOf("__video") === 0) {
      const v = videoRef.current;
      if (v) {
        try {
          v.currentTime = 0;
        } catch (e) {}
        const p = v.play();
        if (p) p.catch(() => {});
      }
      if (slides.length < 2) return; // single video → loops
      const t = setTimeout(() => setIdx(n => (n + 1) % slides.length), 10000); // show 10s of the video
      return () => clearTimeout(t);
    }
    if (slides.length < 2) return;
    const t = setTimeout(() => setIdx(n => (n + 1) % slides.length), 3300);
    return () => clearTimeout(t);
  }, [idx, slides.length]);
  const onVideoEnd = () => setIdx(n => (n + 1) % slides.length);
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    padding: "0",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16/10",
      position: "relative",
      overflow: "hidden",
      background: "radial-gradient(90% 120% at 20% 0%, rgba(" + w.beam[0] + ",0.55), transparent 60%)," + "radial-gradient(90% 120% at 90% 100%, rgba(" + w.beam[1] + ",0.5), transparent 60%)," + "#050506",
      display: "flex",
      alignItems: "flex-end",
      padding: "16px"
    }
  }, videos.length > 0 && /*#__PURE__*/React.createElement("video", {
    key: vIdx >= 0 ? vIdx : "last",
    ref: videoRef,
    src: videos[vIdx >= 0 ? vIdx : 0],
    muted: true,
    playsInline: true,
    preload: "auto",
    loop: slides.length === 1,
    onEnded: onVideoEnd,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: vIdx >= 0 ? 1 : 0,
      transition: "opacity 600ms var(--ease-standard)"
    }
  }), photos.map((src, i) => {
    const slideI = videos.length + i;
    return /*#__PURE__*/React.createElement("img", {
      key: i,
      src: src,
      alt: w.t,
      loading: "lazy",
      decoding: "async",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: slideI === idx ? 1 : 0,
        transition: "opacity 600ms var(--ease-standard)"
      }
    });
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      opacity: photos.length || videos.length ? 0 : 1
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
  }, t)))));
}
const WORK = [{
  t: "Producción general",
  v: "Eaton Tech Day",
  tags: ["Branding", "Contenido", "Producción técnica"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/eaton_tech_day-1.jpg", "work/min/eaton_tech_day-2.jpg", "work/min/eaton_tech_day-3.jpg"]
}, {
  t: "Evento anual empresa",
  v: "Worktech",
  tags: ["Branding", "Contenido", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/evento_anual_worktech-1.jpg", "work/min/evento_anual_worktech-2.jpg", "work/min/evento_anual_worktech-3.jpg"]
}, {
  t: "Charla Santo Tomás",
  v: "Branding Empresa",
  tags: ["Contenido", "Pantalla", "Branding"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/charla_santo_tomas-1.jpg", "work/min/charla_santo_tomas-2.jpg", "work/min/charla_santo_tomas-3.jpg"]
}, {
  t: "Capacitación Empresa",
  v: "Astara",
  tags: ["Producción técnica", "Contenido"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/capacitacion_astara-1.jpg", "work/min/capacitacion_astara-2.jpg", "work/min/capacitacion_astara-3.jpg"]
}, {
  t: "Walmart Chile",
  v: "Media Server",
  tags: ["Producción técnica", "Contenido visual"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/walmart_chile-1.jpg", "work/min/walmart_chile-2.jpg", "work/min/walmart_chile-3.jpg"]
}, {
  t: "Fiesta Fin de Año",
  v: "Mercado Libre",
  tags: ["Producción", "Pantallas", "Iluminación"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/fiesta_fin_ano_mercado_libre-1.jpg", "work/min/fiesta_fin_ano_mercado_libre-2.jpg", "work/min/fiesta_fin_ano_mercado_libre-3.jpg"]
}, {
  t: "Colombia Travel",
  v: "Activación de turismo",
  tags: ["Producción técnica", "Operador"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/colombia_travel-1.jpg", "work/min/colombia_travel-2.jpg", "work/min/colombia_travel-3.jpg"]
}, {
  t: "Evento Empresa",
  v: "Ciberseguridad",
  tags: ["Operador", "Contenido"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/evento_ciberseguridad-1.jpg", "work/min/evento_ciberseguridad-2.jpg", "work/min/evento_ciberseguridad-3.jpg"]
}, {
  t: "Activaciones de empresas",
  v: "Producción técnica",
  tags: ["Producción", "Media Server", "Visuales"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/activaciones_empresas-1.jpg", "work/min/activaciones_empresas-2.jpg", "work/min/activaciones_empresas-3.jpg"]
}, {
  t: "Junta de doctores",
  v: "Armonic",
  tags: ["Contenido", "Producción", "Broadcast"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/junta_doctores_armonic-1.jpg", "work/min/junta_doctores_armonic-2.jpg", "work/min/junta_doctores_armonic-3.jpg"]
}, {
  t: "Dirección Video Clip",
  v: "Dulsónico",
  tags: ["Dirección de arte", "Edición"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  video: "work/direccion_videoclip_dulsonico-video.mp4"
}, {
  t: "Teletón 2025",
  v: "Gino Mella",
  tags: ["Dirección creativa", "Diseño", "Contenido"],
  cat: "TV",
  beam: ["78,169,255", "255,205,89"],
  video: "work/teleton_2025_gino_mella-video.mp4"
}, {
  t: "Festival Televisado",
  v: "LCT · Festival del Huaso de Olmué",
  tags: ["Programación", "Iluminación"],
  cat: "TV",
  beam: ["78,169,255", "255,205,89"],
  video: "work/festival_televisado_olmue-video.mp4"
}, {
  t: "Festival del Huaso de Olmué",
  v: "Garras de Amor",
  tags: ["Operación de iluminación en vivo"],
  cat: "TV",
  beam: ["143,0,255", "78,169,255"],
  video: "work/huaso_olmue_garras_de_amor-video.mp4"
}, {
  t: "Movistar Empresas",
  v: "HISPAM Digital Forum",
  tags: ["Contenido", "3D", "Dirección creativa"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  video: "work/movistar_empresas_hispam-video.mp4"
}, {
  t: "Banco BCI",
  v: "Programación de iluminación",
  tags: ["Código de tiempo", "Iluminación"],
  cat: "Corporativo",
  beam: ["78,169,255", "255,205,89"],
  videos: ["work/banco_bci-video-2.mp4", "work/banco_bci-video.mp4"]
}, {
  t: "Festival La Pampilla",
  v: "Pablito Pesadilla",
  tags: ["Iluminación", "+100.000 personas"],
  cat: "Show",
  beam: ["78,169,255", "255,205,89"],
  photos: ["work/min/festival_la_pampilla-1.jpg", "work/min/festival_la_pampilla-2.jpg", "work/min/festival_la_pampilla-3.jpg"]
}, {
  t: "Iluminación y Visuales",
  v: "Pailita",
  tags: ["Diseño", "Programación", "Código de tiempo"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"],
  photos: ["work/min/iluminacion_visuales_pailita-1.jpg", "work/min/iluminacion_visuales_pailita-2.jpg", "work/min/iluminacion_visuales_pailita-3.jpg"]
}, {
  t: "Entremares",
  v: "Arena Monticello",
  tags: ["Dirección de iluminación"],
  cat: "Show",
  beam: ["255,205,89", "143,0,255"],
  photos: ["work/min/entremares_arena_monticello-1.jpg", "work/min/entremares_arena_monticello-2.jpg", "work/min/entremares_arena_monticello-3.jpg"]
}, {
  t: "Movistar Arena",
  v: "LCT · 13 años",
  tags: ["Programación", "Código de tiempo"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/movistar_arena_lct-1.jpg", "work/min/movistar_arena_lct-2.jpg"]
}, {
  t: "Producción Técnica",
  v: "Video Clip",
  tags: ["Diseño", "Operación", "Pantalla"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  video: "work/produccion_tecnica_videoclip-video.mp4"
}, {
  t: "Final ROJO TVN",
  v: "Iluminación en vivo",
  tags: ["Programación", "Iluminación", "TV"],
  cat: "TV",
  beam: ["255,205,89", "143,0,255"],
  video: "work/final_rojo_tvn-video.mp4"
}, {
  t: "Video clip en vivo",
  v: "La Combo Tortuga",
  tags: ["Programación", "Iluminación"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"],
  video: "work/videoclip_en_vivo_lct-video.mp4"
}, {
  t: "Video clip · LCT",
  v: "Me Sobrabas Tú",
  tags: ["Programación", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  video: "work/videoclip_me_sobrabas_tu_lct-video.mp4"
}, {
  t: "Alanis Lago en vivo",
  v: "Festival del Huaso de Olmué",
  tags: ["Dirección creativa", "Contenido visual"],
  cat: "TV",
  beam: ["78,169,255", "255,205,89"],
  video: "work/alanis_lago_huaso_olmue-video.mp4"
}, {
  t: "Yandel Sinfónico",
  v: "Festival de Viña 2025",
  tags: ["Operación", "Diseño", "Contenido"],
  cat: "TV",
  beam: ["143,0,255", "255,205,89"],
  video: "work/yandel_sinfonico_vina-video.mp4"
}, {
  t: "Stand Publicitario",
  v: "Branding Chevrolet",
  tags: ["Pantalla", "Contenido visual", "Punto de encuentro"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  video: "work/stand_chevrolet-video.mp4",
  photos: ["work/min/stand_chevrolet-1.jpg"]
}, {
  t: "Hip Hop al Parque · Colombia",
  v: "+65.000 asistentes",
  tags: ["Contenido", "Luz"],
  cat: "Festival",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/hip_hop_al_parque_colombia-1.jpg", "work/min/hip_hop_al_parque_colombia-2.jpg", "work/min/hip_hop_al_parque_colombia-3.jpg"]
}, {
  t: "Meeting Empresa",
  v: "Icare",
  tags: ["Pantalla", "Producción técnica", "Operación"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/meeting_empresa_icare-1.jpg", "work/min/meeting_empresa_icare-2.jpg", "work/min/meeting_empresa_icare-3.jpg"]
}, {
  t: "ChysteMC · 20 años",
  v: "Teatro Coliseo",
  tags: ["Iluminación", "Visuales"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/chystemc_teatro_coliseo-1.jpg", "work/min/chystemc_teatro_coliseo-2.jpg", "work/min/chystemc_teatro_coliseo-3.jpg"]
}, {
  t: "Experiencia inmersiva de lujo",
  v: "Branding Blue Label",
  tags: ["Pantalla", "Operación", "Audio inmersivo"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/blue_label-1.jpg", "work/min/blue_label-2.jpg", "work/min/blue_label-3.jpg"]
}, {
  t: "Lollapalooza",
  v: "Lara Poyect",
  tags: ["Programación", "Código de tiempo"],
  cat: "Festival",
  beam: ["78,169,255", "255,205,89"],
  photos: ["work/min/lollapalooza_lara_project-1.jpg", "work/min/lollapalooza_lara_project-2.jpg", "work/min/lollapalooza_lara_project-3.jpg"]
}, {
  t: "Conferencia Doctores",
  v: "Breast Cancer Summit",
  tags: ["Media Server", "Branding", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/breast_cancer_summit-1.jpg", "work/min/breast_cancer_summit-2.jpg", "work/min/breast_cancer_summit-3.jpg"]
}, {
  t: "Polima & Pailita",
  v: "Movistar Arena 360",
  tags: ["Dirección creativa", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/polima_pailita_movistar_arena-1.jpg", "work/min/polima_pailita_movistar_arena-2.jpg", "work/min/polima_pailita_movistar_arena-3.jpg"]
}, {
  t: "Lanzamiento de Marca",
  v: "Evento corporativo",
  tags: ["Contenido visual", "Producción técnica"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/lanzamiento_de_marca-1.jpg", "work/min/lanzamiento_de_marca-2.jpg", "work/min/lanzamiento_de_marca-3.jpg"]
}, {
  t: "Festival de Viña",
  v: "Polima Westcoast",
  tags: ["Iluminación", "TV"],
  cat: "TV",
  beam: ["78,169,255", "143,0,255"],
  video: "work/festival_de_vina-video.mp4"
}, {
  t: "Cuenta Pública",
  v: "Municipalidades",
  tags: ["Operación visuales", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/cuenta_publica_municipalidades-1.jpg", "work/min/cuenta_publica_municipalidades-2.jpg", "work/min/cuenta_publica_municipalidades-3.jpg"]
}, {
  t: "Video clip · 3am",
  v: "La Combo Tortuga",
  tags: ["Diseño", "Código de tiempo"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"],
  video: "work/videoclip_3am_lct-video.mp4"
}, {
  t: "Tecate Pal Norte · México",
  v: "DJ Pablito Pesadilla",
  tags: ["Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/tecate_pal_norte_mexico-1.jpg", "work/min/tecate_pal_norte_mexico-2.jpg", "work/min/tecate_pal_norte_mexico-3.jpg"]
}, {
  t: "Pablito Pesadilla",
  v: "Quinta Vergara",
  tags: ["Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/pablito_pesadilla_quinta_vergara-1.jpg", "work/min/pablito_pesadilla_quinta_vergara-2.jpg", "work/min/pablito_pesadilla_quinta_vergara-3.jpg"]
}, {
  t: "DVD En Vivo",
  v: "La Combo Tortuga",
  tags: ["Diseño", "Iluminación", "Programación"],
  cat: "Show",
  beam: ["78,169,255", "255,205,89"],
  video: "work/dvd_en_vivo_lct-video.mp4",
  photos: ["work/min/dvd_en_vivo_lct-1.jpg", "work/min/dvd_en_vivo_lct-2.jpg", "work/min/dvd_en_vivo_lct-3.jpg"]
}, {
  t: "FaceBrooklyn",
  v: "Teatro Coliseo",
  tags: ["Diseño/Iluminación", "Programación", "Operación en vivo"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/facebrooklyn_teatro_coliseo-1.jpg", "work/min/facebrooklyn_teatro_coliseo-2.jpg"]
}];
function Trabajo() {
  const cats = ["Todo", "Corporativos", "TV y Videos", "Artistas"];
  const [cat, setCat] = useState("Todo");
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true); // true = visible
  const PER = 6;
  React.useEffect(() => {
    if (cat !== "Todo") return;
    return undefined;
  }, [cat]);
  const isVideoClip = w => (w.tags || []).includes("Videoclip") || /video\s?clip/i.test(w.t) || /video\s?clip/i.test(w.v || "");
  const CORP_FIRST = ["Experiencia inmersiva de lujo", "Banco BCI", "Stand Publicitario", "Meeting Empresa", "Lanzamiento de Marca", "Junta de doctores", "Conferencia Doctores", "Movistar Empresas"];
  const CORP_LAST = ["Capacitación Empresa", "Producción general"];
  const corpAll = WORK.filter(w => w.cat === "Corporativo").slice().sort((a, b) => {
    const rank = w => {
      const i = CORP_FIRST.indexOf(w.t);
      if (i >= 0) return i;
      return CORP_LAST.indexOf(w.t) >= 0 ? 999 : 99;
    };
    return rank(a) - rank(b);
  });
  const TV_FIRST = ["Yandel Sinfónico", "Producción Técnica", "Final ROJO TVN", "Teletón 2025", "Video clip · 3am", "Festival de Viña"];
  const TV_LAST = ["Festival Televisado", "Festival del Huaso de Olmué"];
  const tvAll = WORK.filter(w => w.cat === "TV" || isVideoClip(w)).slice().sort((a, b) => {
    const rank = w => {
      const i = TV_FIRST.indexOf(w.t);
      if (i >= 0) return i;
      return TV_LAST.indexOf(w.t) >= 0 ? 999 : 99;
    };
    return rank(a) - rank(b);
  });
  const ART_FIRST = ["Festival La Pampilla", "Iluminación y Visuales", "Movistar Arena", "DVD En Vivo", "Tecate Pal Norte · México", "Hip Hop al Parque · Colombia"];
  const artAll = WORK.filter(w => w.cat !== "Corporativo" && w.cat !== "TV" && !isVideoClip(w)).slice().sort((a, b) => {
    const rank = w => {
      const i = ART_FIRST.indexOf(w.t);
      return i < 0 ? 99 : i;
    };
    return rank(a) - rank(b);
  });
  const [mixSeed, setMixSeed] = useState(0);
  const shuffle = React.useCallback((arr, seed) => {
    const a = arr.slice();
    let s = seed * 9301 + 49297;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor(s / 233280 * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }, []);
  const mixed = React.useMemo(() => {
    const pick = shuffle(corpAll.slice(0, 6), mixSeed + 1).slice(0, 4).concat(shuffle(tvAll.slice(0, 6), mixSeed + 2).slice(0, 1)).concat(shuffle(artAll.slice(0, 6), mixSeed + 3).slice(0, 1));
    return shuffle(pick, mixSeed + 4);
  }, [mixSeed, shuffle]);
  const shown = cat === "Todo" ? mixed : cat === "TV y Videos" ? tvAll : cat === "Corporativos" ? corpAll : artAll;
  const pages = Math.max(1, Math.ceil(shown.length / PER));
  React.useEffect(() => {
    setPage(0);
    if (cat === "Todo") setMixSeed(Math.floor(Math.random() * 10000));
  }, [cat]);
  const goToPage = React.useCallback(next => {
    setFade(false); // fade out
    setTimeout(() => {
      setPage(next);
      setFade(true);
    }, 280); // swap while hidden, then fade in
  }, []);
  React.useEffect(() => {
    const AUTO_ADVANCE = true;
    if (pages <= 1 || !AUTO_ADVANCE) return;
    // 3 fotos × 3.3s ≈ 10s por tarjeta → mantener cada página ~10s para alcanzar a mostrar todas
    const id = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setPage(p => (p + 1) % pages);
        setFade(true);
      }, 280);
    }, 10000);
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
    className: "svb-reveal",
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
    tickColor: "var(--svb-violet)",
    style: {
      display: "none"
    }
  }, "Trayectoria \xB7 escenarios reales"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "Lo mejor de nuestro trabajo es verlo en acci\xF3n.")), /*#__PURE__*/React.createElement("div", {
    className: "svb-tabs",
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
    className: "svb-reveal svb-workgrid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: "16px",
      opacity: fade ? 1 : 0,
      transition: "opacity 280ms var(--ease-standard)"
    }
  }, pageItems.map((w, i) => /*#__PURE__*/React.createElement(WorkCard, {
    key: page + "-" + i,
    w: w
  }))), pages > 1 && /*#__PURE__*/React.createElement("div", {
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
    onClick: () => goToPage(i),
    "aria-label": "Página " + (i + 1),
    style: {
      width: i === page ? "28px" : "10px",
      height: "10px",
      padding: 0,
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      border: "none",
      background: i === page ? "var(--svb-white)" : "var(--border-strong)",
      transition: "width var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "26px",
      fontSize: "13px",
      color: "var(--text-meta)",
      maxWidth: "70ch",
      lineHeight: 1.6,
      display: "none"
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
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginBottom: "44px",
      maxWidth: "56ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-blue)",
    style: {
      display: "none"
    }
  }, "Tres trayectorias \xB7 una capacidad de marca"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "La experiencia nos une.")), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(FounderCard, {
    name: "Jaime Lagos",
    role: "Creatividad & Arte",
    accent: "blue",
    photo: "assets/team/jaime-lagos.jpg",
    hoverPhotos: ["team/min/jaime-hover.jpg"],
    disciplines: ["Dirección de arte", "Contenido visual", "3D"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Luis Ulloa",
    role: "Producci\xF3n & Media Server",
    accent: "amber",
    photo: "assets/team/luis-ulloa.jpg",
    hoverPhotos: ["team/min/luis-hover.jpg"],
    disciplines: ["Producción general", "Coordinación", "Visuales"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Elvis Coloma",
    role: "Iluminaci\xF3n & T\xE9cnica",
    accent: "violet",
    photo: "assets/team/elvis-coloma.jpg",
    hoverPhotos: ["team/min/elvis-2.jpg"],
    disciplines: ["Diseño de luz", "Programación", "Escenario"]
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });
  const field = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const DEST = "hola@svblime.cl";
  const submit = e => {
    e.preventDefault();
    if (sending) return;
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError("Completa nombre, email y mensaje.");
      return;
    }
    setSending(true);
    setError("");
    const data = new FormData();
    data.append("Nombre", form.nombre);
    data.append("Email", form.email);
    data.append("Mensaje", form.mensaje);
    data.append("_subject", "Nuevo contacto desde svblime.cl - " + form.nombre);
    data.append("_template", "table");
    data.append("_captcha", "false");
    fetch("https://formsubmit.co/ajax/" + DEST, {
      method: "POST",
      body: data
    }).then(function (r) {
      return r.json().catch(function () {
        return {
          success: r.ok ? "true" : "false"
        };
      });
    }).then(function (j) {
      if (String(j.success) === "true" || j.message && /success/i.test(j.message)) {
        setSent(true);
      } else {
        setError((j.message || "No pudimos enviar el mensaje.") + " Escríbenos directo a " + DEST + ".");
      }
    }).catch(function (err) {
      setError("No pudimos enviar el mensaje (" + (err && err.message ? err.message : "error de red") + "). Escríbenos directo a " + DEST + ".");
    }).then(function () {
      setSending(false);
    });
  };
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
      ...stage("143,0,255", "78,169,255"),
      padding: "var(--section-y) clamp(20px,5vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
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
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-violet)"
  }, "Recibido"), /*#__PURE__*/React.createElement("p", {
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
    onSubmit: submit,
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
    variant: "secondary",
    size: "lg",
    type: "submit",
    onClick: submit,
    disabled: sending,
    style: {
      marginTop: "6px",
      alignSelf: "flex-start",
      opacity: sending ? 0.6 : 1,
      pointerEvents: sending ? "none" : "auto"
    }
  }, sending ? "Enviando…" : "Enviar"), error ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      lineHeight: 1.6,
      color: "var(--svb-amber)"
    }
  }, error, " ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:" + DEST,
    style: {
      color: "var(--svb-blue)"
    }
  }, "Abrir correo")) : null))));
}

/* ============================ Footer ============================ */
function BrandMarquee() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-stage)",
      borderTop: "1px solid var(--border-default)",
      padding: "clamp(28px,4vw,48px) 0",
      overflow: "hidden",
      position: "relative",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "max-content",
      animation: "svbMarquee 34s linear infinite"
    }
  }, [0, 1].map(rep => /*#__PURE__*/React.createElement("div", {
    key: rep,
    "aria-hidden": rep === 1,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(40px,6vw,88px)",
      padding: "0 clamp(20px,3vw,44px)"
    }
  }, ["rock-out", "claro", "muno-bx", "premios-pulsar", "flow-fest", "pailita", "vitacura", "pod", "lollapalooza", "knotfest", "carolina-herrera", "copec", "pedro-aguirre-cerda", "wailers", "pudahuel", "shishi-gang", "tecate", "stellantis", "myriam-hernandez", "akriila", "axon-pharma", "jere-klein", "billboard", "chystemc", "combo-tortuga", "provetec", "resistance", "ultra", "carin-leon", "tvn", "nanpa-basico", "blue-label", "hilaria", "polima-westcoast", "inacap", "ipchile", "lotus", "breast-cancer", "vina-fest", "shamanes", "garras-amor", "crush-music", "chevrolet", "onyx", "caja-los-andes", "huaso-olmue", "alanys-lagos", "lara-project", "armonic", "yandel-artist", "facebrooklyn", "zumbale-primo", "entel"].map((b, bi) => /*#__PURE__*/React.createElement("span", {
    key: b,
    className: "svb-brand",
    style: {
      ["--m"]: "url(brands/" + b + ".png)",
      ["--c"]: ["var(--svb-blue)", "var(--svb-amber)", "var(--svb-violet)"][bi % 3]
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "brands/" + b + ".png",
    alt: b,
    loading: "lazy",
    decoding: "async",
    style: {
      height: "calc(clamp(22px,2.4vw,30px) * " + ({
        "carolina-herrera": 1.75,
        "vitacura": 1.9,
        "armonic": 2.0,
        "chevrolet": 1.75,
        "blue-label": 1.55,
        "hilaria": 1.9,
        "pudahuel": 1.25,
        "claro": 1.3,
        "provetec": 1.55,
        "onyx": 1.5,
        "pod": 1.2,
        "chystemc": 1.7,
        "tecate": 1.7,
        "huaso-olmue": 1.6,
        "myriam-hernandez": 1.1,
        "flow-fest": 1.5,
        "jere-klein": 1.1,
        "wailers": 1.3,
        "zumbale-primo": 1.15,
        "polima-westcoast": 1.4,
        "lara-project": 1.35,
        "nanpa-basico": 1.3,
        "alanys-lagos": 1.3,
        "yandel-artist": 1.4,
        "pailita": 1.15,
        "shamanes": 1.15,
        "premios-pulsar": 1.45,
        "rock-out": 1.05,
        "knotfest": 1.1,
        "vina-fest": 1.2,
        "shishi-gang": 1.6,
        "garras-amor": 1.0,
        "combo-tortuga": 1.3,
        "crush-music": 1.4
      }[b] || 1) + ")",
      width: "auto",
      objectFit: "contain",
      opacity: 0.8,
      display: "block"
    }
  })))))), /*#__PURE__*/React.createElement("style", null, "@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"));
}
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
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "18px",
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      color: "var(--svb-white)",
      maxWidth: "620px"
    }
  }, "SVBLIME existe para que ninguna gran idea se pierda."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.14em",
      color: "var(--text-meta)"
    }
  }, "Chile \xB7 2026")));
}

/* ============================ Site ============================ */
function Site() {
  const [loading, setLoading] = React.useState(true);
  const goContact = () => {
    window.location.hash = "#contacto";
  };
  React.useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }
  }, [loading]);
  // Scroll-reveal: elements animate in as they enter, and back out as they leave —
  // in both scroll directions. Direction sets whether they rise or sink.
  React.useEffect(() => {
    let lastY = window.scrollY;
    const io = new IntersectionObserver(entries => {
      const goingDown = window.scrollY >= lastY;
      lastY = window.scrollY;
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove("out-up", "out-down");
          e.target.classList.add("in");
        } else {
          e.target.classList.remove("in");
          e.target.classList.add(goingDown ? "out-up" : "out-down");
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    const scan = () => document.querySelectorAll(".svb-reveal").forEach(el => io.observe(el));
    scan();
    const t = setTimeout(scan, 400);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [loading]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-page)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("style", null, ".svb-reveal{opacity:0;transform:translateY(40px) scale(0.985);transition:opacity 850ms cubic-bezier(0.16,1,0.3,1),transform 850ms cubic-bezier(0.16,1,0.3,1)}.svb-reveal.in{opacity:1;transform:none}.svb-reveal.out-up{opacity:0;transform:translateY(-40px) scale(0.985)}.svb-reveal.out-down{opacity:0;transform:translateY(40px) scale(0.985)}@media(prefers-reduced-motion:reduce){.svb-reveal{opacity:1!important;transform:none!important}}.svb-gcap{opacity:0;transition:opacity 280ms ease}.svb-gitem:hover .svb-gcap{opacity:1;transition:opacity 320ms ease 700ms}.svb-gitem:hover img,.svb-gitem:hover video{opacity:1!important}"), loading && /*#__PURE__*/React.createElement(LoadingScreen, {
    onDone: () => setLoading(false)
  }), /*#__PURE__*/React.createElement(Header, {
    onCta: goContact
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement("section", {
    id: "agencia",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)",
      background: "radial-gradient(90% 80% at 12% 0%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(80% 90% at 92% 100%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(70% 70% at 60% 40%, rgba(255,205,89,0.05), transparent 60%), var(--bg-page)",
      borderTop: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      textAlign: "center",
      marginInline: "auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(28px,4vw,52px)",
      color: "var(--svb-white)",
      lineHeight: 1.06,
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: "45px",
      display: "none",
      letterSpacing: "-0.01em"
    }
  }, "Va m\xE1s all\xE1 de las luces, pantallas y la producci\xF3n."), "Lo que merece ser recordado,", /*#__PURE__*/React.createElement("br", null), "lo hacemos realidad."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "clamp(15px,1.4vw,18px)",
      lineHeight: 1.7,
      color: "var(--text-body)"
    }
  }, "Transformamos tus ideas en experiencias que inspiran, conectan e impactan, con un prop\xF3sito: ", /*#__PURE__*/React.createElement("em", null, "hacerlas inolvidables."))))), /*#__PURE__*/React.createElement(Pilares, null), /*#__PURE__*/React.createElement(LineUp, null), /*#__PURE__*/React.createElement(Trabajo, null), /*#__PURE__*/React.createElement(Equipo, null), /*#__PURE__*/React.createElement(Contacto, null), /*#__PURE__*/React.createElement(Footer, null));
}
window.Site = Site;
})(); } catch (e) { __ds_ns.__errors.push({ path: "SVBLIME-web-optimizado/site.js", error: String((e && e.message) || e) }); }

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

// deck-stage.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* ═══ THIS PROJECT USES DESIGN COMPONENTS (.dc.html) ═══
 * Reference this stage from your <x-dc> template as an import — NEVER as a
 * raw <deck-stage> tag plus a <script src> (that hides the whole deck until
 * the stream finishes):
 *
 *   <x-import component-from-global-scope="deck-stage" from="./deck-stage.js"
 *             width="1920" height="1080" hint-size="100%,100%">
 *     <section data-label="Title" style="...">…</section>
 *     <section data-label="Agenda" style="...">…</section>
 *   </x-import>
 *
 * Slides are inline-styled <section> siblings; do not add a stylesheet or a
 * deck-stage:not(:defined) rule. The plain-HTML "Usage" block in the comment
 * below does NOT apply to .dc.html templates.
 */
/* BEGIN USAGE */
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→ and ↑/↓, PgUp/PgDn, Space, Home/End,
 *      number keys.
 *      On touch devices, tapping the left/right half of the stage goes
 *      prev/next — taps on links, buttons and other interactive slide
 *      content are left alone.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on
 *      idle; hovering or focusing its controls pins it visible until the
 *      pointer/focus leaves. While presenting it is pointer-summoned only:
 *      mouse movement (or hover/focus) shows it, slide changes never do.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *  (g) thumbnail rail — resizable left-hand column of per-slide thumbnails
 *      (static clones). Click to navigate — the clicked slide becomes the
 *      selected (highlighted) slide; shift-click selects a range and
 *      cmd/ctrl-click toggles slides in and out of the selection
 *      (Escape collapses it back to the current slide); ↑/↓ with a
 *      thumbnail focused to step between slides; Delete/Backspace with a
 *      thumbnail focused to delete the selection (one confirm dialog,
 *      one undoable operation); drag to reorder (dragging collapses a
 *      multi-selection); right-click for
 *      Skip / Move up / Move down / Duplicate / Delete — over a
 *      multi-selection the menu offers "Delete N slides". Drag the rail's right edge to resize;
 *      width persists to
 *      localStorage. Skipped slides carry `data-deck-skip`, are dimmed in
 *      the rail, omitted from prev/next navigation, and hidden at print.
 *      They also carry no rail number and are excluded from the overlay's
 *      slide count: the remaining slides are numbered contiguously
 *      (Keynote-style), and a skipped CURRENT slide (reachable by rail
 *      click or deep link, never by prev/next) shows '–' as its position.
 *      The rail is suppressed in presenting mode, in the host's Preview
 *      mode (ViewerMode='none'), on `noscale`, on narrow viewports
 *      (≤640px), and via the `no-rail` attribute. Rail mutations dispatch
 *      a `dc-op` CustomEvent on the element (see docs/dc-ops.md) and do
 *      NOT touch the DOM: the host applies the op and re-renders;
 *      structural rail input is locked until the host posts
 *      {__dc_op_ack: true, applied}.
 *  (h) typographic defaults — a zero-specificity stylesheet injected into
 *      the document gives headings `text-wrap: balance` and body text
 *      (p, li, blockquote, figcaption) `text-wrap: pretty`, so slides
 *      avoid widowed/orphaned words by default. Any text-wrap declaration
 *      you author on those elements wins over these defaults.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <style>deck-stage:not(:defined){visibility:hidden}</style>
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *   <script src="deck-stage.js"></script>
 *
 * The :not(:defined) rule prevents a flash of the first slide at its
 * authored styles before this script runs and attaches the shadow root.
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 *
 * Speaker notes stay in sync because the component posts {slideIndexChanged: N}
 * to the parent — just include the #speaker-notes script tag if asked for notes.
 *
 * Authoring guidance:
 *   - Write slide bodies as static HTML inside <deck-stage>, with sizing via
 *     CSS custom properties in a <style> block rather than JS constants.
 *     Static slide markup is what lets the user click a heading in edit mode
 *     and retype it directly; a slide rendered through <script type="text/babel">,
 *     React, or a loop over a JS array has to round-trip every tweak through a
 *     chat message instead. Reach for script-generated slides only when the
 *     content genuinely needs interactive behaviour static HTML can't express.
 *   - Do NOT set position/inset/width/height on the slide <section> elements —
 *     the component absolutely positions every slotted child for you.
 *   - Entrance animations: make the visible end-state the base style and
 *     animate *from* hidden, so print and reduced-motion show content.
 *     Gate the animation on [data-deck-active] and the motion query, e.g.
 *     `@media (prefers-reduced-motion:no-preference){ [data-deck-active] .x{animation:fade-in .5s both} }`.
 *     Avoid infinite decorative loops on slide content.
 */
/* END USAGE */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const FINE_POINTER_MQ = matchMedia('(hover: hover) and (pointer: fine)');
  const NARROW_MQ = matchMedia('(max-width: 640px)');
  // Slide-authored controls that should keep a tap instead of it navigating.
  const INTERACTIVE_SEL = 'a[href], button, input, select, textarea, summary, label, video[controls], audio[controls], [role="button"], [onclick], [tabindex]:not([tabindex^="-"]), [contenteditable]:not([contenteditable="false" i])';
  const pad2 = n => String(n).padStart(2, '0');

  // Label precedence: data-label → data-screen-label (number stripped) → first heading → "Slide".
  const getSlideLabel = el => {
    const explicit = el.getAttribute('data-label');
    if (explicit) return explicit;
    const existing = el.getAttribute('data-screen-label');
    if (existing) return existing.replace(/^\s*\d+\s*/, '').trim() || existing;
    const h = el.querySelector('h1, h2, h3, [data-title]');
    const t = h && (h.textContent || '').trim().slice(0, 40);
    if (t) return t;
    return 'Slide';
  };
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }
    /* connectedCallback holds this until document.fonts.ready (capped 2s) so
     * the first visible paint has the deck's real typography + final rail
     * layout. opacity (not visibility) so the active slide can't un-hide
     * itself via the ::slotted([data-deck-active]) visibility:visible rule.
     * Only the stage/rail hide — the black :host background stays, so the
     * iframe doesn't flash the page's default white. */
    :host([data-fonts-pending]) .stage,
    :host([data-fonts-pending]) .rail { opacity: 0; pointer-events: none; }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
      /* Slide edge on the black stage. Dark decks override the canvas
       * fill toward the stage's own black, leaving nothing to mark where
       * the slide ends — the faint white ring keeps the boundary legible
       * there while disappearing into the white of light decks. A
       * box-shadow, not outline/border: it follows any canvas rounding
       * and adds no layout size. */
      box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.12);
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Thumbnail rail ──────────────────────────────────────────────────
       Fixed column on the left; each thumbnail is a static deep-clone of
       the light-DOM slide scaled into a 16:9 (or design-aspect) frame. The
       stage re-fits around it (see _fit); hidden during present / noscale
       / print so capture geometry and fullscreen output are unchanged. */
    .rail {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--deck-rail-w, 188px);
      background: #141414;
      border-right: 1px solid rgba(255,255,255,0.08);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147482500;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.18) transparent;
    }
    .rail::-webkit-scrollbar { width: 8px; }
    .rail::-webkit-scrollbar-track { background: transparent; margin: 2px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .rail::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.28);
      border: 2px solid transparent;
      background-clip: content-box;
    }
    :host([no-rail]) .rail,
    :host([noscale]) .rail { display: none; }
    .rail[data-presenting] { display: none; }
    @media (max-width: 640px) {
      .rail, .rail-resize { display: none; }
    }
    /* User-driven show/hide (the TweaksPanel toggle) slides instead of
       popping. Transitions are gated on :host([data-rail-anim]) — set only
       for the 200ms around the toggle — so window-resize and rail-width
       drag (which also call _fit) don't lag behind the cursor. */
    .rail[data-user-hidden] { transform: translateX(-100%); }
    :host([data-rail-anim]) .rail { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .stage { transition: left 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .canvas { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    /* transition shorthand replaces rather than merges — repeat the base
       .overlay opacity/transform/filter transitions so visibility changes
       during the 200ms toggle window still fade instead of popping. */
    :host([data-rail-anim]) .overlay {
      transition: margin-left 200ms cubic-bezier(.3,.7,.4,1),
                  opacity 260ms ease,
                  transform 260ms cubic-bezier(.2,.8,.2,1),
                  filter 260ms ease;
    }

    .thumb {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .thumb .num {
      width: 16px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 500;
      text-align: right;
      color: rgba(255,255,255,0.55);
      padding-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .thumb .frame {
      position: relative;
      flex: 1;
      min-width: 0;
      aspect-ratio: var(--deck-aspect);
      background: #fff;
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 0;
      overflow: hidden;
      transition: outline-color 120ms ease;
    }
    .thumb:hover .frame { outline-color: rgba(255,255,255,0.25); }
    .thumb { outline: none; }
    .thumb:focus-visible .frame { outline-color: rgba(255,255,255,0.5); }
    .thumb[data-selected] .num { color: #fff; }
    .thumb[data-selected] .frame {
      outline-color: rgba(217,119,87,0.65);
      box-shadow: 0 0 0 4px rgba(217,119,87,0.18);
    }
    .thumb[data-current] .num { color: #fff; }
    .thumb[data-current] .frame {
      outline-color: #D97757;
      box-shadow: 0 0 0 4px rgba(217,119,87,0.25);
    }
    /* While dragging, the thumb itself is the drag visual (the native drag
       image is suppressed in dragstart so the snapshot can't wander off the
       rail horizontally): elevate it rather than dim it, and let hit-testing
       ignore it so dragover reaches the sibling thumb under the pointer
       instead of the moving element itself. */
    .thumb[data-dragging] { opacity: 0.9; z-index: 30; pointer-events: none; }
    .thumb[data-dragging] .frame {
      outline-color: rgba(255,255,255,0.5);
      box-shadow: 0 6px 24px rgba(0,0,0,0.5);
    }
    .thumb::before {
      content: '';
      position: absolute;
      left: 24px;
      right: 0;
      height: 3px;
      border-radius: 2px;
      background: #D97757;
      opacity: 0;
      pointer-events: none;
    }
    .thumb[data-drop="before"]::before { top: -8px; opacity: 1; }
    .thumb[data-drop="after"]::before { bottom: -8px; opacity: 1; }
    .thumb[data-skip] .frame { opacity: 0.35; }
    .thumb[data-skip] .frame::after {
      content: 'Skipped';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .ctxmenu {
      position: fixed;
      min-width: 150px;
      padding: 4px;
      background: #242424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      z-index: 2147483100;
      display: none;
      font-size: 12px;
    }
    .ctxmenu[data-open] { display: block; }
    .ctxmenu button {
      display: block;
      width: 100%;
      appearance: none;
      border: 0;
      background: transparent;
      color: #e8e8e8;
      font: inherit;
      text-align: left;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .ctxmenu button:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
    .ctxmenu button:disabled { opacity: 0.35; cursor: default; }
    .ctxmenu hr {
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 4px 2px;
    }

    .rail-resize {
      position: fixed;
      left: calc(var(--deck-rail-w, 188px) - 3px);
      top: 0;
      bottom: 0;
      width: 6px;
      cursor: col-resize;
      z-index: 2147482600;
      touch-action: none;
    }
    .rail-resize:hover,
    .rail-resize[data-dragging] { background: rgba(255,255,255,0.12); }
    :host([no-rail]) .rail-resize,
    :host([noscale]) .rail-resize,
    .rail[data-presenting] + .rail-resize,
    .rail[data-user-hidden] + .rail-resize { display: none; }

    /* Delete-confirm popup — matches the SPA's ConfirmDialog layout
       (title + message body, depressed footer with Cancel / Delete). */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 2147483200;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .confirm-backdrop[data-open] { display: flex; }
    .confirm {
      width: 320px;
      max-width: calc(100vw - 32px);
      background: #2a2a2a;
      color: #e8e8e8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      overflow: hidden;
      font-family: inherit;
      animation: deck-confirm-in 0.18s ease;
    }
    @keyframes deck-confirm-in {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm .body { padding: 20px 20px 16px; }
    .confirm .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .confirm .msg { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.65); }
    .confirm .footer {
      padding: 14px 20px;
      background: #1f1f1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .confirm button {
      appearance: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .confirm .cancel {
      background: transparent;
      border: 0;
      color: rgba(255,255,255,0.8);
    }
    .confirm .cancel:hover { background: rgba(255,255,255,0.08); }
    .confirm .danger {
      background: #c96442;
      border: 1px solid rgba(0,0,0,0.15);
      color: #fff;
      box-shadow: 0 1px 3px rgba(166,50,68,0.3), 0 2px 6px rgba(166,50,68,0.18);
    }
    .confirm .danger:hover { background: #b5563a; }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that _syncPrintPageRule appends
       to the document (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        /* Size containment: slotted content that overflows the design box
         * (an image-slot's aspect-ratio-derived width, say) must not count
         * toward Chromium's print document width — without this, an
         * abs-positioned child past the page edge shrinks the whole PDF
         * to fit (~75%). Containment is safe here because the definite
         * width/height above size the slide regardless of content.
         * (Absorbed from PR #2619 with its owner's agreement.) */
        contain: size !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      /* :last-child alone isn't enough once data-deck-skip hides the
         trailing slide(s) — the last *visible* slide still carries
         break-after:page and prints a blank sheet. _markLastVisible()
         maintains data-deck-last-visible on the last non-skipped slide. */
      ::slotted(*:last-child),
      ::slotted([data-deck-last-visible]) {
        break-after: auto;
        page-break-after: auto;
      }
      ::slotted([data-deck-skip]) { display: none !important; }
      .overlay, .rail, .rail-resize, .ctxmenu, .confirm-backdrop { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale', 'no-rail'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      // Explicit multi-selection (slide elements). Empty means the
      // selection is implicitly the current slide, so Delete always has
      // a well-defined target while the rail has focus.
      this._selected = new Set();
      this._selAnchor = null;
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._menuIndex = -1;
      // Overlay pinning: while the pointer is over the controls toolbar or
      // a control has keyboard focus, the idle-hide timeout must not
      // dismiss it (a pointer parked ON the controls doesn't generate
      // mousemove, so without the pin the toolbar vanishes under the
      // user's cursor after OVERLAY_HIDE_MS). Read by _flashOverlay's
      // hide timeout; cleared by mouseleave/focusout, which resume the
      // normal idle fade.
      this._overlayHover = false;
      this._overlayFocus = false;
      // Capability marker for the host's injected guest bundle. Copies
      // WITHOUT _navArrowsUpDown are frozen per-project builds that
      // predate native ArrowUp/ArrowDown slide nav — the bundle translates
      // Up/Down to Right/Left for those (installDeckArrowKeyTranslator in
      // apps/web/src/guest/edit-mode.ts) and must stand down here or every
      // press would advance twice. A marker, not a version number, so a
      // future capability can add its own independent probe.
      this._navArrowsUpDown = true;
      // Same contract for rail Delete/Backspace: copies WITHOUT
      // _railDeleteKey predate the thumbs' own Delete/Backspace binding,
      // and the bundle opens the delete confirm for them
      // (installDeckRailDeleteFallback in apps/web/src/guest/edit-mode.ts).
      // Current builds consume the key at the thumb (stopPropagation), so
      // the marker is belt-and-braces — it keeps the fallback standing
      // down even if a future build lets the key bubble past the thumb.
      this._railDeleteKey = true;
      // Same contract for skip-aware numbering: copies WITHOUT
      // _railSkipNumbers number every thumb 1..N and count skipped slides
      // in the overlay total — the bundle rewrites both for those
      // (installDeckSkipNumberingFallback in apps/web/src/guest/edit-mode.ts).
      // Here the component renumbers natively, so the fallback stands down.
      this._railSkipNumbers = true;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTap = this._onTap.bind(this);
      this._onMessage = this._onMessage.bind(this);
      // Capture-phase close so a click anywhere dismisses the menu, but
      // ignore clicks that land inside the menu itself — otherwise the
      // capture handler runs before the menu's own (bubble) handler and
      // clears _menuIndex out from under it.
      this._onDocClick = e => {
        if (this._menu && e.composedPath && e.composedPath().includes(this._menu)) return;
        this._closeMenu();
      };
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      // Presenter-view popup loads deckUrl?_snthumb=...#N for its prev/cur/
      // next thumbnails — the rail has no business rendering inside those
      // (wrong scale, and it offsets the stage so the thumb shows a gutter).
      if (/[?&]_snthumb=/.test(location.search)) this.setAttribute('no-rail', '');
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      this._ensurePrintSizingMeta();
      this._ensureTextWrapDefaults();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      window.addEventListener('message', this._onMessage);
      window.addEventListener('click', this._onDocClick, true);
      this.addEventListener('click', this._onTap);
      // Print lays every slide out as its own page, so [data-deck-active]-
      // gated entrance styles need the attribute on every slide (not just
      // the current one) or their content prints at the hidden base style.
      // The transient freeze style lands BEFORE the attributes so any
      // attribute-keyed transition fires at 0s (changing transition-
      // duration after a transition has started doesn't affect it).
      this._onBeforePrint = () => {
        this._syncPrintPageRule();
        // Self-heal: a departed doc-page may have removed the page-global
        // print-sizing meta this deck deferred to at connect time.
        this._ensurePrintSizingMeta();
        if (this._freezeStyle) this._freezeStyle.remove();
        this._freezeStyle = document.createElement('style');
        this._freezeStyle.textContent = '*,*::before,*::after{transition-duration:0s !important}';
        document.head.appendChild(this._freezeStyle);
        this._slides.forEach(s => s.setAttribute('data-deck-active', ''));
      };
      this._onAfterPrint = () => {
        this._applyIndex({
          showOverlay: false,
          broadcast: false
        });
        if (this._freezeStyle) {
          this._freezeStyle.remove();
          this._freezeStyle = null;
        }
      };
      window.addEventListener('beforeprint', this._onBeforePrint);
      window.addEventListener('afterprint', this._onAfterPrint);
      // Initial collection + layout happens via slotchange, which fires on mount.
      this._enableRail();
      // Hold the stage hidden until webfonts are ready so the first visible
      // paint has the deck's real typography — the :not(:defined) guard in
      // the page HTML only covers custom-element upgrade, not font load.
      // Capped so a 404'd font URL can't blank the deck indefinitely.
      this.setAttribute('data-fonts-pending', '');
      const reveal = () => this.removeAttribute('data-fonts-pending');
      // Unconditional cap — rAF can be suspended in a hidden iframe, which
      // would strand the one inside the rAF callback.
      setTimeout(reveal, 2000);
      // rAF first: fonts.ready is a pre-resolved promise until layout has
      // resolved the slotted text's font-family and pushed a FontFace into
      // 'loading'. Reading it here in connectedCallback (parse-time) would
      // settle the race in a microtask before any font fetch starts.
      requestAnimationFrame(() => {
        Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2000))]).then(reveal, reveal);
      });
    }
    _enableRail() {
      // Idempotent — older host builds still post __omelette_rail_enabled.
      // no-rail guard keeps the observers/stylesheet walk off the cheap path
      // for presenter-popup thumbnail iframes (three per view — cur/prev/next).
      if (this._railEnabled || this.hasAttribute('no-rail')) return;
      this._railEnabled = true;
      // Per-viewer preference — restored alongside rail width. Default on;
      // only a stored '0' (from the TweaksPanel toggle) hides it.
      this._railVisible = true;
      try {
        if (localStorage.getItem('deck-stage.railVisible') === '0') this._railVisible = false;
      } catch (e) {}
      // Live thumbnail updates: watch the light-DOM slides for content
      // edits and re-clone just the affected thumb(s), debounced. Ignore
      // the data-deck-* / data-screen-label / data-om-validate attributes
      // this component itself writes so nav doesn't trigger spurious
      // refreshes — except data-deck-skip, which now arrives from the host
      // re-render and is what updates the rail badge, print bookkeeping,
      // and deckSkipped re-broadcast. Also ignore data-dc-tpl /
      // data-om-slide-id — host-reserved bookkeeping stamps (the host's
      // ATTR_RESERVED guard bounds them the same way) that structural
      // edits renumber/re-mint on slides whose content didn't change;
      // re-cloning on that churn is what made a slide move flash its
      // thumbnails.
      const OWN_ATTRS = /^data-(deck-(?!skip$)|screen-label$|om-(validate|slide-id)$|dc-tpl$)/;
      this._liveDirty = new Set();
      this._liveObserver = new MutationObserver(records => {
        for (const r of records) {
          if (r.type === 'attributes' && OWN_ATTRS.test(r.attributeName || '')) continue;
          let n = r.target;
          while (n && n.parentElement !== this) n = n.parentElement;
          // Skip/unskip is handled below without re-cloning (the badge sits
          // on the thumb wrapper, not the clone) — don't mark the slide
          // dirty for an attr change whose only visible effect is the badge.
          if (n && this._slideSet && this._slideSet.has(n) && !(r.type === 'attributes' && r.attributeName === 'data-deck-skip')) {
            this._liveDirty.add(n);
          }
          // Host-driven skip toggle: sync the rail badge + print + presenter
          // skipped-list the way _toggleSkip used to do locally.
          if (r.type === 'attributes' && r.attributeName === 'data-deck-skip' && n && this._slideSet && this._slideSet.has(n)) {
            const i = this._slides.indexOf(n);
            if (this._thumbs && this._thumbs[i]) {
              if (n.hasAttribute('data-deck-skip')) this._thumbs[i].thumb.setAttribute('data-skip', '');else this._thumbs[i].thumb.removeAttribute('data-skip');
            }
            this._markLastVisible();
            this._renumberRail();
            this._syncCount();
            try {
              window.postMessage({
                slideIndexChanged: this._index,
                deckTotal: this._slides.length,
                deckSkipped: this._skippedIndices()
              }, '*');
            } catch (e) {}
          }
        }
        if (this._liveDirty.size && !this._liveTimer) {
          this._liveTimer = setTimeout(() => {
            this._liveTimer = null;
            this._liveDirty.forEach(s => this._refreshThumb(s));
            this._liveDirty.clear();
          }, 200);
        }
      });
      this._liveObserver.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      // Lazy thumbnail materialization — clone the slide only when its
      // frame scrolls into (or near) the rail viewport. rootMargin gives
      // ~4 thumbs of pre-load so fast scrolling doesn't flash blanks.
      this._railObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.target.__deckThumb) {
            this._materialize(e.target.__deckThumb);
          }
        });
      }, {
        root: this._rail,
        rootMargin: '400px 0px'
      });
      // Tweaks typically change CSS vars / attrs OUTSIDE <deck-stage>
      // (on <html>, <body>, a wrapper div, or a <style> tag), which
      // _liveObserver can't see. Re-snapshot author CSS (constructable
      // sheet is shared by reference, so one replaceSync updates every
      // thumb shadow root) and re-sync each thumb host's attrs + custom
      // properties. In-slide DOM mutations are _liveObserver's job.
      // Debounced so slider drags don't thrash.
      this._onTweakChange = () => {
        clearTimeout(this._tweakTimer);
        this._tweakTimer = setTimeout(() => {
          this._snapshotAuthorCss();
          // One getComputedStyle for the whole batch — each
          // getPropertyValue read below reuses the same computed style
          // as long as nothing invalidates layout between thumbs.
          const cs = getComputedStyle(this);
          (this._thumbs || []).forEach(t => {
            if (t.host) this._syncThumbHostAttrs(t.host, cs);
          });
        }, 120);
      };
      window.addEventListener('tweakchange', this._onTweakChange);
      // Stylesheets that finish loading AFTER the snapshot below never
      // reach the thumbs on their own: a still-pending <link> contributes
      // nothing to document.styleSheets, and nothing re-reads it on load,
      // so the live slides restyle while every clone keeps the stale
      // sheet. dc-runtime's helmet mounts design-system <link>s at render
      // time, so a deck-stage that connects first snapshots before that
      // CSS exists. Funnel late arrivals into the same debounced resync:
      // hook load/error on every current <link>, and watch <head> for
      // links and styles mounted or rewritten later. Deliberately not
      // rAF- or fonts.ready-driven — rAF is throttled/suspended in hidden
      // iframes (thumbnail/presenter contexts), and a font-file load
      // doesn't change cssRules, so it needs no resync.
      this._hookedLinks = [];
      this._hookSheetLoad = el => {
        if (!el.matches || !el.matches('link[rel~="stylesheet" i]')) return;
        if (this._hookedLinks.indexOf(el) !== -1) return;
        this._hookedLinks.push(el);
        el.addEventListener('load', this._onTweakChange);
        el.addEventListener('error', this._onTweakChange);
      };
      document.querySelectorAll('link[rel~="stylesheet" i]').forEach(this._hookSheetLoad);
      this._headObserver = new MutationObserver(records => {
        let resync = false;
        for (const r of records) {
          if (r.type === 'characterData') {
            // Only <style> text is CSS — a ticking <title> shouldn't
            // wake the resync forever.
            const p = r.target.parentNode;
            if (p && p.nodeName === 'STYLE') resync = true;
            continue;
          }
          if (r.type === 'attributes') {
            // A late rel/href rewrite turns an inert <link> into a
            // stylesheet (hook it; its load fires even on cache hits);
            // a media/disabled flip changes effective rules with no
            // event. Resync only if this link is or ever was a
            // stylesheet — favicon/preload/canonical href churn isn't
            // a resync.
            if (r.target.nodeName === 'LINK') {
              this._hookSheetLoad(r.target);
              if (this._hookedLinks.indexOf(r.target) !== -1) resync = true;
            } else if (r.target.nodeName === 'STYLE') resync = true;
            continue;
          }
          // childList: only links and styles carry CSS. A new <link> has
          // no rules until it loads — hook it rather than resync now; a
          // <style> mount/unmount or text-node swap takes effect
          // immediately. _freezeStyle (our beforeprint helper) is skipped
          // on add only — no removal-side guard: _onAfterPrint nulls the
          // ref before the observer fires, so that check would be dead;
          // the one debounced no-op resync per print is harmless.
          if (r.target.nodeName === 'STYLE') resync = true;
          for (const n of r.addedNodes) {
            if (n.nodeName === 'LINK') this._hookSheetLoad(n);else if (n.nodeName === 'STYLE' && n !== this._freezeStyle) resync = true;
          }
          for (const n of r.removedNodes) {
            if (n.nodeName === 'LINK') {
              const hi = this._hookedLinks.indexOf(n);
              if (hi !== -1) {
                this._hookedLinks.splice(hi, 1);
                n.removeEventListener('load', this._onTweakChange);
                n.removeEventListener('error', this._onTweakChange);
                resync = true;
              }
            } else if (n.nodeName === 'STYLE') resync = true;
          }
        }
        if (resync) this._onTweakChange();
      });
      this._headObserver.observe(document.head, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['rel', 'href', 'media', 'disabled']
      });
      this._snapshotAuthorCss();
      // Re-snapshot once any still-loading stylesheet settles — it throws on
      // .cssRules above and silently contributes '' → unstyled thumbs on a
      // cold mount. {once:true}; routed through the debounced handler.
      document.querySelectorAll('link[rel~="stylesheet"]').forEach(l => {
        try {
          if (l.sheet && l.sheet.cssRules) return;
        } catch (e) {}
        l.addEventListener('load', this._onTweakChange, {
          once: true
        });
        l.addEventListener('error', this._onTweakChange, {
          once: true
        });
      });
      if (document.fonts) document.fonts.ready.then(this._onTweakChange, this._onTweakChange);
      // Build the rail now that it's enabled — slotchange already fired,
      // so _renderRail's early-return skipped the initial build.
      this._syncRailHidden();
      this._renderRail();
      this._fit();
    }

    /** Snapshot document stylesheets into a constructable sheet that each
     *  thumbnail's nested shadow root adopts — so author CSS styles the
     *  cloned slide content without touching this component's chrome.
     *  Cross-origin sheets throw on .cssRules — skip them. Re-callable:
     *  the existing constructable sheet is reused via replaceSync so every
     *  already-adopted shadow root picks up the fresh CSS without re-adopt. */
    _snapshotAuthorCss() {
      // :root in an adopted sheet inside a shadow root matches nothing
      // (only the document root qualifies), so author rules like
      // `:root[data-voice="modern"] .serif` never reach the clones.
      // Rewrite :root → :host and mirror <html>'s data-*/class/lang onto
      // each thumb host (see _syncThumbHostAttrs) so the same selectors
      // match inside the thumbnail's shadow tree.
      const authorCss = Array.from(document.styleSheets).map(sh => {
        try {
          return Array.from(sh.cssRules).map(r => r.cssText).join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n')
      // The shadow host is featureless outside the functional :host(...)
      // form, so any compound on :root — [attr], .class, #id, :pseudo —
      // must become :host(<compound>) not :host<compound>. Same for the
      // html type selector (Tailwind class-strategy dark mode emits
      // html.dark; Pico uses html[data-theme]), which has nothing to
      // match inside the thumb's shadow tree.
      .replace(/:root((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)/g, ':host($1)').replace(/:root\b/g, ':host').replace(/(^|[\s,>~+(}])html((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)(?![-\w])/g, '$1:host($2)').replace(/(^|[\s,>~+(}])html(?![-\w])/g, '$1:host');
      // Every custom property the author references. _syncThumbHostAttrs
      // mirrors each one's *computed* value at <deck-stage> onto the
      // thumb host so the live value wins over the :host default above
      // regardless of which ancestor the tweak wrote to (<html>, <body>,
      // a wrapper div, or the deck-stage element itself all inherit
      // down to getComputedStyle(this)).
      this._authorVars = new Set(authorCss.match(/--[\w-]+/g) || []);
      try {
        if (!this._adoptedSheet) this._adoptedSheet = new CSSStyleSheet();
        this._adoptedSheet.replaceSync(authorCss);
      } catch (e) {
        this._adoptedSheet = null;
        this._authorCss = authorCss;
      }
    }
    _syncThumbHostAttrs(host, cs) {
      const de = document.documentElement;
      // setAttribute overwrites but can't delete — an attr removed from
      // <html> (toggleAttribute off, classList emptied) would linger on
      // the host and :host([data-*]) / :host(.foo) rules would keep
      // matching. Remove stale mirrored attrs first; iterate backward
      // because removeAttribute mutates the live NamedNodeMap.
      for (let i = host.attributes.length - 1; i >= 0; i--) {
        const n = host.attributes[i].name;
        if ((n.startsWith('data-') || n === 'class' || n === 'lang') && !de.hasAttribute(n)) {
          host.removeAttribute(n);
        }
      }
      for (const a of de.attributes) {
        if (a.name.startsWith('data-') || a.name === 'class' || a.name === 'lang') {
          host.setAttribute(a.name, a.value);
        }
      }
      // The :root→:host rewrite in _snapshotAuthorCss pins each custom
      // property to its stylesheet default on the thumb host, shadowing
      // the live value that would otherwise inherit. Tweaks can write the
      // live value on any ancestor — <html>, <body>, a wrapper div, the
      // deck-stage element — so read it as the *computed* value at
      // <deck-stage> (which sees the whole inheritance chain) rather than
      // trying to guess which element the author wrote to. Inline on the
      // host beats the :host{} rule. remove-stale covers vars dropped
      // from the stylesheet between snapshots.
      const vars = this._authorVars || new Set();
      for (let i = host.style.length - 1; i >= 0; i--) {
        const p = host.style[i];
        if (p.startsWith('--') && !vars.has(p)) host.style.removeProperty(p);
      }
      const live = cs || getComputedStyle(this);
      vars.forEach(p => {
        const v = live.getPropertyValue(p);
        if (v) host.style.setProperty(p, v.trim());else host.style.removeProperty(p);
      });
    }
    disconnectedCallback() {
      // A disconnect mid-drag never gets a dragend, so the document-level
      // drag tracker must be torn down here like every other global hook.
      this._stopDragTrack();
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('message', this._onMessage);
      window.removeEventListener('click', this._onDocClick, true);
      window.removeEventListener('beforeprint', this._onBeforePrint);
      window.removeEventListener('afterprint', this._onAfterPrint);
      if (this._freezeStyle) {
        this._freezeStyle.remove();
        this._freezeStyle = null;
      }
      this.removeEventListener('click', this._onTap);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
      if (this._liveTimer) clearTimeout(this._liveTimer);
      if (this._tweakTimer) clearTimeout(this._tweakTimer);
      if (this._railAnimTimer) clearTimeout(this._railAnimTimer);
      if (this._scaleRaf) cancelAnimationFrame(this._scaleRaf);
      if (this._liveObserver) this._liveObserver.disconnect();
      if (this._railObserver) this._railObserver.disconnect();
      if (this._headObserver) this._headObserver.disconnect();
      (this._hookedLinks || []).forEach(l => {
        l.removeEventListener('load', this._onTweakChange);
        l.removeEventListener('error', this._onTweakChange);
      });
      this._hookedLinks = [];
      if (this._onTweakChange) window.removeEventListener('tweakchange', this._onTweakChange);
      // Drop the text-wrap defaults when the last deck-stage leaves, so a
      // deleted deck's typography can't restyle whatever replaces it.
      // (#deck-stage-print-page keeps its existing keep-forever lifecycle.)
      if (!document.querySelector('deck-stage')) {
        const tw = document.getElementById('deck-stage-text-wrap');
        if (tw) tw.remove();
        const ps = document.getElementById('deck-stage-print-sizing');
        if (ps) ps.remove();
      }
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        if (this._rail) {
          this._rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
        }
        this._fit();
        this._scaleThumbs();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-omelette-chrome', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._advance(-1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._advance(1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));

      // Pin the controls while the user is interacting with them —
      // hovering, or keyboard focus on a control. The hidden overlay is
      // pointer-events:none, so these only ever engage while it's already
      // visible. 'pointer' source: these are user-interaction paths, so
      // they may show/refresh the overlay even while presenting (see
      // _flashOverlay).
      overlay.addEventListener('mouseenter', () => {
        this._overlayHover = true;
        this._flashOverlay('pointer');
      });
      overlay.addEventListener('mouseleave', () => {
        const hadPin = this._overlayHover;
        this._overlayHover = false;
        // Resume the idle fade — never summon. Without the guard, a
        // mouseleave that fires because the overlay was force-hidden
        // (presenting entry flips it to pointer-events:none under the
        // cursor) would pop the controls right back up.
        if (hadPin || overlay.hasAttribute('data-visible')) this._flashOverlay('pointer');
      });
      overlay.addEventListener('focusin', e => {
        // Keyboard-origin focus only (:focus-visible): a mouse click also
        // focuses the clicked button, and pinning on that would hold the
        // controls open indefinitely after a single click — the hover pin
        // already covers the mouse case. Engines without :focus-visible
        // fall back to pinning on any focus (the safe direction).
        var kb = true;
        try {
          var t = e.target;
          kb = !(t && t.matches && !t.matches(':focus-visible'));
        } catch (err) {
          kb = true;
        }
        if (!kb) return;
        this._overlayFocus = true;
        this._flashOverlay('pointer');
      });
      overlay.addEventListener('focusout', e => {
        // Only unpin when focus truly left the toolbar — tabbing between
        // its buttons stays pinned. relatedTarget is null when focus
        // leaves the document entirely; treat that as leaving.
        if (e.relatedTarget && overlay.contains(e.relatedTarget)) return;
        const hadPin = this._overlayFocus;
        this._overlayFocus = false;
        // Resume-the-fade only (see mouseleave): a click-focused button
        // losing focus to a later stage click must not summon the
        // controls mid-presentation.
        if (hadPin || overlay.hasAttribute('data-visible')) this._flashOverlay('pointer');
      });

      // Thumbnail rail + context menu. Thumbnails are populated in
      // _renderRail() after _collectSlides().
      const rail = document.createElement('div');
      rail.className = 'rail export-hidden';
      rail.setAttribute('data-omelette-chrome', '');
      // Edit mode hooks wheel to pan the canvas; this opts the rail's own
      // scrollview out so thumbnails stay scrollable while editing.
      rail.setAttribute('data-dc-wheel-passthru', '');
      rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
      // Edge auto-scroll while dragging a thumb near the rail's top/bottom
      // so off-screen drop targets are reachable. Native dragover fires
      // continuously while the pointer is stationary, so a per-event nudge
      // (ramped by edge proximity) is enough — no rAF loop needed.
      rail.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        const r = rail.getBoundingClientRect();
        const EDGE = 40;
        const dt = e.clientY - r.top;
        const db = r.bottom - e.clientY;
        if (dt < EDGE) rail.scrollTop -= Math.ceil((EDGE - dt) / 3);else if (db < EDGE) rail.scrollTop += Math.ceil((EDGE - db) / 3);
      });
      const menu = document.createElement('div');
      menu.className = 'ctxmenu export-hidden';
      menu.setAttribute('data-omelette-chrome', '');
      menu.innerHTML = `
        <button type="button" data-act="skip">Skip slide</button>
        <button type="button" data-act="up">Move up</button>
        <button type="button" data-act="down">Move down</button>
        <button type="button" data-act="duplicate">Duplicate slide</button>
        <hr>
        <button type="button" data-act="delete">Delete slide</button>
      `;
      menu.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        const i = this._menuIndex;
        const list = this._menuIndices;
        this._closeMenu();
        if (act === 'skip') this._toggleSkip(i);else if (act === 'up') this._moveSlide(i, i - 1);else if (act === 'down') this._moveSlide(i, i + 1);else if (act === 'duplicate') this._duplicateSlide(i);else if (act === 'delete') this._openConfirm(list && list.length ? list : [i]);
      });
      menu.addEventListener('contextmenu', e => e.preventDefault());

      // Rail resize handle — drag to set --deck-rail-w, persisted to
      // localStorage so the width survives reloads.
      const resize = document.createElement('div');
      resize.className = 'rail-resize export-hidden';
      resize.setAttribute('data-omelette-chrome', '');
      resize.addEventListener('pointerdown', e => {
        e.preventDefault();
        resize.setPointerCapture(e.pointerId);
        resize.setAttribute('data-dragging', '');
        const move = ev => this._setRailWidth(ev.clientX);
        const up = () => {
          resize.removeEventListener('pointermove', move);
          resize.removeEventListener('pointerup', up);
          resize.removeEventListener('pointercancel', up);
          resize.removeAttribute('data-dragging');
          try {
            localStorage.setItem('deck-stage.railWidth', String(this._railPx));
          } catch (err) {}
        };
        resize.addEventListener('pointermove', move);
        resize.addEventListener('pointerup', up);
        resize.addEventListener('pointercancel', up);
      });

      // Delete-confirm dialog — mirrors the SPA's ConfirmDialog layout.
      const confirm = document.createElement('div');
      confirm.className = 'confirm-backdrop export-hidden';
      confirm.setAttribute('data-omelette-chrome', '');
      confirm.innerHTML = `
        <div class="confirm" role="dialog" aria-modal="true">
          <div class="body">
            <div class="title">Delete slide?</div>
            <div class="msg">This slide will be removed from the deck.</div>
          </div>
          <div class="footer">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="danger">Delete</button>
          </div>
        </div>
      `;
      confirm.addEventListener('click', e => {
        if (e.target === confirm) {
          this._closeConfirm();
          this._focusCurrentThumb();
        }
      });
      confirm.querySelector('.cancel').addEventListener('click', () => {
        this._closeConfirm();
        this._focusCurrentThumb();
      });
      confirm.querySelector('.danger').addEventListener('click', () => {
        // Re-resolve at click time — the elements are the user's actual
        // selection; their indices may have shifted since confirm-open.
        const list = (this._confirmEls || []).map(el => this._slides.indexOf(el)).filter(i => i >= 0);
        this._closeConfirm();
        this._deleteSlides(list);
        this._focusCurrentThumb();
      });
      this._root.append(style, rail, resize, stage, overlay, menu, confirm);
      this._canvas = canvas;
      this._stage = stage;
      this._slot = slot;
      this._overlay = overlay;
      this._rail = rail;
      this._resize = resize;
      this._menu = menu;
      this._confirm = confirm;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');

      // Restore persisted rail width.
      let rw = 188;
      try {
        const s = localStorage.getItem('deck-stage.railWidth');
        if (s) rw = parseInt(s, 10) || rw;
      } catch (err) {}
      this._setRailWidth(rw);
      this._syncRailHidden();
    }
    _setRailWidth(px) {
      const w = Math.max(120, Math.min(360, Math.round(px)));
      this._railPx = w;
      this.style.setProperty('--deck-rail-w', w + 'px');
      this._fit();
      // _scaleThumbs forces a sync layout (frame.offsetWidth) then writes
      // N transforms. During a resize drag this runs per-pointermove;
      // coalesce to one per frame.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. (Re-)append so any author @page landing later in
     *  source order can't reintroduce a margin and push each slide onto
     *  two sheets; called again from beforeprint. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      (document.body || document.head).appendChild(tag);
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' +
      // Jump authored animations/transitions to their end state so print
      // never captures mid-entrance — pairs with the beforeprint handler
      // in connectedCallback that sets data-deck-active on every slide.
      '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Announces the deck's print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] content "default-landscape" — a
     *  deck prints one slide per page on the user's paper size, landscape.
     *  The export path probes the meta to decide what true paper size to
     *  inject at print time (the @page px rule above stays as the
     *  standalone-print fallback; an injected later rule overrides it).
     *  Never overrides an authored meta or another component's; removed
     *  when the last deck-stage leaves. data-omelette-injected keeps it
     *  out of serialized source. */
    _ensurePrintSizingMeta() {
      if (document.querySelector('meta[name="omelette-print-sizing"]')) return;
      const tag = document.createElement('meta');
      tag.id = 'deck-stage-print-sizing';
      tag.name = 'omelette-print-sizing';
      tag.content = 'default-landscape';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** Typographic defaults for slide text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins. Lives in the document,
     *  not the shadow root, for two reasons: document rules reach the
     *  slotted (light DOM) slides, and _snapshotAuthorCss copies document
     *  stylesheets into each thumbnail's shadow root, so the thumbs wrap
     *  the same way — a deck-stage-scoped selector would match nothing
     *  there. data-omelette-injected marks the tag for the host editor
     *  to strip at serialize, so it is never written back as authored
     *  source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('deck-stage-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'deck-stage-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }
    _onSlotChange() {
      // Self-mutate path already reconciled synchronously and emitted
      // slidechange; skip the async slotchange it caused.
      if (this._squelchSlotChange) {
        this._squelchSlotChange = false;
        return;
      }
      // Primary lock-clear is the host's __deck_rail_ack; this clears on a
      // dropped ack so the rail can't stay dead.
      this._railLock = false;
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
      // The deck just changed under any open rail surface — an open
      // confirm or menu is a question about the OLD deck (its labels and
      // counts may now lie), so close them rather than let a stale
      // answer fire. The element-held selection re-resolves, but the
      // user should re-read what they're deleting.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        this._closeConfirm();
        // The dialog held focus (danger button); hand it back to the rail.
        this._focusCurrentThumb(true);
      }
      if (this._menu && this._menu.hasAttribute('data-open')) this._closeMenu();
      // Editor-mode deletes rebuild the rail through here; a confirmed
      // delete that started from the keyboard still owes focus to the
      // (new) current thumb.
      if (this._pendingRailRefocus) this._focusCurrentThumb(true);
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slideSet = new Set(this._slides);
      // Selection is element-keyed: drop entries whose slide is gone
      // (deleted, or replaced wholesale by a host re-render).
      if (this._selected && this._selected.size) {
        this._selected.forEach(s => {
          if (!this._slideSet.has(s)) this._selected.delete(s);
        });
      }
      if (this._selAnchor && !this._slideSet.has(this._selAnchor)) this._selAnchor = null;
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        slide.setAttribute('data-screen-label', `${pad2(n)} ${getSlideLabel(slide)}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._markLastVisible();
      this._syncCount();
      this._renderRail();
    }

    /** Tag the last non-skipped slide so print CSS can drop its
     *  break-after (see the @media print comment above — :last-child
     *  alone matches a hidden skipped slide). */
    _markLastVisible() {
      let last = null;
      this._slides.forEach(s => {
        s.removeAttribute('data-deck-last-visible');
        if (!s.hasAttribute('data-deck-skip')) last = s;
      });
      if (last) last.setAttribute('data-deck-last-visible', '');
    }
    _loadNotes() {
      // Per-slide data-speaker-notes is authoritative when present (attrs
      // travel with the element on reorder/dup/delete); a slide without
      // the attr falls through to the legacy #speaker-notes JSON array
      // PER SLIDE so a single attr on a JSON-authored deck doesn't blank
      // the rest.
      const tag = document.getElementById('speaker-notes');
      let json = null;
      if (tag) try {
        const p = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(p)) json = p;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
      }
      this._notes = this._slides.map((s, i) => {
        const a = s.getAttribute('data-speaker-notes');
        return a !== null ? a : json && typeof json[i] === 'string' ? json[i] : '';
      });
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      this._syncCount();
      // Follow-scroll on every navigation (init deep-link, keyboard, click,
      // tap, external goTo) — the only time we *don't* want the rail to
      // track current is after a rail-internal mutation, where _renderRail
      // has already restored the user's scroll position and yanking back to
      // current would undo it.
      this._syncRail(reason !== 'mutation');
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr,
            deckTotal: this._slides.length,
            deckSkipped: this._skippedIndices()
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay(source) {
      // Host posts __omelette_presenting while in fullscreen/tab
      // presentation mode. While presenting, the overlay is
      // pointer-summoned only: it appears on mouse movement and while the
      // user hovers/focuses the controls (source 'pointer'), but never
      // flashes on slide changes or nav-key presses (the default 'auto'
      // source) — a keyboard-driven advance must not blink chrome at the
      // audience. Outside presenting, both sources flash as before.
      if (!this._overlay) return;
      if (this._presenting && source !== 'pointer') return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        // Pinned by hover or focus on the controls — keep them up. The
        // matching mouseleave/focusout re-flashes, so the idle fade
        // resumes from that moment.
        if (this._overlayHover || this._overlayFocus) return;
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _railWidth() {
      // State-based, no offsetWidth: the first _fit() can run before the
      // rail has had layout on some load paths, and a 0 there paints the
      // slide full-width for one frame before the post-slotchange _fit()
      // corrects it.
      if (!this._railEnabled || !this._railVisible || this.hasAttribute('no-rail') || this.hasAttribute('noscale') || this._presenting || this._previewMode || NARROW_MQ.matches) return 0;
      return this._railPx || 0;
    }
    _fit() {
      if (!this._canvas) return;
      const stage = this._canvas.parentElement;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        if (stage) stage.style.left = '0';
        if (this._overlay) this._overlay.style.marginLeft = '0';
        return;
      }
      const rw = this._railWidth();
      if (stage) stage.style.left = rw + 'px';
      // Overlay is centred on the viewport via left:50% + translate(-50%);
      // marginLeft shifts the centre by rw/2 so it lands in the middle of
      // the [rw, innerWidth] stage region.
      if (this._overlay) this._overlay.style.marginLeft = rw / 2 + 'px';
      const vw = window.innerWidth - rw;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
      // Crossing the narrow-viewport breakpoint reveals the rail — rerun the
      // thumbnail scale the same way _setRailWidth does.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle. 'pointer'
      // source: mouse movement summons the controls even while presenting.
      this._flashOverlay('pointer');
    }
    _onMessage(e) {
      const d = e.data;
      if (d && typeof d.__omelette_presenting === 'boolean') {
        // Unchanged value → idempotent re-delivery (the guest bundle
        // re-posts when a deck mounts mid-presentation, and host + bundle
        // can both deliver at entry). Skip the resets: re-running the
        // entry work on every delivery would dismiss the pointer-summoned
        // overlay under a hovering cursor and close menus on every slide
        // change. Mirrors the preview_mode branch's unchanged-value guard
        // below.
        if (d.__omelette_presenting !== !!this._presenting) {
          this._presenting = d.__omelette_presenting;
          // A presenting transition invalidates interaction pins: carried
          // across the flip, a stale pin would hold the first summoned
          // overlay open with no pointer anywhere near it. Hide on BOTH
          // transitions: entry cleans the audience's screen, and on exit a
          // pin-skipped hide timeout may have left data-visible set with
          // no timer armed — without this, the footer would linger in the
          // editor until the next mousemove. The next interaction
          // re-summons it either way.
          this._overlayHover = false;
          this._overlayFocus = false;
          if (this._overlay) {
            this._overlay.removeAttribute('data-visible');
            if (this._hideTimer) clearTimeout(this._hideTimer);
          }
          this._syncRailHidden();
          this._closeMenu();
          this._closeConfirm();
          this._fit();
          this._scaleThumbs();
        }
      }
      // Host's Preview segment (ViewerMode='none'): the rail's drag-reorder /
      // right-click skip-delete affordances are editing chrome, so hide it
      // while the user is just looking at the deck. Same hard-hide path as
      // presenting; independent of the user's _railVisible preference so
      // returning to Edit restores whatever they had.
      if (d && typeof d.__omelette_preview_mode === 'boolean') {
        if (d.__omelette_preview_mode === this._previewMode) return;
        this._previewMode = d.__omelette_preview_mode;
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Host has processed a dc-op; rail input is safe again. Not tied to
      // slotchange — setAttr and refusal don't fire one. On refusal,
      // revert the optimistic _index/hash adjustment so the next nav
      // starts from what's actually on screen.
      if (d && d.__dc_op_ack) {
        this._railLock = false;
        if (d.applied === false && this._indexBeforeEmit != null) {
          this._index = this._indexBeforeEmit;
          try {
            history.replaceState(null, '', '#' + (this._index + 1));
          } catch (e) {}
        }
        this._indexBeforeEmit = null;
        // A refused op never re-renders, so slotchange won't restore the
        // keyboard flow's focus — do it here. (Applied ops refocus in
        // _onSlotChange, after the rail has been rebuilt.)
        if (d.applied === false && this._pendingRailRefocus) {
          this._focusCurrentThumb(true);
        }
      }
      // Per-viewer show/hide, driven by the TweaksPanel's auto-injected
      // "Thumbnail rail" toggle (or any author script). Independent of
      // whether the Tweaks panel itself is open — closing the panel
      // doesn't change rail visibility. Persists alongside rail width.
      if (d && d.type === '__deck_rail_visible' && typeof d.on === 'boolean') {
        if (d.on === this._railVisible) return;
        this._railVisible = d.on;
        try {
          localStorage.setItem('deck-stage.railVisible', d.on ? '1' : '0');
        } catch (e) {}
        // Arm the transition, commit it, then flip state — otherwise the
        // browser coalesces both writes and nothing animates on show.
        this.setAttribute('data-rail-anim', '');
        void (this._rail && this._rail.offsetHeight);
        this._syncRailHidden();
        this._fit();
        this._scaleThumbs();
        clearTimeout(this._railAnimTimer);
        this._railAnimTimer = setTimeout(() => this.removeAttribute('data-rail-anim'), 220);
      }
      if (d && d.type === '__omelette_rail_enabled') this._enableRail();
    }
    _syncRailHidden() {
      if (!this._rail) return;
      // data-presenting is the hard hide (display:none) for flag-off,
      // presentation mode, and the host's Preview segment — instant, no
      // transition. data-user-hidden is the soft hide (translateX(-100%))
      // for the viewer's rail toggle, so show/hide slides under
      // :host([data-rail-anim]).
      const hard = !this._railEnabled || this._presenting || this._previewMode;
      if (hard) this._rail.setAttribute('data-presenting', '');else this._rail.removeAttribute('data-presenting');
      if (!this._railVisible) this._rail.setAttribute('data-user-hidden', '');else this._rail.removeAttribute('data-user-hidden');
      // translateX hide leaves thumbs (tabIndex=0) in the tab order —
      // inert keeps them unfocusable while the rail is off-screen.
      this._rail.inert = hard || !this._railVisible;
    }
    _onTap(e) {
      // Touch-only — keyboard + the overlay toolbar cover nav on desktop.
      if (FINE_POINTER_MQ.matches) return;
      // Only taps that land on the stage (slide content or letterbox); the
      // overlay / rail / menus are siblings with their own click handlers.
      const path = e.composedPath();
      if (!this._stage || !path.includes(this._stage)) return;
      // Let interactive slide content keep the tap. composedPath (not
      // e.target.closest) so we see through open shadow roots — a <button>
      // inside a slide-authored custom element retargets e.target to the
      // host but still appears in the composed path.
      if (e.defaultPrevented) return;
      for (const n of path) {
        if (n === this._stage) break;
        if (n.matches && n.matches(INTERACTIVE_SEL)) return;
      }
      e.preventDefault();
      const rw = this._railWidth();
      const mid = rw + (window.innerWidth - rw) / 2;
      this._advance(e.clientX < mid ? -1 : 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing. composedPath()[0], not e.target: a
      // window-level keydown retargets e.target to the shadow host, which
      // would miss an <input> or contenteditable inside a web component on
      // a slide (same reason _onTap uses composedPath).
      const t = e.composedPath ? e.composedPath()[0] : e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      // Confirm dialog swallows nav keys while open; Escape cancels. Enter
      // is left to the focused button's native activation so Tab→Cancel
      // →Enter activates Cancel, not the window-level confirm path.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        if (e.key === 'Escape') {
          this._closeConfirm();
          this._focusCurrentThumb();
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'Escape' && this._menu && this._menu.hasAttribute('data-open')) {
        this._closeMenu();
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape' && this._selected.size) {
        // Collapse the multi-selection back to the current slide (the
        // implicit selection), not to nothing.
        this._clearSelection();
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._advance(1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._advance(-1, 'keyboard');
      } else if (key === 'ArrowDown' && !e.defaultPrevented) {
        // ↓/↑ page slides like →/← (Keynote/PowerPoint parity). Window
        // level only: rail thumbs keep their own ↑/↓ walk (their handler
        // stops propagation before this one), and the typing guard above
        // already covers inputs and contenteditable slide content.
        // Deliberate tradeoff: like Space/PageDown before them, these are
        // scroll keys — slide content that wants keyboard scrolling claims
        // them with preventDefault, which this branch honors (checked here
        // and not for the long-standing keys above, so ←/→/Space behavior
        // is unchanged and ↑/↓ behave identically on frozen copies, whose
        // translator in the guest bundle applies the same guard).
        this._advance(1, 'keyboard');
      } else if (key === 'ArrowUp' && !e.defaultPrevented) {
        this._advance(-1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      // User-initiated navigation collapses a multi-selection down to
      // the (implicit) current slide, like Keynote's arrow keys. 'click'
      // handles its own selection; programmatic reasons leave it alone.
      if (reason === 'keyboard' || reason === 'tap') this._clearSelection();
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    /** Step forward/back skipping any slide marked data-deck-skip. Falls
     *  back to _go's clamp-at-ends behaviour (flash overlay) when there's
     *  nothing further in that direction. */
    _advance(dir, reason) {
      if (!this._slides.length) return;
      let i = this._index + dir;
      while (i >= 0 && i < this._slides.length && this._slides[i].hasAttribute('data-deck-skip')) {
        i += dir;
      }
      if (i < 0 || i >= this._slides.length) {
        this._flashOverlay();
        return;
      }
      this._go(i, reason);
    }

    // ── Thumbnail rail ────────────────────────────────────────────────────
    //
    // Thumbs are keyed by slide element and reused across _renderRail()
    // calls, so a reorder/delete is an O(changed) DOM shuffle instead of an
    // O(N) teardown-and-re-clone. Each thumb starts as a lightweight shell
    // (num + empty frame); the clone is materialized lazily by an
    // IntersectionObserver when the frame scrolls into (or near) view, so
    // only visible-ish slides pay the clone + image-decode cost.

    _renderRail() {
      if (!this._rail || !this._railEnabled) {
        this._thumbs = [];
        return;
      }
      // FLIP: record each *materialized* thumb's top before the reconcile.
      // Off-screen (non-materialized) thumbs don't need the animation and
      // skipping their getBoundingClientRect saves a forced layout per
      // off-screen thumb on large decks.
      const prevTops = new Map();
      (this._thumbs || []).forEach(({
        thumb,
        slide,
        host
      }) => {
        if (host) prevTops.set(slide, thumb.getBoundingClientRect().top);
      });
      const st = this._rail.scrollTop;

      // Reconcile: reuse thumbs that already exist for a slide, create
      // shells for new slides, drop thumbs for removed slides.
      const bySlide = new Map();
      (this._thumbs || []).forEach(t => bySlide.set(t.slide, t));
      const next = [];
      this._slides.forEach(slide => {
        let t = bySlide.get(slide);
        if (t) bySlide.delete(slide);else t = this._makeThumb(slide);
        next.push(t);
      });
      // Orphans — slides removed since last render.
      bySlide.forEach(t => {
        if (this._railObserver) this._railObserver.unobserve(t.frame);
        t.thumb.remove();
      });
      // Put thumbs into document order to match _slides. insertBefore on
      // an already-correctly-placed node is a no-op, so this is cheap
      // when nothing moved.
      next.forEach((t, i) => {
        const want = t.thumb;
        const at = this._rail.children[i];
        if (at !== want) this._rail.insertBefore(want, at || null);
        t.i = i;
        if (t.slide.hasAttribute('data-deck-skip')) t.thumb.setAttribute('data-skip', '');else t.thumb.removeAttribute('data-skip');
        if (this._selected.has(t.slide)) t.thumb.setAttribute('data-selected', '');else t.thumb.removeAttribute('data-selected');
      });
      this._thumbs = next;
      this._renumberRail();
      this._rail.scrollTop = st;
      if (prevTops.size) {
        const moved = [];
        this._thumbs.forEach(({
          thumb,
          slide
        }) => {
          // The live-dragged thumb is positioned by the drag tracker; a
          // FLIP transform+transition here would clobber it mid-drag.
          if (thumb === this._dragThumb) return;
          const old = prevTops.get(slide);
          if (old == null) return;
          const dy = old - thumb.getBoundingClientRect().top;
          if (Math.abs(dy) < 1) return;
          thumb.style.transition = 'none';
          thumb.style.transform = `translateY(${dy}px)`;
          moved.push(thumb);
        });
        if (moved.length) {
          // Commit the inverted positions before flipping the transition
          // on — otherwise the browser coalesces both style writes and
          // nothing animates.
          void this._rail.offsetHeight;
          moved.forEach(t => {
            t.style.transition = 'transform 180ms cubic-bezier(.2,.7,.3,1)';
            t.style.transform = '';
          });
          setTimeout(() => moved.forEach(t => {
            t.style.transition = '';
          }), 220);
        }
      }
      requestAnimationFrame(() => this._scaleThumbs());
      this._syncRail(false);
    }

    /** Create a lightweight thumb shell for one slide. The clone is
     *  materialized later by the IntersectionObserver. Event handlers
     *  look up the thumb's *current* index (via _thumbs.indexOf) so the
     *  same element can be reused across reorders. */
    _makeThumb(slide) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.tabIndex = 0;
      const num = document.createElement('div');
      num.className = 'num';
      const frame = document.createElement('div');
      frame.className = 'frame';
      thumb.append(num, frame);
      const entry = {
        thumb,
        num,
        frame,
        slide,
        clone: null,
        host: null,
        i: -1
      };
      // entry.i is refreshed on every _renderRail reconcile pass, so
      // handlers read the thumb's current position without an O(N) scan.
      const idx = () => entry.i;
      thumb.addEventListener('click', e => {
        const i = idx();
        const slide = this._slides[i];
        // WebKit doesn't focus a plain element on click — focus
        // explicitly so Delete/Backspace works right after selecting a
        // slide by mouse. preventScroll: _syncRail owns the rail's
        // scroll position.
        thumb.focus({
          preventScroll: true
        });
        if (e.shiftKey || e.metaKey || e.ctrlKey) {
          // Multi-select gestures adjust the selection without
          // navigating (Keynote/Figma convention).
          e.preventDefault();
          if (e.shiftKey) {
            // Range from the anchor (last plain/cmd-clicked slide;
            // falls back to the current slide) to here, replacing any
            // previous range.
            let a = this._selAnchor ? this._slides.indexOf(this._selAnchor) : -1;
            if (a < 0) {
              a = this._index;
              this._selAnchor = this._slides[a] || null;
            }
            this._selected.clear();
            for (let j = Math.min(a, i); j <= Math.max(a, i); j++) {
              this._selected.add(this._slides[j]);
            }
          } else if (slide) {
            // Toggle. An empty explicit selection implicitly holds the
            // current slide — materialize it first so cmd-clicking a
            // second slide selects both.
            if (!this._selected.size && i !== this._index && this._slides[this._index]) {
              this._selected.add(this._slides[this._index]);
            }
            if (this._selected.has(slide)) this._selected.delete(slide);else {
              this._selected.add(slide);
              this._selAnchor = slide;
            }
          }
          this._syncSelection();
          return;
        }
        this._clearSelection();
        this._selAnchor = slide || null;
        this._go(i, 'click');
      });
      // ↑/↓ step through the rail when a thumb has focus. _go clamps at the
      // ends and _applyIndex→_syncRail scrolls the new current thumb into
      // view; we move focus to it (preventScroll — _syncRail already
      // scrolled) so a held key walks the whole list. stopPropagation keeps
      // this out of the window-level _onKey nav handler.
      thumb.addEventListener('keydown', e => {
        // Delete/Backspace with the rail focused deletes this thumb's
        // slide through the same confirm dialog as the menu item.
        // Listening on the thumb (never window-level) is what keeps
        // typing in the notes panel / slide inputs from ever landing
        // here; the target check is belt-and-braces for anything
        // focusable that ends up inside a thumb.
        if ((e.key === 'Delete' || e.key === 'Backspace') && !e.metaKey && !e.ctrlKey && !e.altKey) {
          const t = e.target;
          if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
          e.preventDefault();
          e.stopPropagation();
          // Same refusals as the menu item: never every slide, never
          // while a prior structural op is waiting on its ack. The
          // whole-deck refusal is announced (the menu greys its item
          // out; a silently dead key reads as breakage). The rail-lock
          // refusal stays silent: it lasts one ack round-trip and
          // matches the existing single-delete behavior.
          if (this._railLock) return;
          // Explicit selection wins; otherwise the focused thumb (which
          // plain click and ↑/↓ keep equal to the current slide).
          const sel = this._selected.size ? this._selectionIndices() : [idx()];
          if (sel.length >= this._slides.length) {
            this._showNotice(sel.length === 1 ? 'The last slide can’t be deleted.' : 'At least one slide has to stay — the whole deck can’t be deleted.');
            return;
          }
          this._openConfirm(sel);
          return;
        }
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();
        this._go(idx() + (e.key === 'ArrowDown' ? 1 : -1), 'keyboard');
        const cur = this._thumbs && this._thumbs[this._index];
        if (cur) cur.thumb.focus({
          preventScroll: true
        });
      });
      thumb.addEventListener('contextmenu', e => {
        e.preventDefault();
        this._openMenu(idx(), e.clientX, e.clientY);
      });
      thumb.draggable = true;
      thumb.addEventListener('dragstart', e => {
        // v1: dragging moves ONE slide, so a multi-selection would lie
        // about what's about to move — collapse it. (Group drag would
        // instead keep it and emit a batched move.)
        this._clearSelection();
        this._dragFrom = idx();
        // Deferred to the next frame: the [data-dragging] rule sets
        // pointer-events:none on the drag SOURCE, and applying that
        // synchronously inside dragstart makes Chromium (and WebKit) cancel
        // the drag — dragstart then an immediate dragend, no dragover or
        // drop, so thumbnails could not be reordered by dragging at all.
        // One frame is invisible and lands before the first dragover needs
        // the source to be hit-test-transparent. Guarded twice so the
        // attribute can never strand on a thumb that is no longer being
        // dragged (pointer-events:none would leave it unclickable for the
        // session): the pending frame is cancelled in dragend
        // (_cancelDragAttr), and the callback itself re-checks that THIS
        // thumb is still the live drag source (a new drag on another thumb
        // re-points the drag state). Deliberately NOT cancelled in
        // _stopDragTrack — _startDragTrack calls it at the start of every
        // drag, which would kill the mark this dragstart just scheduled
        // (see _cancelDragAttr).
        this._dragAttrRaf = requestAnimationFrame(() => {
          this._dragAttrRaf = null;
          if (this._dragFrom != null && this._dragThumb === thumb) {
            thumb.setAttribute('data-dragging', '');
          }
        });
        e.dataTransfer.effectAllowed = 'move';
        try {
          e.dataTransfer.setData('text/plain', String(this._dragFrom));
        } catch (err) {}
        // Constrain the drag visual to the rail's vertical axis. The
        // browser's default drag image is a free-floating snapshot that
        // follows the OS cursor in BOTH axes and the DnD API offers no way
        // to constrain it — so swap it for a transparent stand-in and move
        // the thumb itself along Y instead (_startDragTrack). The drop
        // logic below always read only clientY; this makes the visual
        // match it.
        try {
          e.dataTransfer.setDragImage(this._dragBlank(), 0, 0);
        } catch (err) {}
        this._startDragTrack(thumb, e.clientY);
      });
      thumb.addEventListener('dragend', () => {
        this._cancelDragAttr();
        thumb.removeAttribute('data-dragging');
        this._stopDragTrack();
        this._clearDrop();
        this._dragFrom = null;
      });
      thumb.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const r = thumb.getBoundingClientRect();
        this._setDrop(idx(), e.clientY < r.top + r.height / 2 ? 'before' : 'after');
      });
      thumb.addEventListener('drop', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        const i = idx();
        const r = thumb.getBoundingClientRect();
        let to = e.clientY >= r.top + r.height / 2 ? i + 1 : i;
        if (this._dragFrom < to) to--;
        const from = this._dragFrom;
        this._clearDrop();
        this._dragFrom = null;
        if (to !== from) this._moveSlide(from, to);
      });
      if (this._railObserver) this._railObserver.observe(frame);
      frame.__deckThumb = entry;
      return entry;
    }

    /** Lazily build the clone for a thumb that has scrolled into view. */
    _materialize(entry) {
      if (entry.host) return;
      const dw = this.designWidth,
        dh = this.designHeight;
      let clone = entry.slide.cloneNode(true);
      // The clone participates in the document's flat tree, so the
      // templates' position-based CSS page counters (.slide
      // { counter-increment: page }) would count every materialized
      // thumb before the real slides — folios print offset by the
      // thumb count (slide 2 reading "7" on a five-slide deck).
      // Neutralize the counter on the clone and drop its folio pill:
      // a thumbnail's own page number is unreadable at thumb scale
      // anyway, and the real slides' numbers stay truthful.
      clone.style.counterIncrement = 'none';
      clone.querySelectorAll('.page-foot').forEach(pf => pf.remove());
      // Canvas bitmaps don't clone — swap each cloned canvas for an <img>
      // of the live pixels. Best-effort: tainted canvases throw (left
      // as-is); zero-size are skipped; WebGL without preserveDrawingBuffer
      // reads back blank and the thumb gets a blank img (same as before).
      const liveCanvases = entry.slide.querySelectorAll('canvas');
      const cloneCanvases = clone.querySelectorAll('canvas');
      cloneCanvases.forEach((cv, i) => {
        const live = liveCanvases[i];
        if (!live || !live.width || !live.height) return;
        try {
          const img = document.createElement('img');
          img.src = live.toDataURL();
          img.alt = '';
          img.style.cssText = cv.style.cssText;
          img.className = cv.className;
          img.width = live.width;
          img.height = live.height;
          // Author CSS that sized the <canvas> via tag selector won't match
          // the <img> — pin the live canvas's laid-out box on the snapshot.
          if (live.clientWidth) {
            img.style.width = live.clientWidth + 'px';
            img.style.height = live.clientHeight + 'px';
          }
          cv.replaceWith(img);
        } catch (e) {}
      });
      // Neuter heavy media; replace <video> with its poster so the box
      // keeps a visual. <iframe>/<audio> become empty placeholders.
      // Parity with _inertify: transient top-layer UI never belongs in a
      // static thumb.
      clone.querySelectorAll('[popover], dialog').forEach(el => el.remove());
      clone.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      clone.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      // Images: defer decode and let the browser pick the smallest
      // srcset candidate for the ~140px thumb. Same-URL clones reuse the
      // slide's decoded bitmap (URL-keyed cache), so the remaining cost
      // is paint/composite — lazy+async keeps that off the main thread.
      clone.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Custom elements inside the slide would have their
      // connectedCallback fire when the clone is appended. Replace them
      // with inert boxes (_neuter) so a component-heavy deck doesn't run
      // N copies of each component's mount logic in the rail. Children
      // are preserved so layout-wrapper elements (<my-column><h2>…</h2>)
      // still show their authored content, and a shadow tree cloned along
      // via attachShadow({clonable:true}) (e.g. <image-slot>) moves onto
      // the box so the thumb shows the component's rendered content. The
      // querySelectorAll NodeList is static, so nested custom elements in
      // the moved subtree are still visited on later iterations.
      // querySelectorAll('*') returns descendants only — a custom-element
      // slide root (<my-slide>…</my-slide>) would slip through and upgrade
      // on append. Swap the root first.
      if (clone.tagName.includes('-')) clone = this._neuter(clone);
      clone.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(this._neuter(el));
      });
      // Strip ids only now: a defined custom element upgrades synchronously
      // during cloneNode and re-renders on attribute callbacks, so removing
      // 'id' any earlier resets components (e.g. <image-slot> falls back to
      // its author src). Post-neuter, only inert boxes and plain elements
      // remain, where the strip is just the usual duplicate-id hygiene.
      clone.removeAttribute('id');
      clone.removeAttribute('data-deck-active');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      clone.style.cssText += ';position:absolute;top:0;left:0;transform-origin:0 0;' + 'pointer-events:none;width:' + dw + 'px;height:' + dh + 'px;' + 'box-sizing:border-box;overflow:hidden;visibility:visible;opacity:1;';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      // Clones are display-only: inert removes anything focusable inside
      // them from the tab order, so the rail's Delete/Backspace handler
      // can never see a (retargeted) key press from cloned content.
      host.inert = true;
      this._syncThumbHostAttrs(host);
      const sr = host.attachShadow({
        mode: 'open'
      });
      if (this._adoptedSheet) sr.adoptedStyleSheets = [this._adoptedSheet];else {
        const st = document.createElement('style');
        st.textContent = this._authorCss || '';
        sr.appendChild(st);
      }
      sr.appendChild(clone);
      entry.frame.appendChild(host);
      entry.host = host;
      entry.clone = clone;
      if (this._thumbScale) clone.style.transform = 'scale(' + this._thumbScale + ')';
      // Once materialized the IO callback is a no-op early-return —
      // unobserve so scroll doesn't keep firing it.
      if (this._railObserver) this._railObserver.unobserve(entry.frame);
    }

    /** Replace a cloned custom element with an inert box (see the comment
     *  in _materialize). A shadow tree cloned along via {clonable:true}
     *  moves onto the box, so the thumb shows the component's real content
     *  with zero component logic; :host rules in the moved <style> match
     *  the box, and the preserved data-* attrs keep :host([data-…])
     *  selectors working. */
    _neuter(el) {
      // Adopt the shadow only when the cloned root carries renderable
      // content. A constructor-attach / connectedCallback-render component
      // clones into an empty (or style-only) slotless root — adopting that
      // would hide the light children the box is about to receive and drop
      // the placeholder chrome. Such components fall back to the plain box.
      let sr = el.shadowRoot;
      if (sr) {
        let renderable = false;
        for (let n = sr.firstElementChild; n; n = n.nextElementSibling) {
          const t = n.tagName;
          if (t !== 'STYLE' && t !== 'LINK') {
            renderable = true;
            break;
          }
        }
        if (!renderable) sr = null;
      }
      const box = document.createElement('div');
      box.style.cssText = (el.getAttribute('style') || '') + (sr ? '' : ';background:rgba(0,0,0,0.06);border:1px dashed rgba(0,0,0,0.15);');
      box.className = el.className;
      // Preserve theming/i18n hooks so [data-*] / :lang() / [dir]
      // descendant selectors still match the neutered root — but not
      // pointer-interaction transients (a mid-reframe/mid-drag re-clone
      // would render the interaction chrome statically in the thumb).
      for (const a of el.attributes) {
        const n = a.name;
        if (n === 'data-reframe' || n === 'data-panning' || n === 'data-over') continue;
        if (n.startsWith('data-') || n.startsWith('aria-') || n === 'lang' || n === 'dir' || n === 'role' || n === 'title') {
          box.setAttribute(n, a.value);
        }
      }
      while (el.firstChild) box.appendChild(el.firstChild);
      if (sr) this._adoptShadow(box, sr);
      return box;
    }

    /** Move a cloned shadow tree onto a neutered thumbnail box: attach an
     *  open root on the box, carry adoptedStyleSheets, move the children,
     *  then make the content inert. */
    _adoptShadow(box, sr) {
      let root;
      try {
        root = box.attachShadow({
          mode: 'open'
        });
      } catch (e) {
        return;
      }
      // Engine-cloned shadow roots never carry adoptedStyleSheets, but a
      // defined component's clone is upgrade-rebuilt (constructor runs
      // during cloneNode), so sheets it adopts there are present and
      // shared by reference — carry them.
      if (sr.adoptedStyleSheets && sr.adoptedStyleSheets.length) {
        try {
          root.adoptedStyleSheets = Array.prototype.slice.call(sr.adoptedStyleSheets);
        } catch (e) {}
      }
      // Clone rather than move: moving preserves listeners an upgraded
      // clone's constructor attached inside its shadow; cloning sheds
      // them, keeping thumbs free of component logic categorically.
      for (let n = sr.firstChild; n; n = n.nextSibling) {
        root.appendChild(n.cloneNode(true));
      }
      this._inertify(root);
    }

    /** Strip anything executable from copied shadow content and apply the
     *  same custom-element/media/img policy as the light-DOM clone.
     *  (Canvases inside copied shadow content stay blank — there is no
     *  live↔clone pairing across shadow boundaries to snapshot from.) */
    _inertify(root) {
      root.querySelectorAll('script').forEach(s => s.remove());
      // Transient top-layer UI can never belong in a static thumb. (A
      // cloned [popover] is display:none anyway — open state doesn't
      // clone — this just makes it categorical.)
      root.querySelectorAll('[popover], dialog').forEach(el => el.remove());
      // Same heavy-media policy as the light-DOM clone above.
      root.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      root.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      root.querySelectorAll('*').forEach(el => {
        for (let i = el.attributes.length - 1; i >= 0; i--) {
          if (/^on/i.test(el.attributes[i].name)) {
            el.removeAttribute(el.attributes[i].name);
          }
        }
      });
      root.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Nested custom elements inside copied shadow content would upgrade
      // on append — same treatment as the light DOM. querySelectorAll is
      // static, so boxes created mid-walk don't re-enter this loop.
      root.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(this._neuter(el));
      });
    }

    /** Re-clone a single thumb (live-update path). No-op if the thumb
     *  hasn't been materialized yet — it'll pick up current content when
     *  it scrolls into view. */
    _refreshThumb(slide) {
      const entry = (this._thumbs || []).find(t => t.slide === slide);
      if (!entry || !entry.host) return;
      entry.host.remove();
      entry.host = entry.clone = null;
      this._materialize(entry);
    }
    _scaleThumbs() {
      if (!this._thumbs || !this._thumbs.length) return;
      // Every frame is the same width; if it reads 0 the rail is
      // display:none (noscale / no-rail / presenting / print) — leave the
      // clones as-is and re-run when the rail is revealed.
      const fw = this._thumbs[0].frame.offsetWidth;
      if (!fw) return;
      this._thumbScale = fw / this.designWidth;
      this._thumbs.forEach(({
        clone
      }) => {
        if (clone) clone.style.transform = 'scale(' + this._thumbScale + ')';
      });
    }
    _setDrop(i, where) {
      // dragover fires at pointer-event rate; touch only the previous
      // and new target rather than sweeping all N thumbs.
      const t = this._thumbs && this._thumbs[i];
      if (this._dropOn && this._dropOn !== t) {
        this._dropOn.thumb.removeAttribute('data-drop');
      }
      if (t) t.thumb.setAttribute('data-drop', where);
      this._dropOn = t || null;
    }
    _clearDrop() {
      if (this._dropOn) this._dropOn.thumb.removeAttribute('data-drop');
      this._dropOn = null;
    }

    /** 1×1 transparent stand-in for setDragImage. Kept attached (offscreen
     *  in the shadow root) because some engines ignore a drag image that
     *  isn't in a rendered tree. Created lazily, reused for every drag. */
    _dragBlank() {
      if (!this._dragBlankEl) {
        const c = document.createElement('canvas');
        c.width = 1;
        c.height = 1;
        c.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;';
        this._root.appendChild(c);
        this._dragBlankEl = c;
      }
      return this._dragBlankEl;
    }

    /** Vertical-only drag tracking: translate the dragged thumb along Y to
     *  follow the pointer, clamped to the rail, ignoring X entirely. A
     *  document-level capture listener is used because native dragover
     *  fires wherever the pointer is — so the thumb keeps tracking even
     *  while the pointer wanders over the stage — and it is removed the
     *  moment the drag ends. getBoundingClientRect already reflects the
     *  current transform, so the layout position is recovered by
     *  subtracting the translation applied so far (rail auto-scroll moves
     *  the layout position mid-drag; see the rail dragover handler). */
    _startDragTrack(thumb, startY) {
      // A lost dragend (the dragged thumb removed mid-drag by a remote
      // edit's re-render — browsers fire no dragend on a disconnected
      // source) would otherwise leave the previous listener installed
      // forever once this overwrite lands.
      this._stopDragTrack();
      this._dragThumb = thumb;
      // The FLIP reorder animation drives transform through a transition;
      // the live drag must not inherit one, or the thumb rubber-bands.
      // Killed BEFORE the grab-offset read: mid-FLIP the rect includes the
      // interpolated transform, which would bake a constant offset into
      // the whole drag.
      thumb.style.transition = 'none';
      this._dragGrab = startY - thumb.getBoundingClientRect().top;
      this._dragTy = 0;
      this._onDragTrack = e => {
        const t = this._dragThumb;
        if (!t) return;
        const rail = this._rail.getBoundingClientRect();
        const r = t.getBoundingClientRect();
        // A transformed ancestor (author wraps the deck in a CSS scale;
        // canvas-mode pan/zoom) scales viewport deltas: translateY(N)
        // moves the rect by s·N. Measure s from the thumb itself (rect is
        // scaled, offsetHeight is layout px) so the feedback loop stays
        // exact instead of oscillating at s ≥ 2. offsetHeight is 0 only
        // when unrendered — nothing to track then, treat as unscaled.
        const s = t.offsetHeight ? r.height / t.offsetHeight : 1;
        const layoutTop = r.top - s * this._dragTy;
        let want = e.clientY - this._dragGrab;
        want = Math.max(rail.top, Math.min(want, rail.bottom - r.height));
        this._dragTy = (want - layoutTop) / s;
        t.style.transform = 'translateY(' + this._dragTy + 'px)';
      };
      document.addEventListener('dragover', this._onDragTrack, true);
    }

    /** Cancel the thumb's deferred data-dragging mark if its frame has not
     *  fired yet — see the dragstart deferral. Called from dragend only:
     *  _stopDragTrack is the wrong home for it, because _startDragTrack
     *  defensively calls _stopDragTrack at the START of every drag (its
     *  lost-dragend reset), so a cancel there kills the mark the same
     *  dragstart just scheduled. The strand that matters — pointer-
     *  events:none left on a CONNECTED thumb that is no longer being
     *  dragged — is closed two ways: dragend cancels the pending frame
     *  here, and the frame callback re-checks that THIS thumb is still the
     *  live drag source (_dragFrom and _dragThumb, both cleared/re-pointed
     *  by dragend or by a new drag). The remaining lost-dragend case — the
     *  source slide removed mid-drag, so no dragend fires — ends with that
     *  thumb discarded by the rail reconcile (thumbs are keyed by slide
     *  element and a removed slide's thumb is not reused), so a mark landing
     *  on it is on a discarded node. The risk this defer adds over the old
     *  synchronous set is therefore the narrow rAF-after-dragend window,
     *  which the dragend cancel covers. */
    _cancelDragAttr() {
      if (this._dragAttrRaf != null) {
        cancelAnimationFrame(this._dragAttrRaf);
        this._dragAttrRaf = null;
      }
    }
    _stopDragTrack() {
      if (this._onDragTrack) {
        document.removeEventListener('dragover', this._onDragTrack, true);
        this._onDragTrack = null;
      }
      const t = this._dragThumb;
      if (t) {
        t.style.transform = '';
        t.style.transition = '';
      }
      this._dragThumb = null;
      this._dragTy = 0;
    }
    _syncRail(follow) {
      if (!this._thumbs) return;
      this._thumbs.forEach(({
        thumb
      }, i) => {
        if (i === this._index) {
          thumb.setAttribute('data-current', '');
          if (follow && typeof thumb.scrollIntoView === 'function') {
            thumb.scrollIntoView({
              block: 'nearest'
            });
          }
        } else {
          thumb.removeAttribute('data-current');
        }
      });
    }
    _openMenu(i, x, y) {
      if (!this._menu) return;
      this._menuIndex = i;
      const slide = this._slides[i];
      // Right-clicking a thumb OUTSIDE the selection collapses the
      // selection to that thumb (platform convention) — the menu then
      // always targets exactly what's highlighted.
      if (this._selected.size && slide && !this._selected.has(slide)) {
        this._selected.clear();
        this._selected.add(slide);
        this._selAnchor = slide;
        this._syncSelection();
      }
      const sel = this._selectionIndices();
      const bulk = sel.length > 1;
      this._menuIndices = bulk ? sel : [i];
      // Bulk mode offers only the one batched op that exists (delete);
      // the single-slide items address one index and stay hidden.
      this._menu.querySelectorAll('[data-act="skip"], [data-act="up"], [data-act="down"], [data-act="duplicate"], hr').forEach(el => {
        el.style.display = bulk ? 'none' : '';
      });
      const skip = slide && slide.hasAttribute('data-deck-skip');
      this._menu.querySelector('[data-act="skip"]').textContent = skip ? 'Unskip slide' : 'Skip slide';
      this._menu.querySelector('[data-act="up"]').disabled = i <= 0;
      this._menu.querySelector('[data-act="down"]').disabled = i >= this._slides.length - 1;
      const del = this._menu.querySelector('[data-act="delete"]');
      del.textContent = bulk ? 'Delete ' + sel.length + ' slides' : 'Delete slide';
      del.disabled = bulk ? sel.length >= this._slides.length : this._slides.length <= 1;
      // Place, then clamp to viewport after it's measurable.
      this._menu.style.left = x + 'px';
      this._menu.style.top = y + 'px';
      this._menu.setAttribute('data-open', '');
      const r = this._menu.getBoundingClientRect();
      const nx = Math.min(x, window.innerWidth - r.width - 4);
      const ny = Math.min(y, window.innerHeight - r.height - 4);
      this._menu.style.left = Math.max(4, nx) + 'px';
      this._menu.style.top = Math.max(4, ny) + 'px';
    }
    _closeMenu() {
      if (this._menu) this._menu.removeAttribute('data-open');
      this._menuIndex = -1;
      this._menuIndices = null;
    }
    _openConfirm(sel) {
      if (!this._confirm) return;
      const list = Array.isArray(sel) ? sel : [sel];
      // Hold the slide ELEMENTS: the deck can re-render while the dialog
      // is open (collaborator/agent edit), and a frozen index list would
      // then address the wrong slides — a same-count reorder even passes
      // the host's witness guard. Elements re-resolve at danger-click.
      this._confirmEls = list.map(i => this._slides[i]).filter(Boolean);
      // Title uses the rail's skip-aware label, so the confirm names the
      // number the user right-clicked (a raw index would disagree with the
      // rail whenever a skipped slide precedes the target).
      const lbl = list.length === 1 ? this._slideLabel(list[0]) : '';
      this._confirm.querySelector('.title').textContent = list.length === 1 ? lbl ? 'Delete slide ' + lbl + '?' : 'Delete skipped slide?' : 'Delete ' + list.length + ' slides?';
      this._confirm.querySelector('.msg').textContent = list.length === 1 ? 'This slide will be removed from the deck.' : 'These slides will be removed from the deck.';
      this._confirm.setAttribute('data-open', '');
      const btn = this._confirm.querySelector('.danger');
      if (btn && btn.focus) btn.focus();
    }
    _closeConfirm() {
      if (this._confirm) this._confirm.removeAttribute('data-open');
      this._confirmEls = null;
    }

    /** Return focus to the current slide's thumb so the keyboard flow
     *  (Delete → Enter → Delete …) survives the confirm dialog closing.
     *  Without 'force', skipped while a structural op is in flight
     *  (_railLock): _index is then an optimistic post-op value that
     *  doesn't address the pre-op thumb list — _pendingRailRefocus stays
     *  armed and the ack/slotchange paths call back with force once the
     *  rail reflects the op. Skipped (and disarmed) while the rail is
     *  inert (hidden / presenting). */
    _focusCurrentThumb(force) {
      if (!force && this._railLock) return;
      this._pendingRailRefocus = false;
      // Never yank focus from content the user reached meanwhile (e.g.
      // an input inside a slide during the ack round-trip) — only
      // reclaim it from the rail's own surfaces, or from nowhere.
      const ae = this._root && this._root.activeElement;
      const ours = !ae || this._rail && this._rail.contains(ae) || this._confirm && this._confirm.contains(ae) || this._menu && this._menu.contains(ae);
      const lightAe = document.activeElement;
      const lightOk = !lightAe || lightAe === document.body || lightAe === this;
      if (!ours || !lightOk) return;
      const cur = this._thumbs && this._thumbs[this._index];
      if (cur && this._rail && !this._rail.inert) cur.thumb.focus({
        preventScroll: true
      });
    }

    /** Selection as sorted slide indices. An empty explicit selection
     *  means the current slide (the rail's implicit selection). */
    _selectionIndices() {
      const out = [];
      this._slides.forEach((s, i) => {
        if (this._selected.has(s)) out.push(i);
      });
      if (!out.length && this._slides[this._index]) out.push(this._index);
      return out;
    }
    _clearSelection() {
      // Re-anchor before the early return: a plain click followed by
      // arrow/tap navigation leaves _selected empty but the anchor
      // pointing at the old slide, and a later shift-click would range
      // from there instead of the current slide.
      this._selAnchor = null;
      if (!this._selected.size) return;
      this._selected.clear();
      this._syncSelection();
    }
    _syncSelection() {
      (this._thumbs || []).forEach(t => {
        if (this._selected.has(t.slide)) t.thumb.setAttribute('data-selected', '');else t.thumb.removeAttribute('data-selected');
      });
    }

    /** Rail mutations. When a dc-runtime is present (`window.__dcUpdate`)
     *  the host owns the light DOM — handlers emit a dc-op only and the
     *  host applies it (to the editor's model or to the source file) and
     *  re-renders via dc-runtime; slotchange catches the rail up.
     *  Structural ops lock rail input until the host acks so a rapid second
     *  click can't address a stale index; setAttr/removeAttr respect the
     *  lock but don't set it (indices unchanged; the host serializes).
     *  `newIndex` is written to location.hash so slotchange's
     *  _restoreIndex lands on the right slide.
     *
     *  With NO dc-runtime (a raw .html deck), there's no re-render path,
     *  so handlers self-mutate locally for an instant update and emit
     *  `emitOnly: false`; the host persists to disk without
     *  re-rendering over the already-mutated DOM.
     *
     *  See docs/dc-ops.md for the contract. */
    /** True when the page's DC runtime reports a live template stream for
     *  any component here (newer support.js bundles only — older bundles
     *  lack the signal and the HOST-side gate covers those decks). Rail
     *  mutations are refused for the duration: a mid-stream op addresses
     *  slide indices the stream is rewriting underneath the click. */
    _streamActive() {
      try {
        return !!window.__dcUpdate && typeof window.__dcStreaming === 'function' && window.__dcStreaming();
      } catch (e) {
        return false;
      }
    }

    /** Transient in-stage notice for a refused mid-stream rail op. */
    _showStreamNotice() {
      this._showNotice('Claude is still updating this deck — try again when it finishes.');
    }

    /** Transient bottom-center toast for a refused rail gesture. */
    _showNotice(text) {
      if (!this._root) return;
      let n = this._streamNotice;
      if (!n) {
        n = document.createElement('div');
        n.className = 'export-hidden';
        n.setAttribute('data-omelette-chrome', '');
        n.setAttribute('role', 'status');
        n.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);' + 'background:rgba(22,22,22,.94);color:#fff;' + 'font:500 13px/1.4 system-ui,sans-serif;padding:8px 14px;' + 'border-radius:8px;z-index:2147483646;pointer-events:none;' + 'opacity:0;transition:opacity .15s ease';
        this._root.append(n);
        this._streamNotice = n;
      }
      n.textContent = text;
      n.style.opacity = '1';
      if (this._streamNoticeTimer) clearTimeout(this._streamNoticeTimer);
      this._streamNoticeTimer = setTimeout(() => {
        n.style.opacity = '0';
      }, 2600);
    }
    _emitDcOp(op, slide, lock, newIndex) {
      // Mid-stream guard: refuse the gesture outright — no lock, no
      // optimistic index change, no emit, no self-mutation (returning
      // true short-circuits every caller). The host applies the same
      // gate for decks whose committed support.js predates the signal.
      if (this._streamActive()) {
        this._showStreamNotice();
        return true;
      }
      // Slide index (template/script/style filtered — same as
      // _collectSlides). deck-stage is a filtered-index dc-op emitter;
      // the host resolves against findDeckStage().slideTids. Callers
      // already pass `to` as a slide index.
      op.at = this._slides.indexOf(slide);
      op.witness = {
        childCount: this._slides.length
      };
      // dc-runtime wraps an <x-import>-mounted component in a
      // <div class="sc-host-x" data-dc-tpl="N"> host — the stamp is on the
      // WRAPPER, not this element. closest() finds it (or this element's
      // own stamp when directly templated).
      const host = this.closest('[data-dc-tpl]');
      const tid = host && host.getAttribute('data-dc-tpl');
      op.mount = {
        tid: tid !== null ? parseInt(tid, 10) : null,
        tag: 'deck-stage'
      };
      op.emitOnly = !!window.__dcUpdate;
      if (op.emitOnly) {
        if (lock) this._railLock = true;
        if (newIndex != null && newIndex !== this._index) {
          this._indexBeforeEmit = this._index;
          this._index = newIndex;
          try {
            history.replaceState(null, '', '#' + (newIndex + 1));
          } catch (e) {}
        }
      }
      this.dispatchEvent(new CustomEvent('dc-op', {
        detail: op,
        bubbles: true,
        composed: true
      }));
      return op.emitOnly;
    }

    /** Delete a set of slides (pre-op indices). One slide delegates to
     *  _deleteSlide — the plain 'remove' op — so single deletes keep
     *  working against hosts that predate 'removeMany'. A bulk delete is
     *  ONE op: one host write, one undo snapshot, and indices that all
     *  address the same pre-op deck (N acked single ops would each need
     *  a fresh witness). */
    _deleteSlides(list) {
      if (this._railLock || !list) return;
      const indices = [...new Set(list)].filter(i => this._slides[i]).sort((a, b) => a - b);
      if (!indices.length || indices.length >= this._slides.length) return;
      if (indices.length === 1) {
        this._deleteSlide(indices[0]);
        return;
      }
      // Mirrors _duplicateSlide: check the stream gate before doing any
      // work (_emitDcOp re-checks).
      if (this._streamActive()) {
        this._showStreamNotice();
        return;
      }
      const els = indices.map(i => this._slides[i]);
      const del = new Set(indices);
      const cur = this._index;
      // New current index in post-op space: shift the kept slide left by
      // the deletions below it; if the current slide itself is deleted,
      // land on the nearest survivor (after, else before).
      const below = n => indices.reduce((k, x) => k + (x < n ? 1 : 0), 0);
      let ni;
      if (!del.has(cur)) {
        ni = cur - below(cur);
      } else {
        let s = -1;
        for (let j = cur + 1; j < this._slides.length; j++) {
          if (!del.has(j)) {
            s = j;
            break;
          }
        }
        if (s === -1) {
          for (let j = cur - 1; j >= 0; j--) {
            if (!del.has(j)) {
              s = j;
              break;
            }
          }
        }
        ni = s < 0 ? 0 : s - below(s);
      }
      // Emit-path deletes can't refocus until the host re-renders; arm
      // the flag at emit time (never on a refused/no-op path) so
      // ack/slotchange can finish the keyboard flow's focus hand-back.
      // The local path clears it via the caller's _focusCurrentThumb().
      this._pendingRailRefocus = true;
      if (this._emitDcOp({
        op: 'removeMany',
        indices
      }, els[0], true, ni)) return;
      this._index = ni;
      this._squelchSlotChange = true;
      els.forEach(el => el.remove());
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _deleteSlide(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide || this._slides.length <= 1) return;
      const cur = this._index;
      const ni = i < cur || i === cur && i === this._slides.length - 1 ? cur - 1 : cur;
      this._pendingRailRefocus = true;
      if (this._emitDcOp({
        op: 'remove'
      }, slide, true, ni)) return;
      this._index = ni;
      this._squelchSlotChange = true;
      slide.remove();
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _duplicateSlide(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide) return;
      // Mint ids + copy component state BEFORE emitting, so the op can
      // carry the id map — but never mint for an op the stream gate is
      // about to refuse (_emitDcOp re-checks; this avoids orphaned keys).
      if (this._streamActive()) {
        this._showStreamNotice();
        return;
      }
      const copy = slide.cloneNode(true);
      copy.removeAttribute('id');
      const ids = this._remintDuplicateIds(copy);
      const op = {
        op: 'duplicate'
      };
      if (ids) op.ids = ids;
      if (this._emitDcOp(op, slide, true, i + 1)) return;
      this._index = i + 1;
      this._squelchSlotChange = true;
      this.insertBefore(copy, slide.nextSibling);
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }

    /** Duplicate id policy. Plain ids are stripped — two live slides must
     *  not share one id. But a component that KEYS persistent state by id
     *  (image-slot's sidecar photo) would silently lose that state with
     *  its id. Such a component opts out of the strip by exposing a
     *  static cloneSlot(fromId, isFree) that copies its stored state
     *  under a fresh id of its choosing and returns that id. The old→new
     *  map is returned (or null) and rides the dc-op so the host writes
     *  the SAME ids into source — without that, the copy's state would
     *  revert on reload (docs/dc-ops.md). */
    _remintDuplicateIds(copy) {
      const ids = {};
      let found = false;
      const used = new Set();
      const idOk = /^[A-Za-z][\w-]{0,63}$/;
      const isFree = id => idOk.test(id) && !used.has(id) && !document.getElementById(id);
      copy.querySelectorAll('[id]').forEach(el => {
        const tag = el.tagName.toLowerCase();
        const cls = tag.indexOf('-') >= 0 && customElements.get(tag);
        let next = null;
        if (el.id && cls && typeof cls.cloneSlot === 'function') {
          try {
            next = cls.cloneSlot(el.id, isFree);
          } catch (e) {}
        }
        // Re-checked here so a misbehaving static can't smuggle a dupe
        // or an unsafe value into the document / the emitted op.
        if (typeof next === 'string' && isFree(next)) {
          ids[el.id] = next;
          used.add(next);
          el.id = next;
          found = true;
        } else {
          el.removeAttribute('id');
        }
      });
      return found ? ids : null;
    }
    _toggleSkip(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide) return;
      const on = !slide.hasAttribute('data-deck-skip');
      if (this._emitDcOp(on ? {
        op: 'setAttr',
        attr: 'data-deck-skip',
        value: ''
      } : {
        op: 'removeAttr',
        attr: 'data-deck-skip'
      }, slide, false)) return;
      if (on) slide.setAttribute('data-deck-skip', '');else slide.removeAttribute('data-deck-skip');
    }
    _skippedIndices() {
      const out = [];
      for (let i = 0; i < this._slides.length; i++) {
        if (this._slides[i].hasAttribute('data-deck-skip')) out.push(i);
      }
      return out;
    }

    /** Rail numbering, skip-aware: a skipped slide shows no number and the
     *  rest stay contiguous (1..visible), so the labels match the positions
     *  the overlay counter reports. Cheap (text writes are diffed), safe to
     *  call after any reconcile or skip toggle. */
    _renumberRail() {
      let v = 0;
      (this._thumbs || []).forEach(t => {
        const label = t.slide.hasAttribute('data-deck-skip') ? '' : String(++v);
        if (t.num.textContent !== label) t.num.textContent = label;
      });
    }

    /** Skip-aware label for slide i — the same numbering _renumberRail
     *  paints: '' for a skipped slide, else its 1-based position among
     *  non-skipped slides. Display surfaces (e.g. the delete confirm)
     *  use this so they never name a number the rail doesn't show. */
    _slideLabel(i) {
      const s = this._slides[i];
      if (!s || s.hasAttribute('data-deck-skip')) return '';
      let v = 0;
      for (let k = 0; k <= i; k++) {
        if (!this._slides[k].hasAttribute('data-deck-skip')) v++;
      }
      return String(v);
    }

    /** Overlay counter, skip-aware: position among non-skipped slides over
     *  the non-skipped total. A skipped CURRENT slide (reachable by rail
     *  click or deep link, never by _advance) shows '–' — its number is
     *  gone from the rail, so any digit here would lie. */
    _syncCount() {
      if (!this._countEl || !this._totalEl) return;
      // Empty deck: keep the overlay's initial "1 / 1" (it has nothing to
      // count and isn't visible without slides) — the guest fallback for
      // frozen copies leaves empty decks alone for the same rendering.
      if (!this._slides.length) {
        this._countEl.textContent = '1';
        this._totalEl.textContent = '1';
        return;
      }
      let pos = 0,
        total = 0;
      this._slides.forEach((s, i) => {
        if (!s.hasAttribute('data-deck-skip')) {
          total++;
          if (i <= this._index) pos = total;
        }
      });
      const cur = this._slides[this._index];
      const curSkipped = !cur || cur.hasAttribute('data-deck-skip');
      this._countEl.textContent = curSkipped ? '–' : String(pos);
      this._totalEl.textContent = String(total);
    }
    _moveSlide(i, j) {
      if (this._railLock || j < 0 || j >= this._slides.length || j === i) return;
      const cur = this._index;
      const ni = cur === i ? j : i < cur && j >= cur ? cur - 1 : i > cur && j <= cur ? cur + 1 : cur;
      const slide = this._slides[i];
      if (this._emitDcOp({
        op: 'move',
        to: j
      }, slide, true, ni)) return;
      const ref = j < i ? this._slides[j] : this._slides[j].nextSibling;
      this._index = ni;
      this._squelchSlotChange = true;
      this.insertBefore(slide, ref);
      this._collectSlides();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'mutation'
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._advance(1, 'api');
    }
    prev() {
      this._advance(-1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "deck-stage.js", error: String((e && e.message) || e) }); }

// ui_kits/casi-ultimo-elvis/SiteCasiUltimoElvis.jsx
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
const LOGO_MONO_WHITE = "../../assets/svblime-mono-blanco.png";
const LOGO_MONO_BLACK = "../../assets/svblime-mono.png";
const LOGO_NEG = "../../assets/svblime-negativo.png";

/* ============================ Loading screen (logo flash + intro) ============================ */
function LoadingScreen({
  onDone
}) {
  const frames = [{
    bg: "#FFFFFF",
    src: LOGO_MONO_BLACK
  },
  // fondo blanco · letras negras (sin color)
  {
    bg: "#4EA9FF",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · azul
  {
    bg: "#FFCD59",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · ámbar
  {
    bg: "#8F00FF",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · violeta
  {
    bg: "#000000",
    src: LOGO_NEG
  } // principal · negro + letras blancas con color
  ];
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState("flash"); // flash → out

  React.useEffect(() => {
    if (phase !== "flash") return;
    const last = frames.length - 1;
    const holds = i === last ? 420 : 130;
    const t = setTimeout(() => {
      if (i < last) setI(i + 1);else {
        setPhase("out");
        setTimeout(onDone, 700);
      }
    }, holds);
    return () => clearTimeout(t);
  }, [i, phase]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      overflow: "hidden",
      background: "#000",
      opacity: phase === "out" ? 0 : 1,
      pointerEvents: phase === "out" ? "none" : "auto",
      transition: "opacity 700ms var(--ease-standard)"
    }
  }, frames.map((f, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      position: "absolute",
      inset: 0,
      background: f.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: phase === "flash" && idx === i || phase !== "flash" && idx === frames.length - 1 ? 1 : 0,
      transition: "opacity 100ms var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: f.src,
    alt: "SVBLIME",
    style: {
      width: "min(46vw, 520px)",
      height: "auto"
    }
  }))));
}

/* ============================ Header ============================ */
function Header({
  onCta
}) {
  const links = [["SVBLIME", "#agencia"], ["Elige", "#pilares"], ["Line up", "#lineup"], ["Fotos", "#trabajo"], ["Equipo", "#equipo"]];
  const [open, setOpen] = useState(false);
  const [reveal, setReveal] = useState(1); // 0 while video scrubs, 1 once hero text is in
  React.useEffect(() => {
    const compute = () => {
      const el = document.getElementById("top");
      if (!el) {
        setReveal(1);
        return;
      }
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 1;
      setReveal(p >= 0.9 ? 1 : 0); // appears with "Bienvenidos", stays for the content
    };
    compute();
    window.addEventListener("scroll", compute, {
      passive: true
    });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);
  const bar = {
    display: "block",
    width: "34px",
    height: "6px",
    transition: "transform 500ms var(--ease-out), opacity 500ms var(--ease-standard)"
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px clamp(20px,5vw,56px)",
      background: "rgba(8,8,10,0.5)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-soft)",
      pointerEvents: "none",
      gap: "clamp(16px,2vw,28px)",
      opacity: reveal,
      transform: "translateY(" + -12 * (1 - reveal) + "px)",
      visibility: reveal < 0.02 ? "hidden" : "visible",
      transition: "opacity 500ms var(--ease-standard), transform 500ms var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-label": open ? "Cerrar menú" : "Abrir menú",
    "aria-expanded": open,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: 0,
      border: "none",
      flex: "none",
      background: "transparent",
      cursor: "pointer",
      pointerEvents: "auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-blue)",
      transform: open ? "translateY(10px) rotate(45deg)" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-amber)",
      opacity: open ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-violet)",
      transform: open ? "translateY(-10px) rotate(-45deg)" : "none"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(14px,2vw,26px)",
      marginRight: "auto",
      maxWidth: open ? "600px" : "0px",
      opacity: open ? 1 : 0,
      overflow: "hidden",
      pointerEvents: open ? "auto" : "none",
      transition: "max-width 900ms var(--ease-out), opacity 700ms var(--ease-standard)"
    }
  }, links.map(([label, href], i) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    onClick: () => setOpen(false),
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-body)",
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
      pointerEvents: "auto",
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-8px)",
      transition: "opacity 600ms var(--ease-standard) " + (open ? 180 + i * 110 + "ms" : "0ms") + ", transform 600ms var(--ease-out) " + (open ? 180 + i * 110 + "ms" : "0ms")
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
      pointerEvents: "auto",
      background: "transparent",
      color: "var(--svb-white)",
      border: "1px solid var(--border-strong)",
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

/* ============================ Hero (autoplay video → text → scroll) ============================ */
const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
function Hero() {
  const wrapRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [videoDone, setVideoDone] = React.useState(false);
  const [nearEnd, setNearEnd] = React.useState(0); // 0→1 over the last ~2.2s of the clip
  const [progress, setProgress] = React.useState(0);

  // Download the whole clip as a Blob URL for smooth playback, then autoplay it.
  React.useEffect(() => {
    let url;
    let cancelled = false;
    fetch("hero.mp4").then(r => r.blob()).then(b => {
      if (cancelled) return;
      url = URL.createObjectURL(b);
      const v = videoRef.current;
      if (v) {
        v.src = url;
        v.load();
        setReady(true);
        const p = v.play();
        if (p) p.catch(() => {});
      }
    }).catch(() => {
      setReady(true);
    });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  // Lock page scroll while the intro video plays; release when it ends.
  React.useEffect(() => {
    if (!videoDone) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [videoDone]);
  const onVideoEnd = () => {
    setNearEnd(1);
    setVideoDone(true);
  };
  const skip = () => {
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
      } catch (e) {}
    }
    setNearEnd(1);
    setVideoDone(true);
  };
  // Reveal the text over the final ~2.2s of the clip and fade the video toward black.
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const lead = 2.2;
    const t = Math.min(1, Math.max(0, (v.currentTime - (v.duration - lead)) / lead));
    setNearEnd(t);
  };

  // Once the video is done, scroll drives text1 → out and "Bienvenidos" → in.
  React.useEffect(() => {
    if (!videoDone) return;
    const compute = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      setProgress(p);
    };
    compute();
    window.addEventListener("scroll", compute, {
      passive: true
    });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [videoDone]);

  // text1 fades in over the end of the video, then fades out on scroll.
  const mainOut = 1 - smoothstep(0.32, 0.5, progress);
  const introReveal = smoothstep(0.15, 0.9, nearEnd); // during the clip's tail
  const mainVis = videoDone ? mainOut : introReveal;
  const welcomeVis = smoothstep(0.62, 0.82, progress);
  const eased = Math.max(mainVis, welcomeVis);
  const scrimOpacity = Math.max(0.42 * mainVis, 0.42 * welcomeVis);
  // Video fades toward black as it reaches the end and stays out afterward.
  const videoOpacity = ready ? 1 - smoothstep(0.55, 1, nearEnd) : 0;
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    ref: wrapRef,
    style: {
      position: "relative",
      height: videoDone ? "300vh" : "100vh",
      background: "var(--bg-stage)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      width: "100%",
      overflow: "hidden",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    muted: true,
    playsInline: true,
    preload: "auto",
    onEnded: onVideoEnd,
    onTimeUpdate: onTimeUpdate,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: videoOpacity,
      transition: "opacity 500ms var(--ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: ready ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-stage)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, "Cargando")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "#000",
      opacity: scrimOpacity,
      transition: "opacity 400ms linear",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 45%, transparent 80%)",
      opacity: eased,
      transition: "opacity 400ms linear",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "clamp(40px,7vw,110px) clamp(20px,5vw,56px) clamp(56px,9vw,120px)",
      pointerEvents: mainVis > 0.05 ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(42px,8vw,104px)",
      lineHeight: 0.98,
      letterSpacing: "-0.03em",
      margin: 0,
      maxWidth: "16ch",
      display: "flex",
      flexWrap: "wrap"
    }
  }, "Cerramos la distancia entre imaginarlo y vivirlo.".split(" ").map((w, i, arr) => {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        marginRight: "0.28em",
        opacity: mainVis,
        transform: "translateY(" + -80 * (1 - mainOut) + "px)",
        transition: "opacity 600ms var(--ease-standard) " + i * 80 + "ms, transform 120ms linear",
        display: "inline-block"
      }
    }, w);
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 clamp(20px,5vw,56px)",
      pointerEvents: "none",
      opacity: welcomeVis,
      transform: "translateY(" + 24 * (1 - welcomeVis) + "px)",
      transition: "opacity 120ms linear"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(56px,12vw,160px)",
      lineHeight: 0.92,
      letterSpacing: "-0.03em",
      margin: 0,
      textAlign: "center"
    }
  }, "Bienvenidos")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: "34px",
      transform: "translateX(-50%)",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      opacity: videoDone ? Math.max(0, 1 - progress * 8) : 0,
      transition: "opacity 500ms var(--ease-standard)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      pointerEvents: "none"
    }
  }, "Scroll", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: "1px",
      height: "34px",
      background: "linear-gradient(rgba(255,255,255,0.7), transparent)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: skip,
    style: {
      position: "absolute",
      right: "clamp(20px,5vw,56px)",
      bottom: "34px",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: "var(--radius-sm)",
      padding: "8px 14px",
      cursor: "pointer",
      opacity: videoDone ? 0 : 1,
      pointerEvents: videoDone ? "none" : "auto",
      transition: "opacity 400ms var(--ease-standard)"
    }
  }, "Saltar intro")));
}

/* ============================ Pilares ============================ */
function Pilares() {
  const pillars = [["", "gray", "Dirección Creativa", "Concepto, narrativa, dirección de arte y el sentido del proyecto. Donde una intención se vuelve visión ejecutable."], ["", "amber", "Experiencias Visuales", "Luz, pantallas, contenido, motion, programación, previsualización y operación en vivo."], ["", "violet", "Producción de Eventos", "Planificación, coordinación, gestión de proveedores y ejecución en terreno, todo bajo control."], ["", "blue", "Branding de Eventos", "Identidad, mensaje, sistema visual y puntos de contacto, coherentes antes, durante y después."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "pilares",
    style: {
      position: "relative",
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "48px",
      maxWidth: "60ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-amber)",
    style: {
      display: "none"
    }
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
      color: "var(--text-body)",
      maxWidth: "none",
      width: "max-content",
      whiteSpace: "nowrap"
    }
  }, "Cuatro formas de trabajar, una sola misi\xF3n: ", /*#__PURE__*/React.createElement("em", null, "hacer que tu idea cobre vida."), /*#__PURE__*/React.createElement("br", null), "Elige uno, comb\xEDnalos o d\xE9jalo todo en nuestras manos.")), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "16px"
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(PillarCard, {
    key: p[2],
    number: p[0],
    accent: p[1],
    title: p[2],
    description: p[3]
  })))), /*#__PURE__*/React.createElement(SpectrumBar, {
    thickness: 4,
    style: {
      position: "absolute",
      bottom: 0,
      left: 0
    }
  }));
}

/* ============================ Line Up (festival poster) ============================ */
const LINEUP_DAYS = [{
  day: "01",
  label: "Día 01 · Internacional",
  tint: "78,169,255",
  headliners: ["Yandel", "P.O.D.", "The Wailers"],
  main: ["Onyx", "Carin León", "Myriam Hernández", "Lara Project", "Nanpa Básico"],
  support: ["Ultra Festival", "Billboard", "Tecate Pa'l Norte", "Coca Cola Flow Fest"],
  brands: ["claro", "entel", "copec", "tvn"]
}, {
  day: "02",
  label: "Día 02 · Escena urbana",
  tint: "255,205,89",
  headliners: ["Polimá Westcoast", "Pailita", "Marcianeke"],
  main: ["Jere Klein", "Gino Mella", "Harry Nach", "Julianno Sosa", "Jordan 23", "Kidd Tetón", "La Combo Tortuga"],
  support: ["Pablito Pesadilla", "Bubaseta", "Zúmbale Primo", "Shamanes Crew", "King Savage", "Pablito Chillee"],
  brands: ["stellantis", "caja-los-andes", "lotus", "hilaria"]
}, {
  day: "03",
  label: "Día 03 · Nacional & festivales",
  tint: "143,0,255",
  headliners: ["ChysteMC", "Sol y Lluvia", "Floy Menor"],
  main: ["Ithan NY", "FaceBrooklyn", "Garras de Amor", "Alanis Lagos", "Akrilla", "Saturno"],
  support: ["Festival de Viña", "Lollapalooza", "Huaso de Olmué", "Premios Pulsar", "Crush Power Music", "Gran Rojo TVN"],
  brands: ["inacap", "ipchile", "st"]
}];
function LineUp() {
  const DOT = "rgba(255,255,255,0.55)";
  const sep = () => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: "6px",
      height: "6px",
      margin: "0 clamp(8px,1.3vw,16px)",
      transform: "translateY(-4px) rotate(45deg)",
      background: DOT
    }
  });
  const row = items => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      rowGap: "4px"
    }
  }, items.map((name, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: name + i
  }, i > 0 && sep(), /*#__PURE__*/React.createElement("span", null, name))));
  const dayDivider = (day, label, color) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      margin: "clamp(30px,4.5vw,56px) 0 clamp(18px,2.6vw,32px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: "1px",
      flex: "1 1 0",
      maxWidth: "clamp(40px,12vw,160px)",
      background: "linear-gradient(90deg, transparent, " + color + ")"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.4vw,13px)",
      letterSpacing: "0.26em",
      textTransform: "uppercase",
      color: "var(--text-body)",
      whiteSpace: "nowrap",
      display: "none"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: "1px",
      flex: "1 1 0",
      maxWidth: "clamp(40px,12vw,160px)",
      background: "linear-gradient(90deg, " + color + ", transparent)"
    }
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "lineup",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "radial-gradient(120% 80% at 50% -10%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(90% 90% at 8% 108%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(90% 90% at 92% 108%, rgba(255,205,89,0.06), transparent 55%), var(--bg-stage)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      maxWidth: "1000px",
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.4vw,13px)",
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      display: "none"
    }
  }, "SVBLIME presenta"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(40px,9vw,120px)",
      lineHeight: 0.86,
      letterSpacing: "-0.035em",
      color: "var(--svb-white)",
      margin: "clamp(14px,2vw,24px) 0 0"
    }
  }, "Portafolio"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: "clamp(12px,1.5vw,17px)",
      letterSpacing: "0.01em",
      color: "var(--text-body)",
      margin: "clamp(14px,2vw,22px) auto 0",
      maxWidth: "44ch"
    }
  }, "Marcas, corporaciones y artistas con los que hemos trabajado."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "14px",
      margin: "clamp(16px,2.4vw,28px) auto 0",
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-blue)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-amber)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-violet)"
    }
  })), LINEUP_DAYS.map(d => {
    const color = "rgb(" + d.tint + ")";
    return /*#__PURE__*/React.createElement("div", {
      key: d.day
    }, dayDivider(d.day, d.label.split("·")[1] ? d.label.split("·")[1].trim() : d.label, color), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "clamp(10px,1.5vw,18px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        color: "var(--svb-white)",
        fontSize: "clamp(19px,3.6vw,44px)",
        lineHeight: 1.0,
        letterSpacing: "-0.02em"
      }
    }, row(d.headliners)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        color: "var(--svb-white)",
        opacity: 0.92,
        fontSize: "clamp(13px,2.1vw,27px)",
        lineHeight: 1.08,
        letterSpacing: "-0.01em"
      }
    }, row(d.main)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        color: "var(--text-body)",
        fontSize: "clamp(11px,1.3vw,15px)",
        letterSpacing: "0.02em"
      }
    }, row(d.support))), d.brands && d.brands.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(24px,5vw,64px)",
        margin: "clamp(24px,3.5vw,44px) auto 0",
        maxWidth: "760px"
      }
    }, d.brands.map(b => /*#__PURE__*/React.createElement("img", {
      key: b,
      src: "brands/" + b + ".png",
      alt: b,
      loading: "lazy",
      decoding: "async",
      style: {
        height: "clamp(20px,2.6vw,32px)",
        width: "auto",
        objectFit: "contain",
        opacity: 0.85
      }
    }))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(40px,6vw,72px)",
      paddingTop: "clamp(28px,4vw,44px)",
      borderTop: "1px solid var(--border-default)",
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(28px,5vw,56px)",
      letterSpacing: "-0.02em",
      color: "var(--svb-white)"
    }
  }, "SVBLIME.CL"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.3vw,12px)",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      margin: "16px auto 0",
      maxWidth: "60ch",
      lineHeight: 1.7
    }
  }, "Trayectoria acumulada de los socios \xB7 participaci\xF3n por proyecto (visuales \xB7 iluminaci\xF3n \xB7 producci\xF3n \xB7 contenido)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(48px,7vw,88px)",
      overflow: "hidden",
      position: "relative",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "max-content",
      animation: "svbMarquee 34s linear infinite"
    }
  }, [0, 1].map(rep => /*#__PURE__*/React.createElement("div", {
    key: rep,
    "aria-hidden": rep === 1,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(40px,6vw,88px)",
      padding: "0 clamp(20px,3vw,44px)"
    }
  }, ["claro", "entel", "copec", "tvn", "stellantis", "caja-los-andes", "lotus", "hilaria", "inacap", "ipchile", "st"].map(b => /*#__PURE__*/React.createElement("img", {
    key: b,
    src: "brands/" + b + ".png",
    alt: b,
    loading: "lazy",
    decoding: "async",
    style: {
      height: "clamp(22px,2.4vw,30px)",
      width: "auto",
      objectFit: "contain",
      opacity: 0.8,
      flex: "none"
    }
  }))))), /*#__PURE__*/React.createElement("style", null, "@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}")));
}
function WorkCard({
  w
}) {
  const photos = w.photos || [];
  const video = w.video || null;
  const slides = video ? ["__video__", ...photos] : photos;
  const [idx, setIdx] = React.useState(0);
  const videoRef = React.useRef(null);

  // Rotate through video (played full) then photos every 2s. Lazy-load images so the grid stays fluid.
  React.useEffect(() => {
    const cur = slides[idx];
    if (cur === "__video__") {
      const v = videoRef.current;
      if (v) {
        try {
          v.currentTime = 0;
        } catch (e) {}
        const p = v.play();
        if (p) p.catch(() => {});
      }
      return; // onEnded advances
    }
    if (slides.length < 2) return;
    const t = setTimeout(() => setIdx(n => (n + 1) % slides.length), 2000);
    return () => clearTimeout(t);
  }, [idx, slides.length]);
  const onVideoEnd = () => setIdx(n => (n + 1) % slides.length);
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    padding: "0",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16/10",
      position: "relative",
      overflow: "hidden",
      background: "radial-gradient(90% 120% at 20% 0%, rgba(" + w.beam[0] + ",0.55), transparent 60%)," + "radial-gradient(90% 120% at 90% 100%, rgba(" + w.beam[1] + ",0.5), transparent 60%)," + "#050506",
      display: "flex",
      alignItems: "flex-end",
      padding: "16px"
    }
  }, video && /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    src: video,
    muted: true,
    playsInline: true,
    preload: "auto",
    loop: photos.length === 0,
    onEnded: onVideoEnd,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: slides[idx] === "__video__" ? 1 : 0,
      transition: "opacity 600ms var(--ease-standard)"
    }
  }), photos.map((src, i) => {
    const slideI = video ? i + 1 : i;
    return /*#__PURE__*/React.createElement("img", {
      key: i,
      src: src,
      alt: w.t,
      loading: "lazy",
      decoding: "async",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: slideI === idx ? 1 : 0,
        transition: "opacity 600ms var(--ease-standard)"
      }
    });
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      opacity: photos.length || video ? 0 : 1
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
  }, t)))));
}
const WORK = [{
  t: "Stand Publicitario",
  v: "Branding Chevrolet",
  tags: ["Pantalla", "Contenido visual", "Punto de encuentro"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  video: "work/chevrolet-video.mp4",
  photos: ["work/min/chevrolet-1.jpg"]
}, {
  t: "Hip Hop al Parque · Colombia",
  v: "+65.000 asistentes",
  tags: ["Contenido", "Luz"],
  cat: "Festival",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/hiphop-1.jpg", "work/min/hiphop-2.jpg", "work/min/hiphop-3.jpg"]
}, {
  t: "Meeting Empresa",
  v: "Icare",
  tags: ["Pantalla", "Producción técnica", "Operación"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/icare-1.jpg", "work/min/icare-2.jpg", "work/min/icare-3.jpg"]
}, {
  t: "ChysteMC · 20 años",
  v: "Teatro Coliseo",
  tags: ["Iluminación", "Visuales"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/chystemc-1.jpg", "work/min/chystemc-2.jpg", "work/min/chystemc-3.jpg"]
}, {
  t: "Experiencia inmersiva de lujo",
  v: "Branding Blue Label",
  tags: ["Pantalla", "Operación"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/blue-1.jpg", "work/min/blue-2.jpg", "work/min/blue-3.jpg"]
}, {
  t: "Lollapalooza",
  v: "Lara Poyect",
  tags: ["Programación", "Código de tiempo"],
  cat: "Festival",
  beam: ["78,169,255", "255,205,89"],
  photos: ["work/min/lara-1.jpg", "work/min/lara-2.jpg", "work/min/lara-3.jpg"]
}, {
  t: "Conferencia Doctores",
  v: "Breast Cancer Summit",
  tags: ["Media Server", "Operación", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/summit-1.jpg", "work/min/summit-2.jpg", "work/min/summit-3.jpg"]
}, {
  t: "Polima & Pailita",
  v: "Movistar Arena 360",
  tags: ["Dirección creativa", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/polima-1.jpg", "work/min/polima-2.jpg", "work/min/polima-3.jpg"]
}, {
  t: "Lanzamiento de Marca",
  v: "Evento corporativo",
  tags: ["Contenido visual", "Producción técnica"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/muno-1.jpg", "work/min/muno-2.jpg", "work/min/muno-3.jpg"]
}, {
  t: "Festival de Viña",
  v: "Polima Westcoast",
  tags: ["Iluminación", "TV"],
  cat: "TV",
  beam: ["78,169,255", "143,0,255"],
  video: "work/vina-video.mp4"
}, {
  t: "Cuenta Pública",
  v: "Municipalidades",
  tags: ["Operación visuales", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/cuenta-1.jpg", "work/min/cuenta-2.jpg", "work/min/cuenta-3.jpg"]
}, {
  t: "Video clip · 3am",
  v: "La Combo Tortuga",
  tags: ["Diseño", "Código de tiempo"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"],
  video: "work/combo-video.mp4",
  photos: ["work/min/combo-1.jpg", "work/min/combo-2.jpg"]
}, {
  t: "Tecate Pal Norte · México",
  v: "DJ Pablito Pesadilla",
  tags: ["Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/tecate-1.jpg", "work/min/tecate-2.jpg", "work/min/tecate-3.jpg"]
}, {
  t: "Pablito Pesadilla",
  v: "Quinta Vergara",
  tags: ["Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/rumble-1.jpg", "work/min/rumble-2.jpg", "work/min/rumble-3.jpg"]
}, {
  t: "DVD En Vivo",
  v: "La Combo Tortuga",
  tags: ["Diseño", "Iluminación", "Programación"],
  cat: "Show",
  beam: ["78,169,255", "255,205,89"],
  photos: ["work/min/dvd-1.jpg", "work/min/dvd-2.jpg", "work/min/dvd-3.jpg"]
}, {
  t: "FaceBrooklyn",
  v: "Teatro Coliseo",
  tags: ["Diseño/Iluminación", "Programación", "Operación en vivo"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/face-1.jpg", "work/min/face-2.jpg"]
}];
function Trabajo() {
  const cats = ["Todo", "Show", "Festival", "TV", "Corporativo"];
  const [cat, setCat] = useState("Todo");
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true); // true = visible
  const PER = 6;
  const shown = cat === "Todo" ? WORK : WORK.filter(w => w.cat === cat);
  const pages = Math.max(1, Math.ceil(shown.length / PER));
  React.useEffect(() => {
    setPage(0);
  }, [cat]);
  const goToPage = React.useCallback(next => {
    setFade(false); // fade out
    setTimeout(() => {
      setPage(next);
      setFade(true);
    }, 280); // swap while hidden, then fade in
  }, []);
  React.useEffect(() => {
    const AUTO_ADVANCE = true;
    if (pages <= 1 || !AUTO_ADVANCE) return;
    // 3 photos × 2s = 6s per card cycle → hold each page ~6.6s so all photos show
    const id = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setPage(p => (p + 1) % pages);
        setFade(true);
      }, 280);
    }, 6000);
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
    className: "svb-reveal",
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
    tickColor: "var(--svb-violet)",
    style: {
      display: "none"
    }
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
    className: "svb-reveal",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: "16px",
      opacity: fade ? 1 : 0,
      transition: "opacity 280ms var(--ease-standard)"
    }
  }, pageItems.map((w, i) => /*#__PURE__*/React.createElement(WorkCard, {
    key: page + "-" + i,
    w: w
  }))), pages > 1 && /*#__PURE__*/React.createElement("div", {
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
    onClick: () => goToPage(i),
    "aria-label": "Página " + (i + 1),
    style: {
      width: i === page ? "28px" : "10px",
      height: "10px",
      padding: 0,
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      border: "none",
      background: i === page ? "var(--svb-white)" : "var(--border-strong)",
      transition: "width var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "26px",
      fontSize: "13px",
      color: "var(--text-meta)",
      maxWidth: "70ch",
      lineHeight: 1.6,
      display: "none"
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
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginBottom: "44px",
      maxWidth: "56ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-blue)",
    style: {
      display: "none"
    }
  }, "Tres trayectorias \xB7 una capacidad de marca"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "La experiencia nos une.")), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
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
    hoverPhotos: ["team/min/hover-1.jpg", "team/min/hover-2.jpg", "team/min/hover-3.jpg"],
    disciplines: ["Dirección de arte", "Contenido visual", "3D"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Luis Ulloa",
    role: "Producci\xF3n & Media Server",
    accent: "amber",
    photo: "../../assets/team/luis-ulloa.png",
    hoverPhotos: ["team/min/hover-1.jpg", "team/min/hover-2.jpg", "team/min/hover-3.jpg"],
    disciplines: ["Producción general", "Coordinación", "Visuales"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Elvis Coloma",
    role: "Iluminaci\xF3n & T\xE9cnica",
    accent: "violet",
    photo: "../../assets/team/elvis-coloma.png",
    hoverPhotos: ["team/min/elvis-2.jpg", "team/min/elvis-3.jpg"],
    disciplines: ["Diseño de luz", "Programación", "Escenario"]
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
      ...stage("143,0,255", "78,169,255"),
      padding: "var(--section-y) clamp(20px,5vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
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
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-violet)"
  }, "Recibido"), /*#__PURE__*/React.createElement("p", {
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
    variant: "secondary",
    size: "lg",
    style: {
      marginTop: "6px",
      alignSelf: "flex-start"
    }
  }, "Enviar")))));
}

/* ============================ Footer ============================ */
function BrandMarquee() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-stage)",
      borderTop: "1px solid var(--border-default)",
      padding: "clamp(28px,4vw,48px) 0",
      overflow: "hidden",
      position: "relative",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "max-content",
      animation: "svbMarquee 34s linear infinite"
    }
  }, [0, 1].map(rep => /*#__PURE__*/React.createElement("div", {
    key: rep,
    "aria-hidden": rep === 1,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(40px,6vw,88px)",
      padding: "0 clamp(20px,3vw,44px)"
    }
  }, ["claro", "entel", "copec", "tvn", "stellantis", "caja-los-andes", "lotus", "hilaria", "inacap", "ipchile", "st"].map(b => /*#__PURE__*/React.createElement("img", {
    key: b,
    src: "brands/" + b + ".png",
    alt: b,
    loading: "lazy",
    decoding: "async",
    style: {
      height: "clamp(22px,2.4vw,30px)",
      width: "auto",
      objectFit: "contain",
      opacity: 0.8,
      flex: "none"
    }
  }))))), /*#__PURE__*/React.createElement("style", null, "@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"));
}
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
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.06em",
      color: "var(--text-meta)"
    }
  }, "Creatividad, producci\xF3n y tecnolog\xEDa bajo una sola direcci\xF3n \xB7 Chile \xB7 2026"), /*#__PURE__*/React.createElement("img", {
    src: LOGO_MONO_WHITE,
    alt: "SVBLIME",
    style: {
      height: "18px",
      width: "102px"
    }
  })));
}

/* ============================ Site ============================ */
function SiteCasiUltimoElvis() {
  const [loading, setLoading] = React.useState(true);
  const goContact = () => {
    window.location.hash = "#contacto";
  };
  React.useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }
  }, [loading]);
  // Scroll-reveal: fade + rise elements as they enter the viewport.
  React.useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    const scan = () => document.querySelectorAll(".svb-reveal:not(.in)").forEach(el => io.observe(el));
    scan();
    const t = setTimeout(scan, 400);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [loading]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-page)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("style", null, ".svb-reveal{opacity:0;transform:translateY(32px);transition:opacity 900ms cubic-bezier(0.16,1,0.3,1),transform 900ms cubic-bezier(0.16,1,0.3,1)}.svb-reveal.in{opacity:1;transform:none}@media(prefers-reduced-motion:reduce){.svb-reveal{opacity:1!important;transform:none!important}}"), loading && /*#__PURE__*/React.createElement(LoadingScreen, {
    onDone: () => setLoading(false)
  }), /*#__PURE__*/React.createElement(Header, {
    onCta: goContact
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement("section", {
    id: "agencia",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)",
      background: "radial-gradient(90% 80% at 12% 0%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(80% 90% at 92% 100%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(70% 70% at 60% 40%, rgba(255,205,89,0.05), transparent 60%), var(--bg-page)",
      borderTop: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "clamp(32px,5vw,72px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "SVBLIME",
    style: {
      width: "min(560px,100%)",
      height: "auto"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-amber)",
    style: {
      marginBottom: "20px",
      display: "none"
    }
  }, "SER SVBLIME"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(24px,3vw,34px)",
      color: "var(--svb-white)",
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
      margin: 0
    }
  }, "Va m\xE1s all\xE1 de las luces, pantallas y la producci\xF3n.", /*#__PURE__*/React.createElement("br", null), "Aqu\xED, lo que merece ser recordado, se hace realidad."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "20px",
      fontSize: "16px",
      lineHeight: 1.7,
      color: "var(--text-body)",
      maxWidth: "60ch"
    }
  }, "Transformamos tus ideas en experiencias visuales que inspiran, conectan e impactan, con un \xFAnico prop\xF3sito: hacerlas inolvidables."))))), /*#__PURE__*/React.createElement(Pilares, null), /*#__PURE__*/React.createElement(LineUp, null), /*#__PURE__*/React.createElement(Trabajo, null), /*#__PURE__*/React.createElement(Equipo, null), /*#__PURE__*/React.createElement(Contacto, null), /*#__PURE__*/React.createElement(BrandMarquee, null), /*#__PURE__*/React.createElement(Footer, null));
}
window.SiteCasiUltimoElvis = SiteCasiUltimoElvis;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/casi-ultimo-elvis/SiteCasiUltimoElvis.jsx", error: String((e && e.message) || e) }); }

// ui_kits/casi-ultimo-elvis/doc-page.js
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/casi-ultimo-elvis/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/casi-ultimo-elvis/standalone-Site.jsx
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
function SiteCasiUltimoElvis() {
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
window.SiteCasiUltimoElvis = SiteCasiUltimoElvis;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/casi-ultimo-elvis/standalone-Site.jsx", error: String((e && e.message) || e) }); }

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
const LOGO_MONO_WHITE = "../../assets/svblime-mono-blanco.png";
const LOGO_MONO_BLACK = "../../assets/svblime-mono.png";
const LOGO_NEG = "../../assets/svblime-negativo.png";

/* ============================ Loading screen (logo flash + intro) ============================ */
function LoadingScreen({
  onDone
}) {
  const frames = [{
    bg: "#FFFFFF",
    src: LOGO_MONO_BLACK
  },
  // fondo blanco · letras negras (sin color)
  {
    bg: "#4EA9FF",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · azul
  {
    bg: "#FFCD59",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · ámbar
  {
    bg: "#8F00FF",
    src: LOGO_MONO_WHITE
  },
  // color sobre color · violeta
  {
    bg: "#000000",
    src: LOGO_NEG
  } // principal · negro + letras blancas con color
  ];
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState("flash"); // flash → out

  React.useEffect(() => {
    if (phase !== "flash") return;
    const last = frames.length - 1;
    const holds = i === last ? 420 : 130;
    const t = setTimeout(() => {
      if (i < last) setI(i + 1);else {
        setPhase("out");
        setTimeout(onDone, 700);
      }
    }, holds);
    return () => clearTimeout(t);
  }, [i, phase]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      overflow: "hidden",
      background: "#000",
      opacity: phase === "out" ? 0 : 1,
      pointerEvents: phase === "out" ? "none" : "auto",
      transition: "opacity 700ms var(--ease-standard)"
    }
  }, frames.map((f, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      position: "absolute",
      inset: 0,
      background: f.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: phase === "flash" && idx === i || phase !== "flash" && idx === frames.length - 1 ? 1 : 0,
      transition: "opacity 100ms var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: f.src,
    alt: "SVBLIME",
    style: {
      width: "min(46vw, 520px)",
      height: "auto"
    }
  }))));
}

/* ============================ Header ============================ */
function Header({
  onCta
}) {
  const links = [["SVBLIME", "#agencia"], ["Servicios", "#pilares"], ["Portafolio", "#lineup"], ["Galeria", "#trabajo"], ["Equipo", "#equipo"]];
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(t);
  }, [open]);
  const [reveal, setReveal] = useState(0); // hidden until the centered SVBLIME logo appears
  React.useEffect(() => {
    const show = () => setReveal(1);
    window.addEventListener("svb-reveal-ui", show);
    return () => window.removeEventListener("svb-reveal-ui", show);
  }, []);
  const bar = {
    display: "block",
    width: "34px",
    height: "6px",
    transition: "transform 500ms var(--ease-out), opacity 500ms var(--ease-standard)"
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px clamp(20px,5vw,56px)",
      background: "rgba(8,8,10,0.5)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border-soft)",
      pointerEvents: "none",
      gap: "clamp(16px,2vw,28px)",
      opacity: reveal,
      transform: "translateY(" + -12 * (1 - reveal) + "px)",
      visibility: reveal < 0.02 ? "hidden" : "visible",
      transition: "opacity 500ms var(--ease-standard), transform 500ms var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-label": open ? "Cerrar menú" : "Abrir menú",
    "aria-expanded": open,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: 0,
      border: "none",
      flex: "none",
      background: "transparent",
      cursor: "pointer",
      pointerEvents: "auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-blue)",
      transform: open ? "translateY(10px) rotate(45deg)" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-amber)",
      opacity: open ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      background: "var(--svb-violet)",
      transform: open ? "translateY(-10px) rotate(-45deg)" : "none"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "svb-nav",
    "data-open": open ? "true" : "false",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(14px,2vw,26px)",
      marginRight: "auto",
      maxWidth: open ? "600px" : "0px",
      opacity: open ? 1 : 0,
      overflow: "hidden",
      pointerEvents: open ? "auto" : "none",
      transition: "max-width 900ms var(--ease-out) " + (open ? "0ms" : "260ms") + ", opacity 700ms var(--ease-standard) " + (open ? "0ms" : "200ms")
    }
  }, links.map(([label, href], i) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    className: "svb-navlink",
    onClick: () => setOpen(false),
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-body)",
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
      pointerEvents: "auto",
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-8px)",
      transition: "opacity 600ms var(--ease-standard) " + (open ? 180 + i * 110 + "ms" : (links.length - 1 - i) * 90 + "ms") + ", transform 600ms var(--ease-out) " + (open ? 180 + i * 110 + "ms" : (links.length - 1 - i) * 90 + "ms")
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
      pointerEvents: "auto",
      background: "transparent",
      color: "var(--svb-white)",
      border: "1px solid var(--border-strong)",
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

/* ============================ Hero (autoplay video → text → scroll) ============================ */
const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// Photos + videos from the "Fotos" section, used for the hidden gallery above SVBLIME.
const GALLERY_META = {
  hiphop: {
    t: "Hip Hop al Parque · Colombia",
    tags: ["Contenido", "Luz"]
  },
  vina: {
    t: "Festival de Viña",
    tags: ["Iluminación", "TV"]
  },
  polima: {
    t: "Polima & Pailita · Movistar Arena",
    tags: ["Dirección creativa", "Iluminación"]
  },
  icare: {
    t: "Meeting Empresa · Icare",
    tags: ["Pantalla", "Producción técnica"]
  },
  tecate: {
    t: "Tecate Pa'l Norte · México",
    tags: ["Iluminación"]
  },
  chystemc: {
    t: "ChysteMC · 20 años",
    tags: ["Iluminación", "Visuales"]
  },
  lara: {
    t: "Lollapalooza · Lara Project",
    tags: ["Programación", "Código de tiempo"]
  },
  summit: {
    t: "Breast Cancer Summit",
    tags: ["Media Server", "Operación"]
  },
  blue: {
    t: "Branding Blue Label",
    tags: ["Pantalla", "Operación"]
  },
  muno: {
    t: "Lanzamiento de Marca",
    tags: ["Contenido visual", "Producción técnica"]
  },
  dvd: {
    t: "DVD En Vivo · La Combo Tortuga",
    tags: ["Diseño", "Iluminación", "Programación"]
  },
  face: {
    t: "FaceBrooklyn · Teatro Coliseo",
    tags: ["Programación", "Operación en vivo"]
  },
  rumble: {
    t: "Pablito Pesadilla · Quinta Vergara",
    tags: ["Iluminación"]
  },
  cuenta: {
    t: "Cuenta Pública · Municipalidades",
    tags: ["Operación visuales", "Producción técnica"]
  },
  combo: {
    t: "Video clip 3am · La Combo Tortuga",
    tags: ["Diseño", "Código de tiempo"]
  },
  chevrolet: {
    t: "Branding Chevrolet",
    tags: ["Pantalla", "Contenido visual"]
  },
  yandel: {
    t: "Yandel Sinfónico · Viña 2025",
    tags: ["Operación", "Diseño", "Contenido"]
  },
  televisado: {
    t: "Festival Televisado · LCT Huaso de Olmué",
    tags: ["Programación de iluminación"]
  },
  garras: {
    t: "Festival del Huaso de Olmué · Garras de Amor",
    tags: ["Operación en vivo"]
  },
  mesostendras: {
    t: "Video Clip · Me Sostendrás",
    tags: ["Diseño", "Operación"]
  },
  finalrojo: {
    t: "Final ROJO TVN",
    tags: ["Programación", "Iluminación"]
  },
  lctenvivo: {
    t: "Video clip en vivo · LCT",
    tags: ["Iluminación", "Videoclip"]
  },
  mesobrabas: {
    t: "Video clip LCT · Me Sobrabas Tú",
    tags: ["Iluminación", "Videoclip"]
  },
  alanis: {
    t: "Alanis Lago en vivo · Olmué",
    tags: ["Dirección creativa"]
  },
  entremares: {
    t: "Entremares · Arena Monticello",
    tags: ["Dirección de iluminación"]
  },
  movistar13: {
    t: "Movistar Arena · LCT 13 años",
    tags: ["Programación", "Código de tiempo"]
  },
  ciberseg: {
    t: "Evento Empresa · Ciberseguridad",
    tags: ["Producción", "Contenido"]
  },
  activaciones: {
    t: "Activaciones de empresas",
    tags: ["Media Server", "Visuales"]
  },
  doctores: {
    t: "Evento Doctores · Armonic",
    tags: ["Contenido", "Producción"]
  },
  walmart: {
    t: "Walmart Chile · Media Server",
    tags: ["Producción técnica"]
  },
  meli: {
    t: "Fiesta Fin de Año · Mercado Libre",
    tags: ["Pantallas", "Iluminación"]
  },
  colombia: {
    t: "Colombia Travel",
    tags: ["Punto de encuentro", "Branding"]
  },
  eaton: {
    t: "Branding Empresa · Eaton Tech Day",
    tags: ["Branding", "Contenido"]
  },
  worktech: {
    t: "Evento anual · Worktech",
    tags: ["Branding", "Producción técnica"]
  },
  santotomas: {
    t: "Charla Santo Tomás",
    tags: ["Contenido", "Branding"]
  },
  astara: {
    t: "Capacitación Empresa · Astara",
    tags: ["Producción técnica", "Contenido"]
  },
  pailita: {
    t: "Iluminación y Visuales · Pailita",
    tags: ["Diseño", "Programación"]
  },
  pampilla: {
    t: "Festival La Pampilla · Pablito Pesadilla",
    tags: ["Iluminación", "+100.000 personas"]
  },
  gino: {
    t: "Teletón 2025 · Gino Mella",
    tags: ["Dirección creativa", "Contenido"]
  },
  dulsonico: {
    t: "Dirección Video Clip · Dulsónico",
    tags: ["Dirección de arte", "Edición"]
  },
  movistar: {
    t: "Movistar Empresas · HISPAM Digital Forum",
    tags: ["Contenido", "3D"]
  },
  bci: {
    t: "Banco BCI",
    tags: ["Código de tiempo", "Iluminación"]
  }
};
const metaFor = base => GALLERY_META[base.replace(/-.*/, "").replace(/video$/, "")] || GALLERY_META[base.split("-")[0]] || {
  t: "SVBLIME",
  tags: []
};
const GALLERY_PHOTOS = ["hiphop-1", "vina-1", "polima-1", "icare-2", "tecate-1", "chystemc-2", "lara-1", "summit-1", "blue-1", "muno-2", "dvd-1", "face-1", "rumble-1", "cuenta-1", "hiphop-3", "polima-3", "tecate-3", "icare-1", "vina-2", "chystemc-1", "lara-3", "summit-2", "blue-3", "muno-1", "dvd-3", "face-2", "rumble-2", "cuenta-3", "chevrolet-1", "hiphop-2", "vina-3", "polima-2", "tecate-2", "icare-3", "chystemc-3", "entremares-1", "movistar13-1", "ciberseg-1", "activaciones-1", "doctores-1", "walmart-1", "meli-1", "colombia-1", "eaton-1", "worktech-1", "santotomas-1", "astara-1", "entremares-2", "movistar13-2", "ciberseg-2", "activaciones-2", "doctores-2", "walmart-2", "meli-2", "colombia-2", "eaton-2", "worktech-2", "santotomas-2", "astara-2", "pailita-1.png", "pampilla-1.png", "pailita-3.png", "pampilla-2.png", "pailita-2.png", "pampilla-3.png"].map(n => ({
  type: "img",
  src: "work/min/" + (/\.(png|jpg)$/.test(n) ? n : n + ".jpg"),
  meta: metaFor(n.replace(/\.(png|jpg)$/, ""))
}));
const GALLERY_VIDEOS = ["yandel-video", "chevrolet-video", "vina-video", "combo-video", "televisado-video", "garras-olmue-video", "mesostendras-video", "finalrojo-video", "lctenvivo-video", "mesobrabas-video", "alanis-video", "gino-teleton-video", "dulsonico-video", "movistar-empresas-video", "bci-video", "bci-video-2", "dvd-video"].map(n => ({
  type: "video",
  src: "work/" + n + ".mp4",
  meta: metaFor(n)
}));
const FEATURED = ["blue", "bci", "chevrolet", "icare", "muno", "doctores", "yandel", "mesostendras", "finalrojo", "gino", "combo", "vina", "pampilla", "pailita", "movistar13", "dvd", "tecate", "hiphop"];
const isFeatured = src => {
  const f = src.split("/").pop().replace(/\.(png|jpg|mp4)$/, "");
  const k = f.replace(/-.*/, "");
  return FEATURED.indexOf(k) >= 0 || FEATURED.indexOf(f.replace(/-video.*$/, "")) >= 0;
};
const hashStr = s => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000;
  return h;
};
const isBig = src => isFeatured(src) || hashStr(src) % 100 < 62;
// Interleave media and split into 3 rows for the horizontal marquee.
const GALLERY_MEDIA = (() => {
  const out = [],
    p = [...GALLERY_PHOTOS],
    v = [...GALLERY_VIDEOS];
  let vi = 0;
  p.forEach((item, i) => {
    out.push(item);
    if ((i + 1) % 9 === 0 && vi < v.length) out.push(v[vi++]);
  });
  while (vi < v.length) out.push(v[vi++]);
  return out;
})();
const GALLERY_ROWS = (() => {
  const rows = [[], [], []];
  GALLERY_MEDIA.forEach((m, i) => rows[i % rows.length].push(m));
  return rows;
})();
function Hero() {
  const videoRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [videoDone, setVideoDone] = React.useState(false);
  const [nearEnd, setNearEnd] = React.useState(0); // 0→1 over the last ~2.2s of the clip
  const [logoIn, setLogoIn] = React.useState(false); // "Bienvenidos a" revealed
  const [logoMark, setLogoMark] = React.useState(false); // the logo itself, a beat later
  const logoScreenRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const rowRefs = React.useRef([]); // outer track per row (transformed)
  const rowSeqRefs = React.useRef([]); // first sequence per row (for width measure)
  const offsetRef = React.useRef(0); // accumulated up-scroll → photos slide right
  const introSeenRef = React.useRef(false); // once the intro is scrolled past, the logo never returns

  // Download the whole clip as a Blob URL for smooth playback, then autoplay it.
  React.useEffect(() => {
    let url;
    let cancelled = false;
    fetch("hero.mp4").then(r => r.blob()).then(b => {
      if (cancelled) return;
      url = URL.createObjectURL(b);
      const v = videoRef.current;
      if (v) {
        v.src = url;
        v.load();
        setReady(true);
        v.playbackRate = 0.75;
        const p = v.play();
        if (p) p.catch(() => {});
      }
    }).catch(() => {
      setReady(true);
    });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  // Lock page scroll until the centered logo is shown; release afterward.
  React.useEffect(() => {
    if (!logoIn) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [logoIn]);

  // End of intro: fade out BOTH the video and the text, then bring in the color logo + UI.
  const finishIntro = () => {
    setNearEnd(1);
    setVideoDone(true);
    window.setTimeout(() => {
      setLogoIn(true);
      window.setTimeout(() => setLogoMark(true), 240);
      window.dispatchEvent(new Event("svb-reveal-ui"));
    }, 700);
  };
  const onVideoEnd = finishIntro;
  const skip = () => {
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
      } catch (e) {}
    }
    finishIntro();
  };

  // Logo fade (on scroll toward SVBLIME) + wheel-driven gallery.
  // At the very top: scrolling UP slides all photos/videos to the right (looping);
  // scrolling DOWN lets the page descend normally.
  React.useEffect(() => {
    if (!logoIn) return;
    let raf = 0;
    const speeds = [0.62, 0.86, 1.12];
    const applyRows = () => {
      rowRefs.current.forEach((track, i) => {
        const seq = rowSeqRefs.current[i];
        if (!track || !seq) return;
        const w = seq.offsetWidth || 1;
        const x = -w + (offsetRef.current * speeds[i] % w + w) % w; // right-moving loop
        track.style.transform = "translate3d(" + x + "px,0,0)";
      });
    };
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      if (y > vh * 0.35) introSeenRef.current = true;
      const logoEl = logoScreenRef.current;
      if (logoEl) {
        const o = introSeenRef.current ? 0 : Math.max(0, 1 - Math.min(1, y / (vh * 0.4)));
        logoEl.style.opacity = String(o);
        logoEl.style.visibility = o <= 0.001 ? "hidden" : "visible";
      }
      const gal = galleryRef.current;
      if (gal) gal.style.opacity = String(introSeenRef.current ? 1 : Math.min(1, y / (vh * 0.35)));
      applyRows();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onWheel = e => {
      // Only trap upward wheel at the very top, after the intro — that's the gallery zone.
      if (introSeenRef.current && window.scrollY <= 1 && e.deltaY < 0) {
        e.preventDefault();
        offsetRef.current += -e.deltaY;
        if (!raf) raf = requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, {
      passive: false
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [logoIn]);

  // Mobile: the top gallery can't be wheel-driven, so it drifts left on its own (3 speeds).
  React.useEffect(() => {
    if (!logoIn) return;
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 860px)").matches) return;
    let raf = 0,
      last = 0;
    const speeds = [0.62, 0.86, 1.12];
    const tick = now => {
      if (!last) last = now;
      const dt = Math.min(60, now - last);
      last = now;
      offsetRef.current -= dt * 0.045;
      rowRefs.current.forEach((track, i) => {
        const seq = rowSeqRefs.current[i];
        if (!track || !seq) return;
        const w = seq.offsetWidth || 1;
        const x = -w + (offsetRef.current * speeds[i] % w + w) % w;
        track.style.transform = "translate3d(" + x + "px,0,0)";
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [logoIn]);
  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || videoDone) return;
    const lead = 3.0;
    const t = Math.min(1, Math.max(0, (v.currentTime - (v.duration - lead)) / lead));
    setNearEnd(t);
  };
  const introReveal = smoothstep(0.06, 0.5, nearEnd);
  const textVis = videoDone ? 0 : introReveal; // fades in on the tail, out when the clip ends
  const videoOpacity = ready ? videoDone ? 0 : 1 - smoothstep(0.55, 1, nearEnd) : 0;
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: "relative",
      height: "100vh",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      width: "100%",
      overflow: "hidden",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    muted: true,
    playsInline: true,
    preload: "auto",
    onEnded: onVideoEnd,
    onTimeUpdate: onTimeUpdate,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: videoOpacity,
      transition: "opacity 700ms var(--ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: ready ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-stage)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "var(--text-meta)"
    }
  }, "Cargando")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 45%, transparent 80%)",
      opacity: textVis,
      transition: "opacity 500ms linear",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "clamp(40px,7vw,110px) clamp(20px,5vw,56px) clamp(56px,9vw,120px)",
      pointerEvents: "none",
      opacity: textVis,
      transition: "opacity 700ms var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(42px,8vw,104px)",
      lineHeight: 0.98,
      letterSpacing: "-0.03em",
      margin: 0,
      maxWidth: "16ch",
      display: "flex",
      flexWrap: "wrap"
    }
  }, "Cerramos la distancia entre imaginarlo y vivirlo.".split(" ").map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginRight: "0.28em",
      opacity: textVis,
      transition: "opacity 600ms var(--ease-standard) " + i * 80 + "ms",
      display: "inline-block"
    }
  }, w))))), logoIn && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      background: "#000"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    ref: galleryRef,
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "clamp(10px,1.6vw,22px)",
      opacity: 0,
      willChange: "opacity",
      transition: "opacity 500ms linear"
    }
  }, GALLERY_ROWS.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      position: "relative",
      height: "clamp(150px,26vh,300px)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: el => {
      rowRefs.current[ri] = el;
    },
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      display: "flex",
      willChange: "transform"
    }
  }, [0, 1].map(copy => /*#__PURE__*/React.createElement("div", {
    key: copy,
    ref: copy === 0 ? el => {
      rowSeqRefs.current[ri] = el;
    } : null,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(10px,1.6vw,22px)",
      paddingRight: "clamp(10px,1.6vw,22px)"
    }
  }, row.map((m, ii) => /*#__PURE__*/React.createElement("div", {
    key: copy + "-" + ii,
    className: "svb-gitem",
    style: {
      position: "relative",
      alignSelf: "center",
      height: isBig(m.src) ? "100%" : "62%",
      aspectRatio: m.type === "video" ? "16 / 9" : ii % 3 === 0 ? "3 / 4" : ii % 3 === 1 ? "1 / 1" : "4 / 3",
      borderRadius: "var(--radius-sm)",
      overflow: "hidden",
      background: "#111",
      flex: "none"
    }
  }, m.type === "video" ? /*#__PURE__*/React.createElement("video", {
    src: m.src,
    muted: true,
    loop: true,
    playsInline: true,
    autoPlay: true,
    preload: "metadata",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      opacity: 0.9
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: m.src,
    alt: "",
    loading: "lazy",
    decoding: "async",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "svb-gcap",
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      gap: "8px",
      padding: "clamp(10px,1.2vw,16px)",
      background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--svb-white)",
      fontSize: "clamp(13px,1.15vw,17px)",
      lineHeight: 1.12,
      letterSpacing: "-0.01em"
    }
  }, m.meta.t), /*#__PURE__*/React.createElement("div", {
    className: "svb-gtags",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px"
    }
  }, m.meta.tags.map(tg => /*#__PURE__*/React.createElement("span", {
    key: tg,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "9px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.82)",
      border: "1px solid rgba(255,255,255,0.28)",
      borderRadius: "999px",
      padding: "3px 8px"
    }
  }, tg)))))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(130% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.7) 100%)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    ref: logoScreenRef,
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "clamp(14px,2.4vw,28px)",
      padding: "0 clamp(20px,5vw,56px)",
      background: "#000",
      pointerEvents: "none",
      opacity: logoIn ? 1 : 0,
      transition: "opacity 140ms linear"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.1vw,13px)",
      letterSpacing: "0.34em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.72)",
      opacity: logoIn ? 1 : 0,
      transform: logoIn ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 700ms var(--ease-standard) 250ms, transform 700ms var(--ease-out) 250ms"
    }
  }, "Bienvenidos a"), /*#__PURE__*/React.createElement("img", {
    src: LOGO_NEG,
    alt: "SVBLIME",
    style: {
      width: "min(46vw, 520px)",
      height: "auto",
      opacity: logoMark ? 1 : 0,
      transform: logoMark ? "scale(1)" : "scale(0.86)",
      transition: "opacity 900ms var(--ease-standard), transform 1150ms cubic-bezier(0.16,1,0.3,1)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: "34px",
      transform: "translateX(-50%)",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      opacity: logoIn ? 1 : 0,
      transition: "opacity 600ms var(--ease-standard) 400ms",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      pointerEvents: "none"
    }
  }, "Scroll", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: "1px",
      height: "34px",
      background: "linear-gradient(rgba(255,255,255,0.7), transparent)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: skip,
    style: {
      position: "absolute",
      right: "clamp(20px,5vw,56px)",
      bottom: "34px",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: "var(--radius-sm)",
      padding: "8px 14px",
      cursor: "pointer",
      opacity: videoDone ? 0 : 1,
      pointerEvents: videoDone ? "none" : "auto",
      transition: "opacity 400ms var(--ease-standard)"
    }
  }, "Saltar intro")));
}

/* ============================ Pilares ============================ */
function Pilares() {
  const pillars = [["", "gray", "Dirección Creativa", "Concepto, narrativa, dirección de arte y el sentido del proyecto. Donde una intención se vuelve visión ejecutable."], ["", "amber", "Experiencias Visuales", "Luz, pantallas, contenido, motion, programación, previsualización y operación en vivo."], ["", "violet", "Producción de Eventos", "Planificación, coordinación, gestión de proveedores y ejecución en terreno, todo bajo control."], ["", "blue", "Branding de Eventos", "Identidad, mensaje, sistema visual y puntos de contacto, coherentes antes, durante y después."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "pilares",
    style: {
      position: "relative",
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "48px",
      maxWidth: "60ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-amber)",
    style: {
      display: "none"
    }
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
      color: "var(--text-body)",
      maxWidth: "none",
      width: "max-content",
      whiteSpace: "nowrap"
    }
  }, "Cuatro formas de trabajar, una sola misi\xF3n: ", /*#__PURE__*/React.createElement("em", null, "hacer que tu idea cobre vida."))), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "16px"
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(PillarCard, {
    key: p[2],
    number: p[0],
    accent: p[1],
    title: p[2],
    description: p[3]
  })))), /*#__PURE__*/React.createElement(SpectrumBar, {
    thickness: 4,
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      display: "none"
    }
  }));
}

/* ============================ Line Up (festival poster) ============================ */
const LINEUP_DAYS = [{
  day: "01",
  label: "Día 01 · Marcas",
  tint: "78,169,255",
  headliners: ["Claro", "Entel", "Copec", "Chevrolet", "TVN"],
  main: ["Johnnie Walker Blue Label", "Caja Los Andes", "Carolina Herrera 212", "Muni. de Vitacura", "Muni. de Pudahuel", "Muni. de Pedro Aguirre Cerda", "Lotus"],
  support: ["INACAP", "IP Chile", "Hilaria", "Provetec", "Muno BX", "Axon Pharma", "Armonic", "Breast Cancer"]
}, {
  day: "02",
  label: "Día 02 · Festivales",
  tint: "255,205,89",
  headliners: ["Festival de Viña", "Lollapalooza", "Billboard"],
  main: ["Tecate Pa'l Norte", "Coca Cola Flow Fest", "Ultra Festival", "Huaso de Olmué", "Festival La Pampilla"],
  support: ["Crush Power Music", "Premios Pulsar", "Resistence", "Rock Out", "Knock Fest"]
}, {
  day: "03",
  label: "Día 03 · Artistas",
  tint: "143,0,255",
  headliners: ["Yandel", "Carin León", "Myriam Hernández", "The Wailers"],
  main: ["Onyx", "P.O.D.", "Nanpa Básico", "Floyymenor", "Polimá Westcoast", "Pailita", "Zúmbale Primo", "La Combo Tortuga", "Pablito Pesadilla", "Alanis Lagos", "Pablo Chillee", "Lara Project"],
  support: ["Marcianeke", "ChysteMC", "Jere Klein", "Gino Mella", "Harry Nach", "Julianno Sosa", "Jordan 23", "Kidd Tetón", "Ithan NY", "FaceBrooklyn", "Garras de Amor", "Akrilla", "Saturno", "Bubaseta", "Shamanes Crew", "King Savage"]
}];
function LineUp() {
  const DOT = "rgba(255,255,255,0.55)";
  const sep = () => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: "6px",
      height: "6px",
      margin: "0 clamp(8px,1.3vw,16px)",
      transform: "translateY(-4px) rotate(45deg)",
      background: DOT
    }
  });
  const row = (items, cls) => /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      rowGap: "4px"
    }
  }, items.map((name, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: name + i
  }, i > 0 && sep(), /*#__PURE__*/React.createElement("span", {
    className: "svb-name"
  }, name))));
  const dayDivider = (day, label, color) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      margin: "clamp(30px,4.5vw,56px) 0 clamp(18px,2.6vw,32px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: "1px",
      flex: "1 1 0",
      maxWidth: "clamp(40px,12vw,160px)",
      background: "linear-gradient(90deg, transparent, " + color + ")"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.4vw,13px)",
      letterSpacing: "0.26em",
      textTransform: "uppercase",
      color: "var(--text-body)",
      WebkitTextFillColor: "var(--text-body)",
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: "1px",
      flex: "1 1 0",
      maxWidth: "clamp(40px,12vw,160px)",
      background: "linear-gradient(90deg, " + color + ", transparent)"
    }
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "lineup",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "var(--section-y) clamp(20px,5vw,56px)",
      background: "radial-gradient(120% 80% at 50% -10%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(90% 90% at 8% 108%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(90% 90% at 92% 108%, rgba(255,205,89,0.06), transparent 55%), var(--bg-stage)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)",
      display: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      maxWidth: "1000px",
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.4vw,13px)",
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      display: "none"
    }
  }, "SVBLIME presenta"), /*#__PURE__*/React.createElement("img", {
    className: "svb-fest-lockup",
    src: "../../assets/svblime-fest-lockup.png",
    alt: "SVBLIME Fest",
    style: {
      display: "block",
      width: "min(760px,82vw)",
      height: "auto",
      margin: "clamp(10px,1.6vw,20px) auto 0"
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "svb-lu-sub",
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: "20px",
      letterSpacing: "0.01em",
      color: "var(--text-body)",
      margin: "clamp(2px,0.5vw,8px) auto 0",
      maxWidth: "44ch",
      textAlign: "center"
    }
  }, "Marcas, corporaciones y artistas que han confiado."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "14px",
      margin: "clamp(16px,2.4vw,28px) auto 0",
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-blue)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-amber)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "3px",
      background: "var(--svb-violet)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "svb-grad"
  }, LINEUP_DAYS.map(d => {
    const color = "rgb(" + d.tint + ")";
    return /*#__PURE__*/React.createElement("div", {
      key: d.day
    }, dayDivider(d.day, d.label.split("·")[1] ? d.label.split("·")[1].trim() : d.label, color), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "clamp(10px,1.5vw,18px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "svb-lu-head",
      style: {
        fontFamily: "var(--font-display)",
        color: "var(--svb-white)",
        fontSize: "clamp(19px,3.6vw,44px)",
        lineHeight: 1.0,
        letterSpacing: "-0.02em"
      }
    }, row(d.headliners)), /*#__PURE__*/React.createElement("div", {
      className: "svb-lu-main",
      style: {
        fontFamily: "var(--font-display)",
        color: "var(--svb-white)",
        fontSize: "clamp(13px,2.1vw,27px)",
        lineHeight: 1.08,
        letterSpacing: "-0.01em"
      }
    }, row(d.main)), /*#__PURE__*/React.createElement("div", {
      className: "svb-lu-sup",
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        color: "var(--text-body)",
        fontSize: "clamp(11px,1.3vw,15px)",
        letterSpacing: "0.02em"
      }
    }, row(d.support))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(40px,6vw,72px)",
      paddingTop: "clamp(28px,4vw,44px)",
      borderTop: "1px solid var(--border-default)",
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(28px,5vw,56px)",
      letterSpacing: "-0.02em",
      color: "var(--svb-white)"
    }
  }, "SVBLIME.CL"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px,1.3vw,12px)",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-meta)",
      margin: "16px auto 0",
      maxWidth: "60ch",
      lineHeight: 1.7
    }
  }, "Trayectoria acumulada de los socios \xB7 participaci\xF3n por proyecto (visuales \xB7 iluminaci\xF3n \xB7 producci\xF3n \xB7 contenido)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(48px,7vw,88px)",
      overflow: "hidden",
      position: "relative",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "max-content",
      animation: "svbMarquee 34s linear infinite"
    }
  }, [0, 1].map(rep => /*#__PURE__*/React.createElement("div", {
    key: rep,
    "aria-hidden": rep === 1,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(40px,6vw,88px)",
      padding: "0 clamp(20px,3vw,44px)"
    }
  }, ["rock-out", "claro", "muno-bx", "premios-pulsar", "flow-fest", "pailita", "vitacura", "pod", "lollapalooza", "knotfest", "carolina-herrera", "copec", "pedro-aguirre-cerda", "wailers", "pudahuel", "shishi-gang", "tecate", "stellantis", "myriam-hernandez", "akriila", "axon-pharma", "jere-klein", "billboard", "chystemc", "combo-tortuga", "provetec", "resistance", "ultra", "carin-leon", "tvn", "nanpa-basico", "blue-label", "hilaria", "polima-westcoast", "inacap", "ipchile", "lotus", "breast-cancer", "vina-fest", "shamanes", "garras-amor", "crush-music", "chevrolet", "onyx", "caja-los-andes", "huaso-olmue", "alanys-lagos", "lara-project", "armonic", "yandel-artist", "facebrooklyn", "zumbale-primo", "entel"].map((b, bi) => /*#__PURE__*/React.createElement("span", {
    key: b,
    className: "svb-brand",
    style: {
      ["--m"]: "url(brands/" + b + ".png)",
      ["--c"]: ["var(--svb-blue)", "var(--svb-amber)", "var(--svb-violet)"][bi % 3]
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "brands/" + b + ".png",
    alt: b,
    loading: "lazy",
    decoding: "async",
    style: {
      height: "calc(clamp(22px,2.4vw,30px) * " + ({
        "carolina-herrera": 1.75,
        "vitacura": 1.9,
        "armonic": 2.0,
        "chevrolet": 1.75,
        "blue-label": 1.55,
        "hilaria": 1.9,
        "pudahuel": 1.25,
        "claro": 1.3,
        "provetec": 1.55,
        "onyx": 1.5,
        "pod": 1.2,
        "chystemc": 1.7,
        "tecate": 1.7,
        "huaso-olmue": 1.6,
        "myriam-hernandez": 1.1,
        "flow-fest": 1.5,
        "jere-klein": 1.1,
        "wailers": 1.3,
        "zumbale-primo": 1.15,
        "polima-westcoast": 1.4,
        "lara-project": 1.35,
        "nanpa-basico": 1.3,
        "alanys-lagos": 1.3,
        "yandel-artist": 1.4,
        "pailita": 1.15,
        "shamanes": 1.15,
        "premios-pulsar": 1.45,
        "rock-out": 1.05,
        "knotfest": 1.1,
        "vina-fest": 1.2,
        "shishi-gang": 1.6,
        "garras-amor": 1.0,
        "combo-tortuga": 1.3,
        "crush-music": 1.4
      }[b] || 1) + ")",
      width: "auto",
      objectFit: "contain",
      opacity: 0.8,
      display: "block"
    }
  })))))), /*#__PURE__*/React.createElement("style", null, "@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}")));
}
function WorkCard({
  w
}) {
  const photos = w.photos || [];
  const videos = w.videos || (w.video ? [w.video] : []);
  const slides = [...videos.map((_, i) => "__video" + i + "__"), ...photos];
  const [idx, setIdx] = React.useState(0);
  const videoRef = React.useRef(null);
  const vIdx = idx < videos.length ? idx : -1;

  // Rotate through video (played full) then photos every 2s. Lazy-load images so the grid stays fluid.
  React.useEffect(() => {
    const cur = slides[idx];
    if (typeof cur === "string" && cur.indexOf("__video") === 0) {
      const v = videoRef.current;
      if (v) {
        try {
          v.currentTime = 0;
        } catch (e) {}
        const p = v.play();
        if (p) p.catch(() => {});
      }
      if (slides.length < 2) return; // single video → loops
      const t = setTimeout(() => setIdx(n => (n + 1) % slides.length), 10000); // show 10s of the video
      return () => clearTimeout(t);
    }
    if (slides.length < 2) return;
    const t = setTimeout(() => setIdx(n => (n + 1) % slides.length), 3300);
    return () => clearTimeout(t);
  }, [idx, slides.length]);
  const onVideoEnd = () => setIdx(n => (n + 1) % slides.length);
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    padding: "0",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16/10",
      position: "relative",
      overflow: "hidden",
      background: "radial-gradient(90% 120% at 20% 0%, rgba(" + w.beam[0] + ",0.55), transparent 60%)," + "radial-gradient(90% 120% at 90% 100%, rgba(" + w.beam[1] + ",0.5), transparent 60%)," + "#050506",
      display: "flex",
      alignItems: "flex-end",
      padding: "16px"
    }
  }, videos.length > 0 && /*#__PURE__*/React.createElement("video", {
    key: vIdx >= 0 ? vIdx : "last",
    ref: videoRef,
    src: videos[vIdx >= 0 ? vIdx : 0],
    muted: true,
    playsInline: true,
    preload: "auto",
    loop: slides.length === 1,
    onEnded: onVideoEnd,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: vIdx >= 0 ? 1 : 0,
      transition: "opacity 600ms var(--ease-standard)"
    }
  }), photos.map((src, i) => {
    const slideI = videos.length + i;
    return /*#__PURE__*/React.createElement("img", {
      key: i,
      src: src,
      alt: w.t,
      loading: "lazy",
      decoding: "async",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: slideI === idx ? 1 : 0,
        transition: "opacity 600ms var(--ease-standard)"
      }
    });
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.7)",
      opacity: photos.length || videos.length ? 0 : 1
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
  }, t)))));
}
const WORK = [{
  t: "Producción general",
  v: "Eaton Tech Day",
  tags: ["Branding", "Contenido", "Producción técnica"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/eaton-1.jpg", "work/min/eaton-2.jpg", "work/min/eaton-3.jpg"]
}, {
  t: "Evento anual empresa",
  v: "Worktech",
  tags: ["Branding", "Contenido", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/worktech-1.jpg", "work/min/worktech-2.jpg", "work/min/worktech-3.jpg"]
}, {
  t: "Charla Santo Tomás",
  v: "Branding Empresa",
  tags: ["Contenido", "Pantalla", "Branding"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/santotomas-1.jpg", "work/min/santotomas-2.jpg", "work/min/santotomas-3.jpg"]
}, {
  t: "Capacitación Empresa",
  v: "Astara",
  tags: ["Producción técnica", "Contenido"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/astara-1.jpg", "work/min/astara-2.jpg", "work/min/astara-3.jpg"]
}, {
  t: "Walmart Chile",
  v: "Media Server",
  tags: ["Producción técnica", "Contenido visual"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/walmart-1.jpg", "work/min/walmart-2.jpg", "work/min/walmart-3.jpg"]
}, {
  t: "Fiesta Fin de Año",
  v: "Mercado Libre",
  tags: ["Producción", "Pantallas", "Iluminación"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/meli-1.jpg", "work/min/meli-2.jpg", "work/min/meli-3.jpg"]
}, {
  t: "Colombia Travel",
  v: "Activación de turismo",
  tags: ["Producción técnica", "Operador"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/colombia-1.jpg", "work/min/colombia-2.jpg", "work/min/colombia-3.jpg"]
}, {
  t: "Evento Empresa",
  v: "Ciberseguridad",
  tags: ["Operador", "Contenido"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/ciberseg-1.jpg", "work/min/ciberseg-2.jpg", "work/min/ciberseg-3.jpg"]
}, {
  t: "Activaciones de empresas",
  v: "Producción técnica",
  tags: ["Producción", "Media Server", "Visuales"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/activaciones-1.jpg", "work/min/activaciones-2.jpg", "work/min/activaciones-3.jpg"]
}, {
  t: "Junta de doctores",
  v: "Armonic",
  tags: ["Contenido", "Producción", "Broadcast"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/doctores-1.jpg", "work/min/doctores-2.jpg", "work/min/doctores-3.jpg"]
}, {
  t: "Dirección Video Clip",
  v: "Dulsónico",
  tags: ["Dirección de arte", "Edición"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  video: "work/dulsonico-video.mp4"
}, {
  t: "Teletón 2025",
  v: "Gino Mella",
  tags: ["Dirección creativa", "Diseño", "Contenido"],
  cat: "TV",
  beam: ["78,169,255", "255,205,89"],
  video: "work/gino-teleton-video.mp4"
}, {
  t: "Festival Televisado",
  v: "LCT · Festival del Huaso de Olmué",
  tags: ["Programación", "Iluminación"],
  cat: "TV",
  beam: ["78,169,255", "255,205,89"],
  video: "work/televisado-video.mp4"
}, {
  t: "Festival del Huaso de Olmué",
  v: "Garras de Amor",
  tags: ["Operación de iluminación en vivo"],
  cat: "TV",
  beam: ["143,0,255", "78,169,255"],
  video: "work/garras-olmue-video.mp4"
}, {
  t: "Movistar Empresas",
  v: "HISPAM Digital Forum",
  tags: ["Contenido", "3D", "Dirección creativa"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  video: "work/movistar-empresas-video.mp4"
}, {
  t: "Banco BCI",
  v: "Programación de iluminación",
  tags: ["Código de tiempo", "Iluminación"],
  cat: "Corporativo",
  beam: ["78,169,255", "255,205,89"],
  videos: ["work/bci-video-2.mp4", "work/bci-video.mp4"]
}, {
  t: "Festival La Pampilla",
  v: "Pablito Pesadilla",
  tags: ["Iluminación", "+100.000 personas"],
  cat: "Show",
  beam: ["78,169,255", "255,205,89"],
  photos: ["work/min/pampilla-1.png", "work/min/pampilla-2.png", "work/min/pampilla-3.png"]
}, {
  t: "Iluminación y Visuales",
  v: "Pailita",
  tags: ["Diseño", "Programación", "Código de tiempo"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"],
  photos: ["work/min/pailita-1.png", "work/min/pailita-2.png", "work/min/pailita-3.png"]
}, {
  t: "Entremares",
  v: "Arena Monticello",
  tags: ["Dirección de iluminación"],
  cat: "Show",
  beam: ["255,205,89", "143,0,255"],
  photos: ["work/min/entremares-1.jpg", "work/min/entremares-2.jpg", "work/min/entremares-3.jpg"]
}, {
  t: "Movistar Arena",
  v: "LCT · 13 años",
  tags: ["Programación", "Código de tiempo"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/movistar13-1.jpg", "work/min/movistar13-2.jpg"]
}, {
  t: "Producción Técnica",
  v: "Video Clip",
  tags: ["Diseño", "Operación", "Pantalla"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  video: "work/mesostendras-video.mp4"
}, {
  t: "Final ROJO TVN",
  v: "Iluminación en vivo",
  tags: ["Programación", "Iluminación", "TV"],
  cat: "TV",
  beam: ["255,205,89", "143,0,255"],
  video: "work/finalrojo-video.mp4"
}, {
  t: "Video clip en vivo",
  v: "La Combo Tortuga",
  tags: ["Programación", "Iluminación"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"],
  video: "work/lctenvivo-video.mp4"
}, {
  t: "Video clip · LCT",
  v: "Me Sobrabas Tú",
  tags: ["Programación", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  video: "work/mesobrabas-video.mp4"
}, {
  t: "Alanis Lago en vivo",
  v: "Festival del Huaso de Olmué",
  tags: ["Dirección creativa", "Contenido visual"],
  cat: "TV",
  beam: ["78,169,255", "255,205,89"],
  video: "work/alanis-video.mp4"
}, {
  t: "Yandel Sinfónico",
  v: "Festival de Viña 2025",
  tags: ["Operación", "Diseño", "Contenido"],
  cat: "TV",
  beam: ["143,0,255", "255,205,89"],
  video: "work/yandel-video.mp4"
}, {
  t: "Stand Publicitario",
  v: "Branding Chevrolet",
  tags: ["Pantalla", "Contenido visual", "Punto de encuentro"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  video: "work/chevrolet-video.mp4",
  photos: ["work/min/chevrolet-1.jpg"]
}, {
  t: "Hip Hop al Parque · Colombia",
  v: "+65.000 asistentes",
  tags: ["Contenido", "Luz"],
  cat: "Festival",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/hiphop-1.jpg", "work/min/hiphop-2.jpg", "work/min/hiphop-3.jpg"]
}, {
  t: "Meeting Empresa",
  v: "Icare",
  tags: ["Pantalla", "Producción técnica", "Operación"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/icare-1.jpg", "work/min/icare-2.jpg", "work/min/icare-3.jpg"]
}, {
  t: "ChysteMC · 20 años",
  v: "Teatro Coliseo",
  tags: ["Iluminación", "Visuales"],
  cat: "Show",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/chystemc-1.jpg", "work/min/chystemc-2.jpg", "work/min/chystemc-3.jpg"]
}, {
  t: "Experiencia inmersiva de lujo",
  v: "Branding Blue Label",
  tags: ["Pantalla", "Operación", "Audio inmersivo"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/blue-1.jpg", "work/min/blue-2.jpg", "work/min/blue-3.jpg"]
}, {
  t: "Lollapalooza",
  v: "Lara Poyect",
  tags: ["Programación", "Código de tiempo"],
  cat: "Festival",
  beam: ["78,169,255", "255,205,89"],
  photos: ["work/min/lara-1.jpg", "work/min/lara-2.jpg", "work/min/lara-3.jpg"]
}, {
  t: "Conferencia Doctores",
  v: "Breast Cancer Summit",
  tags: ["Media Server", "Branding", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/summit-1.jpg", "work/min/summit-2.jpg", "work/min/summit-3.jpg"]
}, {
  t: "Polima & Pailita",
  v: "Movistar Arena 360",
  tags: ["Dirección creativa", "Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/polima-1.jpg", "work/min/polima-2.jpg", "work/min/polima-3.jpg"]
}, {
  t: "Lanzamiento de Marca",
  v: "Evento corporativo",
  tags: ["Contenido visual", "Producción técnica"],
  cat: "Corporativo",
  beam: ["78,169,255", "143,0,255"],
  photos: ["work/min/muno-1.jpg", "work/min/muno-2.jpg", "work/min/muno-3.jpg"]
}, {
  t: "Festival de Viña",
  v: "Polima Westcoast",
  tags: ["Iluminación", "TV"],
  cat: "TV",
  beam: ["78,169,255", "143,0,255"],
  video: "work/vina-video.mp4"
}, {
  t: "Cuenta Pública",
  v: "Municipalidades",
  tags: ["Operación visuales", "Producción técnica"],
  cat: "Corporativo",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/cuenta-1.jpg", "work/min/cuenta-2.jpg", "work/min/cuenta-3.jpg"]
}, {
  t: "Video clip · 3am",
  v: "La Combo Tortuga",
  tags: ["Diseño", "Código de tiempo"],
  cat: "Show",
  beam: ["255,205,89", "78,169,255"],
  video: "work/combo-video.mp4"
}, {
  t: "Tecate Pal Norte · México",
  v: "DJ Pablito Pesadilla",
  tags: ["Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/tecate-1.jpg", "work/min/tecate-2.jpg", "work/min/tecate-3.jpg"]
}, {
  t: "Pablito Pesadilla",
  v: "Quinta Vergara",
  tags: ["Iluminación"],
  cat: "Show",
  beam: ["143,0,255", "78,169,255"],
  photos: ["work/min/rumble-1.jpg", "work/min/rumble-2.jpg", "work/min/rumble-3.jpg"]
}, {
  t: "DVD En Vivo",
  v: "La Combo Tortuga",
  tags: ["Diseño", "Iluminación", "Programación"],
  cat: "Show",
  beam: ["78,169,255", "255,205,89"],
  video: "work/dvd-video.mp4",
  photos: ["work/min/dvd-1.jpg", "work/min/dvd-2.jpg", "work/min/dvd-3.jpg"]
}, {
  t: "FaceBrooklyn",
  v: "Teatro Coliseo",
  tags: ["Diseño/Iluminación", "Programación", "Operación en vivo"],
  cat: "Show",
  beam: ["143,0,255", "255,205,89"],
  photos: ["work/min/face-1.jpg", "work/min/face-2.jpg"]
}];
function Trabajo() {
  const cats = ["Todo", "Corporativos", "TV y Videos", "Artistas"];
  const [cat, setCat] = useState("Todo");
  const [page, setPage] = useState(0);
  const [fade, setFade] = useState(true); // true = visible
  const PER = 6;
  React.useEffect(() => {
    if (cat !== "Todo") return;
    return undefined;
  }, [cat]);
  const isVideoClip = w => (w.tags || []).includes("Videoclip") || /video\s?clip/i.test(w.t) || /video\s?clip/i.test(w.v || "");
  const CORP_FIRST = ["Experiencia inmersiva de lujo", "Banco BCI", "Stand Publicitario", "Meeting Empresa", "Lanzamiento de Marca", "Junta de doctores", "Conferencia Doctores", "Movistar Empresas"];
  const CORP_LAST = ["Capacitación Empresa", "Producción general"];
  const corpAll = WORK.filter(w => w.cat === "Corporativo").slice().sort((a, b) => {
    const rank = w => {
      const i = CORP_FIRST.indexOf(w.t);
      if (i >= 0) return i;
      return CORP_LAST.indexOf(w.t) >= 0 ? 999 : 99;
    };
    return rank(a) - rank(b);
  });
  const TV_FIRST = ["Yandel Sinfónico", "Producción Técnica", "Final ROJO TVN", "Teletón 2025", "Video clip · 3am", "Festival de Viña"];
  const TV_LAST = ["Festival Televisado", "Festival del Huaso de Olmué"];
  const tvAll = WORK.filter(w => w.cat === "TV" || isVideoClip(w)).slice().sort((a, b) => {
    const rank = w => {
      const i = TV_FIRST.indexOf(w.t);
      if (i >= 0) return i;
      return TV_LAST.indexOf(w.t) >= 0 ? 999 : 99;
    };
    return rank(a) - rank(b);
  });
  const ART_FIRST = ["Festival La Pampilla", "Iluminación y Visuales", "Movistar Arena", "DVD En Vivo", "Tecate Pal Norte · México", "Hip Hop al Parque · Colombia"];
  const artAll = WORK.filter(w => w.cat !== "Corporativo" && w.cat !== "TV" && !isVideoClip(w)).slice().sort((a, b) => {
    const rank = w => {
      const i = ART_FIRST.indexOf(w.t);
      return i < 0 ? 99 : i;
    };
    return rank(a) - rank(b);
  });
  const [mixSeed, setMixSeed] = useState(0);
  const shuffle = React.useCallback((arr, seed) => {
    const a = arr.slice();
    let s = seed * 9301 + 49297;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor(s / 233280 * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }, []);
  const mixed = React.useMemo(() => {
    const pick = shuffle(corpAll.slice(0, 6), mixSeed + 1).slice(0, 4).concat(shuffle(tvAll.slice(0, 6), mixSeed + 2).slice(0, 1)).concat(shuffle(artAll.slice(0, 6), mixSeed + 3).slice(0, 1));
    return shuffle(pick, mixSeed + 4);
  }, [mixSeed, shuffle]);
  const shown = cat === "Todo" ? mixed : cat === "TV y Videos" ? tvAll : cat === "Corporativos" ? corpAll : artAll;
  const pages = Math.max(1, Math.ceil(shown.length / PER));
  React.useEffect(() => {
    setPage(0);
    if (cat === "Todo") setMixSeed(Math.floor(Math.random() * 10000));
  }, [cat]);
  const goToPage = React.useCallback(next => {
    setFade(false); // fade out
    setTimeout(() => {
      setPage(next);
      setFade(true);
    }, 280); // swap while hidden, then fade in
  }, []);
  React.useEffect(() => {
    const AUTO_ADVANCE = true;
    if (pages <= 1 || !AUTO_ADVANCE) return;
    // 3 fotos × 3.3s ≈ 10s por tarjeta → mantener cada página ~10s para alcanzar a mostrar todas
    const id = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setPage(p => (p + 1) % pages);
        setFade(true);
      }, 280);
    }, 10000);
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
    className: "svb-reveal",
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
    tickColor: "var(--svb-violet)",
    style: {
      display: "none"
    }
  }, "Trayectoria \xB7 escenarios reales"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "Lo mejor de nuestro trabajo es verlo en acci\xF3n.")), /*#__PURE__*/React.createElement("div", {
    className: "svb-tabs",
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
    className: "svb-reveal svb-workgrid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: "16px",
      opacity: fade ? 1 : 0,
      transition: "opacity 280ms var(--ease-standard)"
    }
  }, pageItems.map((w, i) => /*#__PURE__*/React.createElement(WorkCard, {
    key: page + "-" + i,
    w: w
  }))), pages > 1 && /*#__PURE__*/React.createElement("div", {
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
    onClick: () => goToPage(i),
    "aria-label": "Página " + (i + 1),
    style: {
      width: i === page ? "28px" : "10px",
      height: "10px",
      padding: 0,
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      border: "none",
      background: i === page ? "var(--svb-white)" : "var(--border-strong)",
      transition: "width var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "26px",
      fontSize: "13px",
      color: "var(--text-meta)",
      maxWidth: "70ch",
      lineHeight: 1.6,
      display: "none"
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
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginBottom: "44px",
      maxWidth: "56ch"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-blue)",
    style: {
      display: "none"
    }
  }, "Tres trayectorias \xB7 una capacidad de marca"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(30px,5vw,52px)",
      color: "var(--svb-white)",
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, "La experiencia nos une.")), /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
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
    hoverPhotos: ["team/min/jaime-hover.png"],
    disciplines: ["Dirección de arte", "Contenido visual", "3D"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Luis Ulloa",
    role: "Producci\xF3n & Media Server",
    accent: "amber",
    photo: "../../assets/team/luis-ulloa.png",
    hoverPhotos: ["team/min/luis-hover.jpg"],
    disciplines: ["Producción general", "Coordinación", "Visuales"]
  }), /*#__PURE__*/React.createElement(FounderCard, {
    name: "Elvis Coloma",
    role: "Iluminaci\xF3n & T\xE9cnica",
    accent: "violet",
    photo: "../../assets/team/elvis-coloma.png",
    hoverPhotos: ["team/min/elvis-2.jpg"],
    disciplines: ["Diseño de luz", "Programación", "Escenario"]
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });
  const field = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const DEST = "hola@svblime.cl";
  const submit = e => {
    e.preventDefault();
    if (sending) return;
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError("Completa nombre, email y mensaje.");
      return;
    }
    setSending(true);
    setError("");
    const data = new FormData();
    data.append("Nombre", form.nombre);
    data.append("Email", form.email);
    data.append("Mensaje", form.mensaje);
    data.append("_subject", "Nuevo contacto desde svblime.cl - " + form.nombre);
    data.append("_template", "table");
    data.append("_captcha", "false");
    fetch("https://formsubmit.co/ajax/" + DEST, {
      method: "POST",
      body: data
    }).then(function (r) {
      return r.json().catch(function () {
        return {
          success: r.ok ? "true" : "false"
        };
      });
    }).then(function (j) {
      if (String(j.success) === "true" || j.message && /success/i.test(j.message)) {
        setSent(true);
      } else {
        setError((j.message || "No pudimos enviar el mensaje.") + " Escríbenos directo a " + DEST + ".");
      }
    }).catch(function (err) {
      setError("No pudimos enviar el mensaje (" + (err && err.message ? err.message : "error de red") + "). Escríbenos directo a " + DEST + ".");
    }).then(function () {
      setSending(false);
    });
  };
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
      ...stage("143,0,255", "78,169,255"),
      padding: "var(--section-y) clamp(20px,5vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
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
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tickColor: "var(--svb-violet)"
  }, "Recibido"), /*#__PURE__*/React.createElement("p", {
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
    onSubmit: submit,
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
    variant: "secondary",
    size: "lg",
    type: "submit",
    onClick: submit,
    disabled: sending,
    style: {
      marginTop: "6px",
      alignSelf: "flex-start",
      opacity: sending ? 0.6 : 1,
      pointerEvents: sending ? "none" : "auto"
    }
  }, sending ? "Enviando…" : "Enviar"), error ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      lineHeight: 1.6,
      color: "var(--svb-amber)"
    }
  }, error, " ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:" + DEST,
    style: {
      color: "var(--svb-blue)"
    }
  }, "Abrir correo")) : null))));
}

/* ============================ Footer ============================ */
function BrandMarquee() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-stage)",
      borderTop: "1px solid var(--border-default)",
      padding: "clamp(28px,4vw,48px) 0",
      overflow: "hidden",
      position: "relative",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "max-content",
      animation: "svbMarquee 34s linear infinite"
    }
  }, [0, 1].map(rep => /*#__PURE__*/React.createElement("div", {
    key: rep,
    "aria-hidden": rep === 1,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(40px,6vw,88px)",
      padding: "0 clamp(20px,3vw,44px)"
    }
  }, ["rock-out", "claro", "muno-bx", "premios-pulsar", "flow-fest", "pailita", "vitacura", "pod", "lollapalooza", "knotfest", "carolina-herrera", "copec", "pedro-aguirre-cerda", "wailers", "pudahuel", "shishi-gang", "tecate", "stellantis", "myriam-hernandez", "akriila", "axon-pharma", "jere-klein", "billboard", "chystemc", "combo-tortuga", "provetec", "resistance", "ultra", "carin-leon", "tvn", "nanpa-basico", "blue-label", "hilaria", "polima-westcoast", "inacap", "ipchile", "lotus", "breast-cancer", "vina-fest", "shamanes", "garras-amor", "crush-music", "chevrolet", "onyx", "caja-los-andes", "huaso-olmue", "alanys-lagos", "lara-project", "armonic", "yandel-artist", "facebrooklyn", "zumbale-primo", "entel"].map((b, bi) => /*#__PURE__*/React.createElement("span", {
    key: b,
    className: "svb-brand",
    style: {
      ["--m"]: "url(brands/" + b + ".png)",
      ["--c"]: ["var(--svb-blue)", "var(--svb-amber)", "var(--svb-violet)"][bi % 3]
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "brands/" + b + ".png",
    alt: b,
    loading: "lazy",
    decoding: "async",
    style: {
      height: "calc(clamp(22px,2.4vw,30px) * " + ({
        "carolina-herrera": 1.75,
        "vitacura": 1.9,
        "armonic": 2.0,
        "chevrolet": 1.75,
        "blue-label": 1.55,
        "hilaria": 1.9,
        "pudahuel": 1.25,
        "claro": 1.3,
        "provetec": 1.55,
        "onyx": 1.5,
        "pod": 1.2,
        "chystemc": 1.7,
        "tecate": 1.7,
        "huaso-olmue": 1.6,
        "myriam-hernandez": 1.1,
        "flow-fest": 1.5,
        "jere-klein": 1.1,
        "wailers": 1.3,
        "zumbale-primo": 1.15,
        "polima-westcoast": 1.4,
        "lara-project": 1.35,
        "nanpa-basico": 1.3,
        "alanys-lagos": 1.3,
        "yandel-artist": 1.4,
        "pailita": 1.15,
        "shamanes": 1.15,
        "premios-pulsar": 1.45,
        "rock-out": 1.05,
        "knotfest": 1.1,
        "vina-fest": 1.2,
        "shishi-gang": 1.6,
        "garras-amor": 1.0,
        "combo-tortuga": 1.3,
        "crush-music": 1.4
      }[b] || 1) + ")",
      width: "auto",
      objectFit: "contain",
      opacity: 0.8,
      display: "block"
    }
  })))))), /*#__PURE__*/React.createElement("style", null, "@keyframes svbMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"));
}
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
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "18px",
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      color: "var(--svb-white)",
      maxWidth: "620px"
    }
  }, "SVBLIME existe para que ninguna gran idea se pierda."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.14em",
      color: "var(--text-meta)"
    }
  }, "Chile \xB7 2026")));
}

/* ============================ Site ============================ */
function Site() {
  const [loading, setLoading] = React.useState(true);
  const goContact = () => {
    window.location.hash = "#contacto";
  };
  React.useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }
  }, [loading]);
  // Scroll-reveal: elements animate in as they enter, and back out as they leave —
  // in both scroll directions. Direction sets whether they rise or sink.
  React.useEffect(() => {
    let lastY = window.scrollY;
    const io = new IntersectionObserver(entries => {
      const goingDown = window.scrollY >= lastY;
      lastY = window.scrollY;
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove("out-up", "out-down");
          e.target.classList.add("in");
        } else {
          e.target.classList.remove("in");
          e.target.classList.add(goingDown ? "out-up" : "out-down");
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    const scan = () => document.querySelectorAll(".svb-reveal").forEach(el => io.observe(el));
    scan();
    const t = setTimeout(scan, 400);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [loading]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-page)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("style", null, ".svb-reveal{opacity:0;transform:translateY(40px) scale(0.985);transition:opacity 850ms cubic-bezier(0.16,1,0.3,1),transform 850ms cubic-bezier(0.16,1,0.3,1)}.svb-reveal.in{opacity:1;transform:none}.svb-reveal.out-up{opacity:0;transform:translateY(-40px) scale(0.985)}.svb-reveal.out-down{opacity:0;transform:translateY(40px) scale(0.985)}@media(prefers-reduced-motion:reduce){.svb-reveal{opacity:1!important;transform:none!important}}.svb-gcap{opacity:0;transition:opacity 280ms ease}.svb-gitem:hover .svb-gcap{opacity:1;transition:opacity 320ms ease 700ms}.svb-gitem:hover img,.svb-gitem:hover video{opacity:1!important}"), loading && /*#__PURE__*/React.createElement(LoadingScreen, {
    onDone: () => setLoading(false)
  }), /*#__PURE__*/React.createElement(Header, {
    onCta: goContact
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement("section", {
    id: "agencia",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)",
      background: "radial-gradient(90% 80% at 12% 0%, rgba(78,169,255,0.10), transparent 55%), radial-gradient(80% 90% at 92% 100%, rgba(143,0,255,0.12), transparent 55%), radial-gradient(70% 70% at 60% 40%, rgba(255,205,89,0.05), transparent 60%), var(--bg-page)",
      borderTop: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "var(--spectrum)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svb-reveal",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      textAlign: "center",
      marginInline: "auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(28px,4vw,52px)",
      color: "var(--svb-white)",
      lineHeight: 1.06,
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: "45px",
      display: "none",
      letterSpacing: "-0.01em"
    }
  }, "Va m\xE1s all\xE1 de las luces, pantallas y la producci\xF3n."), "Lo que merece ser recordado,", /*#__PURE__*/React.createElement("br", null), "lo hacemos realidad."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "clamp(15px,1.4vw,18px)",
      lineHeight: 1.7,
      color: "var(--text-body)"
    }
  }, "Transformamos tus ideas en experiencias que inspiran, conectan e impactan, con un prop\xF3sito: ", /*#__PURE__*/React.createElement("em", null, "hacerlas inolvidables."))))), /*#__PURE__*/React.createElement(Pilares, null), /*#__PURE__*/React.createElement(LineUp, null), /*#__PURE__*/React.createElement(Trabajo, null), /*#__PURE__*/React.createElement(Equipo, null), /*#__PURE__*/React.createElement(Contacto, null), /*#__PURE__*/React.createElement(Footer, null));
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
