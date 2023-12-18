import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { REACT_APP_MAGIC_PUBLISHABLE_KEY } from '../constants';

export const magic = new Magic(REACT_APP_MAGIC_PUBLISHABLE_KEY, {
  extensions: [new OAuthExtension()],
});
