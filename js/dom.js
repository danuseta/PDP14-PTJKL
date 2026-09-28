export function h(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on')) element.addEventListener(key.slice(2), value);
    else if (value === true) element.setAttribute(key, '');
    else if (value !== false && value != null) element.setAttribute(key, value);
  }

  element.append(...children.flat().filter((child) => child != null && child !== false));
  return element;
}
