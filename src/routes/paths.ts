export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,
  pettips: `/${rootPaths.pageRoot}/pettips`,
  petTipDetail: `/${rootPaths.pageRoot}/pettips/pettips-details/:tipId`,
  users: `/${rootPaths.pageRoot}/users`,
  events: `/${rootPaths.pageRoot}/upcoming-events`,
  eventDetails: `/${rootPaths.pageRoot}/upcoming-events/petevent-details/:eventId`,
  pets: `/${rootPaths.pageRoot}/pets`,
  petDetails: `/${rootPaths.pageRoot}/pets/pet-details/:petId`,
  mentors: `/${rootPaths.pageRoot}/mentors`,
  messages: `/${rootPaths.pageRoot}/messages`,
  settings: `/${rootPaths.pageRoot}/settings`,
  vlsRoot: `/${rootPaths.pageRoot}/vls`,
  vlsLawPractice: `/${rootPaths.pageRoot}/vls/law-practice`,
  vlsAcademy: `/${rootPaths.pageRoot}/vls/academy`,
  ramananFinancial: `/${rootPaths.pageRoot}/ramananFinacial`,
  pixelEye: `/${rootPaths.pageRoot}/pixel-eye`,
  signin: `/${rootPaths.authRoot}/signin`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
