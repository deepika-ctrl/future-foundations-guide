
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CourseFiltersProps {
  searchTerm: string;
  level: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLevelChange: (value: string) => void;
}

export const CourseFilters = ({
  searchTerm,
  level,
  onSearchChange,
  onLevelChange,
}: CourseFiltersProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Select value={level} onValueChange={onLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
