import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./dashboard.css";
import "./analytics.css";
import SalesChart from "./SalesChart";
import { translations } from "./translations"; 
import { themes } from "./themes";
import VisitorsVsSalesChart from "./VisitorsVsSalesChart";
import TripleComparisonChart from "./TripleComparisonChart";


function Dashboard() {
  // قراءة القيم من localStorage أو افتراضية
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "ENGLISH";
  });
  const [darkIcon, setDarkIcon] = useState(() => {
    return localStorage.getItem("darkIcon") === "true" ? true : false;
  });

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); 

  const dropdownRef = useRef(null);
  const arrowRef = useRef(null);
  const headerRef = useRef(null);

  // حفظ اللغة واللون عند التغيير
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("darkIcon", darkIcon);
  }, [darkIcon]);

  // GSAP animation لما يفتح / يقفل dropdown
  useEffect(() => {
    if (langDropdownOpen) {
      gsap.to(arrowRef.current, { rotation: 180, duration: 0.3 });
      gsap.fromTo(
        dropdownRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    } else {
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3 });
      if (dropdownRef.current)
        gsap.to(dropdownRef.current, { y: -20, opacity: 0, duration: 0.3 });
    }
  }, [langDropdownOpen]);

  // تطبيق الثيم عند التحميل أو عند تغيير darkIcon
  useEffect(() => {
    const theme = darkIcon ? themes.dark : themes.light;
    Object.entries(theme).forEach(([variable, value]) => {
      document.documentElement.style.setProperty(variable, value);
    });
  }, [darkIcon]);



  useEffect(() => {
  let wasSmallScreen = window.innerWidth <= 1024; // الحالة الأولية

  const runAnimation = () => {
    const tl = gsap.timeline();
    const width = window.innerWidth;

    // إعادة ضبط header-center لمكانه الطبيعي
    gsap.set(".header-center", { clearProps: "all" });

    if (width <= 1024) {
      // للشاشات الصغيرة
      tl.fromTo(
        [".header-right", ".header-left"],
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      ).fromTo(
        ".header-center",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "+=0.02"
      );
    } else {
      // للشاشات الكبيرة
      tl.fromTo(
        [".header-right", ".header-left"],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        ".header-center",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "+=0.02"
      );
    }
  };

  // تشغيل الأنميشن عند التحميل أول مرة
  runAnimation();

  const handleResize = () => {
    const isSmallScreen = window.innerWidth <= 1024;

    // نفذ الأنميشن فقط إذا تغير الوضع (كبير → صغير أو صغير → كبير)
    if (isSmallScreen !== wasSmallScreen) {
      gsap.killTweensOf([".header-right", ".header-left", ".header-center"]);
      runAnimation();
      wasSmallScreen = isSmallScreen; // تحديث الحالة
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  // لاختلاط التنسيقات
  useEffect(() => {
    document.body.classList.add("dashboard","home", "other-page");
    document.documentElement.classList.add("dashboard","home", "other-page");

    return () => {
      document.body.classList.remove("dashboard");
      document.documentElement.classList.remove("dashboard");
    };
  }, []);

  return (
    <div className="dashboard">
  
      <header className="dashboard-header"ref={headerRef} >
        {/* ===== الجزء اليمين: Language Switcher ===== */}
        <div className="header-right">
          <button
            className="language-btn"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            {translations[language === "ENGLISH" ? "EN" : "AR"].languageBtn} 
            <i className="fas fa-chevron-down" ref={arrowRef}></i>
          </button>

          {langDropdownOpen && (
            <div className="language-dropdown" ref={dropdownRef}>
              <div
                className="language-option"
                onClick={() => {
                  setLanguage(language === "ENGLISH" ? "ARABIC" : "ENGLISH");
                  setLangDropdownOpen(false);
                }}
              >
                {translations[language === "ENGLISH" ? "EN" : "AR"].otherLanguage}
                <i className="fas fa-globe"></i>
              </div>
            </div>
          )}
        </div>

        {/* ===== الجزء النص: التابات الثلاثة ===== */}
        <div className="header-center">
          {translations[language === "ENGLISH" ? "EN" : "AR"].tabs.map((tabText, index) => {
            const icons = ["fas fa-user", "fas fa-box", "fas fa-cog"];
            return (
              <div
                key={index}
                className={`tab ${activeTab === index ? "active-tab" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                <i className={icons[index]}></i> {tabText}
              </div>
            );
          })}
        </div>

        {/* ===== الجزء اليسار: أيكون لتغيير اللون ===== */}
        <div className="header-left">
          <button
            className="color-toggle-btn"
            onClick={() => setDarkIcon(!darkIcon)}
          >
            {darkIcon ? (
              <i className="fas fa-moon" style={{ color: "#d9dee1" }}></i>
            ) : (
              <i className="fas fa-sun" style={{ color: "#1a1a1a" }}></i>
            )}
          </button>
        </div>
      </header>
       {/* ===== محتوى كل تاب ===== */}
<div className="tab-content">
  {activeTab === 0 && (
  <div className="analytics-page">

    <h1 className="analytics-title">
      📊 Analytics Dashboard
    </h1>

    <div className="analytics-grid">

      {/* الرسم 1 */}
      <div className="chart-card">
        <SalesChart />
      </div>

      {/* الرسم 2 */}
      <div className="chart-card">
        <VisitorsVsSalesChart />
      </div>

      {/* الرسم 3 */}
      <div className="chart-card">
        <TripleComparisonChart />
      </div>

      {/* الأزرار */}
      <div className="analytics-buttons">
        <button className="big-btn">
          <i className="fas fa-users"></i>
          Customers Data
        </button>

        <button className="big-btn">
          <i className="fas fa-chart-line"></i>
          Business Insights
        </button>
      </div>

    </div>
  </div>
)}

  {activeTab === 1 && <div>Hollo Date</div>}
  {activeTab === 2 && <div>Hollo Protect</div>}
</div>

    </div>
  );
}

export default Dashboard;
