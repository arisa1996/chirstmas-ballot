import { onMounted, onUnmounted } from 'vue'
import { ElementListenerGroup, Event } from 'power-helper'

export const useScanner = () => {
    let el = new ElementListenerGroup(window)
    let keydownTime: number[] = []
    let keydownText = ''
    let event = new Event<{
        scan: {
            text: string
        }
    }>()

    const reset = () => {
        keydownTime = []
        keydownText = ''
    }

    onMounted(() => {
        el.add('keypress', ({ key }: KeyboardEvent) => {
            let lastTime = 0
            let now = Date.now()
            if (keydownTime.length > 0) {
                lastTime = keydownTime[keydownTime.length - 1]
            }
            if (lastTime !== 0 && (now - lastTime) > 30) {
                reset()
            } else if (key.toUpperCase() === 'ENTER') {
                event.emit('scan', { text: keydownText })
                reset()
                return false
            } else {
                keydownTime.push(Date.now())
                keydownText += key
            }
        })
    })

    onUnmounted(() => {
        el.clear()
    })

    return event
}
