const osc = require('osc-min'),
    	dgram = require('dgram')
	rpio = require('rpio');

const logChannels = (channels) => {
	channels.map(channel => {
		console.log(channel.name, channel.value);
	});
}

const getValues = (element) => element.args.map(arg => arg.value);

const getChannels = (message, channelNames) => {
	if (!channelNames) return message.elements.map(element => ({name: element.address, value: getValues(element)}));
	return channelNames.map(channelName => 
		message.elements.find(element => element.address === channelName))
		.map(element => ({name: element.address, value: getValues(element)}));
}

rpio.init({mapping: 'gpio'});
const lastPinValues = new Array(10).fill(0);

const sendChannelToPinout = (pinNumber, channel, pinIndex) => {
	const newPinValue = channel > .5 ? 1 : 0;
	console.log({channel, newPinValue, pinIndex});
	if (newPinValue === lastPinValues[pinIndex]) return;
	lastPinValues[pinIndex] = newPinValue;
	rpio.write(pinNumber, newPinValue);
}

// listen for OSC messages and print them to the console
const udp = dgram.createSocket('udp4', (msg, rinfo) => {

  // save the remote address
  remote = rinfo.address;

  try {
    const message = osc.fromBuffer(msg);
    const channels = getChannels(message, [
    	'/0',
	'/1'
    ]);
    //logChannels(channels);
    sendChannelToPinout(4, channels[0].value[0], 0);
    sendChannelToPinout(17, channels[1].value[0], 1);
  } catch (err) {
   // console.log('Could not decode OSC message');
  }

});

// setinterval callback
const send = () => {
  
  // we don't have the remote address yet
  if(! remote)
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
