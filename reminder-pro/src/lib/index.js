export const getStore = item => JSON.parse(localStorage.getItem(item))

export const setStore = (name, info) => localStorage.setItem(name, JSON.stringify(info))