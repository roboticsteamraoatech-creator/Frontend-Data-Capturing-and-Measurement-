// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useMutation } from '@tanstack/react-query';
// import { useAuth } from '@/api/hooks/useAuth';
// import { toast } from '@/app/components/hooks/use-toast';
// import Link from "next/link";

// interface FormValues {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
// }

// type ApiError = {
//   response?: {
//     status?: number;
//     statusText?: string;
//     data?: {
//       errors?: Array<{ message: string }>;
//       message?: string;
//     };
//   };
//   message?: string;
//   code?: string;
//   name?: string;
// };

// interface CarouselImage {
//   src: string;
//   title?: string;
//   titlePosition?: 'top' | 'bottom';
//   backgroundColor?: string;
//   imageStyle?: 'fill' | 'contain';
// }

// export default function AdminSignupPage() {
//   const router = useRouter();
//   const { client } = useAuth();

//   const [formValues, setFormValues] = useState<FormValues>({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState<Partial<FormValues>>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   // Carousel state with image configurations
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images: CarouselImage[] = [
//     {
//       src: '/Frame 335677.png',
//       title: '',
//       backgroundColor: '',
//       imageStyle: 'contain' // Keep original style
//     },
//     {
//       src: '/assets/Take-image.png',
//       title: '',
//       backgroundColor: '#ada2b5',
//       imageStyle: 'fill' // Fill the container height
//     },
//     {
//       src: '/assets/view-measurement.png',
//       title: 'View Measurement',
//       titlePosition: 'top',
//       backgroundColor: '#ada2b5',
//       imageStyle: 'contain'
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4000); // Change image every 4 seconds

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const { mutate: submitMutate, isPending } = useMutation({
//     mutationFn: async (values: { name: string; email: string; phone: string; password: string }) => {
//       // Split the name into firstName and lastName
//       const nameParts = values.name.trim().split(' ');
//       const firstName = nameParts[0] || '';
//       const lastName = nameParts.slice(1).join(' ') || '';
      
//       const payload = {
//         firstName,
//         lastName,
//         email: values.email.toLowerCase().trim(),
//         password: values.password,
//         phone: values.phone.replace(/\s/g, ''),
//         role: "admin"
//       };
      
//       console.log('🚀 Sending ADMIN registration to backend:', payload);

//       const { data } = await client.post('/api/auth/register', payload);
//       return data;
//     },
//     onSuccess: (data) => {
//       console.log('Admin registration successful:', data);
//       toast({ 
//         title: 'ADMIN REGISTRATION SUCCESSFUL!',
//         description: 'Your admin account has been created successfully' 
//       });
//       router.replace('/auth/login');
//     },
//     onError: (error: ApiError) => {
//       let message = 'Registration failed';
      
//       if (error?.response?.data?.errors?.[0]?.message) {
//         message = error.response.data.errors[0].message;
//       } else if (error?.response?.data?.message) {
//         message = error.response.data.message;
//       } else if (error?.message) {
//         message = error.message;
//       } else if (error.code === 'ERR_NETWORK') {
//         message = 'Network error. Please check your internet connection.';
//       } else if (error.name === 'AxiosError' && !error.response) {
//         message = 'Unable to connect to server. Please try again later.';
//       }
      
//       toast({ 
//         title: 'Registration Failed',
//         description: message,
//         variant: 'destructive'
//       });
//     },
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({ ...prev, [name]: value }));
//     if (errors[name as keyof FormValues]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = (): boolean => {
//     const newErrors: Partial<FormValues> = {};
    
//     if (!formValues.name.trim()) newErrors.name = 'Full name is required';
//     if (!formValues.email.trim()) newErrors.email = 'Email is required';
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Invalid email address';
//     if (!formValues.phone.trim()) newErrors.phone = 'Phone number is required';
//     else if (!/^(\+?234|0)?[789][01]\d{8}$/.test(formValues.phone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid Nigerian phone number';
//     if (!formValues.password) newErrors.password = 'Password is required';
//     else if (formValues.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
//     if (!formValues.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
//     else if (formValues.password !== formValues.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     submitMutate({ 
//       name: formValues.name, 
//       email: formValues.email, 
//       phone: formValues.phone, 
//       password: formValues.password 
//     });
//   };

//   const handleGoogleSignUp = () => {
//     toast({
//       title: 'Google Sign Up',
//       description: 'This feature will be implemented soon'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
//         .monument-extended { font-family: 'Monument Extended', sans-serif; }
//         .manrope { font-family: 'Manrope', sans-serif; }
        
//         /* Mobile-first responsive layout */
//         .desktop-layout {
//           display: none;
//         }
        
//         .mobile-layout {
//           display: flex;
//           flex-direction: column;
//           min-height: 100vh;
//           padding: 24px;
//           max-width: 400px;
//           margin: 0 auto;
//         }
        
//         @media (min-width: 1024px) {
//           .desktop-layout {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             min-height: 100vh;
//             background: white;
//             padding: 44px 45px;
//           }
          
//           .mobile-layout {
//             display: none;
//           }
//         }
        
//         .mobile-input-container {
//           position: relative;
//           width: 100%;
//           height: 50px;
//           border: 1px solid #E5E7EB;
//           border-radius: 8px;
//           background: white;
//           margin-bottom: 16px;
//         }
        
//         .mobile-input-container input {
//           width: 100%;
//           height: 100%;
//           border: none;
//           outline: none;
//           background: white !important;
//           padding: 14px 16px;
//           font-family: 'Manrope', sans-serif;
//           font-size: 16px;
//           color: #374151;
//         }
        
//         .mobile-input-container input::placeholder {
//           color: #9CA3AF;
//         }
        
//         .mobile-input-container.error {
//           border-color: #EF4444;
//         }
        
//         .mobile-password-toggle {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           cursor: pointer;
//           color: #6B7280;
//         }
        
//         /* Desktop styles */
//         .desktop-container {
//           width: 100%;
//           max-width: 1439px;
//           display: flex;
//           gap: 76px;
//         }
        
//         .desktop-left-image {
//           flex: 0 0 700px;
//           height: 1025px;
//           border-radius: 40px;
//           overflow: hidden;
//           position: relative;
//         }
        
//         .desktop-form-container {
//           flex: 0 0 609px;
//           height: 1025px;
//           background: #FBFAFC;
//           border-radius: 40px;
//           position: relative;
//         }
        
//         .input-with-notch {
//           position: relative;
//           width: 100%;
//           max-width: 484px;
//         }
        
//         .input-with-notch input {
//           width: 100%;
//           height: 75px;
//           border: 1px solid #6E6E6E4D;
//           border-radius: 12px;
//           background: white;
//           padding: 17px 30px;
//           font-family: 'Manrope', sans-serif;
//           font-size: 20px;
//           color: #6E6E6E;
//           outline: none;
//         }
        
//         .input-with-notch input:focus {
//           border-color: #5D2A8B;
//         }
        
//         .input-with-notch.has-value input {
//           padding-top: 25px;
//           padding-bottom: 9px;
//         }
        
//         .input-label {
//           position: absolute;
//           top: -10px;
//           left: 30px;
//           font-family: 'Manrope', sans-serif;
//           font-weight: 400;
//           font-size: 14px;
//           color: #5D2A8B;
//           background: white;
//           padding: 0 5px;
//           pointer-events: none;
//         }
        
//         .input-with-notch.error input {
//           border-color: #ef4444;
//         }
        
//         .password-toggle {
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           cursor: pointer;
//           color: #6E6E6E;
//         }
        
//         /* Carousel styles */
//         .carousel-container {
//           position: relative;
//           width: 100%;
//           height: 100%;
//         }
        
//         .carousel-image {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           opacity: 0;
//           transition: opacity 1s ease-in-out;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .carousel-image.active {
//           opacity: 1;
//         }
        
//         /* Purple background container for take-image and view-measurement */
//         .purple-image-container {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           background-color: #ada2b5;
//           position: relative;
//         }
        
//         /* Image styling based on type */
//         .image-fill {
//           width: 100%;
//           height: 100%;
//           object-fit: cover; /* Fill the entire container */
//         }
        
//         .image-contain {
//           width: auto;
//           height: auto;
//           max-width: 90%;
//           max-height: 90%;
//           object-fit: contain;
//         }
        
//         /* Purple background for specific images */
//         .carousel-image[data-bg-color="#ada2b5"] {
//           background-color: #ada2b5 !important;
//         }
        
//         .carousel-image[data-bg-color="#ada2b5"]::before {
//           display: none; /* Remove overlay for purple background images */
//         }
        
//         .image-title {
//           position: absolute;
//           left: 0;
//           right: 0;
//           text-align: center;
//           font-family: 'Monument Extended', sans-serif;
//           font-size: 24px;
//           font-weight: normal;
//           color: white; /* Changed to white */
//           z-index: 5;
//           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Darker shadow for white text */
//           padding: 20px;
//         }
        
//         .image-title.top {
//           top: 40px;
//         }
        
//         .image-title.bottom {
//           bottom: 80px;
//         }
        
//         .carousel-dots {
//           position: absolute;
//           bottom: 30px;
//           left: 0;
//           right: 0;
//           display: flex;
//           justify-content: center;
//           gap: 12px;
//           z-index: 10;
//         }
        
//         .carousel-dot {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.5);
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
        
//         .carousel-dot.active {
//           background: white;
//           transform: scale(1.2);
//         }
//       `}</style>

//       {/* Mobile Layout */}
//       <div className="mobile-layout">
//         {/* Logo */}
//         <div className="mb-6">
//           <Image 
//             width={40} 
//             height={35} 
//             src="/Group 1.png" 
//             alt="Company Logo" 
//             className="object-contain" 
//           />
//         </div>

//         {/* Header */}
//         <div className="mb-6">
//           <h1 
//             className="monument-extended text-2xl font-normal text-[#1A1A1A] mb-3"
//           >
//              Sign Up
//           </h1>
//           <p 
//             className="manrope text-sm font-light text-[#9CA3AF]"
//           >
//             Create an account with us and get started!
//           </p>
//         </div>

        

//         {/* Form */}
//         <div className="flex-1">
//           {/* Full Name Input */}
//           <div className="mb-3">
//             <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
//               Full Name
//             </label>
//             <div className={`mobile-input-container ${errors.name ? 'error' : ''}`}>
//               <input
//                 type="text"
//                 name="name"
//                 value={formValues.name}
//                 onChange={handleChange}
//                 placeholder=""
//               />
//             </div>
//             {errors.name && (
//               <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
//                 {errors.name}
//               </p>
//             )}
//           </div>

//           {/* Email Input */}
//           <div className="mb-3">
//             <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
//               Email Address
//             </label>
//             <div className={`mobile-input-container ${errors.email ? 'error' : ''}`}>
//               <input
//                 type="email"
//                 name="email"
//                 value={formValues.email}
//                 onChange={handleChange}
//                 placeholder=""
//               />
//             </div>
//             {errors.email && (
//               <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Phone Input */}
//           <div className="mb-3">
//             <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
//               Phone Number
//             </label>
//             <div className={`mobile-input-container ${errors.phone ? 'error' : ''}`}>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formValues.phone}
//                 onChange={handleChange}
//                 placeholder=""
//               />
//             </div>
//             {errors.phone && (
//               <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
//                 {errors.phone}
//               </p>
//             )}
//           </div>

//           {/* Password Input */}
//           <div className="mb-3">
//             <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
//               Password
//             </label>
//             <div className={`mobile-input-container ${errors.password ? 'error' : ''}`}>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formValues.password}
//                 onChange={handleChange}
//                 placeholder=""
//                 style={{ paddingRight: "45px" }}
//               />
//               <button 
//                 type="button" 
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="mobile-password-toggle"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password Input */}
//           <div className="mb-6">
//             <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
//               Confirm Password
//             </label>
//             <div className={`mobile-input-container ${errors.confirmPassword ? 'error' : ''}`}>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 value={formValues.confirmPassword}
//                 onChange={handleChange}
//                 placeholder=""
//                 style={{ paddingRight: "45px" }}
//               />
//               <button 
//                 type="button" 
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="mobile-password-toggle"
//               >
//                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
//                 {errors.confirmPassword}
//               </p>
//             )}
//           </div>

