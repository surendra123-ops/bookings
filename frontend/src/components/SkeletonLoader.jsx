import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="card animate-pulse">
            <div className="aspect-w-16 aspect-h-12 overflow-hidden">
              <div className="w-full h-48 bg-gray-300"></div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-300 rounded w-20"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </div>
        );
      
      case 'details':
        return (
          <div className="animate-pulse">
            <div className="mb-6">
              <div className="w-full h-80 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="mb-8">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
            <div className="mb-8">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="flex space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-gray-300 rounded w-20"></div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'booking-summary':
        return (
          <div className="bg-gray-100 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        );
      
      default:
        return <div className="animate-pulse bg-gray-300 rounded h-4 w-full"></div>;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
