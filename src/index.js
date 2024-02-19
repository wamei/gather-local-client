import { Game } from '@gathertown/gather-game-client';
import { config } from 'dotenv';
import { setNamePrefix, removeNamePrefix, setTextStatus } from './users.js';
import { isPlaying, nowPlaying } from './videos/index.js';

globalThis.WebSocket = (await import('isomorphic-ws')).default;

// .envファイル読み込み
config({ path: '.env.local' });
config();

// 接続情報取得
function getApiKey() {
  if(!process.env.GATHER_API_KEY) {
    throw new Error('GATHER_API_KEY is not set');
  }
  return process.env.GATHER_API_KEY;
}

function getSpaceId() {
  if (!process.env.GATHER_SPACE_ID) {
    throw new Error('GATHER_SPACE_ID is not set');
  }
  return process.env.GATHER_SPACE_ID;
}

// Gatherに接続
const game = new Game(getSpaceId(), () => Promise.resolve({ apiKey: getApiKey() }));
game.connect();

// 状態管理用
const status = {
  connected: false,
  isPlaying: undefined,
  isPlayingTimerId: undefined,
  nowPlaying: undefined,
};

// 接続時のコールバック
game.subscribeToConnection((connected) => {
  console.log('is connected:', connected);
  status.connected = connected;

  // 1秒ごとに再生状況をチェック
  clearInterval(status.isPlayingTimerId);
  status.isPlayingTimerId = setInterval(async () => {
    handleNowPlaying();
  }, 1000);
});

const handleNowPlaying = async () => {
  try {
    // 再生状況が変わったときに名前に🎧を付け消しする
    const newIsPlaying = await isPlaying();
    if (status.isPlaying !== newIsPlaying) {
      status.isPlaying = newIsPlaying;
      console.log('isPlaying:', status.isPlaying);
      if (status.isPlaying) {
        setNamePrefix(game, '🎧');
      } else {
        removeNamePrefix(game);
      }
    }
    // 音楽再生中は内容をステータスに表示
    const newNowPlaying = await nowPlaying();
    if (status.nowPlaying?.isPlaying !== newNowPlaying.isPlaying
       || status.nowPlaying?.title !== newNowPlaying.title
        || status.nowPlaying?.artist !== newNowPlaying.artist) {
      status.nowPlaying = newNowPlaying;
      console.log('nowPlaying:', status.nowPlaying);
      if (status.nowPlaying.isPlaying) {
        setTextStatus(game, `♫ ${status.nowPlaying.title} - ${status.nowPlaying.artist}`);
      } else {
        setTextStatus(game, '');
      }
    }
  } catch (e) {
    console.error(e);
  }
}