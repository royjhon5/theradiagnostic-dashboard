"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pen,
  SearchIcon,
  CircleX,
} from "lucide-react";
import { useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function LabTest() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const categories = [
    "Blood",
    "Microbiology",
    "Imaging",
    "Histopathology",
    "Genetic",
    "Serology",
    "Endocrine",
    "Allergy",
    "Point-of-care",
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    scrollContainerRef.current?.setAttribute(
      "data-touchstart",
      touchDown.toString()
    );
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;

    const touchStart =
      scrollContainerRef.current.getAttribute("data-touchstart");
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientX;
    const diff = Number.parseFloat(touchStart) - currentTouch;

    if (Math.abs(diff) > 10) {
      scrollContainerRef.current.scrollLeft += diff / 3;
      scrollContainerRef.current.setAttribute(
        "data-touchstart",
        currentTouch.toString()
      );
    }
  };

  const labtest = [
    {
      id: 1,
      test: "Basic Health Package",
      price: "₱1,200.00",
      description: "CBC, Lipid Panel, Urinalysis....",
    },
    {
      id: 2,
      test: "Basic Health Package",
      price: "₱1,200.00",
      description: "CBC, Lipid Panel, Urinalysis....",
    },
    {
      id: 3,
      test: "Basic Health Package",
      price: "₱1,200.00",
      description: "CBC, Lipid Panel, Urinalysis....",
    },
  ];

  const clientlabreq = [
    {
      id: 1,
      date: "04/23/2025",
      client_name: "Jose Aldo",
      test_package: "Basic Health Check",
      status: "Complete",
    },
    {
      id: 2,
      date: "04/23/2025",
      client_name: "Nate  Diaz",
      test_package: "Diabetes Care",
      status: "Pending",
    },
    {
      id: 3,
      date: "04/23/2025",
      client_name: "Gunnar N",
      test_package: "Comprehensive Panel",
      status: "Cancelled",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          id="search"
          type="search"
          placeholder="Search Test"
          className="w-full md:w-[35%] bg-background pl-8"
        />
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-sm mb-2 font-bold">Category Test Type :</h2>
        <div className="flex items-center relative">
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 z-10 flex items-center justify-center cursor-pointer bg-white/90 rounded-full p-1 shadow-md ${
              !showLeftArrow ? "opacity-0 pointer-events-none" : "opacity-100"
            } transition-opacity duration-200`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {categories.map((category) => (
              <Button
                key={category}
                className="px-3 py-1 bg-gray-500 text-white rounded-full whitespace-nowrap text-sm font-medium cursor-pointer"
              >
                {category}
              </Button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 z-10 flex items-center justify-center bg-white/90 rounded-full cursor-pointer p-1 shadow-md ${
              !showRightArrow ? "opacity-0 pointer-events-none" : "opacity-100"
            } transition-opacity duration-200`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="bg-background rounded-lg mt-2">
        <h2 className="font-bold text-lg bg-primary text-white rounded-t-lg pl-2">
          Available Test Lab
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 p-2">
          <div className="flex flex-row gap-4 border p-4 rounded-lg">
            <Label>Option Type :</Label>
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1-horizontal" />
                <Label htmlFor="r1-horizontal">Individual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2-horizontal" />
                <Label htmlFor="r2-horizontal">Package</Label>
              </div>
            </RadioGroup>
          </div>{" "}
          <div className="flex flex-row gap-4">
            <Button size="lg" className="bg-[#11C7BC] cursor-pointer">
              Add New Lab Test
            </Button>
            <Link href="/lab_test_management/add_test_package">
              <Button size="lg" className="bg-[#11C7BC] cursor-pointer">
                Add Test Package
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Table className="border-t-3">
            <TableHeader>
              <TableRow>
                <TableHead>Individual Test</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labtest.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.test}</TableCell>
                  <TableCell>{test.price}</TableCell>
                  <TableCell>{test.description}</TableCell>
                  <TableCell className="text-right">
                    <Button className="mr-2 bg-[#737373] text-white cursor-pointer">
                      <Eye /> View Details
                    </Button>
                    <Button className="bg-[#737373] text-white cursor-pointer">
                      <Pen /> Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="bg-background rounded-lg mt-10">
        <h2 className="font-bold text-lg bg-primary text-white rounded-t-lg pl-2">
          Recent Client Laboratory Request
        </h2>
        <div>
          <Table className="border-t-3">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Test Package</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientlabreq.map((labreq) => (
                <TableRow key={labreq.id}>
                  <TableCell>{labreq.date}</TableCell>
                  <TableCell>{labreq.client_name}</TableCell>
                  <TableCell>{labreq.test_package}</TableCell>
                  <TableCell>{labreq.status}</TableCell>
                  <TableCell className="text-right">
                    <Button className="mr-2 bg-[#737373] text-white cursor-pointer">
                      <Eye /> View
                    </Button>
                    <Button className="mr-2 bg-[#737373] text-white cursor-pointer">
                      <Pen /> Edit
                    </Button>
                    <Button className="bg-[#737373] text-white cursor-pointer">
                      <CircleX /> Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
