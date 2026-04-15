import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SalesLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>

        {/* GRID */}
        <CartesianGrid
          stroke="#6f81a5"
          strokeDasharray="5 5"
        />

        {/* X AXIS */}
        <XAxis
          dataKey="month"
          tick={{ fill: "#374151", fontSize: 13 }}
          axisLine={{ stroke: "#e5e7eb" }}
        />

        {/* Y AXIS */}
        <YAxis
          tick={{ fill: "#374151", fontSize: 13 }}
          axisLine={{ stroke: "#e5e7eb" }}
        />

        {/* TOOLTIP */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            color: "#111827",
          }}
          labelStyle={{ color: "#111827" }}
          itemStyle={{ color: "#4f46e5" }}  // بنفسجي بدل الأخضر
          cursor={{ stroke: "#4f46e5", strokeWidth: 1 }}
        />

        {/* LINE */}
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#4f46e5"   // 🔥 لون أساسي (Indigo)
          strokeWidth={3}
          dot={{ fill: "#4f46e5", r: 4 }}
          activeDot={{ r: 6, fill: "#4f46e5" }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}

export default SalesLineChart;