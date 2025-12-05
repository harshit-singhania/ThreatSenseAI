import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Activity, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                Next-Gen Disaster Management
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                AI-Powered <br />
                <span className="text-gradient">Threat Detection</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                Leverage the power of advanced machine learning to analyze disasters, assess severity, and coordinate rescue efforts in real-time.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700">
                  Live Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-blue-400" />}
              title="Disaster Classification"
              description="Instantly identify disaster types from images using state-of-the-art computer vision models."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-purple-400" />}
              title="People Detection"
              description="Accurately count and locate individuals in affected areas to prioritize rescue operations."
            />
            <FeatureCard 
              icon={<Activity className="w-8 h-8 text-green-400" />}
              title="Severity Assessment"
              description="AI-driven analysis to determine the impact level and resource requirements."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-8 hover:bg-slate-800/50 transition-colors"
  >
    <div className="mb-6 p-3 bg-slate-800 rounded-xl w-fit">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default Home;
