export interface Message {
  text: string
  time: string
  sender: string
}

export function useChat() {
  const chatContainer = ref<HTMLElement | null>(null)
  const messages = ref<Message[]>([
    { text: '你好！请问有什么可以帮助您的？', time: new Date().toLocaleString(), sender: 'system' },
  ])
  const newMessage = ref('')
  const tempInterimText = ref('')
  const lastInterimText = ref('')

  const sendMessage = () => {
    if (!newMessage.value.trim())
      return

    messages.value.push({
      text: newMessage.value,
      time: new Date().toLocaleString(),
      sender: 'user',
    })
    newMessage.value = ''
    tempInterimText.value = ''

    // 确保 DOM 更新后滚动到底部
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  }

  return { chatContainer, messages, newMessage, tempInterimText, lastInterimText, sendMessage }
}
