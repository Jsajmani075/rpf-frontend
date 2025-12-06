import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function RpfList() {
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const loadRpf = async () => {
    try {
      const res = await api.get(`/rpf?pageNo=${pageNo}`);
      const rows = res.data?.data?.response?.rpfData?.rows || [];
      const pages = res.data?.data?.response?.totalPages || 1;

      setList(rows);
      setTotalPages(pages);
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    loadRpf();
  }, [pageNo]);

  return (
    <div>
      <h2>All RPFs</h2>

      {/* RPF List */}
      {list.map((item) => (
        <div
          key={item.id}
          style={{
            padding: 15,
            background: "#f5f5f5",
            marginBottom: 15,
            borderRadius: 8,
            position: "relative",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 500 }}>
            {item.userText}
          </div>


          {item.status === "pending" && (
            <Link
              to={`/select-vendor/${item.id}`}
              style={{
                color: "blue",
                fontWeight: 600,
                marginTop: 10,
                display: "inline-block"
              }}
            >
              Select Vendor →
            </Link>
          )}


          {(item.status === "vendor_proposal" || item.status === "success") && (
            <button
              onClick={() => navigate(`/proposals?id=${item.id}`)}
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                padding: "8px 14px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#0056b3")}
              onMouseOut={(e) => (e.target.style.background = "#007bff")}
            >
              Check Proposals →
            </button>
          )}
        </div>
      ))}


      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            disabled={pageNo === 1}
            onClick={() => setPageNo(pageNo - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPageNo(i + 1)}
              style={{
                padding: "6px 12px",
                background: pageNo === i + 1 ? "black" : "#ddd",
                color: pageNo === i + 1 ? "white" : "black",
                border: 0,
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={pageNo === totalPages}
            onClick={() => setPageNo(pageNo + 1)}
          >
            Next
          </button>
        </div>

        <p style={{ marginTop: 10 }}>Total Pages: {totalPages}</p>
      </div>
    </div>
  );
}
