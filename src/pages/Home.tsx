
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Book, Briefcase, GraduationCap, Lightbulb, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your <span className="text-career-400">Perfect Career</span> Path
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore career paths, learn new skills, and discover job opportunities that match your passion and skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="text-lg" asChild>
                <Link to="/careers">Explore Career Paths</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-career-100 flex items-center justify-center mb-4">
                  <GraduationCap className="h-7 w-7 text-career-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
                <p className="text-gray-600">
                  Explore detailed information about various career paths, required skills, and growth opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-career-100 flex items-center justify-center mb-4">
                  <Book className="h-7 w-7 text-career-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Skill Development</h3>
                <p className="text-gray-600">
                  Access high-quality courses from top providers to build the skills needed for your dream career.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-career-100 flex items-center justify-center mb-4">
                  <Briefcase className="h-7 w-7 text-career-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Job Opportunities</h3>
                <p className="text-gray-600">
                  Find the latest job openings that match your skills and career aspirations.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-career-100 flex items-center justify-center mb-4">
                  <Lightbulb className="h-7 w-7 text-career-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Resources</h3>
                <p className="text-gray-600">
                  Get access to articles, videos, and tools to help you on your professional journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-career-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take the Next Step?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have found their ideal career path with our guidance.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-career-700">
                  <Link to="/register">Create Account</Link>
                </Button>
                <Button size="lg" className="text-lg bg-white text-career-700 hover:bg-gray-100">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            )}
            {user && (
              <Button size="lg" className="text-lg bg-white text-career-700 hover:bg-gray-100">
                <Link to="/careers">Explore Career Paths</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-career-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-career-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "CareerPath helped me transition from marketing to software development. The courses and resources were invaluable in my journey."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-career-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-career-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Michael Chen</h3>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I was unsure about my career path after graduation. CareerPath's guidance helped me discover my passion for UX design."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-career-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-career-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Amanda Rodriguez</h3>
                  <p className="text-sm text-gray-500">Data Analyst</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The job opportunities section helped me land my first data analyst role. I'm so grateful for this platform!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
