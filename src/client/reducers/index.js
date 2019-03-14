import { handleActions } from 'redux-actions';
import produce from 'immer';

import Actions from '../actions';

const INITIAL_STATE = {
  tools: [],
  settings: {},
  summaries: {},
  active: {
    modal: false,
    tool: undefined,
    setting: undefined,
    diffstat: undefined,
  },
};

export default handleActions({
  [Actions.model.setTools]: produce((draft, { payload: { tools } }) => {
    draft.tools = tools;
    tools.forEach((tool) => {
      draft.settings[tool] = [];
      draft.summaries[tool] = {};
    });
  }),
  [Actions.model.setSettings]: produce((draft, { payload: { tool, settings } }) => {
    draft.settings[tool] = settings;
  }),
  [Actions.model.setSummaries]: produce((draft, { payload: { tool, summaries } }) => {
    summaries.forEach(({ setting, summary }) => {
      draft.summaries[tool][setting] = summary;
    });
  }),
  [Actions.model.setActiveModalVisibility]: produce((draft, { payload: { visible } }) => {
    draft.active.modal = visible;
  }),
  [Actions.model.setActiveDiffstat]: produce((draft, { payload: { tool, setting, diffstat } }) => {
    draft.active.tool = tool;
    draft.active.setting = setting;
    draft.active.diffstat = diffstat;
  }),
}, INITIAL_STATE);
