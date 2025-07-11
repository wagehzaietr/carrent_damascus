import React from 'react';

const CarCardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-muted"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title and Category */}
        <div className="mb-3">
          <div className="h-6 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-16"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-14"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-18"></div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            <div className="h-6 bg-muted rounded-full w-12"></div>
            <div className="h-6 bg-muted rounded-full w-16"></div>
            <div className="h-6 bg-muted rounded-full w-14"></div>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-muted rounded w-24 mb-1"></div>
            <div className="h-4 bg-muted rounded w-16"></div>
          </div>
          <div className="h-9 bg-muted rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;