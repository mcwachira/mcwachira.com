import nodemailer from 'nodemailer';
import {NextResponse} from 'next/server'


export async function POST(req:Request) {
    console.log(req)
    const {name, email, message, services } = await req.json();

        const transporter = nodemailer.createTransport({

            service : process.env.EMAIL_SERVICE,
            auth : {
                user : process.env.EMAIL_USERNAME,
                pass : process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {

            from:email,
            to:process.env.EMAIL_USERNAME,
            subject :`New message from ${name}`,
            text:message,
        }

        try{
            await transporter.sendMail(mailOptions);
            return new Response ('Email sent Successfully', {status:200})
        }catch(error){
            return new Response('Error sending email', {status:500})
        }

}