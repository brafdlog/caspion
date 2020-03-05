<template>
  <section class="bg-gray-100 py-8">
    <div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Pricing</h1>
      <div class="w-full mb-4">
        <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
        <price name="Free" price="£0" :limited="true" :list="listFree" />
        <price-highlighted name="Basic" price="x.99" :limited="false" :list="listBasic" />
        <price name="Pro" price="£xx.99" :limited="false" :list="listPro" />
      </div>
    </div>
  </section>
</template>

<script>
import Price from '@/components/Price'
import PriceHighlighted from '@/components/PriceHighlighted'

export default {
  name: 'Prices',
  data() {
    return {
      listFree: ['Thing', 'Thing', 'Thing'],
      listBasic: ['Thing', 'Thing', 'Thing', 'Thing'],
      listPro: ['Thing', 'Thing', 'Thing', 'Thing', 'Thing']
    }
  },
  components: {
    price: Price,
    'price-highlighted': PriceHighlighted
  }
}
</script>
