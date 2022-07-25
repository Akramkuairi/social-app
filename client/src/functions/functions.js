// query selector and query selector all
export function qs(elem) {
  return document.querySelector(elem);
}

export function qsa(elem) {
  return document.querySelectorAll(elem);
}

// query selector with specific options
export function qsev(elem) {
  return qs(elem).value;
}

export function qsac(elem, classs) {
  return qs(elem).classList.add(classs);
}

export function qsrc(elem, classs) {
  return qs(elem).classList.remove(classs);
}
