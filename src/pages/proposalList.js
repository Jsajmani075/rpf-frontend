import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";

export default function ProposalList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const rpfId = query.get("id");
  const isAIRecommended = list.some(
    (p) => p.proposalStatus === "ai_recommendation"
  );
  const formatEmail = (text) => {
    if (!text) return "";
    return text.replace(/\r\n/g, "<br/>");
  };

  const load = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/proposal?id=${rpfId}&pageNo=${pageNo}&limit=2`);
      const proposalData = res.data?.data?.response?.proposalData || [];
      const totalPages = res.data?.data?.response?.totalPages || 1;

      setList(proposalData);
      setTotalPages(totalPages);


    } catch (err) {
      alert(err?.response?.data?.message);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  const sendToAi = async () => {
    try {
      setIsButtonDisabled(true);
      await api.post("/proposal/recommendations", { id: rpfId });
      alert("Sent to AI for recommendations!");
      load();
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 60000);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (rpfId) load();
  }, [rpfId, pageNo]);

  return (
    <div style={{ position: "relative" }}>

      <h2>Proposals for RPF #{rpfId}</h2>

      <button
        onClick={sendToAi}
        disabled={isAIRecommended || isButtonDisabled}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: "10px 16px",
          background: isAIRecommended || isButtonDisabled ? "#999" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: isAIRecommended || isButtonDisabled ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
      >
        {isAIRecommended
          ? "AI Recommendation Completed"
          : isButtonDisabled
            ? "Please wait..."
            : "Send to AI for recommendation →"}
      </button>


      {loading && <p>Loading...</p>}

      {!loading && list.length === 0 && (
        <div
          style={{
            padding: 15,
            background: "#ffe8e8",
            borderRadius: 6,
            marginTop: 20,
            color: "#d30000",
            fontWeight: 600,
          }}
        >
          No proposals found for this RPF.
        </div>
      )}


      {!loading &&
        list.length > 0 &&
        list.map((p, index) => (
          <div
            key={index}
            style={{
              padding: 15,
              background: "#f5f5f5",
              marginBottom: 12,
              borderRadius: 6,
              borderLeft: "4px solid #007bff",
            }}
          >
            {p.aiRank !== null && p.aiRank !== undefined && (
              <h4 style={{ margin: "0 0 8px 0" }}>AI Rank: {p.aiRank}</h4>
            )}

            <p><strong>Vendor:</strong> {p.vendorName}</p>
            <p><strong>Email:</strong> {p.vendorEmail}</p>


            <div
              style={{ marginTop: 10, fontSize: 14 }}
              dangerouslySetInnerHTML={{ __html: formatEmail(p.emailContent) }}
            ></div>
          </div>
        ))}


      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 10 }}>
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
    </div>

  );
}
