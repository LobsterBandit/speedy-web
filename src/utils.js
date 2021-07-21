export function debounce(func, wait, immediate = false) {
  let timeout;
  return (...args) => {
    const callNow = immediate && !timeout;
    const next = () => func(...args);

    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  };
}
