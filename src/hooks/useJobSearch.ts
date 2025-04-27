
import { useState, useEffect } from 'react';
import { Job } from '@/services/api';

export const useJobSearch = (jobs: Job[]) => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<string>('all');

  useEffect(() => {
    let results = jobs;

    if (searchTerm) {
      results = results.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (jobType && jobType !== 'all') {
      results = results.filter(job => job.type === jobType);
    }

    setFilteredJobs(results);
  }, [searchTerm, jobType, jobs]);

  return {
    filteredJobs,
    searchTerm,
    setSearchTerm,
    jobType,
    setJobType
  };
};
