export const getValue = (name: string) => {
    const value = localStorage.getItem(name);
    const storedValue = value ? value : "{}";
    return JSON.parse(storedValue);
}

export const setValue = (name: string, value: object) => {
    const data = JSON.stringify(value);
    localStorage.setItem(name, data);
}

export const isUserLogined = () => {
    return !!localStorage.getItem('token');
}