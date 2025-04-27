
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Job, jobApi } from '@/services/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { useJobSearch } from '@/hooks/useJobSearch';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { filteredJobs, searchTerm, setSearchTerm, jobType, setJobType } = useJobSearch(jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobApi.getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load job opportunities. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  const handleApply = async (jobId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to apply for jobs.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setApplyingJobId(jobId);
      await jobApi.applyForJob(jobId);
      toast({
        title: "Application Submitted!",
        description: "Your job application has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error applying for job:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply for the job. Please try again.",
      });
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Job Opportunities</h1>
        <p className="text-xl text-gray-600">
          Find the latest job opportunities that align with your skills and career goals.
        </p>
      </div>

      <JobFilters
        searchTerm={searchTerm}
        jobType={jobType}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onTypeChange={setJobType}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              isApplying={applyingJobId === job.id}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No jobs found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
