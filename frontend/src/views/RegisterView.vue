<script setup lang="ts">
import { ref, watch } from 'vue'

// 상태 관리
const form = ref({
  id: '',
  password: '',
  passwordConfirm: '',
  email: '',
  businessNumber: '',
  phoneNumber: '',
  verificationCode: '',
  businessAddress: '',
  yardAddress: ''
})

const fileInput = ref<HTMLInputElement | null>(null)
const isPhoneVerified = ref(false)
const isSameAddress = ref(false)
const loading = ref(false)
const errorMsg = ref('')

// 비밀번호 일치 확인
const isPasswordMismatch = ref(false)
watch(() => [form.value.password, form.value.passwordConfirm], ([pwd, confirm]) => {
  isPasswordMismatch.value = pwd !== confirm && confirm !== ''
})

// 주소 동기화 로직
watch(isSameAddress, (newVal) => {
  if (newVal) {
    form.value.yardAddress = form.value.businessAddress
  } else {
    form.value.yardAddress = ''
  }
})

// 사업장 주소가 바뀌는데 체크되어 있다면 야적장 주소도 같이 업데이트
watch(() => form.value.businessAddress, (newVal) => {
  if (isSameAddress.value) {
    form.value.yardAddress = newVal
  }
})

// 더미 휴대폰 인증 로직
const requestVerification = () => {
  if (!form.value.phoneNumber) {
    alert('휴대폰 번호를 입력해주세요.')
    return
  }
  alert(`인증번호가 발송되었습니다. (테스트용: 아무 번호나 입력하세요)`)
}

const verifyCode = () => {
  if (!form.value.verificationCode) {
    alert('인증번호를 입력해주세요.')
    return
  }
  isPhoneVerified.value = true
  alert('인증되었습니다.')
}

const handleRegister = async () => {
  // 유효성 검사
  if (!form.value.id || !form.value.password) {
    errorMsg.value = '아이디와 비밀번호는 필수입니다.'
    return
  }
  if (isPasswordMismatch.value) {
    errorMsg.value = '비밀번호가 일치하지 않습니다.'
    return
  }
  if (!isPhoneVerified.value) {
    errorMsg.value = '휴대폰 인증을 완료해주세요.'
    return
  }

  loading.value = true
  errorMsg.value = ''

  // TODO: 실제 백엔드/Supabase 연동 시, ID를 이메일 형식으로 변환하거나 별도 로직 필요
  // 현재는 UI 동작 확인용 더미 처리
  setTimeout(() => {
    alert('회원가입 요청이 완료되었습니다.\n(현재는 UI 데모입니다)')
    loading.value = false
    window.location.href = '/login'
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-xl w-full space-y-8 bg-white p-8 shadow rounded-lg">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            로그인하기
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        
        <!-- 에러 메시지 -->
        <div v-if="errorMsg" class="rounded-md bg-red-50 p-4">
          <div class="text-sm text-red-700">{{ errorMsg }}</div>
        </div>

        <div class="space-y-4">
          
          <!-- 기본 정보 섹션 -->
          <div class="bg-gray-50 p-4 rounded-md space-y-3">
            <h3 class="text-lg font-medium text-gray-900">기본 정보</h3>
            
            <!-- 아이디 -->
            <div>
              <label for="id" class="block text-sm font-medium text-gray-700">아이디 <span class="text-red-500">*</span></label>
              <input id="id" v-model="form.id" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="아이디를 입력하세요">
            </div>

            <!-- 비밀번호 -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">비밀번호 <span class="text-red-500">*</span></label>
              <input id="password" v-model="form.password" type="password" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="비밀번호">
            </div>

            <!-- 비밀번호 확인 -->
            <div>
              <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">비밀번호 재확인 <span class="text-red-500">*</span></label>
              <input id="passwordConfirm" v-model="form.passwordConfirm" type="password" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="비밀번호를 다시 입력하세요">
              <p v-if="isPasswordMismatch" class="mt-1 text-sm text-red-600">비밀번호가 일치하지 않습니다.</p>
            </div>
          </div>

          <!-- 연락처 정보 섹션 -->
          <div class="bg-gray-50 p-4 rounded-md space-y-3">
            <h3 class="text-lg font-medium text-gray-900">연락처 정보</h3>
            
            <!-- 대표 번호 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">대표 번호 (본인 인증) <span class="text-red-500">*</span></label>
              <div class="flex mt-1 gap-2">
                <input v-model="form.phoneNumber" type="tel" :disabled="isPhoneVerified" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="- 없이 숫자만 입력">
                <button type="button" @click="requestVerification" :disabled="isPhoneVerified" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400 whitespace-nowrap flex-shrink-0">
                  인증요청
                </button>
              </div>
            </div>

            <!-- 인증 번호 확인 -->
            <div v-if="!isPhoneVerified">
              <div class="flex mt-1 gap-2">
                <input v-model="form.verificationCode" type="text" class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="인증번호 입력">
                <button type="button" @click="verifyCode" class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none whitespace-nowrap flex-shrink-0">
                  확인
                </button>
              </div>
            </div>
            <div v-else class="text-sm text-green-600 font-medium">
              ✓ 인증되었습니다.
            </div>

            <!-- 이메일 (선택) -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">이메일 (선택)</label>
              <input id="email" v-model="form.email" type="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="example@domain.com">
            </div>
          </div>

          <!-- 사업자 정보 섹션 -->
          <div class="bg-gray-50 p-4 rounded-md space-y-3">
            <h3 class="text-lg font-medium text-gray-900">사업자 정보 (선택)</h3>

            <!-- 사업자 번호 -->
            <div>
              <label for="businessNumber" class="block text-sm font-medium text-gray-700">사업자 등록 번호</label>
              <input id="businessNumber" v-model="form.businessNumber" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="000-00-00000">
            </div>

            <!-- 사업자 등록증 파일 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">사업자 등록증 사본</label>
              <input ref="fileInput" type="file" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
            </div>
          </div>

          <!-- 주소 정보 섹션 -->
          <div class="bg-gray-50 p-4 rounded-md space-y-3">
            <h3 class="text-lg font-medium text-gray-900">주소지 정보</h3>

            <!-- 사업장 주소 -->
            <div>
              <label for="businessAddress" class="block text-sm font-medium text-gray-700">사업장 주소 (선택)</label>
              <input id="businessAddress" v-model="form.businessAddress" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="서울시 강남구...">
            </div>

            <!-- 야적장 주소 -->
            <div>
              <div class="flex items-center justify-between">
                <label for="yardAddress" class="block text-sm font-medium text-gray-700">야적장 주소 (선택)</label>
                <div class="flex items-center">
                  <input id="sameAddress" type="checkbox" v-model="isSameAddress" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                  <label for="sameAddress" class="ml-2 block text-sm text-gray-900">사업장 주소와 동일</label>
                </div>
              </div>
              <input id="yardAddress" v-model="form.yardAddress" :disabled="isSameAddress" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-200" placeholder="물건을 상/하차할 주소">
            </div>
          </div>

        </div>

        <div>
          <button type="submit" :disabled="loading" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            <span v-if="loading">처리 중...</span>
            <span v-else>회원가입 완료</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
