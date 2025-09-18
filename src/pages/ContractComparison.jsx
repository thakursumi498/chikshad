import axios from "axios";
import { useState } from "react";

const API_URL = "https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca";

function Documents() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [results, setResults] = useState(null);

  const handleCompare = async () => {
    if (!file1 || !file2) {
      alert("Please select two files first!");
      return;
    }

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let data = response.data;

      // handle plain text vs JSON
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = { message: data }; // fallback as plain text
        }
      }

      setResults(data);
    } catch (err) {
      console.error("Error comparing contracts:", err);
      setResults({ error: err.message });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>

      <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
      <input type="file" onChange={(e) => setFile2(e.target.files[0])} />

      <button
        onClick={handleCompare}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Compare
      </button>

      {/* show results */}
      {results && (
        <pre className="bg-gray-100 mt-4 p-4 rounded text-sm whitespace-pre-wrap">
          {JSON.stringify(results, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Documents;
