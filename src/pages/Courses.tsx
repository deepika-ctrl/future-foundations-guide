
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Course, courseApi } from '@/services/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Search, BookOpen, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [level, setLevel] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.getCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load courses. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  useEffect(() => {
    let results = courses;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply level filter
    if (level) {
      results = results.filter(course => course.level === level);
    }

    setFilteredCourses(results);
  }, [searchTerm, level, courses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to enroll in courses.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await courseApi.enrollInCourse(courseId);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to enroll in the course. Please try again.",
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
        <p className="text-xl text-gray-600">
          Enhance your skills with our carefully selected courses from top education providers.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select value={level} onValueChange={handleLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden card-hover">
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
              <CardFooter className="bg-gray-50 border-t p-4">
                <Button 
                  onClick={() => handleEnroll(course.id)} 
                  className="w-full"
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No courses found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
