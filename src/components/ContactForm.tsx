"use client"
import React from 'react';
import {Button} from "@/components/Button";


function ContactForm() {
    const handelSubmit = async(e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(formData)

        const data  = Object.fromEntries(formData.entries())

        console.log(data)
        const response = await fetch('/api/contact', {

            method:'POST',
            headers:{

                'Content-Type':'application/json',
            }
        });

        if(response.ok){
            alert ('Message sent Successfully')
        }else alert('Failed to send Message')
    }
    return (
        <>
            <form action="#" onSubmit={handelSubmit} className="mt-10">
                <div className="space-y-7">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-md font-medium leading-6 text-slate-900"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                placeholder="Mcwachira "
                                className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-md font-medium leading-6 text-slate-900"
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="foobar@email.com"
                                className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-md leading-6">
                            <label
                                htmlFor="phone"
                                className="block font-medium text-slate-900"
                            >
                                Phone
                            </label>
                            <p id="phone-description" className="text-slate-500/80">
                                Optional
                            </p>
                        </div>
                        <div className="mt-2">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                autoComplete="tel"
                                aria-describedby="phone-description"
                                placeholder="+254726601941"
                                className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-md leading-6">
                            <label
                                htmlFor="message"
                                className="block font-medium text-slate-900"
                            >
                                How can I help you?
                            </label>
                            <p
                                id="message-description"
                                className="text-slate-500/80"
                            >
                                Max 500 characters
                            </p>
                        </div>
                        <div className="mt-2">
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            aria-describedby="message-description"
                            placeholder="Tell me a little bit about your project..."
                            className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-6 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
                        />
                        </div>
                    </div>
                    <fieldset>
                        <legend className="block text-md font-medium leading-6 text-slate-900">
                            Expected services
                        </legend>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-start">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="web-development"
                                        name="web-development"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
                                    />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                    <label
                                        htmlFor="web-development"
                                        className="text-slate-700"
                                    >
                                        Web development
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="web-design"
                                            name="web-design"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                        <label
                                            htmlFor="web-design"
                                            className="text-slate-700"
                                        >
                                            Web design
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="consulting"
                                            name="consulting"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                        <label
                                            htmlFor="consulting"
                                            className="text-slate-700"
                                        >
                                            Consulting
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="other"
                                            name="other"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                        <label htmlFor="other" className="text-slate-700">
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-10 border-t border-slate-200 pt-8">
                    <Button
                        type="submit"
                        className="w-full !text-base sm:!text-lg bg-dark !text-light dark:bg-light  dark:!text-dark">
                        Get started
                    </Button>
                </div>
            </form>
        </>
    );
}

export default ContactForm;