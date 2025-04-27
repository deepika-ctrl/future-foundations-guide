
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

interface JobFiltersProps {
  searchTerm: string;
  jobType: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (value: string) => void;
}

export const JobFilters = ({
  searchTerm,
  jobType,
  onSearchChange,
  onTypeChange,
}: JobFiltersProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Select value={jobType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
