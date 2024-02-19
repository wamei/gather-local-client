import { execFile } from 'applescript';

/**
 * Checks if a video is currently playing.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the video is playing or not.
 */
export const isPlaying = () => {
  return new Promise((resolve, reject) => {
    execFile('src/videos/is_playing.applescript', (error, ret) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(ret === 'true');
      }
    });
  });
};

/**
 * Retrieves the currently playing video information.
 * @returns {Promise<Object>} A promise that resolves with the video information.
 */
export const nowPlaying = () => {
  return new Promise((resolve, reject) => {
    execFile('src/videos/now_playing.applescript', (error, ret) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(JSON.parse(ret));
      }
    });
  });
}