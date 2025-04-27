import React from 'react';
import { Course } from '@/services/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, ExternalLink } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
  isEnrolling: boolean;
}

export const CourseCard = ({ course, onEnroll, isEnrolling }: CourseCardProps) => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const handleLearnMore = () => {
    window.open(`https://wikipedia.org/wiki/${encodeURIComponent(course.title.replace(/\s+/g, '_'))}`, '_blank');
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <img
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <Badge
            variant={
              course.level === 'Beginner'
                ? 'outline'
                : course.level === 'Intermediate'
                ? 'secondary'
                : 'default'
            }
          >
            {course.level}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-2">by {course.provider}</p>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {renderStars(course.rating)}
            <span className="ml-1 text-sm text-gray-600">({course.rating})</span>
          </div>
          <span className="font-semibold">{course.price}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <span>{course.enrolled.toLocaleString()} students</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t p-4 flex-col gap-2">
        <Button 
          onClick={() => onEnroll(course.id)} 
          className="w-full"
          disabled={isEnrolling}
        >
          {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLearnMore}
        >
          Learn More
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
