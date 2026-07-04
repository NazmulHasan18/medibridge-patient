import { AnimatedBackground } from "@/components/Interactive/AnimatedBackground";
import React from "react";

const AboutPage = () => {
  return (
    <main className="relative min-h-screen p-6">
      <AnimatedBackground />
      <div className="relative z-0 max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <section className="text-center py-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About Our Hospital Management System</h1>
          <p className="text-lg text-gray-600">
            Simplifying healthcare operations with technology-driven solutions.
          </p>
        </section>

        {/* Overview */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-500">Overview</h2>
          <p>
            Our Hospital Management System is a comprehensive digital platform designed to streamline hospital
            operations, enhance patient care, and optimize administrative tasks. Built with modern
            technologies, it supports appointment scheduling, patient records, staff management, billing, and
            more.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-green-600">Our Mission</h3>
            <p className="mt-2">
              To empower healthcare providers with digital tools that enhance efficiency, transparency, and
              quality of care.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-purple-600">Our Vision</h3>
            <p className="mt-2">
              To become the leading platform for hospital automation and patient-centric digital health
              solutions globally.
            </p>
          </div>
        </section>

        {/* Technologies */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Technologies Used</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
            <li>Next.js (App Router)</li>
            <li>Tailwind CSS</li>
            <li>Firebase Authentication</li>
            <li>Node.js + Express/NestJS (Backend)</li>
            <li>MongoDB (Database)</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
