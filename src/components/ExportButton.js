import React from "react";

const ExportButton = ({ data, filename = "dashboard-data.csv" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    const csvRows = [];

    // Headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    // Rows
    data.forEach(row => {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(","));
    });

    // Create CSV file
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <button onClick={handleExport} className="export-btn">
      Export CSV
    </button>
  );
};

export default ExportButton;
