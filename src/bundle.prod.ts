import './main'
import { Workbox } from 'workbox-window'

window.addEventListener('load', () => {

  if ('serviceWorker' in navigator) {

    const wb = new Workbox('/sw.js')

    wb.addEventListener('waiting', () => {

      wb.messageSW({ type: 'SKIP_WAITING' })

      const closeLink = document.createElement('a')
      closeLink.setAttribute('style', 'font-size:larger;text-decoration:none;font-weight:bolder;line-height:0.5;vertical-align:bottom')
      closeLink.href = 'javascript:void(0)'
      closeLink.append('×')
      closeLink.onclick = () => container.remove()

      const refreshLink = document.createElement('a')
      refreshLink.setAttribute('style', 'font-weight:bold;text-decoration:none')
      refreshLink.href = '/'
      refreshLink.append('Refresh')

      const container = document.createElement('div')
      container.setAttribute('style', `width:fit-content;color:#111827;position:fixed;bottom:1ex;left:50%;transform:translateX(-50%);background:#e5e7eb;padding:1ex 1ex .5ex;z-index:100;line-height:1;font-size:smaller;border-radius:.25em;border:1px dotted #9ca3af`)
      container.append(closeLink, ' New version available! ', refreshLink, ' to update.')
      document.body.append(container)

    })

    wb.register()
  }

})
