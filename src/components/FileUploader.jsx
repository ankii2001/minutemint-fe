import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function FileUploader({ onLoadNames }) {
  return (
    <label className="block mb-6 w-full">
      <span className="sr-only">Upload names</span>
      <input
        type="file"
        accept=".json,.csv,.xls,.xlsx"
        className="
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border file:border-gray-200
          file:bg-green-100 file:text-green-800 file:font-semibold
          hover:file:bg-green-200
        "
        onChange={e => {
          const file = e.target.files?.[0];
          if (!file) return;
          const ext = file.name.split(".").pop().toLowerCase();
          const reader = new FileReader();
          reader.onload = evt => {
            let arr = [];
            const txt = evt.target.result;
            if (ext === "json") arr = JSON.parse(txt);
            else if (ext === "csv") arr = Papa.parse(txt, { header: false }).data.flat();
            else {
              const wb = XLSX.read(txt, { type: "binary" });
              const sheet = wb.Sheets[wb.SheetNames[0]];
              arr = XLSX.utils.sheet_to_json(sheet, { header: 1 }).flat();
            }
            onLoadNames(arr.filter(n => typeof n === "string"));
          };
          ext.match(/xl/) ? reader.readAsBinaryString(file) : reader.readAsText(file);
        }}
      />
    </label>
  );
}
