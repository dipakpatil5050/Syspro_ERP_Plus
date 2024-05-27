// export const BaseURLApi = 'http://103.67.238.230:1385/';

const slugUrl = localStorage.getItem('SlugUrl');

const Slug = slugUrl?.slice(1, -1);

export const ServerBaseurl = `http://103.67.238.230:1385/${Slug}/`;
