import * as sapper from '@sapper/app';
import 'papercss/dist/paper.min.css';
import 'assets/css/common.css';
import 'plugins/firebase-config';

sapper.start({
	target: document.body,
});