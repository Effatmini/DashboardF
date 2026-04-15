function StatsCard({ title, value, icon }) {
  return (
    <div
      style={{
        flex: "1 1 30%",
        minWidth: 160,

        padding: 18,
        borderRadius: 16,

        background: "#1e293b",
        border: "1px solid #334155",

        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        color: "#ffffff",

        transition: "0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(99,102,241,0.25)";
        e.currentTarget.style.borderColor = "#6366f1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(0,0,0,0.35)";
        e.currentTarget.style.borderColor = "#334155";
      }}
    >
      {/* ICON */}
      <div
        style={{
          fontSize: "1.8rem",
          marginBottom: 10,
          color: "#6366f1",
        }}
      >
        {icon}
      </div>

      {/* TITLE */}
      <h3
        style={{
          fontSize: "0.95rem",
          margin: "4px 0",
          color: "#94a3b8",
          fontWeight: 500,
        }}
      >
        {title}
      </h3>

      {/* VALUE */}
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          margin: 0,
          color: "#ffffff",
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default StatsCard;