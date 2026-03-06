// SalesChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { salesStats } from "./analytics";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { translations } from "./translations";
export default function SalesChart({ lang = "light" }) {
   const t = translations[lang].charts;
  const [range, setRange] = useState("week");
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(chartRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
  }, [range]);

  return (
    
    <div ref={chartRef}>
      <div className="chart-header">
        <div className="chart-titles">
        <h3>{t.sales}</h3>
        <h3 style={{color: "var(--price-color)" }}>{t.total}: 230$</h3>
        </div>
        <div className="chart-tabs">
          {["today", "week", "month", "year"].map(r => (
            <button key={r} onClick={() => setRange(r)}> {t[r]}</button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={salesStats[range]}>
          <XAxis dataKey={range === "today" ? "hour" : range === "year" ? "month" : range === "month" ? "week" : "day"} />

          <YAxis />
          <Tooltip
  contentStyle={{
    backgroundColor: "var(--background-main)",
    borderRadius: "10px",
    border: "1px solid var(--glass-border)"
  }}
  itemStyle={{ color: "var(--text-title)", fontWeight: "bold" }}
  labelStyle={{ color: "var(--text-description)", fontSize: "12px" }}

  formatter={(value, name) => {
    const map = {
      orders: t.orders,
      revenue: t.revenue
    };
    return [value, map[name] || name];
  }}
/>

          <Line type="monotone" dataKey="orders"   stroke="var(--button-bg)"  />
          <Line type="monotone" dataKey="revenue"  stroke="var(--button-bg)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
