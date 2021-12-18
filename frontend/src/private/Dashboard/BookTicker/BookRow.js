/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";

function BookRow(props) {
  const [data, setData] = useState({
    bid: "0",
    ask: "0",
  });

  const bookRow = useMemo(
    () => (
      <tr>
        <td className="text-gray-900">{props.symbol}</td>
        <td className="text-gray-900">{`${data.bid}`.substring(0, 8)}</td>
        <td className="text-gray-900">{`${data.ask}`.substring(0, 8)}</td>
      </tr>
    ),
    [props.symbol, data.bid, data.ask]
  );

  useEffect(() => {
    if (!props.data) return;

    if (data.bid !== props.data.bestBid) data.bid = props.data.bestBid;

    if (data.ask !== props.data.bestAsk) data.ask = props.data.bestAsk;

    setData(data);
  }, [props.data]);

  return bookRow;
}

export default BookRow;
