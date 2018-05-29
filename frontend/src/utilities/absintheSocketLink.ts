import { observe, notifier, create } from "@absinthe/socket";
import {
  AbsintheSocketLink,
  createAbsintheSocketLink
} from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { ApolloLink } from "apollo-link";
import TokenManager from "./tokenManager";

const PHOENIX_SOCKET_URL = "ws://localhost:4000/socket/websocket?vsn=2.0.0";

const createAbsintheSocket = (token : (string | undefined) = undefined): PhoenixSocket => {
  if (token) {
    return new PhoenixSocket(PHOENIX_SOCKET_URL, {
      params: { token }
    });
  }
  return new PhoenixSocket(PHOENIX_SOCKET_URL);
};

class AbsintheSocketLink extends ApolloLink {
  socket: PhoenixSocket;
  link: AbsintheSocketLink;

  constructor() {
    super();
    this.socket = createAbsintheSocket();
    this.link = createAbsintheSocketLink(this.socket);
    console.info("intial socket link!!!");
  
  }

  public request(operation: any, forward?: any | undefined) {
    return this.link.request(operation, forward);
  }

  public watchToken = (token: string | undefined = undefined) => {
  
    console.log("updateToken", token)

    this.socket.disconnect();
    this.socket = createAbsintheSocket(token);
    console.log(this.socket);
    this.link = createAbsintheSocketLink(this.socket);
  
  };
}

const absintheSocketLink = new AbsintheSocketLink();
TokenManager.registerObserver(absintheSocketLink);
export default absintheSocketLink;
