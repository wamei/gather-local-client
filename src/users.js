import { Game } from '@gathertown/gather-game-client';

/**
 * Sets the name prefix of the current player in the game.
 * @param {Game} game - The game instance.
 * @param {string} prefix - The prefix to set. Default is an empty string.
 */
export const setNamePrefix = (game, prefix = '') => {
  const player = game.getMyPlayer();
  let newName = removeNamePrefix(game);
  newName = `${prefix} ${newName}`;
  game.setName(newName, player.id);
  return newName;
}

/**
 * Removes the emoji prefix from the name of the current player in the game.
 * @param {Game} game - The game instance.
 */
export const removeNamePrefix = (game) => {
  const player = game.getMyPlayer();
  const newName = player.name.replace(/^((\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F).*? )+/u, '');
  game.setName(newName, player.id);
  return newName;
}

/**
 * Sets the text status for a game.
 * @param {Game} game - The game object.
 * @param {string} status - The text status to set.
 */
export const setTextStatus = (game, status) => {
  const player = game.getMyPlayer();
  game.setTextStatus(status, player.id);
}