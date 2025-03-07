import { useToast } from 'vue-toastification'

export function useSpeech(newMessage: any, tempInterimText: any) {
  const toast = useToast()
  const isRecording = ref(false)
  let recognition: any | null = null

  // 语音识别
  function startRecording() {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('浏览器不支持语音识别')
      return
    }

    isRecording.value = true
    // eslint-disable-next-line new-cap
    recognition = new (window as any).webkitSpeechRecognition()
    recognition.lang = 'zh-CN'
    recognition.continuous = true // 允许连续识别
    recognition.interimResults = true // 获取临时识别结果

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
        // tempInterimText.value = ''
        return
      }

      tempInterimText.value = interimText
    }

    recognition.onend = () => {
      isRecording.value = false
    }

    recognition.start()
  }

  // 停止语音识别
  function stopRecording() {
    if (recognition) {
      recognition.stop()
      isRecording.value = false
    }
  }

  // 朗读消息
  function speakText(text: string) {
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
