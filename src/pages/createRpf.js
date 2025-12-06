import { useState } from "react";
import api from "../api/api";

export default function CreateRpf() {
  const [userText, setText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const createRpf = async () => {
    try {
      setIsButtonDisabled(true);

      const res = await api.post("/rpf", { userText });

      if (res?.data?.data?.success) {
        alert(res?.data?.data?.message);
        setText("");
      }
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 60000);

    } catch (err) {
      alert(err?.response?.data?.message);

      setIsButtonDisabled(false);
    }
  };

  const isSendAllowed = userText.trim().length === 0 || isButtonDisabled;

  return (
    <div>
      <h2>Create RPF</h2>

      <textarea
        value={userText}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your RPF here..."
        style={{ width: "100%", height: 150, padding: 10 }}
      />

      <button
        onClick={createRpf}
        disabled={isSendAllowed}
        style={{
          marginTop: 15,
          padding: "10px 20px",
          background: isSendAllowed ? "gray" : "black",
          color: "white",
          border: 0,
          cursor: isSendAllowed ? "not-allowed" : "pointer",
        }}
      >
        {isButtonDisabled ? "Please wait..." : "▶ Send"}
      </button>
    </div>
  );
}
