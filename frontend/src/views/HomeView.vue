<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Product {
  id: string
  slug: string
  title: string
  price: number
  thumbnailUrl: string
}

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/api/products')
    if (res.ok) {
        products.value = await res.json()
    } else {
        error.value = `상품을 불러오는데 실패했습니다: ${res.statusText}`
    }
  } catch (e: any) {
    error.value = e.message || '알 수 없는 오류가 발생했습니다.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 메인 배너나 상단 영역이 필요하다면 여기에 추가 -->
    
    <div v-if="loading" class="text-center py-20">
        <p class="text-gray-500 text-lg">상품 목록을 불러오는 중입니다...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg mb-8" role="alert">
        <p class="font-bold">오류 발생</p>
        <p>{{ error }}</p>
        <p class="text-sm mt-2">백엔드 서버가 실행 중인지 확인해주세요.</p>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-20 bg-white rounded-lg shadow-sm">
        <p class="text-gray-500 text-lg">등록된 상품이 없습니다.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <router-link :to="`/products/${product.slug}`" class="block">
          <!-- 썸네일 영역 -->
          <div class="aspect-w-1 aspect-h-1 w-full bg-gray-200 overflow-hidden relative" style="padding-top: 100%;">
            <img 
              v-if="product.thumbnailUrl" 
              :src="product.thumbnailUrl" 
              alt="상품 이미지" 
              class="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            >
            <div v-else class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <span class="text-sm">이미지 없음</span>
            </div>
          </div>
          
          <!-- 상품 정보 영역 -->
          <div class="p-4">
            <h3 class="text-md font-medium text-gray-900 truncate mb-1">{{ product.title }}</h3>
            <p class="text-lg font-bold text-gray-900">
              {{ product.price.toLocaleString() }}원
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
