// VisitorsVsSalesChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { salesStats, visitorsStats } from "./analytics";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { themes } from "./themes";

export default function VisitorsVsSalesChart({ theme = "light" }) {
  const [range, setRange] = useState("today"); // اليوم افتراضي
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(chartRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
  }, [range]);

  const rawData = salesStats[range];
  const data = (Array.isArray(rawData) ? rawData : [rawData])?.map((s, i) => ({
    name: range === "year" ? s.month : range === "month" ? s.week : s.day || s.hour,
    orders: s.orders,
    visitors: visitorsStats[range]?.[i]?.user || visitorsStats[range]?.[i]?.visitors || 0
  })) || [];

  return (
    <div ref={chartRef}>
      <div className="chart-header" >
        <div className="chart-titles">
        <h3>Visitors vs Sales</h3>
        <h3 style={{color: "var(--price-color)" }}>totle:230$</h3>
        </div>
        <div className="chart-tabs">
          {["today", "week", "month", "year"].map(r => (
            <button key={r} onClick={() => setRange(r)}>{r}</button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: themes[theme]["--background-main"],
              borderRadius: "10px",
              border: `1px solid ${themes[theme]["--glass-border"]}`
            }}
            itemStyle={{ color: themes[theme]["--text-title"], fontWeight: "bold" }}
            labelStyle={{ color: themes[theme]["--text-description"], fontSize: "12px" }}
          />
          <Bar dataKey="visitors" fill={themes[theme]["--button-bg"]} />
          <Bar dataKey="orders" fill={themes[theme]["--button-bg"]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
