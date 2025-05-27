import React from 'react';
import { Shield, Users, Award, Truck, Heart, Star } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      title: "Premium Quality",
      description: "We source only the finest materials and work with trusted manufacturers to ensure every piece meets our high standards."
    },
    {
      icon: <Users className="w-12 h-12 text-green-400" />,
      title: "Community Driven",
      description: "Built by fans, for fans. Our community of superhero enthusiasts helps shape every design and collection."
    },
    {
      icon: <Award className="w-12 h-12 text-yellow-400" />,
      title: "Award Winning",
      description: "Recognized for excellence in design and customer satisfaction by leading fashion and pop culture publications."
    },
    {
      icon: <Truck className="w-12 h-12 text-purple-400" />,
      title: "Fast Shipping",
      description: "Lightning-fast delivery worldwide. Because heroes don't wait, and neither should you."
    }
  ];

  const stats = [
    { number: "500K+", label: "Happy Customers" },
    { number: "50+", label: "Countries Served" },
    { number: "1000+", label: "Unique Designs" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About TrendÉclat
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where fashion meets heroism. We're not just a clothing brand – we're a movement that celebrates the hero in everyone.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-lime-400">Our Story</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Founded in 2020 by a team of passionate designers and superhero enthusiasts, TrendÉclat was born from a simple belief: everyone deserves to feel like a hero.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                What started as a small collection of Marvel-inspired streetwear has grown into a global brand that celebrates courage, creativity, and the extraordinary potential within us all.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Today, we continue to push boundaries, creating fashion that doesn't just look good – it makes you feel invincible.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-8 transform rotate-3 shadow-2xl">
                <div className="bg-slate-900 rounded-lg p-6 transform -rotate-6">
                  <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-center mb-2">Made with Passion</h3>
                  <p className="text-gray-300 text-center">Every design tells a story of heroism and hope.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose TrendÉclat?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-lime-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-xl text-gray-200 leading-relaxed">
            To inspire confidence, celebrate individuality, and remind everyone that they have the power to be extraordinary. 
            Through fashion that tells stories and builds communities, we're creating a world where everyone can shine in their own unique way.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Meet Our Heroes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">AS</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Alex Storm</h3>
              <p className="text-lime-400 mb-3">Founder & Creative Director</p>
              <p className="text-gray-300">Visionary designer with 10+ years in fashion and a lifelong love for superhero culture.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">MJ</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Maya Johnson</h3>
              <p className="text-lime-400 mb-3">Head of Design</p>
              <p className="text-gray-300">Award-winning designer who brings comic book dreams to life through innovative fashion.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">RC</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Ryan Chen</h3>
              <p className="text-lime-400 mb-3">Community Manager</p>
              <p className="text-gray-300">The bridge between our brand and our amazing community of superhero fashion enthusiasts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
