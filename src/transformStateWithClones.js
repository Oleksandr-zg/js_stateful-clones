'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const copyState = { ...state };

  for (let index = 0; index < actions.length; index++) {
    let copy = {};

    switch (actions[index].type) {
      case 'addProperties':
        copy = { ...Object.assign(copyState, actions[index].extraData) };
        break;

      case 'removeProperties':
        copy = { ...copyState };

        for (let num = 0; num < actions[index].keysToRemove.length; num++) {
          delete copyState[actions[index].keysToRemove[num]];
          copy = { ...copyState };
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
          copy = { ...copyState };
        }
        break;

      default:
        copy = { ...copyState };
    }

    history.push(copy);
  }

  return history;
}

module.exports = transformStateWithClones;
