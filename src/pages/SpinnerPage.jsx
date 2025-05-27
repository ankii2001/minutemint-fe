import { useState, useEffect } from "react";
import FileUploader     from "../components/FileUploader";
import SpinnerSelector from "../components/SpinnerSelector";
import api from "../utils/api";

export default function SpinnerPage() {
  const [names, setNames] = useState([]);
  useEffect(() => { api.get("/names").then(r => setNames(r.data)); }, []);

  const handleLoadNames = async arr => {
    setNames(arr);
    await api.post("/names", arr);
  };

  return (
    <div className="space-y-12">
      <FileUploader onLoadNames={handleLoadNames} />
      <SpinnerSelector names={names} />
    </div>
  );
}
