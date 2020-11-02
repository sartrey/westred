const { app, protocol, BrowserWindow } = require('electron');
const fetch = require('node-fetch');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  })

  win.loadFile('index.html')
  // win.webContents.openDevTools()
}

// protocol.registerSchemesAsPrivileged([
//   { scheme: 'westred', privileges: { bypassCSP: true } }
// ]);

function handleProxy(request, callback) {
  const proxy = 'http://47.52.35.199:4009';
  const url = new URL(request.url);
  const headers = {};
  Object.keys(request.headers).map((key) => {
    headers[key.toLowerCase()] = request.headers[key];
  });
  headers['x-cruorin-host'] = url.host;
  headers['x-cruorin-protocol'] = url.protocol.replace(/[^\w]+/g, '');
  headers['user-agent'] = headers['user-agent'].replace(/Electron\/\S+\s+/, '');
  headers['accept'] = '*/*';
  const newURL = proxy + url.pathname;
  console.log(newURL, headers);
  const result = {};
  fetch(newURL, { headers })
    .then(response => {
      result.status = response.status;
      const headers = response.headers.raw();
      delete headers['x-frame-options'];
      response.headers = new fetch.Headers(headers);
      result.headers = headers;
      return response.buffer();
    })
    .then(buffer => {
      result.data = buffer;
      // console.log(result);
      callback(result);
    })
    .catch(error => {
      console.error(error);
      callback({ status: 599, data: 'proxy error' });
    });
}

app.whenReady().then(() => {
  createWindow();
  protocol.interceptBufferProtocol('http', handleProxy);
  protocol.interceptBufferProtocol('https', handleProxy);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});
