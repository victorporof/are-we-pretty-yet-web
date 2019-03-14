import ky from 'ky';

import Actions from './actions';

export default {
  fetchData: () => async (dispatch, getState) => {
    await dispatch(Actions.fetchTools());
    await dispatch(Actions.fetchSettings(getState()));
    await dispatch(Actions.fetchSummaries(getState()));
  },

  fetchTools: () => async (dispatch) => {
    const tools = await ky.get('api/tools').json();
    dispatch(Actions.model.setTools(tools));
  },

  fetchSettings: ({ tools }) => async (dispatch) => {
    await Promise.all(tools.map(async (tool) => {
      const settings = await ky.get(`api/settings/${tool}`).json();
      dispatch(Actions.model.setSettings(tool, settings));
    }));
  },

  fetchSummaries: ({ tools }) => async (dispatch) => {
    await Promise.all(tools.map(async (tool) => {
      const summaries = await ky.get(`api/summaries/${tool}`).json();
      dispatch(Actions.model.setSummaries(tool, summaries));
    }));
  },

  fetchDiffstat: (tool, setting) => async (dispatch) => {
    const diffstat = await ky.get(`api/diffstat/${tool}/${setting}`).json();
    dispatch(Actions.model.setActiveDiffstat(tool, setting, diffstat));
    dispatch(Actions.model.setActiveModalVisibility({ visible: true }));
  },
};
