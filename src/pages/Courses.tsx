
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Course, courseApi } from '@/services/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { useCourseSearch } from '@/hooks/useCourseSearch';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { filteredCourses, searchTerm, setSearchTerm, level, setLevel } = useCourseSearch(courses);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.getCourses();
        setCourses(data);
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
      setEnrollingCourseId(courseId);
      await courseApi.enrollInCourse(courseId);
      toast({
        title: "Enrollment Successful!",
        description: "You have been enrolled in the course.",
      });
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to enroll in the course. Please try again.",
      });
    } finally {
      setEnrollingCourseId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
        <p className="text-xl text-gray-600">
          Enhance your skills with our carefully selected courses from top education providers.
        </p>
      </div>

      <CourseFilters
        searchTerm={searchTerm}
        level={level}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onLevelChange={setLevel}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              isEnrolling={enrollingCourseId === course.id}
            />
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
