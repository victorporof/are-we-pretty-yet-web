import { createActions } from 'redux-actions';

export default createActions({
  model: {
    setTools: tools => ({ tools }),
    setSettings: (tool, settings) => ({ tool, settings }),
    setSummaries: (tool, summaries) => ({ tool, summaries }),
    setActiveModalVisibility: ({ visible }) => ({ visible }),
    setActiveDiffstat: (tool, setting, diffstat) => ({ tool, setting, diffstat }),
  },
});
