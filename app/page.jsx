"use client";

import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURES, STEPS } from "@/lib/landing";
import { ArrowRight } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import Lenis from "lenis";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col pt-16">
      <section className="mt-20 pb-12 space-y-10 md:space-y-20 px-5">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 font-bold"
          >
            Split expenses. Simplify Life.
          </Badge>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold md:text-7xl gradient-title">
            The Smartest Way To Split Expenses With Friends
          </h1>

          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Track expenses, split bills instantly, and manage group finances
            with ease.
            <br />
            <span className="font-extrabold text-green-700">SplitZee</span>{" "}
            makes sharing costs simple and stress-free!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size={"lg"}
              className="bg-green-600 hover:bg-green-700 dark:text-white border-none"
            >
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size={"lg"}
              className="border-green-600 text-green-600 hover:bg-green-50"
              variant={"outline"}
            >
              <Link href="#how-it-works">How it Works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        className="bg-gray-50 py-20 text-gray-900 
    dark:bg-background dark:text-foreground "
        id="features"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge
            className="bg-green-100 text-green-700 font-bold"
            variant={"outline"}
          >
            Features
          </Badge>

          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Everything you need to split expenses
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-muted-foreground">
            Our platform provides all the tools you need to handle expenses with
            ease.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, Icon, bg, color, description }) => (
              <Card
                key={title}
                className="flex flex-col items-center space-y-4 p-6 text-center"
              >
                <div className={`rounded-full p-3 ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>

                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" id="how-it-works">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge
            className="bg-green-100 text-green-700 font-bold"
            variant={"outline"}
          >
            How It Works
          </Badge>

          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Splitting Expenses has never been Easier
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Follow these simple steps to start tracking your expenses and
            settling up with friends.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3">
            {STEPS.map(({ label, description, title }) => (
              <div key={label} className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                  {label}
                </div>

                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500 text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 gradient text-white dark:bg-none
    dark:bg-[var(--background)] 
    dark:text-foreground"
      >
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
            Ready to Simplify expense sharing?
          </h2>
          <p className="mx-auto max-w-[600px] text-green-100 md:text-xl/relaxed">
            Become part of a thriving community making expense splitting
            effortless and worry-free.
          </p>

          <Button
            asChild
            size={"lg"}
            className="bg-green-600 hover:bg-green-700 dark:text-white border-none"
          >
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
