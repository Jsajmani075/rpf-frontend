import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function VendorDetails() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  const loadVendor = async () => {
    try {
      const res = await api.get(`/vendor/${id}`);
      const details = res.data?.data?.vendorData || null;
      setVendor(details);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to load vendor details";
      alert(msg);
    }
  };

  useEffect(() => {
    loadVendor();
  }, [id]);

  if (!vendor) return "Loading...";

  return (
    <div>
      <h2>{vendor.vendorName}</h2>
      <p>Email: {vendor.vendorEmail}</p>
      <p>Vendor Details: {vendor.tags || "No Tags"}</p>
    </div>
  );
}
