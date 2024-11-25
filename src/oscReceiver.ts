// import * as osc from 'osc';
const osc = require('osc');
// import { emit } from './emitter';
const defaultPort = 5150;
const port = defaultPort;

export type Message = {
  cps: number;
  cycle: number;
  delta: number;
  orbit: number;
  s: string;
  time: number;
  latency: number;
  ccn?: number;
  ccv?: number;
  gain?: number;
  isCc: boolean;
  legato?: number;
  midichan?: number;
  note?: number;
  vowel?: string;
  pan?: number;
  amp?: number;
  progNum?: number;
};

const run = (cb : (d:Message) => void) => {
  const udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: port,
    metadata: true,
  });
  
  udpPort.on('message', function (oscMsg: any) {
    const { args } = oscMsg;
  
    let dict: Record<string, any> = {};
    for (let i = 2; i < args.length; i += 2) {
      dict[args[i].value] = args[i + 1].value;
    }

    // if (dict.ccn !== undefined) return;
  
    dict.isCc = dict.ccn !== undefined;
    cb(dict as Message);
  });

  udpPort.open();
  process.stdout.write(`UDP port opened\nreceiving OSC on ${port}\n`);
};

export { run };
