import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, AlertTriangle, Users } from 'lucide-react';

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Simulate analysis
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Upload Imagery</h2>
            
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-12 text-center hover:border-blue-500/50 transition-colors group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">Drop image here or click to upload</p>
                  <p className="text-slate-400 text-sm mt-1">Supports JPG, PNG, WEBP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          {previewUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-4"
            >
              <img src={previewUrl} alt="Preview" className="w-full rounded-lg" />
            </motion.div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="glass-panel p-8 h-full">
            <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
            
            {!previewUrl ? (
              <div className="h-64 flex items-center justify-center text-slate-500 border border-slate-800 rounded-xl bg-slate-900/30">
                <p>Upload an image to see analysis</p>
              </div>
            ) : isAnalyzing ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-slate-800 rounded w-3/4"></div>
                <div className="h-24 bg-slate-800 rounded"></div>
                <div className="h-24 bg-slate-800 rounded"></div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Disaster Type */}
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <h3 className="text-lg font-semibold text-red-400">Disaster Detected</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">Wildfire</p>
                  <p className="text-slate-400 mt-1">Confidence: 98.5%</p>
                </div>

                {/* People Count */}
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <Users className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-blue-400">People Detected</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">3 Individuals</p>
                  <p className="text-slate-400 mt-1">Location: Sector 4, 7</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
