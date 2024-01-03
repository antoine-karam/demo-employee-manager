export const scrollToTop = (id?: string) => () => {
  const doc = document.getElementById(id || 'my-outlet');
  if (doc) {
    doc.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const currentLocation = (path: string, defaultLocation: string) => {
  if (path === '/') {
    return defaultLocation;
  }
  const paths: string[] = path.split('/');
  if (paths.length > 0) {
    return paths[paths.length - 1];
  } else {
    return '';
  }
};

export const generateTheme = (): CSSStyleDeclaration => {
  const rootDoc = document.documentElement;
  const rootStyles = getComputedStyle(rootDoc);
  return rootStyles;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const openFullscreen = () => {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    /* @ts-ignore */
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    /* @ts-ignore */
    elem.mozRequestFullScreen();
    /* @ts-ignore */
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    /* @ts-ignore */
    elem.webkitRequestFullscreen();
    /* @ts-ignore */
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    /* @ts-ignore */
    elem.msRequestFullscreen();
  }
};

/* Close fullscreen */
export const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    /* @ts-ignore */
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    /* @ts-ignore */
    document.mozCancelFullScreen();
    /* @ts-ignore */
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    /* @ts-ignore */
    document.webkitExitFullscreen();
    /* @ts-ignore */
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    /* @ts-ignore */
    document.msExitFullscreen();
  }
};
