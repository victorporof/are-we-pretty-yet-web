import path from 'path';

export const ROOT_DIR_PATH = path.join(__dirname, '..');

export const WEBPACK_DIR_PATH = path.join(ROOT_DIR_PATH, 'webpack');
export const DIST_DIR_PATH = path.join(ROOT_DIR_PATH, 'dist');

export const DATA_DIR_PATH = path.join(ROOT_DIR_PATH, 'data');
export const PUBLIC_DIR_PATH = path.join(ROOT_DIR_PATH, 'public');
export const SERVER_DIR_PATH = path.join(ROOT_DIR_PATH, 'src', 'server');
export const CLIENT_DIR_PATH = path.join(ROOT_DIR_PATH, 'src', 'client');

export const ENTRY_MAIN_FILE_PATH = path.join(CLIENT_DIR_PATH, 'index.js');
export const OUTPUT_BUNDLE_FILE_NAME = 'bundle.js';
export const INDEX_TEMPLATE_FILE_PATH = path.join(PUBLIC_DIR_PATH, 'index.html');
