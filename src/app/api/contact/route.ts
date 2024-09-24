import nodemailer from 'nodemailer';
import {NextResponse} from 'next/server'


export async function POST(request: Request) {

    // const formData = await request.formData();
    // const name = formData.get('name')?.toString();
    // const email = formData.get('email')?.toString();
    // const phone = formData.get('phone')?.toString();
    // const message = formData.get('message')?.toString();
    //
    // // Retrieve all checked services
    // const services = formData.getAll('services[]')?.map(service => service.toString()).join(', ');
    const { name, email, phone, message, services } = await request.json(); // Parse JSON from the request body

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Outlook SMTP server
        port: 587,
        secure: false,
            service : process.env.EMAIL_SERVICE,
            auth : {
                user : process.env.EMAIL_USERNAME,
                pass : process.env.EMAIL_PASSWORD
            },
        // tls: {
        //     ciphers: 'SSLv3',
        // },
        })

        const mailOptions = {

            from:process.env.EMAIL_USERNAME,
            to:process.env.EMAIL_USERNAME,
            subject :`New message from your website`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ? phone : 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
        <h4>Services Selected:</h4>
        <ul>
          <li>Web Development: ${services.webDevelopment ? 'Yes' : 'No'}</li>
          <li>Web Design: ${services.webDesign ? 'Yes' : 'No'}</li>
          <li>Consulting: ${services.consulting ? 'Yes' : 'No'}</li>
          <li>Other: ${services.other ? 'Yes' : 'No'}</li>
        </ul>
      `,
        };


    try{
            await transporter.sendMail(mailOptions);
            return new Response ('Email sent Successfully', {status:200})
        }catch(error){
        console.log(error)
            return new Response('Error sending email', {status:500})
        }

}