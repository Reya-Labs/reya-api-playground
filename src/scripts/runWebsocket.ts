import { CandlesResolution, SocketClient, SocketMessage } from '@reyaxyz/api-sdk';


const run = async () => {
  const mySocket = new SocketClient({
    environment: 'production',
    onOpen: () => {
      console.log('connected');
      mySocket.subscribeToCandles('ETH-rUSD', '1DAY' as CandlesResolution);
      console.log('socket opened');
    },
    onClose: () => {
      console.log('socket closed');
    },
    onMessage: (parsedMessage: SocketMessage) => {
      console.log(parsedMessage);
      switch (parsedMessage.channel) {
        case 'candles': {
          console.log(parsedMessage)
          break;
        }
        default: {
          break;
        }
      }
    },
  });

  mySocket.connect();


}
run()