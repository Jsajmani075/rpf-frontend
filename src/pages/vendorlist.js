import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function VendorList() {
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadVendors = async () => {
    try {
      const res = await api.get(`/vendor?pageNo=${pageNo}`);
      const rows =
        res.data?.data?.response?.vendorData?.rows || [];

      const pages =
        res.data?.data?.response?.totalPages || 1;

      setList(rows);
      setTotalPages(pages)
    }
    catch (err) {
      alert(err?.response?.data?.message)
    }
  };

  useEffect(() => {
    loadVendors();
  }, [pageNo]);

  return (
    <div>
      <h2>Vendors</h2>


      {list.map((v) => (
        <Link
          to={`/vendor/${v.id}`}
          key={v.id}
          style={{
            display: "block",
            padding: 10,
            background: "#eee",
            marginBottom: 10,
            borderRadius: 5,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {v.vendorName}
        </Link>
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
