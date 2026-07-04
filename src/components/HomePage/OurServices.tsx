import hospitalServices from "../../../data/serviceData";
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel";
import ServiceCard, { HospitalService } from "./ServiceCard";
import InteractiveGlow from "../Interactive/InteractiveGlow";

// Server component: no client hooks here, all interactivity lives in the
// InteractiveGlow / ServiceCard client components below it.
const OurServices = async () => {
  const services = hospitalServices as HospitalService[];

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28">
      <InteractiveGlow />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {/* intro */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Our Services
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Comprehensive care, designed around you
          </h2>

          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            From routine checkups to specialist treatment, every service on MediBridge is built for clarity,
            speed, and peace of mind.
          </p>
        </div>

        {/* cards */}
        <div className="mt-16">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={service.id} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
                  <ServiceCard service={service} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="mt-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
