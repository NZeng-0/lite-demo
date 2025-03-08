import { useToast } from 'vue-toastification'

export function useSpeech(newMessage: any, tempInterimText: any, lastInterimText: any) {
  const toast = useToast()
  const isRecording = ref(false)
  let recognition: any | null = null

  function startRecording() {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('浏览器不支持语音识别')
      return
    }

    isRecording.value = true
    // eslint-disable-next-line new-cap
    recognition = new (window as any).webkitSpeechRecognition()
    recognition.lang = 'zh-CN'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      let finalText = ''
      let interimText = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript
        }
        else {
          interimText += event.results[i][0].transcript
        }
      }

      if (finalText) {
        newMessage.value += finalText
        tempInterimText.value = ''
        lastInterimText.value = ''
        return
      }

      tempInterimText.value = interimText
    }

    recognition.onend = () => {
      isRecording.value = false

      // **保留 `interimText`，避免丢失内容**
      if (tempInterimText.value) {
        newMessage.value = tempInterimText.value
        tempInterimText.value = ''
      }
    }

    recognition.start()
  }

  function stopRecording() {
    if (recognition) {
      recognition.stop()
      isRecording.value = false
    }
  }

  function speakText(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    speechSynthesis.speak(utterance)
  }

  onUnmounted(() => {
    if (recognition) {
      recognition.stop()
    }
  })

  return { isRecording, startRecording, stopRecording, speakText }
}
