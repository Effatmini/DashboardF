import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Text,
} from "recharts";

function SalesBarChart({ data }) {

  // 🎨 بدون أخضر نهائي (Stripe SaaS palette)
  const getColor = (value) => {
    if (value < 10000) return "#f87171";   // red soft
    if (value < 50000) return "#f59e0b";   // orange soft
    return "#6366f1";                      // indigo (بدل الأخضر)
  };

  const renderCustomizedLabel = ({ x, y, width, height, value }) => {
    return (
      <Text
        x={x + width / 2}
        y={y + height / 2}
        fill="#f8fafc"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={13}
        fontWeight="600"
      >
        {value}
      </Text>
    );
  };

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >

          {/* GRID */}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#1f2937"
          />

          {/* AXIS */}
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          {/* TOOLTIP */}
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1f2937",
              borderRadius: "10px",
              color: "#f8fafc",
            }}
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
          />

          {/* BAR */}
          <Bar
            dataKey="sales"
            radius={[8, 8, 0, 0]}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.sales)} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesBarChart;