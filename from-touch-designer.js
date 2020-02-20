const osc = require('osc-min'),
    	dgram = require('dgram')
	rpio = require('rpio');

const PINS = [
	25,
	9,24,11,
	10,23,22,8,5,
	15,27,18,7,6,12,
	14,17,16,13,20,
	4,19,26,
	21
];
const CHANNEL_NAMES = PINS.map(pin => ('/'+pin));

const getValues = (element) => element.args.map(arg => arg.value);
const readElement = (element, index) => {
	const pinNumber = parseInt(element.address.replace('/',''));
	return {pin: pinNumber, value: getValues(element)[0], index};
}

const getChannels = (message, channelNames) => {
	if (!channelNames) {
		return message.elements.map((element, i) => readElement(element,i));
	}
	return channelNames.map(channelName => 
		message.elements.find(element => element.address === channelName))
		.map((element, i) => readElement(element, i));
}

rpio.init({mapping: 'gpio'});
PINS.forEach(pin => rpio.open(pin, rpio.OUTPUT, rpio.LOW));

const lastPinValues = new Array(24).fill(0);

const sendChannelToPinout = (channel) => {
	const newPinValue = channel.value > .5 ? 1 : 0;
	if (newPinValue === lastPinValues[channel.index]) return;
	lastPinValues[channel.index] = newPinValue;
	rpio.write(channel.pin, newPinValue);
}

// listen for OSC messages and print them to the console
const udp = dgram.createSocket('udp4', (msg, rinfo) => {
  // save the remote address
  remote = rinfo.address;
  try {
    const message = osc.fromBuffer(msg);
	  const channels = getChannels(message, CHANNEL_NAMES);
	  channels.forEach(channel => sendChannelToPinout(channel));
  } catch (err) {
   console.log('Could not decode OSC message');
  }
});

// setinterval callback
const send = () => {
  
  // we don't have the remote address yet
  if(!remote)
    return;

  // build message with a few different OSC args
  const many = osc.toBuffer({
    oscType: 'message',
    address: '/print/many',
    args: [{
      type: 'string',
      value: 'testing'
    },
    {
      type: 'float',
      value: 3.14
    },
    {
      type: 'integer',
      value: 200
    }]
  });

  // build x message with single arg
  const x = osc.toBuffer({
    oscType: 'message',
    address: '/print/x',
    args: [{
      type: 'integer',
      value: 50
    }]
  });

  // build y message with single arg
   const y  = osc.toBuffer({
    oscType: 'message',
    address: '/print/y',
    args: [{
      type: 'integer',
      value: 20
    }]
  });

  // send a bunch of args to the address that sent the last message to us
  udp.send(many, 0, many.length, 9999, remote);

  // send x and y messages
  udp.send(x, 0, x.length, 9999, remote);
  udp.send(y, 0, y.length, 9999, remote);

  console.log('Sent OSC message to %s:%d', remote, 9999);

}


// send message every second
setInterval(send, 1000);

udp.bind(9998);
console.log('Listening for OSC messages on port 9998');
