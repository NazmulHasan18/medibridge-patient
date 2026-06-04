"use client";
import { DoctorCard } from "@/components/DoctorCard/DoctorCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDoctors } from "@/hooks/doctor/useDoctor";
import React, { useState } from "react";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useDoctors({
    page,
    limit: 10,
    // send specialization only when not "All"
    specialization: activeCategory === "All" ? undefined : activeCategory,
  });

  if (isError) {
    toast.error(error instanceof Error ? error.message : "Something went wrong");
  }

  const doctors = data?.data?.data ?? [];
  const categories = ["All", ...(data?.data?.specializations ?? [])];

  return (
    <section className="container mx-auto p-5 md:p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Our Doctors</h1>
        <p className="text-2xl">Our Experts Doctors For The Patients</p>
        <div className="w-full md:w-72 h-1 bg-black" />
      </div>

      <div className="my-5">
        <Tabs
          value={activeCategory}
          onValueChange={(val) => {
            setActiveCategory(val);
            setPage(1);
          }}
        >
          <TabsList className="w-full flex-wrap h-full gap-1 bg-transparent mx-auto my-5 md:gap-5">
            {categories.map((category, i) => (
              <TabsTrigger
                key={i}
                value={category}
                className="p-3 rounded-full data-[state=active]:border-2 data-[state=active]:border-pink-400 border-2 border-transparent hover:border-pink-500"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory}>
            {isLoading ? (
              <DoctorGridSkeleton />
            ) : doctors.length === 0 ? (
              <p className="text-center text-gray-500">No doctors found.</p>
            ) : (
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200 ${isFetching ? "opacity-50" : "opacity-100"}`}
              >
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </Button>

        <div className="text-sm">
          Page {data?.data?.meta?.page ?? page} of {data?.data?.meta?.totalPages ?? 1}
        </div>

        <Button
          disabled={!!data?.data?.meta && page >= (data?.data?.meta?.totalPages ?? 1)}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

const DoctorGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="border border-blue-400 rounded-lg p-6 space-y-4 animate-pulse">
        <div className="rounded-full h-[200px] w-[200px] bg-gray-200 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-9 bg-gray-200 rounded w-1/3 mx-auto" />
      </div>
    ))}
  </div>
);

export default DoctorsList;