//           {/* Sign Up Button */}
//           <button 
//             type="button"
//             onClick={handleSubmit}
//             disabled={isPending}
//             className="w-full h-12 bg-[#5D2A8B] rounded-lg text-white manrope font-semibold text-base disabled:opacity-70 disabled:cursor-not-allowed mb-4"
//           >
//             {isPending ? 'Signing up...' : 'Sign Up as Admin'}
//           </button>

//           {/* Footer */}
//           <p className="manrope text-sm text-center text-[#6E6E6E] mt-auto">
//             Already have an account?{" "}
//             <Link
//               href="/auth/login"
//               className="font-medium text-[#5D2A8B]"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Desktop Layout */}
//       <div className="desktop-layout">
//         <div className="desktop-container">
//           {/* Left Image Section with Carousel */}
//           <div className="desktop-left-image">
//             <div className="carousel-container">
//               {images.map((image, index) => (
//                 <div
//                   key={image.src}
//                   className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
//                   data-bg-color={image.backgroundColor}
//                   style={{ backgroundColor: image.backgroundColor || 'transparent' }}
//                 >
//                   {image.backgroundColor === '#ada2b5' ? (
//                     <div className="purple-image-container">
//                       <Image
//                         src={image.src}
//                         alt={`Carousel Image ${index + 1}`}
//                         width={700}
//                         height={1025}
//                         priority={index === 0}
//                         className={image.imageStyle === 'fill' ? 'image-fill' : 'image-contain'}
//                       />
//                       {image.title && (
//                         <div className={`image-title ${image.titlePosition || 'bottom'}`}>
//                           {image.title}
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     // First image (AI Analysis) keeps original style
//                     <Image
//                       src={image.src}
//                       alt={`Carousel Image ${index + 1}`}
//                       width={700}
//                       height={1025}
//                       priority={index === 0}
//                       className="w-full h-full object-contain"
//                     />
//                   )}
//                 </div>
//               ))}
              
