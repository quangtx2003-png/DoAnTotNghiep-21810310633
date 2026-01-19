import { BrandsSection } from '@/components/home/brands-section'
import { FeaturesSection } from '@/components/home/features-section'
import { HeroSection } from '@/components/home/hero-section'
import { ProductsSection } from '@/components/home/products-section'
import { StatsSection } from '@/components/home/stats-section'

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      <ProductsSection limit={12} title="Sản Phẩm Nổi Bật" />
      <StatsSection />
      <FeaturesSection />
      <BrandsSection />
    </div>
  )
}

export default Home
