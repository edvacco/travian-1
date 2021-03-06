import { extend } from '../../utils';

import data from '../base';
import units from './units';
import culture from './culture';
import * as combat from './combat';

export default extend(data, {
    units,
    culture,
    combat,
});
