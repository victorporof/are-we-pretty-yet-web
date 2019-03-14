import merge from 'lodash/merge';

import Actions from './actions';
import Thunks from './thunks';

export default merge(Actions, Thunks);
