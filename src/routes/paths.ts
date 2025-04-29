export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,
  pettips: `/${rootPaths.pageRoot}/pettips`,
  users: `/${rootPaths.pageRoot}/users`,
  events: `/${rootPaths.pageRoot}/upcoming-events`,
  mentors: `/${rootPaths.pageRoot}/mentors`,
  messages: `/${rootPaths.pageRoot}/messages`,
  settings: `/${rootPaths.pageRoot}/settings`,

  signin: `/${rootPaths.authRoot}/signin`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
