const WebSocket = require('ws');
const ordersRepository = require('./repositories/ordersRepository');
const technicalindicators = require('technicalindicators');

module.exports = (settings, wss) => {
  if (!settings)
    throw new Error('Cant start Exchange Monitor without settings');

  const exchange = require('./utils/exchange')(settings);

  function broadcast(jsonObject) {
    if (!wss || !wss.clients) return;
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(jsonObject));
      }
    });
  }

  exchange.miniTickerStream(markets => {
    broadcast({ miniTicker: markets });
  });

  let book = [];
  exchange.bookStream(order => {
    if (book.length === 200) {
      broadcast({ book });
      book = [];
    } else {
      book.push(order);
    }
  });

  function processExecutionData(executionData) {
    if (executionData.x === 'NEW') return;

    const order = {
      symbol: executionData.s,
      orderId: executionData.i,
      clientOrderId:
        executionData.X === 'CANCELED' ? executionData.C : executionData.c,
      side: executionData.S,
      type: executionData.o,
      sttatus: executionData.X,
      isMaker: executionData.m,
      transactTime: executionData.T,
    };

    console.log(order.status);
    if (order.status === 'FILLED') {
      const quoteAmount = parseFloat(executionData.Z);
      order.avgPrice = quoteAmount / parseFloat(executionData.z);

      order.commission = executionData.n;
      const isQuoteCommission =
        executionData.N && order.symbol.endsWith(executionData.N);
      order.net = isQuoteCommission
        ? quoteAmount - parseFloat(order.commission)
        : quoteAmount;
    }

    if (order.status === 'REJECTED') order.obs = executionData.r;

    setTimeout(() => {
      console.log(`Update order ${order}`);
      ordersRepository
        .updateOrderByOrderId(order.orderId, order.clientOrderId, order)
        .then(order => order && broadcast({ executionData: order }))
        .catch(err => console.error(err));
    }, 3000);
  }

  exchange.userDataStream(
    balanceData => {
      broadcast({ balance: balanceData });
    },
    executionData => processExecutionData(executionData),
  );

  function calcRSI(closes) {
    const rsiResult = technicalindicators.rsi({
      period: 14,
      values: closes,
    });
    return parseFloat(rsiResult[rsiResult.length - 1]);
  }

  function processChartData(closes, callback) {
    const rsi = calcRSI(closes);
    //console.log(rsi);
  }

  exchange.chartStream('BTCBUSD', '1m', ohlc =>
    processChartData(ohlc.close, msg => {
      console.log(msg);
    }),
  );

  console.log('App Exchange Monitor is running');
};
