##Setup instructions

1. Use Raspberry PI GPIO GUI and Node webserver to identify and test pinouts.
Repo: https://github.com/tutRPi/Raspberry-Pi-Simple-Web-GPIO-GUI

- Run `sudo npm start` to start the webserver.
- Navigate to `raspberrypi/` in a browser to view UI.



2. Start a touch designer file that outputs merged normalized channels with an `oscout`.
- Protocol: Messaging (UDP)
- Network Address: IP of target Raspberry Pi
- Active
- Network port: 9998
- Max Queue size: 0
- Cook every frame: Off
- Numeric format: Float (32 bit)
- Data Format: Sample
- Send Events Every Cook: On



3. Run `node from-touch-designer.js`.



4. To make changes, update channels names and pinout numbers in `createSocket` and `sendChannelToPinout` within `from-touch-designer.js`.
