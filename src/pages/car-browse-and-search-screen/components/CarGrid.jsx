import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import CarCardSkeleton from './CarCardSkeleton';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CarGrid = ({ cars, loading, hasMore, onLoadMore, language, viewMode }) => {
  const [displayedCars, setDisplayedCars] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setDisplayedCars(cars);
  }, [cars]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await onLoadMore();
    setIsLoadingMore(false);
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-4';
      case 'compact':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  if (loading && displayedCars.length === 0) {
    return (
      <div className={getGridClasses()}>
        {Array.from({ length: 9 }).map((_, index) => (
          <CarCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (displayedCars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Car" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {language === 'ar' ? 'لا توجد سيارات متاحة' : 'No Cars Available'}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {language === 'ar' ?'لم نتمكن من العثور على سيارات تطابق معايير البحث الخاصة بك. جرب تعديل المرشحات أو البحث مرة أخرى.' :'We couldn\'t find any cars matching your search criteria. Try adjusting your filters or search again.'
          }
        </p>
        <Button variant="outline">
          {language === 'ar' ? 'مسح المرشحات' : 'Clear Filters'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {language === 'ar' 
            ? `عرض ${displayedCars.length} من أصل ${displayedCars.length} سيارة`
            : `Showing ${displayedCars.length} of ${displayedCars.length} cars`
          }
        </p>
      </div>

      {/* Car Grid */}
      <div className={getGridClasses()}>
        {displayedCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            language={language}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLoadMore}
            loading={isLoadingMore}
            variant="outline"
            size="lg"
            iconName="ChevronDown"
            iconPosition="right"
          >
            {language === 'ar' ? 'تحميل المزيد' : 'Load More'}
          </Button>
        </div>
      )}

      {/* Loading More Skeletons */}
      {isLoadingMore && (
        <div className={getGridClasses()}>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarCardSkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarGrid;