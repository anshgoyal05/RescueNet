import { useState, useRef } from 'react';
import { FaCamera, FaTrash, FaExclamationCircle } from 'react-icons/fa';

const ImageUpload = ({ register, setValue, watch, errors }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const uploadedImages = watch('photos') || [];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const remainingSlots = 5 - uploadedImages.length;
    const validFiles = [];

    for (const file of files) {
      if (!file.type.match('image.*')) {
        alert('Please upload only image files');
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should not exceed 5MB');
        continue;
      }

      if (validFiles.length >= remainingSlots) {
        alert('You can upload a maximum of 5 images');
        break;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      e.target.value = null;
      return;
    }

    const newUploadedImages = [...uploadedImages, ...validFiles];
    const newPreviews = [];

    let loadedCount = 0;

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push(event.target.result);
        loadedCount++;

        if (loadedCount === validFiles.length) {
          setPreviewImages(prev => [...prev, ...newPreviews]);
          setValue('photos', newUploadedImages, { shouldValidate: true });
          e.target.value = null; // reset input
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);
    setValue('photos', newUploadedImages, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <label className="form-label">Photos of Missing Person</label>
      <div className="flex flex-wrap gap-4">
        {/* Image previews */}
        {previewImages.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-28 h-28 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white/70 hover:bg-white p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}

        {/* Upload button using label for file input trigger */}
        {previewImages.length < 5 && (
          <label
            htmlFor="photo-upload"
            className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors duration-200 cursor-pointer"
          >
            <FaCamera size={24} />
            <span className="text-xs mt-2">Add Photo</span>
          </label>
        )}
      </div>

      {/* Hidden file input */}
      <input
        id="photo-upload"
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onInput={handleImageChange}
        {...register('photos', {
          validate: {
            required: value => value && value.length > 0 || 'Please upload at least one photo',
            maxFiles: value => value.length <= 5 || 'Maximum 5 photos allowed'
          }
        })}
      />

      {/* Error message */}
      {errors.photos && (
        <p className="text-red-500 text-sm flex items-center mt-1">
          <FaExclamationCircle className="mr-1" />
          {errors.photos.message}
        </p>
      )}

      <p className="text-xs text-gray-500">
        Upload up to 5 clear photos of the missing person. This helps in identification.
      </p>
    </div>
  );
};

export default ImageUpload;
