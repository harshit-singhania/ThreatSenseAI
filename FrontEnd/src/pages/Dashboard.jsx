import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, AlertTriangle, Users, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setError(null);
      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append('video', file);

      try {
        const response = await fetch('http://localhost:7001/analyze_video', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Analysis failed');
        }

        setResults(data);
      } catch (err) {
        console.error("Analysis error:", err);
        setError(err.message);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Upload Video Footage</h2>
            
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-12 text-center hover:border-blue-500/50 transition-colors group">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">Drop video here or click to upload</p>
                  <p className="text-slate-400 text-sm mt-1">Supports MP4, AVI, MOV</p>
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
              <video controls src={previewUrl} className="w-full rounded-lg" />
            </motion.div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="glass-panel p-8 h-full">
            <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
            
            {!previewUrl ? (
              <div className="h-64 flex items-center justify-center text-slate-500 border border-slate-800 rounded-xl bg-slate-900/30">
                <p>Upload a video to see analysis</p>
              </div>
            ) : isAnalyzing ? (
              <div className="h-64 flex flex-col items-center justify-center text-blue-400 border border-slate-800 rounded-xl bg-slate-900/30">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p>Processing video frames...</p>
                <p className="text-sm text-slate-500 mt-2">Running Classification & Detection</p>
              </div>
            ) : error ? (
               <div className="h-64 flex flex-col items-center justify-center text-red-400 border border-red-900/30 rounded-xl bg-red-900/10">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p className="font-semibold">Analysis Failed</p>
                <p className="text-sm mt-2">{error}</p>
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
                  <p className="text-2xl font-bold text-white">{results?.classification || "Unknown"}</p>
                  <p className="text-slate-400 mt-1">Based on frame analysis</p>
                </div>

                {/* People Count */}
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <Users className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-blue-400">People Detected</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">{results?.people_count || 0} Individuals</p>
                  <p className="text-slate-400 mt-1">Max count in single frame</p>
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
