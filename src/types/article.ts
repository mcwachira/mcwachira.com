import React from "react"

export type Articles = {
    date:string,
title:string,
subtitle:string,
tags:[],
thumbnail:string,
coverImage:string,
projectURL:string,
images:[],
description:string,
client:{
    name: 'string',
    description:'string',
    industry: 'string',
    companySize: 'string',
    headquarters: 'string',
}

testimonial: {
    text: 'string',
    author: {
      name: 'string',
      role: 'string',
      image: 'string',
    },
  }
  projectDuration:string

  navigation: {
    prev: {
      name: string
      url: string,
    },
    next: {
      name:string,
      url: string,
    },
  },
  children:React.ReactNode
}
