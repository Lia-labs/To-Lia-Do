import {Preload} from '../preload/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
    interface Window {
        preload: Preload;
    }
}