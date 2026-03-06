// BusinessInsights.jsx
import "./Business.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect } from "react";
import gsap from "gsap";
import { translations } from "./translations";

export default function BusinessInsights({ changePage, lang }) {
  const t = translations[lang];

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".business-header",
      { y: -120, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
    .fromTo(
      ".summary-card",
      { y: 80, opacity: 0, rotateX: 60 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.15, ease: "power4.out" },
      "-=0.3"
    )
    .fromTo(
      ".glass-card",
      { scale: 0.5, opacity: 0, rotateY: 30 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 0.6, stagger: 0.15, ease: "elastic.out(1, 0.6)" },
      "-=0.4"
    );
  }, []);

  return (
    <div className="business-page">

      {/* HEADER */}
      <div className="business-header">
        <button className="back-btn" onClick={() => changePage("dashboard")}>
          <i className="fas fa-arrow-left"></i>
        </button>

        <h1>📊 {t.charts.businessInsights}</h1>
        <p>
          {lang === "EN"
            ? "Track your store performance and discover growth opportunities."
            : "تابع أداء متجرك واكتشف فرص النمو"}
        </p>
      </div>

      {/* BIG SUMMARY */}
      <div className="summary-grid">
        <div className="summary-card big">
          <i className="fas fa-dollar-sign"></i>
          <div>
            <p>{t.charts.revenue}</p>
            <h2>$12,450</h2>
          </div>
        </div>

        <div className="summary-card">
          <i className="fas fa-shopping-bag"></i>
          <div>
            <p>{t.charts.orders}</p>
            <h2>320</h2>
          </div>
        </div>

        <div className="summary-card">
          <i className="fas fa-users"></i>
          <div>
            <p>{t.charts.visitors}</p>
            <h2>4,200</h2>
          </div>
        </div>

        <div className="summary-card">
          <i className="fas fa-exclamation-triangle"></i>
          <div>
            <p>{t.charts.cartAbandoned}</p>
            <h2>28%</h2>
          </div>
        </div>
      </div>

      {/* MID GRID */}
      <div className="business-grid">

        {/* FUNNEL */}
        <div className="glass-card wide funnel-card">
          <h3>{lang === "EN" ? "Customer Funnel" : "مسار العميل"}</h3>
          <div className="funnel">
            <div className="funnel-step">
              <span className="funnel-label">{t.charts.visitors}</span>
              <strong className="funnel-value">1000</strong>
            </div>
            <div className="funnel-step">
              <span className="funnel-label">{lang === "EN" ? "Add to Cart" : "إضافة للسلة"}</span>
              <strong className="funnel-value">320</strong>
            </div>
            <div className="funnel-step">
              <span className="funnel-label">{lang === "EN" ? "Checkout" : "الدفع"}</span>
              <strong className="funnel-value">150</strong>
            </div>
            <div className="funnel-step">
              <span className="funnel-label">{t.charts.orders}</span>
              <strong className="funnel-value">80</strong>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="glass-card">
          <h3>{lang === "EN" ? "Best Time To Sell" : "أفضل وقت للبيع"}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={[
              { name: "Mon", value: 120 },
              { name: "Tue", value: 200 },
              { name: "Wed", value: 150 },
              { name: "Thu", value: 280 },
              { name: "Fri", value: 350 },
              { name: "Sat", value: 400 },
              { name: "Sun", value: 300 }
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="var(--price-color)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CUSTOMERS */}
        <div className="glass-card">
          <h3>{lang === "EN" ? "Customers" : "العملاء"}</h3>
          <div className="customer-grid">
            <div className="customer-box">{lang === "EN" ? "New :65%" : "جدد :%65"}</div>
            <div className="customer-box">{lang === "EN" ? "Returning: 35%" : "عائدين:% 35"}</div>
            <div className="customer-box">{lang === "EN" ? "Avg Order : $42" : "متوسط الطلب : $42"}</div>
            <div className="customer-box">{lang === "EN" ? "Top City: Cairo" : "أفضل مدينة: القاهره"}</div>
          </div>
        </div>

        {/* ALERTS */}
        <div className="glass-card alert">
          <h3>{lang === "EN" ? "Alerts" : "تنبيهات"}</h3>
          <ul>
            <li>{lang === "EN" ? "Cart abandonment is high" : "نسبة ترك السلة مرتفعة"}</li>
            <li>{lang === "EN" ? "Blue Jacket underperforming" : "جاكيت أزرق ضعيف المبيعات"}</li>
          </ul>
        </div>

        {/* SUGGESTIONS */}
        <div className="glass-card suggestion">
          <h3>{lang === "EN" ? "Suggestions" : "اقتراحات"}</h3>
          <ul>
            <li>{lang === "EN" ? "Run discount on Black Hoodie" : "اعمل خصم على الهودي الأسود"}</li>
            <li>{lang === "EN" ? "Improve checkout UX" : "حسّن تجربة الدفع"}</li>
            <li>{lang === "EN" ? "Launch Facebook Ads" : "ابدأ إعلانات فيسبوك"}</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