//               {/* Carousel Dots */}
//               <div className="carousel-dots">
//                 {images.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
//                     onClick={() => setCurrentImageIndex(index)}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
              
//           {/* Right Form Section */}
//           <div className="desktop-form-container">
//             {/* Logo */}
//             <div className="absolute top-[50px] left-[50px]">
//               <Image 
//                 width={55} 
//                 height={48} 
//                 src="/Group 1.png" 
//                 alt="Company Logo" 
//                 className="object-contain" 
//               />
//             </div>

//             {/* Header */}
//             <div className="absolute top-[136px] left-[50px]">
//               <h1 className="monument-extended text-[30px] font-normal text-[#1A1A1A] mb-4">
//                 Admin Sign Up
//               </h1>
//               <p className="manrope text-[18px] font-light text-[#6E6E6EB2]">
//                 Create an admin account to manage the platform
//               </p>
//             </div>

//             {/* Google Sign Up Button - Desktop */}
//             <div className="absolute top-[273px] left-[50px]">
//               <button 
//                 type="button" 
//                 onClick={handleGoogleSignUp}
//                 className="w-[484px] h-[60px] flex items-center justify-center gap-3 border border-[#6E6E6E4D] rounded-xl bg-white hover:bg-gray-50"
//               >
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M19.8 10.2273C19.8 9.52045 19.7364 8.83636 19.6182 8.18182H10.2V12.05H15.5891C15.3545 13.3 14.6182 14.3591 13.5182 15.0682V17.5773H16.8091C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
//                   <path d="M10.2 20C12.9 20 15.1636 19.1045 16.8091 17.5773L13.5182 15.0682C12.5909 15.6682 11.4182 16.0227 10.2 16.0227C7.59545 16.0227 5.39091 14.2636 4.57273 11.9H1.16364V14.4909C2.79545 17.7591 6.26364 20 10.2 20Z" fill="#34A853"/>
//                   <path d="M4.57273 11.9C4.37273 11.3 4.25909 10.6591 4.25909 10C4.25909 9.34091 4.37273 8.7 4.57273 8.1V5.50909H1.16364C0.477273 6.85909 0.0909091 8.38636 0.0909091 10C0.0909091 11.6136 0.477273 13.1409 1.16364 14.4909L4.57273 11.9Z" fill="#FBBC04"/>
//                   <path d="M10.2 3.97727C11.5318 3.97727 12.7136 4.43182 13.6409 5.30909L16.5682 2.38182C15.1591 1.08182 12.8955 0.227273 10.2 0.227273C6.26364 0.227273 2.79545 2.46818 1.16364 5.50909L4.57273 8.1C5.39091 5.73636 7.59545 3.97727 10.2 3.97727Z" fill="#EA4335"/>
//                 </svg>
//                 <span className="manrope text-[15px] font-medium text-gray-700">
//                   Sign up with Google
//                 </span>
//               </button>
//             </div>

