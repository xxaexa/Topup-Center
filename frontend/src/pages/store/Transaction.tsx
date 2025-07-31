import { useParams } from "react-router-dom";
import { useGetTransactionByIdQuery } from "../../redux/api/transaction";
import { Box, ContainerWrap } from "../../components";

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, isSuccess } = useGetTransactionByIdQuery(
    id!,
    {
      skip: !id,
    }
  );

  return (
    <ContainerWrap>
      <Box className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 my-12">
        {/* {isUpdating && (
          <p className="mb-4 text-blue-600 font-semibold">
            Memperbarui status transaksi...
          </p>
        )} */}

        {isLoading ? (
          <p>Sedang memuat detail transaksi...</p>
        ) : isError ? (
          <p className="text-red-500">Transaksi tidak ditemukan.</p>
        ) : isSuccess && data ? (
          <div>
            <h2 className="text-xl font-bold mb-6">Detail Transaksi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>ID Transaksi:</strong>
                <p>{data.transaction_id}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Email:</strong>
                <p>{data.buyer_email}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Nama Voucher:</strong>
                <p>{data.voucher_name}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Metode Pembayaran:</strong>
                <p>{data.payment_method}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Status Pembayaran:</strong>
                <p>{data.payment_status}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong>Status Pengiriman:</strong>
                <p>{data.delivery_status}</p>
              </div>

              {/* Variant */}
              {data.variant && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <strong>Variasi:</strong>
                  <div className="mt-1">
                    {Object.entries(data.variant).map(([key, value], idx) => (
                      <p key={idx}>
                        {key}:{" "}
                        <span className="font-medium">{String(value)}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Buyer Inputs */}
              {data.buyer_inputs && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <strong>Input Pembeli:</strong>
                  <div className="mt-1">
                    {Object.entries(data.buyer_inputs).map(
                      ([key, value], idx) => (
                        <p key={idx}>
                          {key}:{" "}
                          <span className="font-medium">{String(value)}</span>
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Box>
    </ContainerWrap>
  );
};

export default TransactionDetail;
