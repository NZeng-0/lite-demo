<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useChat, useSpeech } from '~/composables'

const { chatContainer, messages, newMessage, tempInterimText, sendMessage } = useChat()
const { isRecording, startRecording, stopRecording, speakText } = useSpeech(newMessage, tempInterimText)

function toggleRecording() {
  isRecording.value ? stopRecording() : startRecording()
}
</script>

<template>
  <div h-full flex flex-col bg-gray-100 p-4>
    <!-- 消息列表 -->
    <div ref="chatContainer" class="flex-1 overflow-auto p-4">
      <ChatMessage
        v-for="(msg, index) in messages"
        :key="index"
        :text="msg.text"
        :time="msg.time"
        :sender="msg.sender"
        :speak-text="speakText"
      />
    </div>

    <!-- 输入框 -->
    <div class="flex items-center rounded-lg bg-white p-2 shadow-md">
      <!-- 输入框 -->
      <textarea
        v-model="tempInterimText"
        h-auto
        placeholder="请输入消息..."
        class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @keyup.enter="sendMessage"
      />

      <!-- 语音录制按钮 -->
      <button
        class="ml-2 flex items-center rounded-lg px-4 py-2 text-white transition-all duration-300"
        :class="isRecording ? 'bg-red-500' : 'bg-green-500'"
        @click="toggleRecording"
      >
        <Icon icon="heroicons-outline:microphone" class="mr-1 text-lg text-gray-500 hover:text-gray-700" />
        {{ isRecording ? '取消录制' : '开始录制' }}
      </button>

      <!-- 发送按钮 -->
      <button class="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white" @click="sendMessage">
        发送
      </button>
    </div>
  </div>
</template>
