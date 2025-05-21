<pre>```javascript
// src\components\forms\ImageUpload.jsx
import { useState, useRef } from 'react';
import { FaCamera, FaTrash, FaExclamationCircle } from 'react-icons/fa';

const ImageUpload = ({ register, setValue, watch, errors }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const uploadedImages = watch('photos') || [];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Check if total images would exceed 5
    if (previewImages.length + files.length > 5) {
      alert('You can upload a maximum of 5 images');
      e.target.value = null; // Clear the file input
      return;
    }

    // Generate previews
    const newPreviewImages = [...previewImages];
    const newUploadedImages = [...uploadedImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!file.type.match('image.*')) {
        alert('Please upload only image files');
        e.target.value = null; // Clear the file input
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should not exceed 5MB');
        e.target.value = null; // Clear the file input
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviewImages.push(event.target.result);
        setPreviewImages([...newPreviewImages]);
      };
      reader.readAsDataURL(file);

      newUploadedImages.push(file);
    }

    setValue('photos', newUploadedImages, { shouldValidate: true });
    e.target.value = null; // Clear the file input after processing
  };

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);
    setValue('photos', newUploadedImages.length > 0 ? newUploadedImages : [], { shouldValidate: true });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
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

        {/* Upload button */}
        {previewImages.length < 5 && (
          <button
            type="button"
            onClick={triggerFileInput}
            className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors duration-200"
          >
            <FaCamera size={24} />
            <span className="text-xs mt-2">Add Photo</span>
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        {...register('photos', {
          validate: {
            required: value => (previewImages.length > 0) || 'Please upload at least one photo',
            maxFiles: value => (previewImages.length <= 5) || 'Maximum 5 photos allowed'
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
```</pre>