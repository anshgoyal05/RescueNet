import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import { reportMissingPerson } from '../../services/api';
import LoadingSpinner from '../ui/LoadingSpinner';

const ReportForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
    defaultValues: {
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      lastSeenDate: '',
      lastSeenLocation: '',
      contactPerson: '',
      contactPhone: '',
      description: '',
      identifyingFeatures: '',
      medicalConditions: '',
      photos: []
    }
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    
    try {
      // Create FormData object for file upload
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(data).forEach(key => {
        if (key !== 'photos') {
          formData.append(key, data[key]);
        }
      });
      
      // Append all photo files
      if (data.photos && data.photos.length > 0) {
        for (let i = 0; i < data.photos.length; i++) {
          formData.append('photos', data.photos[i]);
        }
      }
      
      // Submit the form data
      const response = await reportMissingPerson(formData);
      
      toast.success('Missing person report submitted successfully');
      reset();
      navigate(`/missing/${response.id}`);
    } catch (error) {
      toast.error('Error submitting report. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Full Name*</label>
            <input
              type="text"
              className="input-field"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="form-label">Age</label>
            <input
              type="number"
              className="input-field"
              {...register('age', { min: { value: 0, message: 'Age must be positive' } })}
            />
            {errors.age && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.age.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="form-label">Gender</label>
            <select className="input-field" {...register('gender')}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              className="input-field"
              {...register('height', { min: { value: 0, message: 'Height must be positive' } })}
            />
            {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
          </div>
          
          <div>
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="input-field"
              {...register('weight', { min: { value: 0, message: 'Weight must be positive' } })}
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Disappearance Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Last Seen Date*</label>
            <input
              type="date"
              className="input-field"
              {...register('lastSeenDate', { required: 'Last seen date is required' })}
            />
            {errors.lastSeenDate && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.lastSeenDate.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="form-label">Last Seen Location*</label>
            <input
              type="text"
              className="input-field"
              {...register('lastSeenLocation', { required: 'Last seen location is required' })}
            />
            {errors.lastSeenLocation && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.lastSeenLocation.message}
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="form-label">Description of Circumstances*</label>
          <textarea
            className="input-field h-24"
            {...register('description', { 
              required: 'Description is required',
              minLength: { value: 20, message: 'Please provide a detailed description (at least 20 characters)' }
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <FaExclamationCircle className="mr-1" />
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Identifying Information</h3>
        
        <div className="mb-4">
          <label className="form-label">Physical Characteristics & Identifying Features</label>
          <textarea
            className="input-field h-20"
            placeholder="Scars, tattoos, birthmarks, etc."
            {...register('identifyingFeatures')}
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="form-label">Medical Conditions</label>
          <textarea
            className="input-field h-20"
            placeholder="Any medical conditions that require attention"
            {...register('medicalConditions')}
          ></textarea>
        </div>
        
        <ImageUpload 
          register={register} 
          setValue={setValue} 
          watch={watch} 
          errors={errors} 
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Contact Person Name*</label>
            <input
              type="text"
              className="input-field"
              {...register('contactPerson', { required: 'Contact person name is required' })}
            />
            {errors.contactPerson && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.contactPerson.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="form-label">Contact Phone Number*</label>
            <input
              type="tel"
              className="input-field"
              {...register('contactPhone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9+\-\s()]{8,20}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <FaExclamationCircle className="mr-1" />
                {errors.contactPhone.message}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button 
          type="button" 
          onClick={() => reset()} 
          className="btn-secondary"
          disabled={submitting}
        >
          Clear Form
        </button>
        <button 
          type="submit" 
          className="btn-primary flex items-center justify-center min-w-[120px]" 
          disabled={submitting}
        >
          {submitting ? (
            <LoadingSpinner size="small" />
          ) : (
            <>
              <FaCheckCircle className="mr-2" />
              Submit Report
            </>
          )}
        </button>
      </div>
      
      <p className="text-sm text-gray-600 border-t pt-4 mt-6">
        * Required fields. Please provide as much accurate information as possible to help locate the missing person.
      </p>
    </form>
  );
};

export default ReportForm;