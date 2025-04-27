
import { useState, useEffect } from 'react';
import { Course } from '@/services/api';

export const useCourseSearch = (courses: Course[]) => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [level, setLevel] = useState<string>('all');

  useEffect(() => {
    let results = courses;

    if (searchTerm) {
      results = results.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (level && level !== 'all') {
      results = results.filter(course => course.level === level);
    }

    setFilteredCourses(results);
  }, [searchTerm, level, courses]);

  return {
    filteredCourses,
    searchTerm,
    setSearchTerm,
    level,
    setLevel
  };
};
