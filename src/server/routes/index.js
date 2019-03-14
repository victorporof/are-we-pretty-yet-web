import express from 'express';

import * as Paths from '../../../config/paths';

const router = express.Router();

router.use(express.static(Paths.DIST_DIR_PATH));

export default router;
