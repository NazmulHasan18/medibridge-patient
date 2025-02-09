import React from "react";

const Blogs = () => {
   return (
      <section>
         <div className="container mx-auto p-5 lg:p-10">
            {" "}
            <div className="flex flex-col items-center justify-center">
               <h1 className="text-4xl font-semibold">Our Doctors</h1>
               <p className="text-2xl">Our Experts Doctors For The Patients</p>
               <div className="w-full md:w-72 h-1 bg-black"></div>
            </div>
         </div>
      </section>
   );
};

export default Blogs;
