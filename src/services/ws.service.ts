export interface WSMessage {
  action:
    | {
        __type: 'log';
        text: string;
      }
    | {
        __type: 'done';
      };
}
export type Subscriber = (incoming: WSMessage) => void;
export type Unsubscribe = () => void;

const ws = new WebSocket('ws://localhost:3000/');

const subscribers: Subscriber[] = [];

ws.onopen = () => {
  console.log('connected to ws');
};

ws.onclose = () => {
  console.log('disconnected from ws');
};

ws.onmessage = ({ data }: { data: string }) => {
  const json = JSON.parse(data);
  notify(json);
};

function notify(incoming: WSMessage) {
  for (const subscriber of subscribers) {
    subscriber(incoming);
  }
}

export function send(msg: string): void {
  ws.send(msg);
}

export function subscribe(subscriber: Subscriber): Unsubscribe {
  subscribers.push(subscriber);

  let subscribed = true;

  return () => {
    if (!subscribed) return;

    let idx = subscribers.findIndex(s => s === subscriber);
    subscribers.splice(idx, 1);
  };
}
