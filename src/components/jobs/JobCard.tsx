
import React from 'react';
import { Job } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  isApplying: boolean;
}

export const JobCard = ({ job, onApply, isApplying }: JobCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
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
          <Badge variant={job.type === 'Remote' ? 'default' : 'outline'}>
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
          onClick={() => onApply(job.id)} 
          className="w-full"
          disabled={isApplying}
        >
          {isApplying ? 'Applying...' : 'Apply Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};
