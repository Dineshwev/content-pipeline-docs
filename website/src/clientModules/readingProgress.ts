import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  let progressBar: HTMLDivElement | null = null;

  const ensureProgressBar = (): HTMLDivElement => {
    let bar = document.getElementById('reading-progress-bar') as HTMLDivElement | null;
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'reading-progress-bar';
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-label', 'Article reading progress');
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
      bar.setAttribute('aria-valuenow', '0');
      document.body.appendChild(bar);
    }
    return bar;
  };

  const updateProgress = () => {
    // Only show reading progress on documentation / article pages
    const pathname = window.location.pathname;
    const isDocPage = pathname.includes('/docs/');

    if (!progressBar) {
      progressBar = ensureProgressBar();
    }

    if (!isDocPage) {
      progressBar.style.display = 'none';
      return;
    }

    progressBar.style.display = 'block';

    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height <= 0) {
      progressBar.style.width = '0%';
      progressBar.setAttribute('aria-valuenow', '0');
      return;
    }

    const scrolled = Math.min(100, Math.max(0, Math.round((winScroll / height) * 100)));
    progressBar.style.width = `${scrolled}%`;
    progressBar.setAttribute('aria-valuenow', String(scrolled));
  };

  window.addEventListener('scroll', updateProgress, {passive: true});
  window.addEventListener('resize', updateProgress, {passive: true});
}

export function onRouteDidUpdate(): void {
  if (ExecutionEnvironment.canUseDOM) {
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }
}
