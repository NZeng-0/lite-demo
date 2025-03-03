import { useToast } from 'vue-toastification'

export function useSpeech(newMessage: any) {
  const toast = useToast()
  const isRecording = ref(false)
  let recognition: any | null = null

  // 语音识别
  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('浏览器不支持语音识别')
      return
    }

    isRecording.value = true
    // eslint-disable-next-line new-cap
    recognition = new (window as any).webkitSpeechRecognition()
    recognition.lang = 'zh-CN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: any) => {
      newMessage.value = event.results[0][0].transcript
    }

    recognition.onend = () => {
      isRecording.value = false
    }

    recognition.start()
  }

  // 停止语音识别
  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
      isRecording.value = false
    }
  }

  // 朗读消息
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    speechSynthesis.speak(utterance)
  }

  // 组件销毁时，确保停止语音识别
  onUnmounted(() => {
    if (recognition) {
      recognition.stop()
    }
  })

  return { isRecording, startRecording, stopRecording, speakText }
}
