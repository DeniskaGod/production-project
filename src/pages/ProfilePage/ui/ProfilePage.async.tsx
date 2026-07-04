import { lazy } from 'react';

const ProfilePageAsync = lazy(() => import('./ProfilePage').then((module) => ({ default: module.default })));

export default ProfilePageAsync;
