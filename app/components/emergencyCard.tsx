import React from "react";
import { Link } from "@remix-run/react";

// Interface that matches your emergency data structure
export interface EmergencyPlace {
  id: string;
  type: string;
  name: string;
  address?: string;
  contact?: string;
  description?: string;
  open_hours?: string;
  latitude: number;
  longitude: number;
  image_url?: string;
}

interface EmergencyCardProps {
  place: EmergencyPlace;
  onClick?: () => void;
}

export function EmergencyCard({ place, onClick }: EmergencyCardProps) {
  // Type-specific styling
  const getTypeStyles = () => {
    switch (place.type.toLowerCase()) {
      case 'veterinary':
        return {
          bgColor: 'bg-red-100',
          borderColor: 'border-red-500',
          textColor: 'text-red-800',
          buttonColor: 'bg-red-500 hover:bg-red-600'
        };
      case 'shelter':
        return {
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-800',
          buttonColor: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'rescue':
        return {
          bgColor: 'bg-green-100',
          borderColor: 'border-green-500',
          textColor: 'text-green-800',
          buttonColor: 'bg-green-500 hover:bg-green-600'
        };
      default:
        return {
          bgColor: 'bg-orange-100',
          borderColor: 'border-orange-500',
          textColor: 'text-orange-800',
          buttonColor: 'bg-orange-500 hover:bg-orange-600'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div 
      className={`rounded-lg shadow-md border-l-4 ${styles.borderColor} overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
      onClick={onClick}
    >
      <div className={`p-4 ${styles.bgColor}`}>
        <div className="flex justify-between items-start">
          <div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${styles.textColor} bg-white mb-2`}>
              {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
            </span>
            <h3 className="text-lg font-bold">{place.name}</h3>
            
            {place.address && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Location:</span> {place.address}
              </p>
            )}
            
            {place.contact && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Contact:</span> {place.contact}
              </p>
            )}

            {place.open_hours && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Hours:</span> {place.open_hours}
              </p>
            )}
            
            {place.description && (
              <p className="text-sm text-gray-700 mt-2">{place.description}</p>
            )}
          </div>
          
          {place.image_url && (
            <div className="ml-4 flex-shrink-0">
              <img 
                src={place.image_url} 
                alt={place.name}
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between">
          <div className="text-xs text-gray-500">
            <span>Lat: {place.latitude.toFixed(4)}</span>
            <span className="mx-1">•</span>
            <span>Lng: {place.longitude.toFixed(4)}</span>
          </div>
          
          <Link 
            to={`/emergency/${place.id}`} 
            className={`text-xs text-white ${styles.buttonColor} rounded px-3 py-1`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}