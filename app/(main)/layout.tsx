"use client"

import { Authenticated } from 'convex/react'
import React from 'react'

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Authenticated>
      <div className='container mx-auto mt-24 mb-20'>
        {children}
      </div>
    </Authenticated>
  );
}

export default MainLayout
