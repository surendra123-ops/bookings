import React from 'react';
import { MapPin, Clock, Users, Star } from 'lucide-react';

const ExperienceCard = ({ experience, onClick }) => {
  return (
    <div 
      className="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-w-16 aspect-h-12 overflow-hidden relative">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
          <Star className="h-3 w-3 inline mr-1 text-yellow-500" />
          4.8
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 group-hover:text-primary-600 transition-colors duration-200">
            {experience.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm ml-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {experience.description}
        </p>

        {/* Experience Details */}
        <div className="flex items-center text-gray-500 text-xs mb-4 space-x-4">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>Small group</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            From ₹{experience.price}
          </div>
          <button className="btn-primary text-sm px-4 py-2 group-hover:bg-primary-500 transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
