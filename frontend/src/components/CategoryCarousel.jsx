import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="py-8 transition-colors duration-300">
      <Carousel className="w-full max-w-5xl mx-auto px-12">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Button
                variant="outline"
                onClick={() => searchJobHandler(cat)}
                className="w-full rounded-full bg-white dark:bg-zinc-900 dark:border-zinc-700 dark:text-white hover:bg-[#6A38C2] hover:text-white transition-all duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="dark:bg-zinc-900 dark:border-zinc-700 dark:text-white" />
        <CarouselNext className="dark:bg-zinc-900 dark:border-zinc-700 dark:text-white" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;