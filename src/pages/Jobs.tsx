
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
import { Job, jobApi } from '@/services/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Search, MapPin, Clock, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobApi.getJobs();
        setJobs(data);
        setFilteredJobs(data);
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

  useEffect(() => {
    let results = jobs;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply job type filter
    if (jobType) {
      results = results.filter(job => job.type === jobType);
    }

    setFilteredJobs(results);
  }, [searchTerm, jobType, jobs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setJobType(value);
  };

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

      <div className="max-w-4xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search jobs by title, company, or location..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select value={jobType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{job.title}</h2>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={job.type === 'Remote' ? 'default' : 'outline'}
                  >
                    {job.type}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.posted}</span>
                  </div>
                  
                  <p className="text-gray-600 line-clamp-3">{job.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Requirements:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {job.requirements.slice(0, 2).map((req, index) => (
                        <li key={index} className="line-clamp-1">{req}</li>
                      ))}
                      {job.requirements.length > 2 && (
                        <li>...and {job.requirements.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="font-semibold">
                    Salary: {job.salary}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t p-4">
                <Button 
                  onClick={() => handleApply(job.id)} 
                  className="w-full"
                  disabled={applyingJobId === job.id}
                >
                  {applyingJobId === job.id ? 'Applying...' : 'Apply Now'}
                </Button>
              </CardFooter>
            </Card>
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
