import { atom, useAtom } from 'jotai';
import { IOrder } from '@/types/Order';
import { useCallback, useEffect } from 'react';

type TselectedOrder = IOrder['id'] | null;

const selectedOrder = atom<TselectedOrder>(null);

export function useSelectOrders() {
  const [order, setOrder] = useAtom(selectedOrder);

  const selectOrder = useCallback((orderId: IOrder['id']) => {
    setOrder(orderId);
  }, []);

  const clearSelectedOrder = useCallback(() => {
    setOrder(null);
  }, []);

  return {
    selectedOrderId: order,
    selectOrder,
    clearSelectedOrder,
  };
}

export const layoutState = atom([50, 150]);
export const collapsedState = atom(undefined);

// export const useOrders = () => {
//   const [orders, setOrders] = useAtom(ordersAtom);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(10); // Defina o número de orders por página

//   // Função para adicionar uma order
//   const addOrder = useCallback(
//     (newOrder) => {
//       setOrders((prevOrders) => [...prevOrders, newOrder]);
//     },
//     [setOrders]
//   );

//   // Função para remover uma order
//   const removeOrder = useCallback(
//     (orderId) => {
//       setOrders((prevOrders) =>
//         prevOrders.filter((order) => order.id !== orderId)
//       );
//     },
//     [setOrders]
//   );

//   // Função para atualizar uma order
//   const updateOrder = useCallback(
//     (updatedOrder) => {
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === updatedOrder.id ? updatedOrder : order
//         )
//       );
//     },
//     [setOrders]
//   );

//   // Função para buscar orders de uma página específica
//   const fetchOrders = useCallback(
//     async (page) => {
//       // Simulação de fetch, substitua com sua chamada de API
//       const fetchedOrders = await fakeApiFetchOrders(page, ordersPerPage);
//       setOrders(fetchedOrders);
//       setCurrentPage(page);
//     },
//     [ordersPerPage, setOrders]
//   );

//   return {
//     orders,
//     addOrder,
//     removeOrder,
//     updateOrder,
//     fetchOrders,
//     currentPage,
//     ordersPerPage,
//   };
// };
