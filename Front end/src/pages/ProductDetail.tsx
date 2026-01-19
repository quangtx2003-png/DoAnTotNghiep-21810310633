import { useEffect, useState, useMemo, useRef } from 'react'
import { useParams } from 'react-router'
import { getProductDetail, getProductsDetailList } from '@/lib/axios/product'
import type { ProductDetail } from '@/types/product'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useAuthDialogStore } from '@/store/useAuthDialogStore'
import { parseImageString } from '@/lib/image-parser'
import ProductDetailSkeleton from '@/components/skeleton/product-detail-skeleton'
import { ProductImages } from '@/components/product-detail/product-images'
import { ProductInfo } from '@/components/product-detail/product-info'
import { ProductGuides } from '@/components/product-detail/product-guides'
import { RelatedProducts } from '@/components/product-detail/related-products'
import { SizeGuideDialog } from '@/components/product-detail/size-guide-dialog'
import { SupportPolicyDialog } from '@/components/product-detail/support-policy-dialog'
import { FAQDialog } from '@/components/product-detail/faq-dialog'
import NotFoundPage from '@/pages/NotFoundPage'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([])
  const [addedToCart, setAddedToCart] = useState(false)
  const [openSizeGuide, setOpenSizeGuide] = useState(false)
  const [openSupport, setOpenSupport] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(false)

  const { user, token } = useAuthStore()
  const {
    isInWishlist,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isLoading: wishlistLoading,
  } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const { openDialog } = useAuthDialogStore()

  const isWishlisted = product ? isInWishlist(product.id) : false

  const contentRef = useRef(null)

  const allImages = useMemo(() => {
    if (!product) return []

    const images = new Set<string>()

    if (product.thumbnail) {
      images.add(product.thumbnail)
    }

    if (product.image) {
      parseImageString(product.image).forEach((img) => images.add(img))
    }

    product.variants?.forEach((variant) => {
      if (variant.image) {
        images.add(variant.image)
      }
    })

    return Array.from(images)
  }, [product])

  const previewVariant = useMemo(() => {
    if (!product?.variants) return null
    if (Object.keys(selectedOptions).length === 0) return null

    return (
      product.variants.find((variant) => {
        if (!variant.options) return false

        return Object.entries(selectedOptions).every(
          ([key, value]) => variant.options?.[key] === value
        )
      }) || null
    )
  }, [product, selectedOptions])

  const matchingVariant = useMemo(() => {
    if (!product?.variants || !product.attributes) return null

    if (Object.keys(selectedOptions).length !== product.attributes.length) {
      return null
    }

    return (
      product.variants.find((variant) => {
        if (!variant.options) return false

        return product.attributes!.every((attr) => {
          return variant.options![attr.fieldName] === selectedOptions[attr.fieldName]
        })
      }) || null
    )
  }, [product, selectedOptions])

  const getAvailableOptions = (attributeFieldName: string) => {
    if (!product?.variants || !product?.attributes) return []

    const attribute = product.attributes.find((attr) => attr.fieldName === attributeFieldName)
    if (!attribute?.options) return []

    return attribute.options
      .filter((option) => {
        return product.variants!.some((variant) => {
          if (!variant.options) return false

          return (
            Object.entries(selectedOptions).every(([key, value]) => {
              if (key === attributeFieldName) return true
              return variant.options![key] === value
            }) && variant.options[attributeFieldName] === option.value
          )
        })
      })
      .map((option) => ({
        id: String(option.id),
        value: option.value,
      }))
  }

  const getStockForOption = (attributeFieldName: string, optionValue: string) => {
    if (!product?.variants) return 0

    const tempSelections = { ...selectedOptions, [attributeFieldName]: optionValue }

    const variant = product.variants.find((v) => {
      if (!v.options) return false
      return Object.entries(tempSelections).every(([key, value]) => v.options![key] === value)
    })

    return variant?.stock || 0
  }

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      setIsLoading(true)
      const data = await getProductDetail(id)

      if (data) {
        setProduct(data)
        setSelectedOptions({})

        const related = await getProductsDetailList({
          categoryId: data.categoryId,
          limit: 8,
        })
        setRelatedProducts(related.items.filter((p) => p.id !== data.id))
      }

      setIsLoading(false)
    }

    fetchProduct()
  }, [id])

  const handleWishlistToggle = async () => {
    if (!product) return

    if (!token || !user) {
      openDialog()
      return
    }

    if (isWishlisted) {
      await removeFromWishlist(product.id, user.id)
    } else {
      await addToWishlist(product.id, user.id)
    }
  }

  const handleAddToCart = () => {
    if (!matchingVariant || !product || !matchingVariant.id) return

    addToCart(matchingVariant.id, quantity)

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleOptionChange = (fieldName: string, value: string) => {
    setSelectedOptions((prev) => {
      if (prev[fieldName] === value) {
        const next = { ...prev }
        delete next[fieldName]
        return next
      }

      return {
        ...prev,
        [fieldName]: value,
      }
    })
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity))
  }

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (!product) {
    return <NotFoundPage />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Product Detail Section */}
      <section ref={contentRef} className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
          <ProductImages
            images={allImages}
            activeImage={previewVariant?.image}
            alt={product.name}
            isWishlisted={isWishlisted}
            wishlistLoading={wishlistLoading}
            onWishlistToggle={handleWishlistToggle}
          />
          <ProductInfo
            product={product}
            selectedOptions={selectedOptions}
            matchingVariant={matchingVariant}
            quantity={quantity}
            addedToCart={addedToCart}
            onOptionChange={handleOptionChange}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            getAvailableOptions={getAvailableOptions}
            getStockForOption={getStockForOption}
          />
        </div>
      </section>

      {/* Product Guides Section */}
      <ProductGuides
        onOpenSizeGuide={() => setOpenSizeGuide(true)}
        onOpenSupport={() => setOpenSupport(true)}
        onOpenFAQ={() => setOpenFAQ(true)}
      />

      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} />

      {/* Dialogs */}
      <SizeGuideDialog open={openSizeGuide} onOpenChange={setOpenSizeGuide} />
      <SupportPolicyDialog open={openSupport} onOpenChange={setOpenSupport} />
      <FAQDialog open={openFAQ} onOpenChange={setOpenFAQ} />
    </div>
  )
}

export default ProductDetailPage
