import { useState, useEffect, useRef } from "react";

// Colors palette
const colors = {
  orange: "#FF4D1C",
  beige: "#F5F0E8",
  white: "#FFFFFF",
  black: "#000000",
};

const bioText = "Brand Designer passionné par la création d'identités visuelles authentiques et stratégiques. Avec plus de 3 ans d'expérience, je transforme des visions en branding mémorables qui incarnent l'essence de chaque marque. Spécialisé en design graphique, création de logos et systèmes visuels cohérents, je travaille avec des startups, PME et marques naissantes pour créer des identités qui font la différence.";

const portfolioContext = `Tu es l'assistant IA du portfolio de Wilfried Dossou, un Brand Designer basé à Abidjan, Côte d'Ivoire.

PROFIL :
- Nom : Wilfried Dossou
- Titre : Brand Designer
- Localisation : Abidjan, Côte d'Ivoire
- Expérience : 3+ ans en création d'identités visuelles
- Email : dossouwilfried22@gmail.com
- Téléphone : +225 07 12 76 39 06

SPÉCIALISATION :
- Création de logos et identités visuelles
- Branding stratégique
- Palettes chromatiques et typographie
- Design systems et guidelines
- Print et web design

SERVICES :
- Design graphique professionnel
- Branding complet pour startups et PME
- Identités visuelles pour marques naissantes
- Systèmes de design cohérents
- Conseils en direction artistique

COMPÉTENCES TECHNIQUES :
- Adobe Photoshop, Adobe Illustrator
- Figma, Canva
- ChatGPT, Claude Code, Gemini

RÉSEAUX SOCIAUX :
- Instagram : Will'Art
- TikTok : Will'Art
- Facebook : Will'Art

Réponds toujours en français, de façon professionnelle mais chaleureuse. Sois concis et précis. Si quelqu'un te pose une question hors-sujet, redirige vers le portfolio.`;

