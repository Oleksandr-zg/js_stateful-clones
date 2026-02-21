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
    if (actions[index].type === 'addProperties') {
      const cop = { ...Object.assign(copyState, actions[index].extraData) };

      history.push(cop);
    }

    if (actions[index].type === 'removeProperties') {
      let cop = { ...copyState };

      for (let num = 0; num < actions[index].keysToRemove.length; num++) {
        delete copyState[actions[index].keysToRemove[num]];
        cop = { ...copyState };
      }

      history.push(cop);
    }

    if (actions[index].type === 'clear') {
      let cop = {};

      for (const key in copyState) {
        delete copyState[key];
        cop = { ...copyState };
      }

      history.push(cop);
    }
  }

  return history;
}

module.exports = transformStateWithClones;
