import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [language, setLanguage] = useState('en');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 12, percentage: 20 },
    { stars: 3, count: 2, percentage: 3 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const filterOptions = [
    { id: 'all', label: language === 'ar' ? 'جميع التقييمات' : 'All Reviews' },
    { id: '5', label: language === 'ar' ? '5 نجوم' : '5 Stars' },
    { id: '4', label: language === 'ar' ? '4 نجوم' : '4 Stars' },
    { id: 'verified', label: language === 'ar' ? 'محقق فقط' : 'Verified Only' }
  ];

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={size}
        className={`${
          index < rating 
            ? 'text-accent fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    const locale = language === 'ar' ? 'ar-SY' : 'en-US';
    return date.toLocaleDateString(locale, options);
  };

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'verified') return review.verified;
    return review.rating === parseInt(selectedFilter);
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6 font-heading">
        {language === 'ar' ? 'تقييمات العملاء' : 'Customer Reviews'}
      </h3>

      {/* Rating Summary */}
      <div className="mb-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse mb-1">
                {renderStars(Math.round(averageRating), 18)}
              </div>
              <p className="text-sm text-muted-foreground">
                {totalReviews} {language === 'ar' ? 'تقييم' : 'reviews'}
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-xs">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                <span className="text-sm text-muted-foreground w-8">
                  {item.stars}★
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right rtl:text-left">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={selectedFilter === option.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(option.id)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="p-4 bg-surface rounded-lg border border-border">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <Image
                src={review.avatar}
                alt={review.customerName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <h4 className="font-semibold text-foreground">{review.customerName}</h4>
                    {review.verified && (
                      <div className="flex items-center space-x-1 rtl:space-x-reverse bg-success/10 text-success px-2 py-1 rounded-full">
                        <Icon name="CheckCircle" size={12} />
                        <span className="text-xs font-medium">
                          {language === 'ar' ? 'محقق' : 'Verified'}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review.date)}
                  </span>
                </div>

                <div className="flex items-center space-x-1 rtl:space-x-reverse mb-2">
                  {renderStars(review.rating)}
                </div>

                <p className="text-sm text-foreground mb-3 leading-relaxed">
                  {review.comment}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 rtl:space-x-reverse mb-3">
                    {review.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <span>
                      {language === 'ar' ? 'فترة الإيجار:' : 'Rental Period:'} {review.rentalPeriod}
                    </span>
                    <span>
                      {language === 'ar' ? 'نوع السيارة:' : 'Car Type:'} {review.carType}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button className="flex items-center space-x-1 rtl:space-x-reverse hover:text-primary transition-colors duration-200">
                      <Icon name="ThumbsUp" size={12} />
                      <span>{review.helpful}</span>
                    </button>
                    <button className="hover:text-primary transition-colors duration-200">
                      <Icon name="Flag" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {filteredReviews.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews 
              ? (language === 'ar' ? 'عرض أقل' : 'Show Less')
              : (language === 'ar' ? `عرض جميع التقييمات (${filteredReviews.length})` : `Show All Reviews (${filteredReviews.length})`)
            }
          </Button>
        </div>
      )}

      {/* No Reviews Message */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === 'ar' ?'لا توجد تقييمات تطابق الفلتر المحدد' :'No reviews match the selected filter'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;