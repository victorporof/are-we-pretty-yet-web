import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import * as Endpoints from '../../config/endpoints';

import indexRouter from './routes/index';
import apiRouter from './routes/api';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(Endpoints.BACKEND_SERVER_PORT, () => console.log('Listening...'));
