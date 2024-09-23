import React, { SVGProps } from 'react'

interface SocialIconProps extends React.SVGProps<SVGSVGElement>{}

export function TwitterIcon(props:SocialIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <g>
          <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path>
        </g>
      </svg>
    )
  }
  
  export function InstagramIcon(props:SocialIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <g>
          <path d="M12,2.982c2.937,0,3.285.011,4.445.064a6.072,6.072,0,0,1,2.042.379,3.4,3.4,0,0,1,1.265.823,3.4,3.4,0,0,1,.823,1.265,6.072,6.072,0,0,1,.379,2.042c.053,1.16.064,1.508.064,4.445s-.011,3.285-.064,4.445a6.072,6.072,0,0,1-.379,2.042,3.644,3.644,0,0,1-2.088,2.088,6.072,6.072,0,0,1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.072,6.072,0,0,1-2.042-.379,3.4,3.4,0,0,1-1.265-.823,3.4,3.4,0,0,1-.823-1.265,6.072,6.072,0,0,1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.072,6.072,0,0,1,.379-2.042,3.4,3.4,0,0,1,.823-1.265,3.4,3.4,0,0,1,1.265-.823,6.072,6.072,0,0,1,2.042-.379c1.16-.053,1.508-.064,4.445-.064M12,1c-2.987,0-3.362.013-4.535.066a8.108,8.108,0,0,0-2.67.511A5.625,5.625,0,0,0,1.577,4.8a8.108,8.108,0,0,0-.511,2.67C1.013,8.638,1,9.013,1,12s.013,3.362.066,4.535a8.108,8.108,0,0,0,.511,2.67A5.625,5.625,0,0,0,4.8,22.423a8.108,8.108,0,0,0,2.67.511C8.638,22.987,9.013,23,12,23s3.362-.013,4.535-.066a8.108,8.108,0,0,0,2.67-.511A5.625,5.625,0,0,0,22.423,19.2a8.108,8.108,0,0,0,.511-2.67C22.987,15.362,23,14.987,23,12s-.013-3.362-.066-4.535a8.108,8.108,0,0,0-.511-2.67A5.625,5.625,0,0,0,19.2,1.577a8.108,8.108,0,0,0-2.67-.511C15.362,1.013,14.987,1,12,1Z"></path>
          <path d="M12,6.351A5.649,5.649,0,1,0,17.649,12,5.649,5.649,0,0,0,12,6.351Zm0,9.316A3.667,3.667,0,1,1,15.667,12,3.667,3.667,0,0,1,12,15.667Z"></path>
          <circle cx="17.872" cy="6.128" r="1.32"></circle>
        </g>
      </svg>
    )
  }
  
  export function FacebookIcon(props:SocialIconProps) {
    return (
      <svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        {...props}
      >
        <g>
          <path d="M24,12.072A12,12,0,1,0,10.125,23.926V15.541H7.078V12.072h3.047V9.428c0-3.007,1.792-4.669,4.532-4.669a18.611,18.611,0,0,1,2.687.234V7.947H15.83a1.734,1.734,0,0,0-1.947,1.49,1.71,1.71,0,0,0-.008.385v2.25H17.2l-.532,3.469h-2.8v8.385A12,12,0,0,0,24,12.072Z" />
        </g>
      </svg>
    )
  }
  
  export function GitHubIcon(props:SocialIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="currentColor"
        {...props}
      >
        <g clipPath="url(#clip0_315_596)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0.200195C3.6 0.200195 0 3.8002 0 8.2002C0 11.7335 2.26667 14.7335 5.46667 15.8002C5.86667 15.8669 6 15.6002 6 15.4002C6 15.2002 6 14.7335 6 14.0669C3.8 14.5335 3.33333 13.0002 3.33333 13.0002C3 12.0669 2.46667 11.8002 2.46667 11.8002C1.66667 11.3335 2.46667 11.3335 2.46667 11.3335C3.26667 11.4002 3.66667 12.1335 3.66667 12.1335C4.4 13.3335 5.53333 13.0002 6 12.8002C6.06667 12.2669 6.26667 11.9335 6.53333 11.7335C4.73333 11.5335 2.86667 10.8669 2.86667 7.8002C2.86667 6.93353 3.2 6.2002 3.66667 5.66686C3.66667 5.4002 3.33333 4.6002 3.8 3.53353C3.8 3.53353 4.46667 3.33353 6 4.33353C6.66667 4.13353 7.33333 4.06686 8 4.06686C8.66667 4.06686 9.33333 4.13353 10 4.33353C11.5333 3.26686 12.2 3.53353 12.2 3.53353C12.6667 4.66686 12.3333 5.46686 12.2667 5.66686C12.8 6.2002 13.0667 6.93353 13.0667 7.8002C13.0667 10.8669 11.2 11.5335 9.4 11.7335C9.66667 12.0002 9.93333 12.4669 9.93333 13.2002C9.93333 14.2669 9.93333 15.1335 9.93333 15.4002C9.93333 15.6002 10.0667 15.8669 10.4667 15.8002C13.6667 14.7335 15.9333 11.7335 15.9333 8.2002C16 3.8002 12.4 0.200195 8 0.200195Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_315_596">
            <rect width={16} height={16} fill="white" />
          </clipPath>
        </defs>
      </svg>
    )
  }
  
  export function LinkedInIcon(props:SocialIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="currentColor"
        {...props}
      >
        <path d="M16.5128 0H0.717949C0.287179 0 0 0.266667 0 0.666667V15.3333C0 15.7333 0.287179 16 0.717949 16H16.5128C16.9436 16 17.2308 15.7333 17.2308 15.3333V0.666667C17.2308 0.266667 16.9436 0 16.5128 0ZM5.09744 13.6667H2.58462V6H5.16923V13.6667H5.09744ZM3.80513 4.93333C3.01538 4.93333 2.29744 4.33333 2.29744 3.53333C2.29744 2.8 2.94359 2.13333 3.80513 2.13333C4.59487 2.13333 5.31282 2.73333 5.31282 3.53333C5.31282 4.33333 4.66667 4.93333 3.80513 4.93333ZM14.7179 13.6667H12.1333V9.93333C12.1333 9.06667 12.1333 7.93333 10.841 7.93333C9.47692 7.93333 9.33333 8.86667 9.33333 9.86667V13.6667H6.74872V6H9.18974V7.06667C9.54872 6.46667 10.3385 5.86667 11.6308 5.86667C14.2154 5.86667 14.7179 7.46667 14.7179 9.53333V13.6667Z" />
      </svg>
    )
  }
  
  export function DribbbleIcon(props:SocialIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12,24C5.4,24,0,18.6,0,12S5.4,0,12,0s12,5.4,12,12S18.6,24,12,24z M22.1,13.6c-0.4-0.1-3.2-1-6.4-0.4c1.3,3.7,1.9,6.7,2,7.3C20,19,21.7,16.5,22.1,13.6z M16,21.5c-0.2-0.9-0.7-4-2.2-7.8 c0,0,0,0-0.1,0c-5.8,2-7.9,6-8,6.4c1.7,1.4,3.9,2.2,6.3,2.2C13.4,22.3,14.8,22,16,21.5z M4.4,18.9c0.2-0.4,3-5.1,8.3-6.8 c0.1,0,0.3-0.1,0.4-0.1c-0.3-0.6-0.5-1.2-0.8-1.7c-5.1,1.5-10.1,1.5-10.5,1.5c0,0.1,0,0.2,0,0.3C1.8,14.6,2.7,17.1,4.4,18.9z M2,9.9 c0.5,0,4.7,0,9.5-1.2c-1.7-3-3.5-5.6-3.8-5.9C4.8,4.1,2.6,6.7,2,9.9z M9.6,2.1c0.3,0.4,2.1,2.9,3.8,6c3.6-1.4,5.2-3.4,5.4-3.7 C17,2.7,14.6,1.8,12,1.8C11.2,1.8,10.4,1.9,9.6,2.1z M19.9,5.5c-0.2,0.3-1.9,2.5-5.7,4c0.2,0.5,0.5,1,0.7,1.5 c0.1,0.2,0.1,0.4,0.2,0.5c3.4-0.4,6.8,0.3,7.1,0.3C22.2,9.5,21.4,7.3,19.9,5.5z"
          ></path>
        </g>
      </svg>
    )
  }

    
  export function GithubIcon(props:SocialIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <g>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </g>
      </svg>
    )
  }
  
  export function EmailIcon(props:SocialIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    )
  }
  