export default defineNuxtPlugin((nuxtApp) => {
 const { vueApp } = nuxtApp

  /**
   * Directive to let the Vue Router handle internal links,
   * instead of a hard refresh
   */
  vueApp.directive('router-links', {
    mounted(el) {
      el.addEventListener('click', handleAnchors)
      // window.addEventListener('hashchange', navigate)
    },

    beforeUnmount(el) {
      el.removeEventListener('click', handleAnchors)
      // window.removeEventListener('hashchange', navigate)
    },
  })

  function scrollToSmoothly (pos, time) {
    const currentPos = window.pageYOffset;
    let start = null;
    if(time == null) time = 500;
    pos += pos; time += time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        const progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}

  function navigate() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      scrollToSmoothly(target.offsetTop - 180, 400)
    }
  }

  function handleAnchors(
    event: MouseEvent & {
      target: HTMLElement
    }
  ) {
    const link = event.target.closest('a')
    if (
      !event.defaultPrevented &&
      link &&
      event.button === 0 &&
      link.target !== '_blank' &&
      link.rel !== 'external' &&
      !link.download &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const url = new URL(link.href)
      const { origin, pathname: path, hash } = url

      if (origin !== window.location.origin) return
      event.preventDefault()

      if (hash && (!path || path === useRoute().path)) {
        window.history.replaceState({}, '', link.href)
        navigate()
      } else {
        useRouter().push({ path, hash })
      }
    }
  }
})
