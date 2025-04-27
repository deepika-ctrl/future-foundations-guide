
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Career, careerApi } from '@/services/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Search } from 'lucide-react';

const Careers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await careerApi.getCareers();
        setCareers(data);
        setFilteredCareers(data);
      } catch (error) {
        console.error('Error fetching careers:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load career paths. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, [toast]);

  useEffect(() => {
    const results = careers.filter(career =>
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCareers(results);
  }, [searchTerm, careers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore Career Paths</h1>
        <p className="text-xl text-gray-600">
          Discover various career opportunities, required skills, and growth potential to find your perfect match.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by career title, description, or skills..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <Card key={career.id} className="overflow-hidden card-hover">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={career.image}
                  alt={career.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-2">{career.title}</h2>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {career.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avg. Salary</p>
                    <p className="font-semibold">{career.averageSalary}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Growth</p>
                    <p className="font-semibold">{career.growth}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t p-4">
                <a href={`/careers/${career.id}`} className="styled-link w-full text-center">
                  Learn more
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredCareers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No career paths found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default Careers;
