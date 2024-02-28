import { networkInterfaces } from 'os'

export const OSCONFIG = () => {
    const nets = networkInterfaces();
    const results = Object.create({}); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            // if (net.family === familyV4Value && !net.internal) {
            // if (!results[name]) {
            // results[name] = [];
            // }
            // results[name].push(net.address);
            // }

            if (net.family === "IPv4") {
                results[name] = net;
            }
        }
    }

    return results;
}



/* 

Platform Information:

os.platform(): Returns the operating system platform.
Memory Information:

os.totalmem(): Returns the total amount of system memory in bytes.
os.freemem(): Returns the amount of free system memory in bytes.
CPU Information:

os.cpus(): Returns an array of objects containing information about each CPU/core installed.
Network Interfaces:

os.networkInterfaces(): Returns an object containing information about the network interfaces of the system.
User Information:

os.userInfo([options]): Returns information about the currently effective user.
Hostname:

os.hostname(): Returns the hostname of the operating system.
OS Type:

os.type(): Returns the operating system name.
OS Release:

os.release(): Returns the operating system release.
Endianness:

os.endianness(): Returns the endianness of the CPU.
Load Average:

os.loadavg(): Returns an array containing the 1, 5, and 15 minute load averages.

*/



/* 

const wifiControl = require('wifi-control');

// Initialize wifi-control
wifiControl.init({
  debug: true, // Enable debug mode
});

// Scan for available WiFi networks
wifiControl.scanForWiFi((err, response) => {
  if (err) {
    console.error('Error scanning for WiFi networks:', err);
    return;
  }

  // Print available WiFi networks
  console.log('Available WiFi networks:', response.networks);

  // Get the current WiFi connection information
  wifiControl.getIfaceState((err, state) => {
    if (err) {
      console.error('Error getting WiFi connection state:', err);
      return;
    }

    // Print WiFi connection state
    console.log('WiFi connection state:', state);

    // Check WiFi speed limit (assuming Mbps)
    const speedLimitMbps = state.speed;
    console.log('WiFi speed limit:', speedLimitMbps, 'Mbps');
  });
});

*/