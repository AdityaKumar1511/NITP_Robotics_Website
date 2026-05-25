import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGalleryImages, getGalleryCategories } from '@/data';
import { useCategoryFromNav } from '@/hooks/useCategoryFromNav';

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Wire up submenu navigation
  useCategoryFromNav(setSelectedCategory);

  const galleryImages = getGalleryImages();
  const categories = getGalleryCategories();

  const filteredImages = useMemo(
    () => selectedCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory),
    [selectedCategory, galleryImages],
  );

  const toCloudinaryUrl = (src: string, transform: string) => {
    if (!src.includes('res.cloudinary.com') || !src.includes('/upload/')) return src;
    return src.replace('/upload/', `/upload/${transform}/`);
  };

  const getGridImageUrl = (src: string) =>
    toCloudinaryUrl(src, 'f_auto,q_auto:good,w_900,h_900,c_fill,dpr_auto');

  const getLightboxImageUrl = (src: string) =>
    toCloudinaryUrl(src, 'f_auto,q_auto,w_1800,c_limit,dpr_auto');

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  const selectedImageData = filteredImages.find((img) => img.id === selectedImage);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); handlePrevImage(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); handleNextImage(); }
      else if (event.key === 'Escape') { event.preventDefault(); setSelectedImage(null); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-background/70 to-background" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <ImageIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Visual Journey</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Our{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Capturing moments of innovation, collaboration, and achievement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section id="category-filter" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 flex-wrap mb-12"
          >
            {categories.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full px-6 transition-all duration-300"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image.id)}
                  className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer border-2 border-border hover:border-primary/30 transition-all duration-300"
                >
                  <img
                    src={getGridImageUrl(image.src)}
                    alt={image.title}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index < 4 ? 'high' : 'auto'}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-medium text-primary mb-1 block">{image.category}</span>
                    <h3 className="text-white font-heading font-bold text-sm">{image.title}</h3>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              className="absolute left-4 sm:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              className="absolute right-4 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) handleNextImage();
                else if (swipe > 10000) handlePrevImage();
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[85vh] cursor-grab active:cursor-grabbing touch-pan-y select-none"
            >
              <img
                src={getLightboxImageUrl(selectedImageData.src)}
                alt={selectedImageData.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain rounded-2xl pointer-events-none"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl pointer-events-none">
                <span className="text-xs font-medium text-primary mb-2 block">{selectedImageData.category}</span>
                <h3 className="text-white font-heading font-bold text-xl">{selectedImageData.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
