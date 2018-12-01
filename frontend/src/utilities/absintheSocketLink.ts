import { create, notifier, observe } from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { ApolloLink } from 'apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';
import tokenManager from './tokenManager';

const PHOENIX_SOCKET_URL = 'ws://localhost:4000/socket/websocket?vsn=2.0.0';
const SOCKET_VERSION = '2.0.0';

const socketParams = (token: string | undefined) => {
  const defaultParams = { vsn: SOCKET_VERSION };
  return token ? { ...defaultParams, token } : defaultParams;
};

const createAbsintheSocket = (token: string | undefined): PhoenixSocket => {
  return create(
    new PhoenixSocket(PHOENIX_SOCKET_URL, {
      params: socketParams(token),
    }),
  );
};

class AbsintheSocketLink extends ApolloLink {
  public socket: PhoenixSocket;
  public link: any;
  public randomId: number;
  public token: string | undefined;

  constructor() {
    super();
    this.randomId = Math.random();

    const token = TokenManager.getCachedToken();
    console.log('token', token);
    this.token = token;
    this.socket = createAbsintheSocket(this.token);
    this.link = createAbsintheSocketLink(this.socket);
    console.info('intial socket link!!!');
    console.log(this.socket, token);
  }

  public request(operation: any, forward?: any | undefined) {
    return this.link.request(operation, forward);
  }

  public watchToken = (token: string | undefined) => {
    if (this.token && this.token === token) {
      return;
    }

    console.log('updateToken', token, this.socket);
    this.token = token;

    this.socket.phoenixSocket.disconnect();
    this.socket.phoenixSocket.connect(socketParams(token));
    // this.socket = createAbsintheSocket(token);
    console.log(this.socket);
    // this.link = createAbsintheSocketLink(this.socket);
  }
}

const absintheSocketLink = new AbsintheSocketLink();

TokenManager.registerObserver(absintheSocketLink);

export default absintheSocketLink;
