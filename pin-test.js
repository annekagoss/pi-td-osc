const osc = require('osc-min'),
    	dgram = require('dgram')
	rpio = require('rpio');

rpio.init({mapping: 'gpio'});

function on(pinNum) {
	rpio.open(pinNum, rpio.OUTPUT, rpio.LOW);
	rpio.write(pinNum, 1);
}

function off(pinNum) {
	rpio.close(pinNum, rpio.OUTPUT, rpio.LOW);
	rpio.write(pinNum, 0);
}

on(25);
on(9);
on(24);
on(10);
on(22);
on(23);
on(18);
on(27);
on(15);
on(17);
on(4);
on(14);

on(8);
on(11);
on(7);
on(5);
on(12);
on(6);
on(13);
on(16);
on(19);
on(20);
on(21);
on(26);

/*
rpio.open(4, rpio.OUTPUT, rpio.LOW);
rpio.write(4, 1);

rpio.open(26, rpio.OUTPUT, rpio.LOW);
rpio.write(26, 1);

rpio.open(14, rpio.OUTPUT, rpio.LOW);
rpio.write(14, 1);

rpio.open(21, rpio.OUTPUT, rpio.LOW);
rpio.write(21, 1);

rpio.open(17, rpio.OUTPUT, rpio.LOW);
rpio.write(17, 1);

rpio.open(15, rpio.OUTPUT, rpio.LOW);
rpio.write(15, 1);

rpio.open(19, rpio.OUTPUT, rpio.LOW);
rpio.write(19, 1);

rpio.open(20, rpio.OUTPUT, rpio.LOW);
rpio.write(20, 1);

rpio.open(18, rpio.OUTPUT, rpio.LOW);
rpio.write(18, 1);

rpio.open(27, rpio.OUTPUT, rpio.LOW);
rpio.write(27, 1);

rpio.open(16, rpio.OUTPUT, rpio.LOW);
rpio.write(16, 1);

rpio.open(13, rpio.OUTPUT, rpio.LOW);
rpio.write(13, 1);

rpio.open(22, rpio.OUTPUT, rpio.LOW);
rpio.write(22, 1);

rpio.open(23, rpio.OUTPUT, rpio.LOW);
rpio.write(23, 1);

rpio.open(6, rpio.OUTPUT, rpio.LOW);
rpio.write(6, 1);

rpio.open(12, rpio.OUTPUT, rpio.LOW);
rpio.write(12, 1);

rpio.open(24, rpio.OUTPUT, rpio.LOW);
rpio.write(24, 1);

rpio.open(10, rpio.OUTPUT, rpio.LOW);
rpio.write(10, 1);

rpio.open(5, rpio.OUTPUT, rpio.LOW);
rpio.write(5, 1);

rpio.open(7, rpio.OUTPUT, rpio.LOW);
rpio.write(7, 1);

rpio.open(9, rpio.OUTPUT, rpio.LOW);
rpio.write(9, 1);

rpio.open(25, rpio.OUTPUT, rpio.LOW);
rpio.write(25, 1);

rpio.open(11, rpio.OUTPUT, rpio.LOW);
rpio.write(11, 1);

rpio.open(8, rpio.OUTPUT, rpio.LOW);
rpio.write(8, 1);*/
