import { useRef, useState, useEffect } from 'react'
import { getProductsDetailList } from '@/lib/axios/product'
import type { ProductDetail } from '@/types/product'
import { ProductCarousel } from '@/components/ui/product-carousel'
import ProductCardSkeleton from '@/components/skeleton/product-card-skeleton'

interface ProductsSectionProps {
  limit?: number
  title?: string
}

export const ProductsSection = ({
  limit = 12,
  title = 'Sản Phẩm Nổi Bật',
}: ProductsSectionProps) => {
  const productsRef = useRef(null)
  const [products, setProducts] = useState<ProductDetail[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      const data = await getProductsDetailList({ limit, page: 1 })
      setProducts(data.items)
      setIsLoading(false)
    }

    fetchProducts()
  }, [limit])

  if (isLoading) {
    return (
      <section id="products" ref={productsRef} className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl">{title}</h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="products" ref={productsRef} className="mx-auto max-w-7xl px-6 py-16">
      {products.length > 0 ? (
        <ProductCarousel products={products} title={title} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Không có sản phẩm nào</p>
        </div>
      )}
    </section>
  )
}
