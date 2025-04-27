
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Resource, resourceApi } from '@/services/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Search, ExternalLink, FileText, Video, BookOpen, Wrench } from 'lucide-react';

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceType, setResourceType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await resourceApi.getResources();
        setResources(data);
        setFilteredResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load resources. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [toast]);

  useEffect(() => {
    let results = resources;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply resource type filter
    if (resourceType && resourceType !== 'all') {
      results = results.filter(resource => resource.type === resourceType);
    }

    setFilteredResources(results);
  }, [searchTerm, resourceType, resources]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setResourceType(value);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Article':
        return <FileText className="h-5 w-5" />;
      case 'Video':
        return <Video className="h-5 w-5" />;
      case 'Ebook':
        return <BookOpen className="h-5 w-5" />;
      case 'Tool':
        return <Wrench className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Career Resources</h1>
        <p className="text-xl text-gray-600">
          Access helpful articles, videos, tools, and more to advance your career journey.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select value={resourceType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Article">Articles</SelectItem>
                <SelectItem value="Video">Videos</SelectItem>
                <SelectItem value="Ebook">E-books</SelectItem>
                <SelectItem value="Tool">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden card-hover">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold">{resource.title}</h2>
                  <Badge variant="outline" className="ml-2 flex items-center gap-1">
                    {getResourceIcon(resource.type)}
                    <span>{resource.type}</span>
                  </Badge>
                </div>
                <p className="text-gray-600">{resource.description}</p>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t p-4">
                <Link 
                  to={resource.link} 
                  className="styled-link w-full flex items-center justify-center"
                >
                  Access Resource
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredResources.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No resources found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