//             {/* Divider - Desktop */}
//             <div className="absolute top-[393px] left-[50px] right-[50px] flex items-center">
//               <div className="flex-1 h-px bg-gray-300" />
//               <span className="manrope text-sm text-gray-400 px-4">or</span>
//               <div className="flex-1 h-px bg-gray-300" />
//             </div>

//             {/* Form Inputs */}
//             <div className="absolute top-[463px] left-[50px] space-y-6">
//               {/* Full Name */}
//               <div className={`input-with-notch ${formValues.name ? 'has-value' : ''} ${errors.name ? 'error' : ''}`}>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formValues.name}
//                   onChange={handleChange}
//                   placeholder="Demola Alo"
//                 />
//                 {formValues.name && (
//                   <label className="input-label">Full Name</label>
//                 )}
//                 {errors.name && (
//                   <p className="manrope text-sm text-red-500 mt-2">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div className={`input-with-notch ${formValues.email ? 'has-value' : ''} ${errors.email ? 'error' : ''}`}>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formValues.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                 />
//                 {formValues.email && (
//                   <label className="input-label">Email</label>
//                 )}
//                 {errors.email && (
//                   <p className="manrope text-sm text-red-500 mt-2">{errors.email}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div className={`input-with-notch ${formValues.phone ? 'has-value' : ''} ${errors.phone ? 'error' : ''}`}>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formValues.phone}
//                   onChange={handleChange}
//                   placeholder="09012345678"
//                 />
//                 {formValues.phone && (
//                   <label className="input-label">Phone Number</label>
//                 )}
//                 {errors.phone && (
//                   <p className="manrope text-sm text-red-500 mt-2">{errors.phone}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className={`input-with-notch ${formValues.password ? 'has-value' : ''} ${errors.password ? 'error' : ''}`}>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formValues.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   style={{ paddingRight: '50px' }}
//                 />
//                 {formValues.password && (
//                   <label className="input-label">Password</label>
//                 )}
//                 <button 
//                   type="button" 
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="password-toggle"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//                 {errors.password && (
//                   <p className="manrope text-sm text-red-500 mt-2">{errors.password}</p>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className={`input-with-notch ${formValues.confirmPassword ? 'has-value' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formValues.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   style={{ paddingRight: '50px' }}
//                 />
//                 {formValues.confirmPassword && (
//                   <label className="input-label">Confirm Password</label>
//                 )}
//                 <button 
//                   type="button" 
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="password-toggle"
//                 >
//                   {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//                 {errors.confirmPassword && (
//                   <p className="manrope text-sm text-red-500 mt-2">{errors.confirmPassword}</p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button 
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isPending}
//                 className="w-[484px] h-[60px] bg-[#5D2A8B] rounded-xl text-white manrope font-semibold text-[16px] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
//               >
//                 {isPending ? 'Signing up...' : 'Sign Up as Admin'}
//               </button>
//             </div>