export default function WilfriedPortfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour 👋 Bienvenue sur mon portfolio ! Posez-moi vos questions sur mes services, mes projets ou mon expertise en branding.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 100);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input;
    if (!userMsg.trim() || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: portfolioContext,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Désolé, une erreur est survenue.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Une erreur est survenue. Veuillez réessayer." },
      ]);
    }
    setLoading(false);
  };

  const navItems = ["home", "about", "work", "skills", "contact"];
  const navLabels = {
    home: "Accueil",
    about: "À propos",
    work: "Projets",
    skills: "Compétences",
    contact: "Contact",
  };

  const competences = [
    { name: "Branding & Logo Design", level: 98 },
    { name: "Identité Visuelle", level: 97 },
    { name: "Adobe Photoshop", level: 95 },
    { name: "Adobe Illustrator", level: 93 },
    { name: "Design Systems", level: 92 },
    { name: "Figma", level: 90 },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: colors.white, minHeight: "100vh", color: colors.black, overflow: "hidden" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .nav-btn { transition: all 0.3s ease; }
        .nav-btn:hover { color: ${colors.orange} !important; }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255, 77, 28, 0.2); }
        .project-card { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .project-card:hover { transform: translateY(-8px); }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: `${colors.white}`, borderBottom: `1px solid ${colors.beige}` }}>
        <div style={{ fontSize: 18, fontWeight: 900, color: colors.orange, letterSpacing: -1 }}>
          Will'Art
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {navItems.map((key) => (
            <button
              key={key}
              className="nav-btn"
              onClick={() => setActiveSection(key)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                color: activeSection === key ? colors.orange : colors.black,
                transition: "all 0.2s",
              }}
            >
              {navLabels[key]}
            </button>
          ))}
        </div>
        <button
          onClick={() => setChatOpen(true)}
          style={{
            background: colors.orange,
            color: colors.white,
            border: "none",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Questions ?
        </button>
      </nav>

      {/* MAIN */}
      <main style={{ paddingTop: 80, minHeight: "100vh", opacity: animIn ? 1 : 0, transform: animIn ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>

        {/* HOME */}
        {activeSection === "home" && (
          <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 80px)", textAlign: "center", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
            {/* Background decoration */}
            <div style={{ position: "absolute", top: -200, right: -200, width: 400, height: 400, borderRadius: "50%", background: colors.beige, opacity: 0.5, zIndex: 0 }} />
            <div style={{ position: "absolute", bottom: -150, left: -150, width: 300, height: 300, borderRadius: "50%", background: colors.orange, opacity: 0.08, zIndex: 0 }} />

            <div style={{ position: "relative", zIndex: 1, animation: "fadeUp 0.8s ease both" }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: colors.orange, marginBottom: 20, textTransform: "uppercase" }}>
                Brand Designer
              </div>

              <h1 style={{ fontSize: "clamp(42px, 8vw, 72px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: -2 }}>
                Créer l'identité
                <br />
                <span style={{ color: colors.orange }}>de votre marque</span>
              </h1>

              <p style={{ fontSize: 17, color: "#666", maxWidth: 550, lineHeight: 1.7, margin: "0 0 40px" }}>
                Je transforme vos visions en identités visuelles mémorables qui incarnent l'essence de votre marque.
              </p>

              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 60, flexWrap: "wrap" }}>
                <button
                  className="cta"
                  onClick={() => setActiveSection("work")}
                  style={{
                    padding: "14px 32px",
                    borderRadius: 8,
                    background: colors.orange,
                    color: colors.white,
                    border: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Voir mes projets →
                </button>
                <button
                  className="cta"
                  onClick={() => setActiveSection("contact")}
                  style={{
                    padding: "14px 32px",
                    borderRadius: 8,
                    background: colors.beige,
                    color: colors.black,
                    border: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Me contacter
                </button>
              </div>

              <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
                {[{ n: "4+", l: "Projets réalisés" }, { n: "3+", l: "Ans d'expérience" }, { n: "100%", l: "Satisfaction" }].map(({ n, l }) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: colors.orange }}>{n}</div>
                    <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px", animation: "fadeUp 0.6s ease both" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: colors.orange, marginBottom: 16, textTransform: "uppercase" }}>
              À propos
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", marginBottom: 60 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "100%", maxWidth: 280, aspectRatio: "1/1", borderRadius: 20, overflow: "hidden", background: colors.beige, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <img src="https://res.cloudinary.com/dvzr8kngp/image/upload/v1777635009/1777301177387_cpha4g.png" alt="Wilfried Dossou" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: 12, color: "#999", textAlign: "center" }}>Wilfried Dossou<br/>Brand Designer</div>
              </div>

              <div>
                <h2 style={{ fontSize: 36, fontWeight: 900, margin: "0 0 20px", lineHeight: 1.1 }}>
                  Votre vision,
                  <br />
                  <span style={{ color: colors.orange }}>mon expertise</span>
                </h2>
                <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                  {bioText}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
                  {["Branding", "Logo Design", "Identité Visuelle", "Design System", "Direction Artistique"].map((t) => (
                    <span key={t} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: colors.beige, color: colors.black }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
              {[{ icon: "✓", title: "Expérience", desc: "3+ ans dans le branding" }, { icon: "✓", title: "Expertise", desc: "Identités visuelles stratégiques" }, { icon: "✓", title: "Passion", desc: "Créativité sans limites" }].map(({ icon, title, desc }) => (
                <div key={title} style={{ padding: 24, borderRadius: 12, background: colors.beige, textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WORK */}
        {activeSection === "work" && (
          <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", animation: "fadeUp 0.6s ease both" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: colors.orange, marginBottom: 8, textTransform: "uppercase" }}>
              Mes travaux
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 48px" }}>
              Projets <span style={{ color: colors.orange }}>sélectionnés</span>
            </h2>

            {/* PROJECT 1 - HK by Harmonie */}
            <div style={{ marginBottom: 80 }}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>HK by Harmonie</h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, maxWidth: 700, marginBottom: 16 }}>
                  Marque de prêt-à-porter féminine incarnant l'élégance africaine, la douceur et l'harmonie. Une identité visuelle sophistiquée destinée aux femmes de 18 à 35 ans.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Illustrator", "Photoshop", "ChatGPT", "Gemini"].map((tool) => (
                    <span key={tool} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: colors.beige, color: colors.black }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {[
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631385/HK_-_1_Plan_de_travail_1_livf8c.png", title: "Présentation" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631384/HK_-_2_Plan_de_travail_1_copie_wkicrn.png", title: "Contexte" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631385/HK-_1_Plan_de_travail_1_copie_2_gsnmlr.png", title: "Logo Variantes" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631385/HK_-_4_Plan_de_travail_1_copie_3_vmjmpj.png", title: "Couleurs & Typos" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631393/HK_-_5_Plan_de_travail_1_copie_4_oiyjut.png", title: "Etiquette" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631438/HK_-_6_Plan_de_travail_1_copie_5_qw1y04.png", title: "Mockup Tag" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631503/HK_-_7_Plan_de_travail_1_copie_36_qilagb.png", title: "Sac Packaging" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631467/HK_-_8_Plan_de_travail_1_copie_37_seutm6.png", title: "Cartes" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777631436/HK_-_9_Plan_de_travail_1_copie_38_latta9.png", title: "Logo Principal" },
                ].map((item, i) => (
                  <div key={i} className="project-card" style={{ borderRadius: 12, overflow: "hidden", background: colors.beige, cursor: "pointer" }}>
                    <div style={{ width: "100%", height: 240, background: colors.beige, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: colors.black }}>{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROJECT 2 - MOVEA */}
            <div style={{ marginBottom: 80 }}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>MOVEA Abidjan</h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, maxWidth: 700, marginBottom: 16 }}>
                  Service de mobilité urbaine dédiée à faciliter les déplacements au quotidien. Une identité visuelle dynamique, moderne, accessible et fiable avec une approche fluide et contemporaine.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Illustrator", "Photoshop"].map((tool) => (
                    <span key={tool} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: colors.beige, color: colors.black }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {[
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632574/MOVEA_-_1_Plan_de_travail_1_copie_6_esnl85.png", title: "Présentation" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632491/MOVEA_-_2_Plan_de_travail_1_copie_7_jfbw4r.png", title: "Contexte" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632635/MOVEA-_3_Plan_de_travail_1_copie_8_pn78u4.png", title: "Logo Variantes" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632555/MOVEA_-_4_Plan_de_travail_1_copie_9_wmv8fo.png", title: "Couleurs & Typos" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632546/MOVEA_-_5_Plan_de_travail_1_copie_10_ochd3s.png", title: "Véhicule Mockup" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632702/MOVEA_-_6png_Plan_de_travail_1_copie_11_xpu3m9.png", title: "Réel en Rue" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632740/MOVEA_-_7_Plan_de_travail_1_copie_33_saagzx.png", title: "App Mobile" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632696/MOVEA_-_8_Plan_de_travail_1_copie_34_ej50g2.png", title: "Billboard" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632722/MOVEA_-_9_Plan_de_travail_1_copie_35_azbkuy.png", title: "Logo Principal" },
                ].map((item, i) => (
                  <div key={i} className="project-card" style={{ borderRadius: 12, overflow: "hidden", background: colors.beige, cursor: "pointer" }}>
                    <div style={{ width: "100%", height: 240, background: colors.beige, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: colors.black }}>{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROJECT 3 - RACINE */}
            <div style={{ marginBottom: 80 }}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>RACINE</h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, maxWidth: 700, marginBottom: 16 }}>
                  Cabinet de médecine naturelle dédié au bien-être et à la santé durable des adultes. Une identité visuelle minimaliste et épurée inspirée par l'équilibre naturel et le retour à l'essentiel.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Illustrator", "Photoshop", "ChatGPT"].map((tool) => (
                    <span key={tool} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: colors.beige, color: colors.black }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {[
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632986/RACINE_2_twv2wa.png", title: "Contexte" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632992/RACINE1_ld2tz3.png", title: "Présentation" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632992/RACINE4_uytx8e.png", title: "Logo Principal" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777632993/RACINE5_ipcjtv.png", title: "Mockups Print" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633115/RACINE_7_qofyqy.png", title: "Logo Variantes" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633027/RACINE6_gyfebn.png", title: "Couleurs & Typos" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633121/RACINE9_oaqpcc.png", title: "Signalétique" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633122/RACINE10_zl6nrq.png", title: "Site Web" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633126/RACINE8_od41kh.png", title: "Web Responsive" },
                ].map((item, i) => (
                  <div key={i} className="project-card" style={{ borderRadius: 12, overflow: "hidden", background: colors.beige, cursor: "pointer" }}>
                    <div style={{ width: "100%", height: 240, background: colors.beige, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: colors.black }}>{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROJECT 4 - DÉPARTEMENT DES SCIENCES ÉCONOMIQUES */}
            <div style={{ marginBottom: 80 }}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Département des Sciences Économiques</h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, maxWidth: 700, marginBottom: 16 }}>
                  Identité visuelle institutionnelle pour le département des sciences économiques de l'Institut Universitaire d'Abidjan. Une approche moderne et académique reflétant crédibilité, rigueur et dynamisme.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Illustrator", "Photoshop", "Gemini"].map((tool) => (
                    <span key={tool} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: colors.beige, color: colors.black }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {[
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633402/ECO_-_1_Plan_de_travail_1_copie_12_lezomw.png", title: "Présentation" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633511/ECO_-_2_Plan_de_travail_1_copie_13_f5grwp.png", title: "Contexte" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633526/ECO_-_3_Plan_de_travail_1_copie_14_ldzalz.png", title: "Logo Principal" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633434/ECO_-_4_Plan_de_travail_1_copie_15_jfovom.png", title: "Logo Variantes" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633459/ECO_-5_Plan_de_travail_1_copie_16_xokbqx.png", title: "Mockups Print" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633534/ECO_-_6_Plan_de_travail_1_copie_17_qzaca4.png", title: "Signalétique" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633537/ECO_-_7_Plan_de_travail_1_copie_39_lsxaj7.png", title: "Affiche" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633541/ECO_-_8_Plan_de_travail_1_copie_40_zb7h27.png", title: "Couleurs & Typos" },
                  { img: "https://res.cloudinary.com/dvzr8kngp/image/upload/v1777633550/ECO_-9_Plan_de_travail_1_copie_41_ecazdt.png", title: "Site Web" },
                ].map((item, i) => (
                  <div key={i} className="project-card" style={{ borderRadius: 12, overflow: "hidden", background: colors.beige, cursor: "pointer" }}>
                    <div style={{ width: "100%", height: 240, background: colors.beige, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: colors.black }}>{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SKILLS */}
        {activeSection === "skills" && (
          <section style={{ maxWidth: 700, margin: "0 auto", padding: "80px 24px", animation: "fadeUp 0.6s ease both" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: colors.orange, marginBottom: 8, textTransform: "uppercase" }}>
              Compétences
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 48px" }}>
              Mon <span style={{ color: colors.orange }}>expertise</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {competences.map((s, i) => (
                <div key={s.name} style={{ animation: `fadeUp 0.6s ease ${i * 0.1}s both` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: colors.orange }}>{s.level}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 6, background: colors.beige, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 6, background: colors.orange, width: `${s.level}%`, transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT */}
        {activeSection === "contact" && (
          <section style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px", textAlign: "center", animation: "fadeUp 0.6s ease both" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: colors.orange, marginBottom: 16, textTransform: "uppercase" }}>
              Contact
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 16px" }}>
              Parlons de votre
              <br />
              <span style={{ color: colors.orange }}>projet</span>
            </h2>
            <p style={{ color: "#555", lineHeight: 1.7, marginBottom: 40, fontSize: 15 }}>
              Vous avez une idée ? Contactez-moi pour discuter de votre projet de branding. Je suis disponible pour des collaborations intéressantes.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {[{ icon: "✉️", label: "Email", value: "dossouwilfried22@gmail.com" }, { icon: "📱", label: "Téléphone", value: "+225 07 12 76 39 06" }, { icon: "📍", label: "Localisation", value: "Abidjan, Côte d'Ivoire" }].map((item) => (
                <div key={item.label} style={{ padding: 16, borderRadius: 12, background: colors.beige, textAlign: "left", display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              {[{ icon: "f", label: "Facebook", handle: "Will'Art" }, { icon: "🎵", label: "TikTok", handle: "Will'Art" }, { icon: "📷", label: "Instagram", handle: "Will'Art" }].map((social) => (
                <div key={social.label} style={{ flex: 1, padding: 12, borderRadius: 8, background: colors.beige, textAlign: "center" }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{social.icon}</div>
                  <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>{social.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{social.handle}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setChatOpen(true)}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 8,
                background: colors.orange,
                color: colors.white,
                border: "none",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Poser une question →
            </button>
          </section>
        )}

      </main>

      {/* CHAT */}
      {chatOpen && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, width: "100%", maxWidth: 380, maxHeight: "70vh", borderRadius: 16, background: colors.white, border: `1px solid ${colors.beige}`, display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
          <div style={{ padding: 16, borderBottom: `1px solid ${colors.beige}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Questions pour Wilfried</div>
            <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: 12, background: msg.role === "user" ? colors.orange : colors.beige, color: msg.role === "user" ? colors.white : colors.black, fontSize: 13, lineHeight: 1.5 }}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: 12, borderTop: `1px solid ${colors.beige}`, display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Votre question..."
              style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: `1px solid ${colors.beige}`, fontSize: 12, outline: "none" }}
            />
            <button onClick={() => sendMessage()} disabled={loading} style={{ padding: "10px 14px", borderRadius: 8, background: colors.orange, color: colors.white, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
              {loading ? "..." : "→"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
