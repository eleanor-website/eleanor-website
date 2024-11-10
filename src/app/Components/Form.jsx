'use client';
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginUser, handleCreate, getForgetPass } from '../db/main';
import ReqLoader from './ReqLoader';
import LoadingSpinner from './LoadingSpinner';

const Form = () => {
    const router = useRouter();
    const { setIsLoged, setUserId , dataText ,Lang } = useContext(UserContext);
    const [mode, setMode] = useState('sign');
    const [viewPas, setViewPas] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', name: '', email: '' });
    const [errors, setErrors] = useState({ username: '', password: '', name: '', email: '' });
    const [getpassResult, setGetPassResult] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    // Toggle password visibility
    const handleViewPas = () => setViewPas((prev) => !prev);
    // Handle input changes
    const handleChange = (e, wt) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (wt === 'userUsNa') {
            uerNameValidation();
        } else if (wt === 'userPas') {
            passwordValidation();
        }
        else if (wt === 'userNa') {
            nameValidation();
        }
        else if (wt === 'userEm') {
            emailValidation();
        }
    };
    // Username validation
    const uerNameValidation = () => {
        const { username } = formData;
        if (username.length === 0) {
            setErrors((prev) => ({ ...prev, username: Lang ==='en'?'Username is required':"هذا الحقل  مطلوب" }));
            return false;
        }
        if (mode === 'create') {
            if (!/^[A-Za-z0-9]+$/.test(username)) {
                setErrors((prev) => ({ ...prev, username: Lang ==='en'?'No special characters allowed':"غير مسموح بالرموز" }));
                return false;
            }
        }
        setErrors((prev) => ({ ...prev, username: '' }));
        return true;
    }
    // password validation
    const passwordValidation = () => {
        const { password } = formData;
        if (!password) {
            setErrors((prev) => ({ ...prev, password: Lang ==='en'?'Password is required':"هذا الحقل  مطلوب" }));
            return false;
        }

        if (mode === 'create') {
            if (password.length < 8) {
                setErrors((prev) => ({ ...prev, password: Lang ==='en'?'At least 8 characters':"على الاقل 8 حروف او ارفام" }));
                return false;
            }

            if (!/[A-Z]/.test(password)) {
                setErrors((prev) => ({ ...prev, password: Lang ==='en'?'At least one uppercase letter':"على الاقل حرف واحد كبير" }));
                return false;
            }

            if (!/[*&^%$#@!]/.test(password)) {
                setErrors((prev) => ({ ...prev, password: Lang ==='en'?'At least one special character (*&^%$#@!)':"على الاقل اضف رمز واحد" }));
                return false;
            }
        }
        setErrors((prev) => ({ ...prev, password: '' }));
        return true;
    }
    // name validation
    const nameValidation = () => {
        const { name } = formData;
        if (!name) {
            setErrors((prev) => ({ ...prev, name: Lang ==='en'?'Name is required':"هذا الحقل  مطلوب" }));
            return false;
        }
        if (!/^[A-Za-z\s]+$/.test(name)) {
            setErrors((prev) => ({ ...prev, name: Lang ==='en'?'Name must contain only letters':"مسموح بالحروف فقط" }));
            return false;
        }

        setErrors((prev) => ({ ...prev, name: '' }));
        return true;

    }
    // Email validation
    const emailValidation = () => {
        const { email } = formData;
        if (!email) {
            setErrors((prev) => ({ ...prev, email: Lang ==='en'?'Email is required':"هذا الحقل  مطلوب" }));
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrors((prev) => ({ ...prev, email: Lang ==='en'?'Enter a valid email address':"أدخل عنوان بريد إلكتروني صالح" }));
            return false;
        }
        setErrors((prev) => ({ ...prev, email: '' }));
        return true;
    }
    const validateInputs = () => {
        const isUsernameValid = uerNameValidation();
        const isPassValid = passwordValidation();
        const isNameValid = nameValidation();
        const isEmailValid = emailValidation();

        if (isUsernameValid && isPassValid && isNameValid && isEmailValid && mode === 'create') {
            return true;
        }
        if (isUsernameValid && isPassValid && mode === 'sign') {
            return true;
        }
        if (mode === 'get' && uerNameValidation()) {
            return true;
        }
        return false;
    };
    // Form submission handlera
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, name, email } = formData;
        if (!validateInputs()) return;
        if (mode === 'sign') {
            try {
                setIsLoading(true);
                const response = await loginUser(username, password);
                if (response.success) {
                    // Successful login
                    setUserId(response.data);          // Save user ID
                    setIsLoged(true);
                    setFormData({ username: '', password: '' });  // Clear form data
                    setErrors({ username: '', password: '' });    // Clear any errors
                    router.push('/');
                    // Redirect to homepage
                } else {
                    // Login failed, show error message
                    setErrors((prev) => ({ ...prev, username: response.message }));
                }
            } catch (error) {
                // Handle unexpected errors (just in case)
                setErrors((prev) => ({ ...prev, username: Lang ==='en'?'An unexpected error occurred.':"خطا غير معروف" }));

            } finally {
                setIsLoading(false);
            }
        } else if (mode === 'create') {
            try {
                setIsLoading(true);
                const response = await handleCreate(username, password, name, email); // Call the backend 
                if (response.success) {
                    setIsCreated(true); // Set a flag to show user is created successfully
                    setFormData({ username: '', password: '', name: '', email: '' }); // Clear form data
                    setErrors({ username: '', password: '', name: '', email: '' }); // Clear any previous errors
                    setTimeout(() => setIsCreated(false), 2000); // Reset success flag after 2 seconds

                } else {
                    // Set an error message if the username already exists or another error occurs
                    setErrors((prev) => ({ ...prev, username: response.message }));
                }
            } catch (error) {
                setErrors((prev) => ({ ...prev, username: Lang ==='en'?'An error occurred during account creation':"خطا اثناء انشاء حساب" })); // Handle generic error
            } finally {
                setIsLoading(false);
            }
        } else if (mode === 'get') {
            try {
                setIsLoading(true);
                const response = await getForgetPass(username); // Call the backend API to get the password
                if (response.success) {
                    setGetPassResult(response.password); // If successful, set the password in state
                    setFormData({ username: '' }); // Clear any previous errors
                    setErrors({ username: '' }); // Clear any previous errors
                    setTimeout(() => setGetPassResult(''), 5000); // Reset success flag after 2 seconds
                } else {
                    setErrors((prev) => ({ ...prev, username: Lang ==='en'?response.message:"خطا فى البيانات" })); // Set the error message in case of failure
                }
            } catch (error) {
                setErrors((prev) => ({ ...prev, username: Lang ==='en'?'An error occurred during password retrieval':"خطا فى الحصول على كلمه السر" })); // Set general error message
            } finally {
                setIsLoading(false);
            }
        } else {
            return false;
        }
    };

    

  if (!dataText) {
    return <div >
      <LoadingSpinner />
    </div>;
  }


    return (

        isLoading ?
            <ReqLoader />
            :
            <form className='flex flex-col items-center gap-5' dir={ Lang === 'en'? 'ltr' :'rtl'}>

                <h2 className='text-3xl font-bold text-my_red md:mb-5'>{dataText.logo} </h2>

                <p className='text-my_red font-medium'>
                    {mode === 'create' && (isCreated ? <span className='text-green-600 font-bold'>{Lang ==='en'? 'Account Created!':'تم انشاء الحساب'}</span> : Lang ==='en'?'Create your account':"قم بانشاء حساب")}
                    {mode === 'get' ? Lang ==='en'?'Get your password':"احصل على كلمة المرور":''}
                </p>

                <div className="flex flex-col w-fit text-my_red">
                    <label htmlFor="username" className='font-bold text-md mb-2 uppercase'>{dataText.Username}</label>
                    <div className="relative h-fit w-fit flex justify-center flex-col">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e) => handleChange(e, 'userUsNa')}
                            aria-label="Username"
                            className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full'
                        />
                        <Image src='/svgs/username.svg' alt='account' width={25} height={25} className='absolute left-2' />
                    </div>
                    {errors.username && <div className="text-red-700 font-bold mt-2 text-xs">{errors.username}</div>}
                </div>

                {(mode === 'sign' || mode === 'create') && (
                    <>
                        <div className="flex flex-col w-fit text-my_red">
                            <label htmlFor="password" className='font-bold text-md mb-2 uppercase'>{dataText.Password}</label>
                            <div className="relative h-fit w-fit flex justify-center flex-col">
                                <input
                                    type={viewPas ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => handleChange(e, 'userPas')}
                                    aria-label="Password"
                                    className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full'
                                />
                                <Image src='/svgs/password.svg' alt='password' width={25} height={25} className='absolute left-2' />
                                <Image src={`/svgs/${viewPas ? 'show_pas' : 'hide_pas'}.svg`} alt='toggle visibility' onClick={handleViewPas} width={25} height={25} className='absolute right-2 cursor-pointer' />
                            </div>
                            {errors.password && <div className="text-red-700 font-bold mt-2 text-xs">{errors.password}</div>}
                        </div>

                    </>
                )}
                {
                    mode === 'create' ?
                        <>
                            <div className="flex flex-col w-fit text-my_red">
                                <label htmlFor="name" className='font-bold text-md mb-2 uppercase'>{dataText.Name} </label>
                                <div className="relative h-fit w-fit flex justify-center flex-col">
                                    <input
                                        type='text'
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => handleChange(e, 'userNa')}
                                        aria-label="name"
                                        className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full'
                                    />
                                    <Image src='/svgs/name.svg' alt='name' width={25} height={25} className='absolute left-2' />
                                </div>
                                {errors.name && <div className="text-red-700 font-bold mt-2 text-xs">{errors.name}</div>}
                            </div>
                            <div className="flex flex-col w-fit text-my_red">
                                <label htmlFor="email" className='font-bold text-md mb-2 uppercase'>{dataText.Email} </label>
                                <div className="relative h-fit w-fit flex justify-center flex-col">
                                    <input
                                        type='email'
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange(e, 'userEm')}
                                        aria-label="email"
                                        className='pl-10 pr-10 py-2 font-bold border-2 border-my_dark focus:outline-none outline-none bg-transparent rounded-lg md:w-[350px] h-[50px] w-full'
                                    />
                                    <Image src='/svgs/email.svg' alt='email' width={25} height={25} className='absolute left-2' />
                                </div>
                                {errors.email && <div className="text-red-700 font-bold mt-2 text-xs">{errors.email}</div>}
                            </div>
                        </>
                        : ''
                }

                {mode === 'get' && getpassResult && <div className="text-my_red">{Lang ==='en'?'Your password is':"كلمه السر هى"}<span className='font-bold underline text-green-600'>{getpassResult}</span></div>}

                {mode === 'sign' && <p className='cursor-pointer underline font-medium text-my_red' onClick={() => setMode('get')}>{dataText.ForgotPassword}?</p>}

                <button className='bg-my_dark text-white px-7 py-3 font-bold text-md rounded-md' onClick={handleSubmit}>
                    {mode === 'sign' ? Lang ==='en'?'Sign In':"تسجيل الدخول" : mode === 'get' ? Lang ==='en'?'Retrieve Password':"استرجاع كلمة المرور" : Lang ==='en'?'Create Account':"إنشاء حساب"}
                </button>
    
                {mode === 'sign' ? (
                    <span className='text-my_red flex gap-3'>
                        {dataText.MSGCER} ? <p className='underline font-bold cursor-pointer' onClick={() => setMode('create')}>{dataText.CrOne}</p>
                    </span>
                ) : (
                    <span className='text-my_red flex gap-3'>
                        {dataText.AlHave} ? <p className='underline font-bold cursor-pointer' onClick={() => setMode('sign')}>{dataText.SigIn}</p>
                    </span>
                )}
            </form>

    );
};

export default Form;