//             {/* Footer */}
//             <div className="absolute bottom-[50px] left-0 right-0 text-center">
//               <p className="manrope text-[18px] font-light text-[#6E6E6E]">
//                 Already have an account?{" "}
//                 <Link
//                   href="/auth/login"
//                   className="font-medium text-[#5D2A8B]"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/api/hooks/useAuth';
import { toast } from '@/app/components/hooks/use-toast';
import Link from "next/link";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Define carousel image interface with optional text overlay properties
interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  titlePosition?: 'top' | 'bottom';
  backgroundColor?: string;
}

type ApiError = {
  response?: {
    status?: number;
    statusText?: string;
    data?: {
      errors?: Array<{ message: string }>;
      message?: string;
    };
  };
  message?: string;
  code?: string;
  name?: string;
};

export default function AdminSignupPage() {
  const router = useRouter();
  const { client } = useAuth();

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: submitMutate, isPending } = useMutation({
    mutationFn: async (values: { name: string; email: string; phone: string; password: string }) => {
      // Split the name into firstName and lastName
      const nameParts = values.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const payload = {
        firstName,
        lastName,
        email: values.email.toLowerCase().trim(),
        password: values.password,
        phone: values.phone.replace(/\s/g, ''),
        role: "admin"
      };
      
      console.log('🚀 Sending ADMIN registration to backend:', payload);

      const { data } = await client.post('/api/auth/register', payload);
      return data;
    },
    onSuccess: (response) => {
      // Always redirect to email verification after registration
      toast({ 
        title: 'ADMIN REGISTRATION SUCCESSFUL!',
        description: 'Please check your email for the verification code'
      });
      router.push(`/auth/verify-email?email=${encodeURIComponent(formValues.email)}`);
    },
    onError: (error: ApiError) => {
      let message = 'Registration failed';
      
      if (error?.response?.data?.errors?.[0]?.message) {
        message = error.response.data.errors[0].message;
      } else if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      } else if (error.code === 'ERR_NETWORK') {
        message = 'Network error. Please check your internet connection.';
      } else if (error.name === 'AxiosError' && !error.response) {
        message = 'Unable to connect to server. Please try again later.';
      }
      
      toast({ 
        title: 'Registration Failed',
        description: message,
        variant: 'destructive'
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormValues> = {};
    
    if (!formValues.name.trim()) newErrors.name = 'Full name is required';
    if (!formValues.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) newErrors.email = 'Invalid email address';
    if (!formValues.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^(\+?234|0)?[789][01]\d{8}$/.test(formValues.phone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid Nigerian phone number';
    if (!formValues.password) newErrors.password = 'Password is required';
    else if (formValues.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formValues.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formValues.password !== formValues.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitMutate({ 
      name: formValues.name, 
      email: formValues.email, 
      phone: formValues.phone, 
      password: formValues.password 
    });
  };

  const handleGoogleSignUp = () => {
    toast({
      title: 'Google Sign Up',
      description: 'This feature will be implemented soon'
    });
  };

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Define carousel images with text overlays for specific slides
  const carouselImages: CarouselImage[] = [
    { 
      src: "/Frame 335677.png", 
      alt: "Data Capturing Illustration"
    },
    { 
      src: "/assets/view-measurement.png", 
      alt: "View Measurement",
      title: "VIEW MEASUREMENT",
      titlePosition: "top",
      backgroundColor: "#ccbddb"
    },
    { 
      src: "/assets/Group (2).png", 
      alt: "Take Image",
      title: "TAKE IMAGE",
      titlePosition: "top",
      backgroundColor: "#ccbddb"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .monument-extended { font-family: 'Monument Extended', sans-serif; }
        .manrope { font-family: 'Manrope', sans-serif; }
        
        /* Mobile-first responsive layout */
        .desktop-layout {
          display: none;
        }
        
        .mobile-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding: 24px;
          max-width: 400px;
          margin: 0 auto;
        }
        
        @media (min-width: 1024px) {
          .desktop-layout {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: white;
            padding: 44px 45px;
          }
          
          .mobile-layout {
            display: none;
          }
        }
        
        .mobile-input-container {
          position: relative;
          width: 100%;
          height: 50px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          background: white;
          margin-bottom: 16px;
        }
        
        .mobile-input-container input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: white !important;
          padding: 14px 16px;
          font-family: 'Manrope', sans-serif;
          font-size: 16px;
          color: #374151;
        }
        
        .mobile-input-container input::placeholder {
          color: #9CA3AF;
        }
        
        .mobile-input-container.error {
          border-color: #EF4444;
        }
        
        .mobile-password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #6B7280;
        }
        
        /* Desktop styles */
        .desktop-container {
          width: 100%;
          max-width: 1439px;
          display: flex;
          gap: 76px;
        }
        
        .desktop-left-image {
          flex: 0 0 700px;
          height: 1025px;
          border-radius: 40px;
          overflow: hidden;
        }
        
        .desktop-form-container {
          flex: 0 0 609px;
          height: 1025px;
          background: #FBFAFC;
          border-radius: 40px;
          position: relative;
        }
        
        .input-with-notch {
          position: relative;
          width: 100%;
          max-width: 484px;
        }
        
        .input-with-notch input {
          width: 100%;
          height: 75px;
          border: 1px solid #6E6E6E4D;
          border-radius: 12px;
          background: white;
          padding: 17px 30px;
          font-family: 'Manrope', sans-serif;
          font-size: 20px;
          color: #6E6E6E;
          outline: none;
        }
        
        .input-with-notch input:focus {
          border-color: #5D2A8B;
        }
        
        .input-with-notch.has-value input {
          padding-top: 25px;
          padding-bottom: 9px;
        }
        
        .input-label {
          position: absolute;
          top: -10px;
          left: 30px;
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #5D2A8B;
          background: white;
          padding: 0 5px;
          pointer-events: none;
        }
        
        .input-with-notch.error input {
          border-color: #ef4444;
        }
        
        .password-toggle {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #6E6E6E;
        }
        
        /* Carousel styles */
        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .carousel-image-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transition: opacity 0.5s ease-in-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Custom background container for specific slides */
        .custom-background {
          background-color: #ccbddb;
        }
        
        /* Text overlay styles */
        .carousel-text-overlay {
          position: absolute;
          width: 180px;
          height: 17px;
          top: 37px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Monument Extended', sans-serif;
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          line-height: 100%;
          letter-spacing: 0%;
          text-align: center;
          color: white;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        
        .carousel-text-overlay.top {
          /* Using absolute positioning with specific coordinates */
        }
        
        .carousel-text-overlay.bottom {
          bottom: 80px;
        }
        
        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }
        
        .carousel-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .carousel-indicator.active {
          background-color: white;
        }
      `}</style>

      {/* Mobile Layout */}
      <div className="mobile-layout">
        {/* Logo */}
        <div className="mb-6">
          <Image 
            width={40} 
            height={35} 
            src="/Group 1.png" 
            alt="Company Logo" 
            className="object-contain" 
          />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 
            className="monument-extended text-2xl font-normal text-[#1A1A1A] mb-3"
          >
             Sign Up
          </h1>
          <p 
            className="manrope text-sm font-light text-[#9CA3AF]"
          >
            Create an account with us and get started!
          </p>
        </div>

        

        {/* Form */}
        <div className="flex-1">
          {/* Full Name Input */}
          <div className="mb-3">
            <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
              Full Name
            </label>
            <div className={`mobile-input-container ${errors.name ? 'error' : ''}`}>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            {errors.name && (
              <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
              Email Address
            </label>
            <div className={`mobile-input-container ${errors.email ? 'error' : ''}`}>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            {errors.email && (
              <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-3">
            <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
              Phone Number
            </label>
            <div className={`mobile-input-container ${errors.phone ? 'error' : ''}`}>
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            {errors.phone && (
              <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
              Password
            </label>
            <div className={`mobile-input-container ${errors.password ? 'error' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder=""
                style={{ paddingRight: "45px" }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="mobile-password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="manrope text-sm font-medium text-[#374151] mb-2 block">
              Confirm Password
            </label>
            <div className={`mobile-input-container ${errors.confirmPassword ? 'error' : ''}`}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder=""
                style={{ paddingRight: "45px" }}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="mobile-password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="manrope text-xs text-[#EF4444] -mt-3 mb-3">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full h-12 bg-[#5D2A8B] rounded-lg text-white manrope font-semibold text-base disabled:opacity-70 disabled:cursor-not-allowed mb-4"
          >
            {isPending ? 'Signing up...' : 'Sign Up as Admin'}
          </button>

          {/* Footer */}
          <p className="manrope text-sm text-center text-[#6E6E6E] mt-auto">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-[#5D2A8B]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="desktop-layout">
        <div className="desktop-container">
          {/* Left Image Section - Carousel */}
          <div className="desktop-left-image">
            <div className="carousel-container">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-image-wrapper ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundColor: image.backgroundColor || 'transparent'
                  }}
                >
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    width={700}
                    height={1025}
                    priority={index === 0}
                    className="carousel-image"
                  />
                  {image.title && (
                    <div className={`carousel-text-overlay ${image.titlePosition || 'bottom'}`}>
                      {image.title}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`carousel-indicator ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
              
          {/* Right Form Section */}
          <div className="desktop-form-container">
            {/* Logo */}
            <div className="absolute top-[50px] left-[50px]">
              <Image 
                width={55} 
                height={48} 
                src="/Group 1.png" 
                alt="Company Logo" 
                className="object-contain" 
              />
            </div>

            {/* Header */}
            <div className="absolute top-[136px] left-[50px]">
              <h1 className="monument-extended text-[30px] font-normal text-[#1A1A1A] mb-4">
                Admin Sign Up
              </h1>
              <p className="manrope text-[18px] font-light text-[#6E6E6EB2]">
                Create an admin account to manage the platform
              </p>
            </div>

            {/* Google Sign Up Button - Desktop */}
            <div className="absolute top-[273px] left-[50px]">
              <button 
                type="button" 
                onClick={handleGoogleSignUp}
                className="w-[484px] h-[60px] flex items-center justify-center gap-3 border border-[#6E6E6E4D] rounded-xl bg-white hover:bg-gray-50"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.8 10.2273C19.8 9.52045 19.7364 8.83636 19.6182 8.18182H10.2V12.05H15.5891C15.3545 13.3 14.6182 14.3591 13.5182 15.0682V17.5773H16.8091C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
                  <path d="M10.2 20C12.9 20 15.1636 19.1045 16.8091 17.5773L13.5182 15.0682C12.5909 15.6682 11.4182 16.0227 10.2 16.0227C7.59545 16.0227 5.39091 14.2636 4.57273 11.9H1.16364V14.4909C2.79545 17.7591 6.26364 20 10.2 20Z" fill="#34A853"/>
                  <path d="M4.57273 11.9C4.37273 11.3 4.25909 10.6591 4.25909 10C4.25909 9.34091 4.37273 8.7 4.57273 8.1V5.50909H1.16364C0.477273 6.85909 0.0909091 8.38636 0.0909091 10C0.0909091 11.6136 0.477273 13.1409 1.16364 14.4909L4.57273 11.9Z" fill="#FBBC04"/>
                  <path d="M10.2 3.97727C11.5318 3.97727 12.7136 4.43182 13.6409 5.30909L16.5682 2.38182C15.1591 1.08182 12.8955 0.227273 10.2 0.227273C6.26364 0.227273 2.79545 2.46818 1.16364 5.50909L4.57273 8.1C5.39091 5.73636 7.59545 3.97727 10.2 3.97727Z" fill="#EA4335"/>
                </svg>
                <span className="manrope text-[15px] font-medium text-gray-700">
                  Sign up with Google
                </span>
              </button>
            </div>

            {/* Divider - Desktop */}
            <div className="absolute top-[393px] left-[50px] right-[50px] flex items-center">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="manrope text-sm text-gray-400 px-4">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Form Inputs */}
            <div className="absolute top-[463px] left-[50px] space-y-6">
              {/* Full Name */}
              <div className={`input-with-notch ${formValues.name ? 'has-value' : ''} ${errors.name ? 'error' : ''}`}>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Demola Alo"
                />
                {formValues.name && (
                  <label className="input-label">Full Name</label>
                )}
                {errors.name && (
                  <p className="manrope text-sm text-red-500 mt-2">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className={`input-with-notch ${formValues.email ? 'has-value' : ''} ${errors.email ? 'error' : ''}`}>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                {formValues.email && (
                  <label className="input-label">Email</label>
                )}
                {errors.email && (
                  <p className="manrope text-sm text-red-500 mt-2">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className={`input-with-notch ${formValues.phone ? 'has-value' : ''} ${errors.phone ? 'error' : ''}`}>
                <input
                  type="tel"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  placeholder="09012345678"
                />
                {formValues.phone && (
                  <label className="input-label">Phone Number</label>
                )}
                {errors.phone && (
                  <p className="manrope text-sm text-red-500 mt-2">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div className={`input-with-notch ${formValues.password ? 'has-value' : ''} ${errors.password ? 'error' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{ paddingRight: '50px' }}
                />
                {formValues.password && (
                  <label className="input-label">Password</label>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="manrope text-sm text-red-500 mt-2">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className={`input-with-notch ${formValues.confirmPassword ? 'has-value' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{ paddingRight: '50px' }}
                />
                {formValues.confirmPassword && (
                  <label className="input-label">Confirm Password</label>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.confirmPassword && (
                  <p className="manrope text-sm text-red-500 mt-2">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="w-[484px] h-[60px] bg-[#5D2A8B] rounded-xl text-white manrope font-semibold text-[16px] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                {isPending ? 'Signing up...' : 'Sign Up as Admin'}
              </button>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[50px] left-0 right-0 text-center">
              <p className="manrope text-[18px] font-light text-[#6E6E6E]">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-[#5D2A8B]"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}