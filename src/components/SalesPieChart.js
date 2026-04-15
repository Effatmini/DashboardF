import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Product A", value: 40, color: "#4f46e5" }, // deep indigo
  { name: "Product B", value: 25, color: "#7c3aed" }, // purple
  { name: "Product C", value: 35, color: "#2563eb" }, // blue accent
];

function SalesPieChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      style={{
        width: 890,
        height: 260, // قللنا الطول
        backgroundColor: "#0f172a",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 4px 10px rgb(85, 64, 64)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {/* Pie Chart */}
      <div style={{ width: 140, height: "100%" }}> {/* قللنا العرض شويه */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={45} // قللنا شويه
              outerRadius={65} // قللنا شويه
              paddingAngle={2}
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}> {/* قللنا المسافة بين الأسطر */}
        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: 12, // قللنا حجم المربع
                  height: 12,
                  backgroundColor: item.color,
                  borderRadius: 4,
                }}
              ></div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>
                {item.name} - {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalesPieChart;
