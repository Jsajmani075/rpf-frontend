import { Link } from "react-router-dom";

export default function Sidebar() {
  const styles = {
    sidebar: {
      width: 220,
      background: "#f3f3f3",
      height: "100vh",
      padding: 20,
    },
    item: {
      marginBottom: 15,
      cursor: "pointer",
      fontWeight: 600,
      display: "block",
    },
  };

  return (
    <div style={styles.sidebar}>
      <Link to="/" style={styles.item}>Create RPF</Link>
      <Link to="/rpfs" style={styles.item}>Get All RPF</Link>
      <Link to="/vendors" style={styles.item}>Vendors</Link>
    </div>
  );
}
