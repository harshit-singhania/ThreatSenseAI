import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
const Services = () => {
  const [imageFile, setImageFile] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [imageClassified, setImageClassified] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [personCount, setPersonCount] = useState(0);

  useEffect(() => {
    // Simulating data fetching or component loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null); // Clear any previous errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      setError("Please select an image."); // Image validation
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          setUploadProgress(progress);
        },
      };
      const response = await axios.post(
        "http://localhost:9000/classify",
        formData,
        config,
      );
      const responsePersonCount = await axios.post(
        "http://localhost:9001/personCount",
        formData,
        config,
      );
      setPersonCount(responsePersonCount.data);
      console.log(responsePersonCount);
      setClassificationResult(response.data);
      setError(null);
      setImageClassified(true);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to classify image. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setClassificationResult(null);
    setImageClassified(false);
    setShowConfirmationModal(false);
    setError(null);
    setPersonCount(0);
    document.getElementById("file-input").value = "";
  };

  const downloadResult = () => {
    if (classificationResult) {
      const resultText = `Classification Result: ${classificationResult.label}`;
      const blob = new Blob([resultText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "classification_result.txt");
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    }
  };


  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-darkGreen to-lightGreen p-[4rem]">
          <div className="w-[60%] rounded-lg bg-white shadow-xl md:p-12">
            <h1 className="mb-6 text-center font-Rajdhani text-4xl font-bold text-[#2D9596]">
              Image Classification Service
            </h1>
            <input
              type="file"
              id="file-input"
              onChange={handleImageChange}
              className="file-input file-input-bordered file-input-success mb-4 w-full max-w-xs rounded-md"
            />
            {/* <input type="file" onChange={handleImageChange} className='border border-gray-300 p-2 rounded-md mb-4' /> */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mb-4 max-w-full"
              />
            )}
            <div className="relative mb-4 ">
              <button
                onClick={handleSubmit}
                disabled={!imageFile || loading}
                className={`btn btn-outline btn-success rounded px-4 py-2 font-Rajdhani shadow-md ${(!imageFile || loading) && "cursor-not-allowed opacity-50"}`}
              >
                {loading ? "Classifying..." : "Classify Image"}
              </button>
              {loading && (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                  <div className="absolute left-0 top-0 h-full w-full rounded-md bg-gray-800 opacity-25"></div>
                  <div className="z-10 text-white">
                    Uploading: {uploadProgress}%
                  </div>
                </div>
              )}
            </div>
            {error && (
              <div className="mt-4 rounded-md bg-red-100 p-4">
                <p className="text-lg font-semibold text-red-800">{error}</p>
              </div>
            )}
            {classificationResult && (
              <div className="mt-4 rounded-md bg-green-100 p-4">
                <p className="font-Rajdhani text-xl font-semibold text-green-800">
                  Classification Result:
                </p>
                <p className="mt-2 font-Rajdhani text-lg text-green-700">
                  The image is classified as:
                  <span className="text-transform: capitalize text-black">
                    {" "}
                    {classificationResult.label}{" "}
                  </span>
                </p>
                {classificationResult.probability && (
                  <p className="mt-2 text-gray-700">
                    Probability:{" "}
                    {Math.round(classificationResult.probability * 100)}%
                  </p>
                )}
                {classificationResult.dimensions && (
                  <p className="mt-2 text-gray-700">
                    Dimensions: {classificationResult.dimensions.width} x{" "}
                    {classificationResult.dimensions.height}
                  </p>
                )}
                {personCount && (
                  <p className='mt-2 text-gray-700'>Number of people: {personCount.count}</p>
                )}
                <button
                  onClick={downloadResult}
                  className="btn btn-outline btn-info mt-2 rounded px-4 py-2 font-Rajdhani shadow-md"
                >
                  Download Result
                </button>
              </div>
            )}

            {imageClassified && (
              <button
                onClick={() => setShowConfirmationModal(true)}
                className="mt-4 rounded bg-red-500 px-4 py-2 font-Rajdhani font-bold text-white shadow-md hover:bg-red-700"
              >
                Clear Image
              </button>
            )}
            {showConfirmationModal && (
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-red-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Clear Image
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to clear the image? This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        onClick={clearImage}
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowConfirmationModal(false)}
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
