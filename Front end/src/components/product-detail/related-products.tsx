import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ProductCarousel } from '@/components/ui/product-carousel'
import type { ProductDetail } from '@/types/product'

interface RelatedProductsProps {
  products: ProductDetail[]
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const relatedRef = useRef(null)

  if (products.length === 0) return null

  return (
    <motion.section
      ref={relatedRef}
      className="mx-auto max-w-7xl px-6 py-16 border-t border-border"
    >
      <ProductCarousel products={products} title="Sản phẩm tương tự" />
    </motion.section>
  )
}
