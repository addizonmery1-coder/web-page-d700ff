/** Registro del service worker y botón para instalar Adolever como app. */
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { FxButton } from './brand'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallApp() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    setInstalled(standalone)
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone)

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setPromptEvent(e as InstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setPromptEvent(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) return null

  if (promptEvent) {
    return (
      <FxButton
        variant="ghost"
        onClick={async () => {
          await promptEvent.prompt()
          await promptEvent.userChoice
          setPromptEvent(null)
        }}
      >
        <Download className="size-4" aria-hidden="true" />
        Instalar Adolever en tu celular
      </FxButton>
    )
  }

  if (isIOS) {
    return (
      <p className="text-sm text-muted-foreground">
        Para instalar Adolever en tu iPhone: toca <strong>Compartir</strong> y
        luego <strong>Agregar a inicio</strong>.
      </p>
    )
  }

  return null
}
