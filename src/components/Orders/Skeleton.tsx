export const OrderDisplaySkeleton = () => {
  return <div className="flex flex-col h-full animate-pulse">test</div>;
};

export const OrderTableItemsSkeleton = () => {
  return (
    <div className="hidden h-full flex-1 flex-col md:flex">
      <div className="space-y-2">
        {/* Filtro e Botões */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1/3 h-7 bg-gray-300"></div>
          <div className="w-16 h-7 bg-gray-300"></div>
          <div className="w-16 h-7 bg-gray-300"></div>
          <div className="ml-auto w-10 h-7 bg-gray-300"></div>
        </div>

        {/* Cabeçalhos da Tabela */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {Array()
                  .fill(6)
                  .map((_, index) => (
                    <th key={index} className="px-4 py-3 bg-gray-100">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array()
                .fill(10)
                .map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array()
                      .fill(6)
                      .map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-4 py-3 whitespace-nowrap"
                        >
                          <div className="h-4 bg-gray-300 rounded"></div>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-20 h-7 bg-gray-300 rounded"></div>
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
            <div className="h-7 w-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderSkeleton = (index: any) => {
  return (
    <div
      key={index}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center mb-3 w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded bg-gray-300 h-4 w-50"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="animate-pulse flex w-full">
                <div className="rounded bg-gray-300 h-4 w-24"></div>
                <div className="ml-auto rounded bg-gray-300 h-4 w-36"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="animate-pulse flex w-full">
                <div className="rounded bg-gray-300 h-4 w-36"></div>
                <div className="ml-auto rounded bg-gray-300 h-4 w-64"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="animate-pulse flex w-full">
                <div className="rounded bg-gray-300 h-4 w-32"></div>
                <div className="ml-auto rounded bg-gray-300 h-4 w-56"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderListSkeleton = () => {
  return (
    <div className="flex-1 p-4 space-y-2">
      {Array()
        .fill(6)
        .map((_, index) => (
          <OrderSkeleton key={index} index={index} />
        ))}
    </div>
  );
};

export const OrdersPageSkeleton = () => {
  return (
    <div className="flex h-screen">
      {/* List */}
      <div className="w-1/4 p-4 border-r">
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="mb-4">
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
        <OrderListSkeleton />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <OrderDisplaySkeleton />
      </div>
    </div>
  );
};
