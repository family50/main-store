// TripleComparisonChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { salesStats, visitorsStats, cartAbandonedStats } from "./analytics";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { themes } from "./themes";

export default function TripleComparisonChart({ theme = "light" }) {
  const [range, setRange] = useState("today"); // اليوم افتراضي
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(chartRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
  }, [range]);

  const rawData = salesStats[range];
  const data = (Array.isArray(rawData) ? rawData : [rawData])?.map((s, i) => ({
    name: range === "year" ? s.month : range === "month" ? s.week : s.day || s.hour,
    visitors: visitorsStats[range]?.[i]?.user || visitorsStats[range]?.[i]?.visitors || 0,
    orders: s.orders,
    cartAbandoned: cartAbandonedStats[range]?.[i]?.user || cartAbandonedStats[range]?.[i]?.count || 0
  })) || [];

  return (
    <div ref={chartRef}>
    <div className="chart-header">
  <div className="chart-titles">
    <h3 className="chart">Visitors / Orders / Cart Abandoned</h3>
    <h3 style={{color: "var(--price-color)" }}>total: 230$</h3>
  </div>

  <div className="chart-tabs">
    {["today", "week", "month", "year"].map(r => (
      <button key={r} onClick={() => setRange(r)}>{r}</button>
    ))}
  </div>
</div>

      <ResponsiveContainer width="100%" height={250} >
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis  />
          <Tooltip 
            contentStyle={{
              backgroundColor: themes[theme]["--background-main"],
              borderRadius: "10px",
              border: `1px solid ${themes[theme]["--glass-border"]}`
            }}
            itemStyle={{ color: themes[theme]["--text-title"], fontWeight: "bold" }}
            labelStyle={{ color: themes[theme]["--text-description"], fontSize: "12px" }}
          />
          <Line type="monotone" dataKey="visitors" stroke={themes[theme]["--button-bg"]} />
          <Line type="monotone" dataKey="orders" stroke={themes[theme]["--button-bg"]} />
          <Line type="monotone" dataKey="cartAbandoned" stroke="#ff4b4b" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
