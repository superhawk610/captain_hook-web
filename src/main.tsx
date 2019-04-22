import * as React from 'react';
import { render } from 'react-dom';

import 'normalize.css';
import './styles.scss';

import App from './components/App';

const root = document.getElementById('root');
render(<App />, root);
