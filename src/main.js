const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config({ path: path.join(__dirname, '.env') });

let openaiClient = null;
function getOpenAIClient() {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    openaiClient = new OpenAIApi(new Configuration({ apiKey }));
  }
  return openaiClient;
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

app.whenReady().then(createWindow);

ipcMain.handle('get-api-key', () => {
  return process.env.OPENAI_API_KEY || null;
});

ipcMain.handle('openai-chat-completion', async (_event, { messages, model }) => {
  const client = getOpenAIClient();
  if (!client) {
    return { ok: false, error: 'Missing OPENAI_API_KEY' };
  }
  try {
    const response = await client.createChatCompletion({
      model: model || 'gpt-3.5-turbo',
      messages,
    });
    const content = response?.data?.choices?.[0]?.message?.content;
    if (content == null) {
      return { ok: false, error: 'Empty response from OpenAI' };
    }
    return { ok: true, content };
  } catch (err) {
    const msg =
      err?.response?.data?.error?.message ||
      err?.message ||
      'OpenAI request failed';
    const status = err?.response?.status;
    return { ok: false, error: msg, status };
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
