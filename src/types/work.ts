import React from "react"

export type Work = {
    date:string,
title:string,
subtitle:string,
tags:[],
thumbnail:string,
coverImage:string,
projectURL:string,
    githubLink:string,
description:string,
client:{
    name: 'string',
    description:'string',
    industry: 'string',
    companySize: 'string',
    headquarters: 'string',
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
