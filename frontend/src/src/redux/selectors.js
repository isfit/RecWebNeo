// Modal
export const getLoginModalState = store => store.modal.showLoginModal;

// Login
export const getUserLogedIn = store => store.user.userLogedIn;
export const getUserAuthKey = store => store.user.authenticationKey;

// Application
export const getAppliedPositions = store => store.application.positions;