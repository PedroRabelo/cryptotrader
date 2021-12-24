import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import NewOrderButton from "../../components/NewOrder/NewOrderButton";
import NewOrderModal from "../../components/NewOrder/NewOrderModal";
import { getBalance } from "../../services/ExchangeService";
import { useHistory } from "react-router-dom";

function Orders() {
  const [balances, setBalances] = useState({});
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getBalance(token)
      .then((info) => {
        const balances = Object.entries(info).map((item) => {
          return {
            symbol: item[0],
            available: item[1].available,
            onOrder: item[1].onOrder,
          };
        });

        setBalances(balances);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401)
          return history.push("/");
        console.error(err);
      });
  }, []);

  function onOrderSubmit(orde) {
    history.go(0);
  }

  return (
    <>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h2 className="h4">Ordens</h2>
          </div>
          <div className="btn-toolbar m-2 mb-md-0">
            <div className="d-inline-flex align-items-center">
              <NewOrderButton />
            </div>
          </div>
        </div>
        <div className="card card-body border-0 shadow table-wrapper table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="border-gray-200">Símbolo</th>
                <th className="border-gray-200">Data</th>
                <th className="border-gray-200">Lado</th>
                <th className="border-gray-200">Qtd</th>
                <th className="border-gray-200">Valor</th>
                <th className="border-gray-200">Status</th>
                <th className="border-gray-200">Detalhes</th>
              </tr>
            </thead>
            <tbody>{}</tbody>
          </table>
        </div>
      </main>
      <NewOrderModal wallet={balances} onSubmit={onOrderSubmit} />
    </>
  );
}

export default Orders;
