export const getToken = () => localStorage.getItem("token");

export const persistToken = (accessToken) => {
    localStorage.setItem("token", accessToken);
};

export const killToken = () => {
    localStorage.removeItem("token");
};
