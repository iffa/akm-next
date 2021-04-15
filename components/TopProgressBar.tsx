import NProgress from 'nprogress';
import Router from 'next/router';

NProgress.configure({ showSpinner: false });

let timer: NodeJS.Timeout;
let state: 'loading' | 'stop';
let activeRequests = 0;
const delay = 250;

function load() {
  if (state === 'loading') {
    return;
  }

  state = 'loading';

  timer = setTimeout(function () {
    NProgress.start();
  }, delay); // only show progress bar if it takes longer than the delay
}

function stop() {
  if (activeRequests > 0) {
    return;
  }

  state = 'stop';

  clearTimeout(timer);
  NProgress.done();
}

Router.events.on('routeChangeStart', load);
Router.events.on('routeChangeComplete', stop);
Router.events.on('routeChangeError', stop);

const originalFetch = window.fetch;
window.fetch = async function (...args) {
  const showProgress = args[0] && args[0].toString().includes('/api/');

  if (activeRequests === 0 && showProgress) {
    load();
  }

  if (showProgress) {
    activeRequests++;
  }

  try {
    const response = await originalFetch(...args);
    return response;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (showProgress) {
      activeRequests -= 1;
      if (activeRequests === 0) {
        stop();
      }
    }
  }
};

/**
 * @returns empty component
 */
export default function TopProgressBar(): null {
  return null;
}
