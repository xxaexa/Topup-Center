import { useRef } from "react";
import { Box } from "../../components";

const Report = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <Box className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Laporan Transaksi</h1>

      <div ref={printRef} className="w-full table-auto border-collapse p-3">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 ">
              <th className="px-4 py-2 text-left text-sm font-medium text-text-dark border-b">
                No
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-text-dark border-b">
                Tanggal
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-text-dark border-b">
                Deskripsi
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-text-dark border-b">
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                date: "2025-06-01",
                desc: "Penjualan Voucher",
                amount: 100000,
              },
              {
                id: 2,
                date: "2025-06-02",
                desc: "Penjualan Voucher",
                amount: 200000,
              },
              {
                id: 3,
                date: "2025-06-03",
                desc: "Penjualan Voucher",
                amount: 150000,
              },
            ].map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-600  border-b">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.desc}</td>
                <td className="border p-2">
                  Rp {item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Print
        </button>
        <button
          onClick={() => alert("View detail laporan")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          View
        </button>
      </div>
    </Box>
  );
};

export default Report;
