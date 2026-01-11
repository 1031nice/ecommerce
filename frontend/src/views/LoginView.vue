<script setup lang="ts">
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null

const id = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// Modals state
const showFindIdModal = ref(false)
const showResetPwdModal = ref(false)

// Reset Password state
const resetPhone = ref('')
const resetVerifyCode = ref('')
const isResetCodeSent = ref(false)
const tempPassword = ref('')

const handleLogin = async () => {
    if (!supabase) {
        alert('Supabase 설정이 필요합니다.')
        return
    }

    loading.value = true
    errorMsg.value = ''

    // TODO: ID를 이메일로 변환하거나, Username으로 로그인하는 로직 필요
    // 현재는 ID 필드 값을 그대로 Email 자리에 넣어 시도합니다.
    const { error } = await supabase.auth.signInWithPassword({
        email: id.value,
        password: password.value,
    })
    
    loading.value = false

    if (error) {
        errorMsg.value = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
        console.error(error.message)
    } else {
        window.location.href = '/'
    }
}

// Find ID Logic
const openFindId = () => {
  showFindIdModal.value = true
}
const closeFindId = () => {
  showFindIdModal.value = false
}

// Reset Password Logic
const openResetPwd = () => {
  showResetPwdModal.value = true
  resetPhone.value = ''
  resetVerifyCode.value = ''
  isResetCodeSent.value = false
  tempPassword.value = ''
}
const closeResetPwd = () => {
  showResetPwdModal.value = false
}
const sendResetCode = () => {
  if (!resetPhone.value) {
    alert('휴대폰 번호를 입력해주세요.')
    return
  }
  // Mock sending SMS
  alert('인증번호가 발송되었습니다.')
  isResetCodeSent.value = true
}
const verifyResetCode = () => {
  if (!resetVerifyCode.value) {
    alert('인증번호를 입력해주세요.')
    return
  }
  // Mock verification logic
  tempPassword.value = 'TempPass1234!'
}
</script>

<template>
  <div class="min-h-screen flex items-start justify-center bg-gray-50 pt-32 relative">
    <div class="max-w-md w-full space-y-8 p-8 bg-white shadow rounded z-10">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          또는
          <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            새 계정 만들기
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div v-if="errorMsg" class="rounded-md bg-red-50 p-4">
            <div class="text-sm text-red-700">{{ errorMsg }}</div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="id" class="sr-only">아이디</label>
            <input id="id" name="id" type="text" required class="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="아이디" v-model="id">
          </div>
          <div>
            <label for="password" class="sr-only">비밀번호</label>
            <input id="password" name="password" type="password" required class="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="비밀번호" v-model="password">
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            <span v-if="loading">로그인 중...</span>
            <span v-else>로그인</span>
          </button>
        </div>

        <div class="flex items-center justify-center space-x-4 text-sm">
          <button type="button" @click="openFindId" class="font-medium text-gray-600 hover:text-gray-900">
            아이디 찾기
          </button>
          <span class="text-gray-300">|</span>
          <button type="button" @click="openResetPwd" class="font-medium text-gray-600 hover:text-gray-900">
            비밀번호 재설정
          </button>
        </div>
      </form>
    </div>

    <!-- 아이디 찾기 모달 -->
    <div v-if="showFindIdModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeFindId">
      <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-4">
        <h3 class="text-lg font-bold mb-4">아이디 찾기</h3>
        <p class="text-gray-700 mb-6">
          아이디 찾기는 고객센터로 문의해주세요.<br/>
          <span class="font-bold text-indigo-600">02-1234-5678</span>
        </p>
        <div class="text-right">
          <button @click="closeFindId" class="px-4 py-2 bg-gray-200 rounded text-gray-800 hover:bg-gray-300 text-sm">닫기</button>
        </div>
      </div>
    </div>

    <!-- 비밀번호 재설정 모달 -->
    <div v-if="showResetPwdModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeResetPwd">
      <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-4">
        <h3 class="text-lg font-bold mb-4">비밀번호 재설정</h3>
        
        <div v-if="!tempPassword">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
            <div class="flex gap-2">
              <input type="tel" v-model="resetPhone" class="block w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="01012345678">
              <button @click="sendResetCode" :disabled="isResetCodeSent" class="whitespace-nowrap px-3 py-2 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 disabled:bg-gray-400">
                {{ isResetCodeSent ? '재발송' : '인증요청' }}
              </button>
            </div>
          </div>

          <div v-if="isResetCodeSent" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">인증번호</label>
            <div class="flex gap-2">
              <input type="text" v-model="resetVerifyCode" class="block w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="인증번호 입력">
              <button @click="verifyResetCode" class="whitespace-nowrap px-3 py-2 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700">
                확인
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-4">
          <p class="text-gray-600 mb-2">초기화된 비밀번호입니다.</p>
          <div class="text-xl font-bold text-indigo-600 bg-gray-100 p-3 rounded mb-2">
            {{ tempPassword }}
          </div>
          <p class="text-xs text-red-500">로그인 후 반드시 비밀번호를 변경해주세요.</p>
        </div>

        <div class="text-right mt-4">
          <button @click="closeResetPwd" class="px-4 py-2 bg-gray-200 rounded text-gray-800 hover:bg-gray-300 text-sm">닫기</button>
        </div>
      </div>
    </div>

  </div>
</template>
