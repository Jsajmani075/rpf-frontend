import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function VendorSelect() {
  const { rpfId } = useParams();

  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadVendors = async () => {
    try {
      const res = await api.get(`/vendor?pageNo=${pageNo}`);

      const rows = res.data?.data?.response?.vendorData?.rows || [];
      const pages = res.data?.data?.response?.totalPages || 1;

      setVendors(rows);
      setTotalPages(pages);
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    loadVendors();
  }, [pageNo]);

  const toggleSelect = (id) => {
    if (selectedVendors.includes(id)) {
      setSelectedVendors(selectedVendors.filter((v) => v !== id));
    } else {
      setSelectedVendors([...selectedVendors, id]);
    }
  };

  const send = async () => {
    if (selectedVendors.length === 0) {
      alert("Please select at least one vendor!");
      return;
    }

    try {
      setIsButtonDisabled(true);

      const res = await api.post("/rpf/send", {
        id: rpfId,
        vendorId: selectedVendors,
      });
      alert("Sent to selected Vendors!");
      setSelectedVendors([]);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 60000);
    } catch (err) {
      alert(err?.response?.data?.message);


      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <h2>Select Vendors for RPF</h2>

      {vendors.map((v) => (
        <div
          key={v.id}
          onClick={() => toggleSelect(v.id)}
          style={{
            padding: 10,
            marginBottom: 10,
            background: selectedVendors.includes(v.id) ? "#b3e5fc" : "#eee",
            cursor: "pointer",
            borderRadius: 5,
            border: selectedVendors.includes(v.id)
              ? "2px solid #0288d1"
              : "1px solid #ccc",
          }}
        >
          <strong>{v.vendorName}</strong>
          <div style={{ opacity: 0.6, fontSize: 12 }}>{v.vendorEmail}</div>
        </div>
      ))}


      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button disabled={pageNo === 1} onClick={() => setPageNo(pageNo - 1)}>
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


      <button
        onClick={send}
        disabled={isButtonDisabled}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 20,
          background: isButtonDisabled ? "gray" : "black",
          color: "white",
          border: 0,
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
        }}
      >
        {isButtonDisabled ? "Please wait..." : "Send to Selected Vendors"}
      </button>
    </div>
  );
}
