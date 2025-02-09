const hospitalServices: {
   id: number;
   title: string;
   category: string;
   image: string;
   description: string;
}[] = [
   {
      id: 1,
      title: "Emergency Care",
      category: "Critical Care",
      image: "/images/emergency-care.jpg",
      description:
         "Our emergency department is available 24/7, equipped with state-of-the-art medical technology and expert professionals ready to handle critical situations. Whether it's a severe injury, stroke, heart attack, or any urgent medical condition, we provide immediate care to stabilize and treat patients efficiently.",
   },
   {
      id: 2,
      title: "Outpatient Consultation",
      category: "General Medicine",
      image: "/images/outpatient.jpg",
      description:
         "Our outpatient department offers consultations with experienced specialists across multiple fields, including cardiology, orthopedics, gynecology, and more. Patients can book appointments and receive expert advice, diagnosis, and treatment without the need for hospitalization.",
   },
   {
      id: 3,
      title: "Advanced Diagnostics",
      category: "Diagnostics",
      image: "/images/diagnostics.jpg",
      description:
         "We offer a comprehensive range of diagnostic services, including MRI, CT scans, ultrasound, and X-rays. Our advanced laboratory facilities provide accurate blood tests, pathology, and genetic testing, ensuring early and precise detection of medical conditions.",
   },
   {
      id: 4,
      title: "Maternity & Childcare",
      category: "Women's Health",
      image: "/images/maternity.jpg",
      description:
         "Our maternity ward provides exceptional prenatal, childbirth, and postnatal care, ensuring the safety of both mother and baby. With highly trained obstetricians, neonatal care units, and experienced nurses, we provide a comfortable and safe birthing experience.",
   },
   {
      id: 5,
      title: "Surgical Procedures",
      category: "Surgery",
      image: "/images/surgery.jpg",
      description:
         "We offer advanced surgical procedures, including general surgery, orthopedic surgery, cardiac surgery, and minimally invasive laparoscopic techniques. Our expert surgeons and modern operation theaters ensure the highest level of safety and precision in every procedure.",
   },
   {
      id: 6,
      title: "Intensive Care Unit (ICU)",
      category: "Critical Care",
      image: "/images/icu.jpg",
      description:
         "Our ICU is equipped with cutting-edge life-support systems, expert critical care doctors, and highly trained nursing staff. We provide specialized treatment for patients in critical condition, ensuring 24/7 monitoring and care for severe illnesses and post-surgical recovery.",
   },
   {
      id: 7,
      title: "Physiotherapy & Rehabilitation",
      category: "Rehabilitation",
      image: "/images/physiotherapy.jpg",
      description:
         "Our physiotherapy and rehabilitation center helps patients recover from injuries, surgeries, strokes, and chronic pain conditions. With personalized therapy plans, expert physiotherapists, and modern rehabilitation equipment, we ensure a smooth recovery journey.",
   },
   {
      id: 8,
      title: "Cardiology & Heart Care",
      category: "Cardiology",
      image: "/images/cardiology.jpg",
      description:
         "Our cardiology department offers advanced heart care services, including ECG, echocardiograms, angioplasty, and open-heart surgeries. Our expert cardiologists focus on prevention, early diagnosis, and treatment of heart-related conditions to improve patients' quality of life.",
   },
   {
      id: 9,
      title: "Mental Health & Counseling",
      category: "Mental Health",
      image: "/images/mental-health.jpg",
      description:
         "We provide mental health support through experienced psychologists, psychiatrists, and counselors. Our services include therapy for anxiety, depression, stress management, and psychiatric treatments, helping patients maintain mental well-being.",
   },
   {
      id: 10,
      title: "Pharmacy Services",
      category: "Pharmacy",
      image: "/images/pharmacy.jpg",
      description:
         "Our in-house pharmacy is stocked with a wide range of medicines, ensuring quick and easy access to prescribed medications. Our pharmacists provide expert advice on proper medication usage, dosage, and potential side effects.",
   },
   {
      id: 11,
      title: "Vaccination & Immunization",
      category: "Preventive Care",
      image: "/images/vaccination.jpg",
      description:
         "We offer vaccinations for children and adults, including immunization against flu, hepatitis, polio, and COVID-19. Our vaccination programs ensure protection against preventable diseases, promoting overall community health.",
   },
   {
      id: 12,
      title: "Telemedicine & Online Consultation",
      category: "Telehealth",
      image: "/images/telemedicine.jpg",
      description:
         "Our telemedicine services allow patients to consult with doctors from the comfort of their homes. Through secure video calls and online prescriptions, we provide easy access to healthcare, particularly for those in remote locations or with mobility issues.",
   },
];

export default hospitalServices;
