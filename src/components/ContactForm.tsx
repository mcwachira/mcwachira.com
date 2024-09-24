"use client"
import React, {FormEvent, useState} from 'react';
import {Button} from "@/components/Button";
import toast from "react-hot-toast";
import { redirect , useRouter} from 'next/navigation';



function ContactForm() {

    const [formData, setFormData] = useState({});

    const router = useRouter()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        console.log(data)

        // Create an object with all the form values
        const formValues = {
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone') || '', // Optional field
            message: data.get('message'),
            services: {
                webDevelopment: data.get('web-development') === 'on',
                webDesign: data.get('web-design') === 'on',
                consulting: data.get('consulting') === 'on',
                other: data.get('other') === 'on',
            },
        };

        console.log('Form Data:', formValues);
        setFormData(formValues);

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the correct content type
            },
            body: JSON.stringify(formValues), // Convert the form data to JSON
        });

        if(response.ok){
          toast.success('Message sent Successfully')
            router.push('/')
    }else {

            toast.error('Message not sent')
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-10"   >
                <div className="space-y-7">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name"
                               className="block text-md font-medium leading-6 text-slate-900">Name</label>
                        <input type="text" name="name" id="name" placeholder="Mcwachira"
                               className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"/>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email"
                               className="block text-md font-medium leading-6 text-slate-900">Email</label>
                        <input type="email" name="email" id="email" placeholder="foobar@email.com"
                               className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"/>
                    </div>

                    {/* Phone Input */}
                    <div>
                        <label htmlFor="phone"
                               className="block text-md font-medium leading-6 text-slate-900">Phone</label>
                        <input type="tel" name="phone" id="phone" placeholder="+254726601941"
                               className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"/>
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label htmlFor="message" className="block font-medium text-slate-900">How can I help
                            you?</label>
                        <textarea name="message" id="message" rows={5} placeholder="Tell me about your project..."
                                  className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"/>
                    </div>

                    {/* Services Checkbox */}
                    <fieldset>
                        <legend className="block text-md font-medium leading-6 text-slate-900">
                            Expected services
                        </legend>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-start">
                                <input id="web-development" name="services[]" type="checkbox"
                                       className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
                                />
                                <label htmlFor="web-development" className="ml-3 text-sm leading-6 text-slate-700">Web
                                    development</label>
                            </div>
                            <div className="flex items-start">
                                <input id="web-design" name="services[]" type="checkbox"
                                       className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"/>
                                <label htmlFor="web-design" className="ml-3 text-sm leading-6 text-slate-700">Web
                                    design</label>
                            </div>
                            <div className="flex items-start">
                                <input id="consulting" name="services[]" type="checkbox"
                                       className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"/>
                                <label htmlFor="consulting"
                                       className="ml-3 text-sm leading-6 text-slate-700">Consulting</label>
                            </div>
                            <div className="flex items-start">
                                <input id="other" name="services[]" type="checkbox"/>
                                <label htmlFor="other" className="ml-3 text-sm leading-6 text-slate-700">Other</label>
                            </div>
                        </div>
                    </fieldset>

                    <div className="mt-10 border-t border-slate-200 pt-8">
                        <Button
                            type="submit"
                            className="w-full !text-base sm:!text-lg bg-dark !text-light dark:bg-light  dark:!text-dark">
                            Get started
                        </Button>
                    </div>
                </div>
            </form>

        </>
    );
}

export default ContactForm;