'use client'

import { Users, Award, Target, Heart, CheckCircle, Star } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '10000+', label: 'Happy Gamers' },
    { number: '500+', label: 'Gaming Products' },
    { number: '24/7', label: 'Support' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Gaming Passion',
      description: 'Providing the best gaming products to enhance your gaming experience'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'All our products meet international gaming standards and quality'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Always seeking the latest and best gaming technologies'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Service',
      description: 'Customer satisfaction is our top priority in service delivery'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      experience: '20 years experience in gaming industry',
      image: '🎮'
    },
    {
      name: 'Sarah Johnson',
      role: 'Technical Director',
      experience: '15 years experience in gaming hardware',
      image: '👩‍💻'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Gaming Consultant',
      experience: '18 years competitive gaming experience',
      image: '🏆'
    }
  ];

  const achievements = [
    'Certified Gaming Hardware Partner',
    'Member of International Gaming Association',
    'Excellence Award from Gaming Industry',
    'Partnership with 200+ Gaming Communities',
    'Serving gamers worldwide'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        {[70, 90, 110, 130, 100, 80, 120, 95, 105, 85].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/15 to-blue-500/15"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 11) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animation: `float ${14 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-25px, 25px) rotate(180deg); }
          75% { transform: translate(-30px, -20px) rotate(270deg); }
        }
      `}</style>

      <div className="relative z-content container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            About Us
          </h1>
          <p className="text-xl text-cyan-300 max-w-3xl mx-auto leading-relaxed">
            With over 15 years of experience in gaming industry, we are committed to providing the best gaming products and services for the gaming community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-2xl border border-gray-700">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-cyan-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
              <Target className="w-8 h-8 text-cyan-400" />
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Providing high-quality gaming equipment and specialized services to gaming centers, esports teams, and gamers worldwide. 
              We are committed to helping improve gaming performance by providing the best tools and equipment.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
              <Star className="w-8 h-8 text-cyan-400" />
              Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Becoming the leading gaming equipment provider in the region and creating positive change in the gaming industry. 
              We strive to be a model for other companies through innovation and quality.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700 text-center hover:shadow-cyan-400/20 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">Management Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{member.name}</h3>
                <p className="text-gray-300 font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">Achievements & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;